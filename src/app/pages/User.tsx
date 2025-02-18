import React, { FC, useEffect, useState } from "react";
import { Layout } from "../component/layout";
import { Filter } from "../component/filter";
import { TableCard as Table } from "../component/table";
import { userFilterForm } from "../surveyJson/filter/user";
import useUserStore from "../store/userStore";
import { Button, ToggleSwitch, Select, Card, Modal } from "flowbite-react";
import useAuthStore, { Role } from "../store/authStore";
import { Model, Survey } from "survey-react-ui";
import { userCreateForm } from "../surveyJson/create/user";
import { theme } from "../surveyJson/_theme";
import { useNavigate } from "react-router-dom";
import { Empty } from "../component/empty";

interface Props {}
export const User: FC<Props> = () => {
  const { userData } = useAuthStore();
  const navigate = useNavigate();
  const { users, createUser, getUsers, superAdminUpdateUser, deleteUser } =
    useUserStore();
  const [filter, setFilter] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [createSurvey, setCreateSurvey] = useState<Model>(new Model());

  useEffect(() => {
    if (userData && !userData.isChangedPassword) {
      navigate("/change-password");
    }
    getUsers();
    const modelUser = new Model(userCreateForm());
    modelUser.applyTheme(theme);
    setCreateSurvey(modelUser);
  }, []);

  useEffect(() => {
    getUsers(filter);
  }, [filter]);

  return (
    <Layout>
      <div className="mt-3 grid grid-cols-4 gap-4 px-4">
        <div className="gap-0">
          <Filter
            filterForm={userFilterForm({})}
            onClickSearch={(val) => {
              setFilter(val);
            }}
          />
        </div>
        <div className="col-span-3">
          <Card>
            <div className="flex justify-between">
              <div className="text-2xl font-bold	">User Table</div>
              <Button onClick={() => setShowModal(true)}>+ Add User</Button>
            </div>
            {users?.length ? (
              <Table
                headers={[
                  {
                    key: "username",
                    label: "Username",
                    formater: (row) => {
                      return row.username;
                    },
                  },
                  {
                    key: "role",
                    label: "Role",
                    formater: (row) => {
                      return (
                        <Select
                          value={row.role}
                          onChange={(e) =>
                            superAdminUpdateUser(row.username, {
                              role: e.target.value,
                            }).then(() => getUsers(filter))
                          }
                        >
                          <option value={Role.ADMIN}>{Role.ADMIN}</option>
                          <option value={Role.USER}>{Role.USER}</option>
                        </Select>
                      );
                    },
                  },
                  {
                    key: "isChangedPassword",
                    label: "Changed Password",
                    formater: (row) => {
                      return row.isChangedPassword ? "Changed" : "Not changed";
                    },
                  },
                  {
                    key: "active",
                    label: "Active",
                    formater: (row) => {
                      return (
                        <ToggleSwitch
                          checked={row.active}
                          onChange={() => {
                            if (!row.active) {
                              superAdminUpdateUser(row.username, {
                                recoveryUser: true,
                              }).then(() => getUsers(filter));
                            } else {
                              deleteUser(row.username).then(() =>
                                getUsers(filter)
                              );
                            }
                          }}
                        />
                      );
                    },
                  },
                  {
                    key: "resetPassword",
                    label: "",
                    formater: (row) => {
                      return (
                        <Button
                          color={"red"}
                          onClick={() => {
                            superAdminUpdateUser(row.username, {
                              resetPassword: true,
                            }).then(() => getUsers(filter));
                          }}
                          disabled={!row.isChangedPassword}
                        >
                          Reset password
                        </Button>
                      );
                    },
                  },
                ]}
                data={users.length > 0 ? users : []}
              />
            ) : (
              <Empty />
            )}
          </Card>
        </div>
      </div>
      <Modal show={showModal} size="xl" onClose={() => setShowModal(false)}>
        <Modal.Header>Create User</Modal.Header>
        <Modal.Body>
          <Survey model={createSurvey} />
          {error && <span className="text-red-600">{error}</span>}
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            onClick={async () => {
              const resp = await createUser(createSurvey.getAllValues());
              if (!resp.isSuccess) setError(resp.errorMsg);
              else {
                getUsers(filter);
                setShowModal(false);
              }
            }}
          >
            Save
          </Button>
          <Button
            className="ml-3"
            color={"red"}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
