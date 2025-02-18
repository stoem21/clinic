import React, { FC, useEffect, useState } from "react";
import { Layout } from "../component/layout";
import { TableCard as Table } from "../component/table";
import { Button, Modal, ToggleSwitch } from "flowbite-react";
import { Model, Survey } from "survey-react-ui";
import useDentistStore from "../store/dentistStore";
import { dentistCreateForm } from "../surveyJson/create/dentist";
import { mergeSurvey } from "../httpClient/service";
import { theme } from "../surveyJson/_theme";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Empty } from "../component/empty";

interface Props {}
const DENTIST_SURVEY_DATA_KEY = [
  "name",
  "phoneNumber",
  "email",
  "lineId",
  "note",
  "dentistLicensId",
];
export const Dentist: FC<Props> = () => {
  const {
    dentists,
    createDentist,
    getDentists,
    updateDentist,
    deleteDentist,
    activateDentist,
  } = useDentistStore();
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
    getDentists();
    const modelDent = new Model(dentistCreateForm());
    modelDent.applyTheme(theme);
    setCreateSurvey(modelDent);
  }, []);
  return (
    <Layout>
      <div className="mt-3 flex justify-center px-4">
        <div className="min-w-[300px]">
          <div className="flex justify-end">
            <Button
              className="mb-3"
              onClick={() => {
                createSurvey.clear();
                setModal({ isShow: true, type: "Create" });
              }}
            >
              + Add Dentist
            </Button>
          </div>
          {dentists?.length ? (
            <Table
              headers={[
                {
                  key: "dentistLicensId",
                  label: "Licens ID",
                  formater: (row) => {
                    return row.dentistLicensId;
                  },
                },
                {
                  key: "name",
                  label: "Name",
                  formater: (row) => {
                    return row.name;
                  },
                },
                {
                  key: "phoneNumber",
                  label: "Phone number",
                  formater: (row) => {
                    return row.phoneNumber;
                  },
                },
                {
                  key: "email",
                  label: "Email",
                  formater: (row) => {
                    return row.email;
                  },
                },
                {
                  key: "lineId",
                  label: "Line ID",
                  formater: (row) => {
                    return row.lineId;
                  },
                },
                {
                  key: "active",
                  label: "Active",
                  formater: (row) => {
                    return (
                      <ToggleSwitch
                        checked={row.active}
                        onChange={async () => {
                          const resp = row.active
                            ? await deleteDentist(row.id || "")
                            : await activateDentist(row.id || "");
                          if (!resp.isSuccess) setError(resp.errorMsg);
                          else {
                            getDentists();
                          }
                        }}
                      />
                    );
                  },
                },
                {
                  key: "edit",
                  label: "Edit",
                  formater: (row) => {
                    return (
                      <Button
                        onClick={() => {
                          setModal({
                            isShow: true,
                            type: "Update",
                            id: row.id,
                          });
                          createSurvey.clear();
                          const adjustedData: { [key: string]: any } = {
                            isOrthoDentist: row.isOrthoDentist,
                          };
                          DENTIST_SURVEY_DATA_KEY.forEach((key) => {
                            if (row[key]) {
                              adjustedData[key] = row[key];
                            }
                          });
                          mergeSurvey(createSurvey, adjustedData);
                        }}
                      >
                        Edit
                      </Button>
                    );
                  },
                },
              ]}
              data={dentists}
            />
          ) : (
            <Empty />
          )}
        </div>
      </div>
      <Modal
        show={modal.isShow}
        size="xl"
        onClose={() => setModal({ isShow: false })}
      >
        <Modal.Header>{modal.type} Dentist</Modal.Header>
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
                  ? await updateDentist(modal.id ?? "", body)
                  : await createDentist(body);
              if (!resp.isSuccess) setError(resp.errorMsg);
              else {
                getDentists();
                setModal({ isShow: false });
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
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
