import React, { FC, useEffect, useState } from "react";
import { Layout } from "../component/layout";
import { Filter } from "../component/filter";
import { TableCard } from "../component/table";
import { treatmentRecordFilterForm } from "../surveyJson/filter/treatmentRecord";
import { Button, Card, Modal } from "flowbite-react";
import useTreatmentRecordStore from "../store/treatmentRecordStore";
import { Model, Survey } from "survey-react-ui";
import {
  formatDate,
  formatDateDisplay,
  mergeSurvey,
} from "../httpClient/service";
import { treatmentRecordCreateForm } from "../surveyJson/create/treatmentRecord";
import { TreatmentRow } from "../component/treatmentRow";
import { theme } from "../surveyJson/_theme";
import useAuthStore, { Role } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { TablePagination } from "../component/pagination";
import { Empty } from "../component/empty";

interface Props {}
const TREATMENT_SURVEY_DATA_KEY = [
  "clientHN",
  "dentistId",
  "treatmentDate",
  "note",
];

export interface Rows {
  uuid: string;
  type: string;
  model: Model | null;
  initValue?: any;
}

function clearErrors(survey: Model) {
  if (!survey?.currentPage) return;
  const questions = survey.currentPage.questions;
  for (let i = 0; i < questions.length; i++) {
    questions[i].errors = [];
  }
}

export const TreatmentRecord: FC<Props> = () => {
  const {
    treatmentRecords,
    pagination,
    createTreatmentRecord,
    updateTreatmentRecord,
    getTreatmentRecords,
    getTreatmentRecord,
  } = useTreatmentRecordStore();
  const { userData } = useAuthStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<any>({});
  const [treatmentData, setTreatmentData] = useState<{ [key: string]: any }>(
    {}
  );
  const [modal, setModal] = useState<{
    isShow: boolean;
    type?: "Create" | "Update";
    id?: string;
  }>({ isShow: false, type: "Create" });
  const [error, setError] = useState<string>();
  const [createSurvey, setCreateSurvey] = useState<Model>(new Model());
  const [treatmentRows, setTreatmentRows] = useState<Rows[]>([
    { uuid: uuidv4(), type: "", model: null },
  ]);

  const clearValue = () => {
    createSurvey.clear();
    setTreatmentRows([{ uuid: uuidv4(), type: "", model: null }]);
    setTreatmentData({});
    clearErrors(createSurvey);
  };

  useEffect(() => {
    if (userData && !userData.isChangedPassword) {
      navigate("/change-password");
    }
    getTreatmentRecords();
    const modelTreatmentRecord = new Model(treatmentRecordCreateForm());
    modelTreatmentRecord.applyTheme(theme);
    setCreateSurvey(modelTreatmentRecord);
  }, []);

  useEffect(() => {
    getTreatmentRecords(filter);
  }, [filter]);

  return (
    <Layout>
      <div className="mt-3 grid grid-cols-4 gap-4 px-4">
        <div className="test">
          <Filter
            filterForm={treatmentRecordFilterForm()}
            onClickSearch={(val) => {
              setFilter(val);
            }}
          />
        </div>
        <div className="col-span-3">
          <Card>
            <div className="flex justify-between">
              <div className="text-2xl font-bold	">ตารางประวัติการรักษา</div>
              <Button
                onClick={() => {
                  clearValue();
                  setModal({ isShow: true, type: "Create" });
                }}
              >
                + ประวัติการรักษา
              </Button>
            </div>
            {treatmentRecords?.length > 0 ? (
              <TableCard
                headers={[
                  {
                    key: "clientHN",
                    label: "HN",
                    formater: (row) => {
                      return row.clientProfile.hn;
                    },
                  },
                  {
                    key: "name",
                    label: "ชื่อ",
                    formater: (row) => {
                      return `${row.clientProfile.firstName} ${row.clientProfile.lastName}`;
                    },
                  },
                  {
                    key: "nationalId",
                    label: "เลขประจำตัวประชาชน",
                    formater: (row) => {
                      return row.clientProfile.nationalId;
                    },
                  },
                  {
                    key: "phoneNumber",
                    label: "เบอร์โทรศัพท์",
                    formater: (row) => {
                      return row.clientProfile.phoneNumber;
                    },
                  },
                  {
                    key: "treatmentDate",
                    label: "วันที่รักษา",
                    formater: (row) => {
                      return formatDateDisplay(new Date(row.treatmentDate));
                    },
                  },
                  {
                    key: "edit",
                    label: "แก้ไข",
                    formater: (row) => {
                      return (
                        <Button
                          disabled={userData?.role === Role.USER}
                          onClick={async () => {
                            await setTreatmentRows([]);
                            await setTreatmentData({});
                            setModal({
                              isShow: true,
                              type: "Update",
                              id: row.id,
                            });
                            const rowData = await getTreatmentRecord(row.id);
                            if (!rowData.isSuccess) {
                              setError("Error when load treatment data");
                              return;
                            }
                            if (rowData.data.data.items.length > 0) {
                              const rows: Rows[] = [];
                              rowData.data.data.items.forEach(
                                (item: any, _: number) => {
                                  const uuid = uuidv4();
                                  rows.push({
                                    uuid,
                                    type: "",
                                    model: null,
                                    initValue: item,
                                  });
                                  setTreatmentData((prev: Object) => ({
                                    ...prev,
                                    [uuid]: {
                                      id: item.id,
                                      type: item.treatmentType,
                                      data: item.treatmentValue,
                                    },
                                  }));
                                }
                              );
                              setTreatmentRows(rows);
                            }
                            const adjustedData: { [key: string]: any } = {};
                            TREATMENT_SURVEY_DATA_KEY.forEach((key) => {
                              if (row[key]) {
                                adjustedData[key] = row[key];
                                if (key == "treatmentDate") {
                                  adjustedData[key] = formatDate(
                                    new Date(row[key])
                                  );
                                }
                              }
                            });
                            // merge row function
                            mergeSurvey(createSurvey, adjustedData);
                          }}
                        >
                          แก้ไข
                        </Button>
                      );
                    },
                  },
                ]}
                data={treatmentRecords || []}
              />
            ) : (
              <Empty />
            )}
            <TablePagination
              pagination={pagination}
              onPageChange={(page) => {
                getTreatmentRecord({ ...filter, page });
              }}
            />
          </Card>
        </div>
      </div>
      <Modal
        show={modal.isShow}
        size="7xl"
        onClose={() => setModal({ isShow: false })}
      >
        <Modal.Header>
          {modal.type == "Update"
            ? "แก้ไขประวัติการรักษา"
            : "เพิ่มประวัตการรักษา"}
        </Modal.Header>
        <Modal.Body>
          <Survey model={createSurvey} />
          {error && <span className="text-red-600">{error}</span>}
          <div className="mx-14">
            {treatmentRows && (
              <>
                <div className=" mt-4 sv-question__header sv-question__header--location--top">
                  <h5 className="sv-title sv-question__title font-bold text-lg">
                    <span className="sv-string-viewer sv-string-viewer--multiline">
                      รายการการรักษา
                    </span>
                  </h5>
                </div>
                {treatmentRows.map((row, index) => {
                  return (
                    <TreatmentRow
                      key={row.uuid}
                      canDelete={treatmentRows.length > 1}
                      onClickDelete={() => {
                        setTreatmentRows(
                          treatmentRows.filter((_, i) => i !== index)
                        );
                        setTreatmentData((prev) => {
                          const { [row.uuid]: _, ...rest } = prev;
                          return rest;
                        });
                      }}
                      setValue={(type, rowData) => {
                        setTreatmentData((prev: Object) => ({
                          ...prev,
                          [row.uuid]: {
                            id: row.initValue?.id || index.toString(),
                            type,
                            data: rowData,
                          },
                        }));
                      }}
                      initValue={row.initValue ?? null}
                    />
                  );
                })}
              </>
            )}
          </div>
          <div className="flex mx-[60px] mt-2 justify-end">
            <Button
              onClick={async () => {
                setTreatmentRows([
                  ...(treatmentRows || []),
                  { uuid: uuidv4(), type: "", model: null },
                ]);
              }}
            >
              + เพิ่มรายการ
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            onClick={async () => {
              createSurvey.validate();
              // validate have atleast one item
              const mainInf = createSurvey.getAllValues();
              const sendingData = {
                ...mainInf,
                treatmentItems: Object.values(treatmentData),
              };
              // add error on tail modal => if () return
              const resp =
                modal.type === "Update"
                  ? await updateTreatmentRecord(modal.id ?? "", sendingData)
                  : await createTreatmentRecord(sendingData);
              if (!resp.isSuccess) setError(resp.errorMsg);
              else {
                getTreatmentRecords(filter);
                setModal({ isShow: false });
              }
            }}
          >
            บันทึก
          </Button>
          <Button
            className="ml-3"
            color={"red"}
            onClick={() => setModal({ isShow: false })}
          >
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
