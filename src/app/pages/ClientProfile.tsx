import React, { FC, useEffect, useState } from "react";
import { Layout } from "../component/layout";
import { Filter } from "../component/filter";
import { TableCard as Table } from "../component/table";
import { clientFilterForm } from "../surveyJson/filter/client";
import useClientProfileStore from "../store/clientProfileStore";
import { Button, Card, Modal } from "flowbite-react";
import { Model, Survey } from "survey-react-ui";
import { clientProfileCreateForm } from "../surveyJson/create/clientProfile";
import { mergeSurvey } from "../httpClient/service";
import { theme } from "../surveyJson/_theme";
import useAuthStore, { Role } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "../component/pagination";
import { Empty } from "../component/empty";

interface Props {}

export const ClientProfile: FC<Props> = () => {
  const {
    clientProfiles,
    pagination,
    getClientProfile,
    getClientProfiles,
    createClientProfile,
    updateClientProfile,
  } = useClientProfileStore();
  const [filter, setFilter] = useState<any>({});
  const [modal, setModal] = useState<{
    isShow: boolean;
    type?: "Create" | "Update";
    id?: string;
  }>({ isShow: false, type: "Create" });
  const [error, setError] = useState<string>();
  const [createSurvey, setCreateSurvey] = useState<Model>(new Model());
  const { userData } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && !userData.isChangedPassword) {
      navigate("/change-password");
    }
    getClientProfiles();
    const modelClient = new Model(clientProfileCreateForm());
    modelClient.applyTheme(theme);
    setCreateSurvey(modelClient);
  }, []);

  useEffect(() => {
    getClientProfiles(filter);
  }, [filter]);

  return (
    <Layout>
      <div className="mt-3 grid grid-cols-4 gap-4 px-4">
        <div className="gap-0">
          <Filter
            filterForm={clientFilterForm()}
            onClickSearch={(val) => {
              setFilter(val);
            }}
          />
        </div>
        <div className="col-span-3">
          <Card>
            <div className="flex justify-between">
              <div className="text-2xl font-bold	">ตารางรายการคนไข้</div>
              <Button
                onClick={() => {
                  createSurvey.clear();
                  setError("");
                  setModal({ isShow: true, type: "Create" });
                }}
              >
                + เพิ่มคนไข้ใหม่
              </Button>
            </div>
            {clientProfiles && clientProfiles.length > 0 ? (
              <Table
                headers={[
                  {
                    key: "hn",
                    label: "HN",
                    formater: (row) => {
                      return row.hn;
                    },
                  },
                  {
                    key: "name",
                    label: "ชื่อ",
                    formater: (row) => {
                      return `${row.firstName} ${row.lastName}`;
                    },
                  },
                  {
                    key: "nationalId",
                    label: "เลขประจำตัวประชาชน",
                    formater: (row) => {
                      return row.nationalId;
                    },
                  },
                  {
                    key: "phoneNumber",
                    label: "เบอร์โทรศัพท์",
                    formater: (row) => {
                      return row.phoneNumber;
                    },
                  },
                  {
                    key: "edit",
                    label: "แก้ไข",
                    formater: (row) => {
                      return (
                        <Button
                          onClick={async () => {
                            setError("");
                            setModal({
                              isShow: true,
                              type: "Update",
                              id: row.hn,
                            });
                            const { isSuccess, data } = await getClientProfile(
                              row.hn
                            );
                            if (!isSuccess) {
                              setError("Error when load client profile");
                              return;
                            }
                            createSurvey.clear();

                            if (data?.data) {
                              await mergeSurvey(createSurvey, {
                                ...data.data,
                                ...(data.data.subDistrict
                                  ? {
                                      subDistrict: {
                                        id: data.data.subDistrict,
                                        zip_code: data.data.zipcode,
                                      },
                                    }
                                  : {}),
                              });
                            }
                          }}
                        >
                          แก้ไข
                        </Button>
                      );
                    },
                  },
                ]}
                data={clientProfiles || []}
              />
            ) : (
              <Empty />
            )}
            <TablePagination
              pagination={pagination}
              onPageChange={(page) => {
                getClientProfiles({ ...filter, page });
              }}
            />
          </Card>
        </div>
      </div>
      <Modal
        show={modal.isShow}
        size="xl"
        onClose={() => setModal({ isShow: false })}
      >
        <Modal.Header>Create User</Modal.Header>
        <Modal.Body>
          <Survey model={createSurvey} />
          {error && <span className="text-red-600">{error}</span>}
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            onClick={async () => {
              createSurvey.validate();
              const body = createSurvey.getAllValues();
              const resp =
                modal.type === "Update"
                  ? await updateClientProfile(modal.id ?? "", body)
                  : await createClientProfile(body);
              if (!resp.isSuccess) setError(resp.errorMsg);
              else {
                getClientProfiles(filter);
                setModal({ isShow: false });
                setError("");
              }
            }}
          >
            Save
          </Button>
          <Button
            className="ml-3"
            color={"red"}
            onClick={() => setModal({ isShow: false })}
          >
            {userData?.role !== Role.USER ? "Cancel" : "Done"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
