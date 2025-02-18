import React, { FC, useEffect, useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

interface Props {}
export const Login: FC<Props> = () => {
  const { login, userData } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    const resp = await login(username, password);
    if (!resp.isSuccess) setError(resp.errorMsg ?? "error");
    else {
      if (resp.isChangedPassword) navigate("/client-profile");
      console.log("navigate login");
    }
  };

  useEffect(() => {
    if (userData) {
      navigate("/client-profile");
    }
  }, []);

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [username, password]);

  return (
    // <Layout>
    <div className="flex justify-center mt-10">
      <Card className="min-w-96">
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              onChange={(val) => setUsername(val.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              onChange={(val) => setPassword(val.target.value)}
            />
          </div>
          {error && <span className="text-red-600">{error}</span>}
          <Button disabled={!(username && password)} onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Card>
    </div>
    // </Layout>
  );
};
