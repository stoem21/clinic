import React, { FC, useEffect, useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

interface Props {}
export const ChangePassword: FC<Props> = () => {
  const { userData, getProfile } = useAuthStore();
  const { userChangePassword } = useUserStore();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleChangePassword = async () => {
    const resp = await userChangePassword(userData?.username ?? "", {
      password,
    });
    if (!resp.isSuccess) setError(resp.errorMsg ?? "error");
    else {
      getProfile();
      navigate("/client-profile");
    }
  };

  useEffect(() => {
    if (userData?.isChangedPassword) {
      navigate("/client-profile");
    }
  }, []);

  useEffect(() => {
    if (error && password.length >= 8) {
      setError("");
    }
    if (password.length < 8) {
      setError("รหัสผ่านอย่างน้อย 8 ตัว");
    }
  }, [confirmPassword, password]);

  return (
    // <Layout>
    <div className="flex justify-center mt-10">
      <Card className="min-w-96">
        {/* add title */}
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          กรุณาเปลี่ยนพาสเวิร์ด
        </h5>
        <form className="flex flex-col gap-4">
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirm Password" />
            </div>
            <TextInput
              id="confirmPassword"
              type="password"
              onChange={(val) => setConfirmPassword(val.target.value)}
            />
          </div>
          {error && <span className="text-red-600">{error}</span>}
          <Button
            disabled={password.length >= 8 && password !== confirmPassword}
            onClick={handleChangePassword}
          >
            เปลี่ยนพาสเวิร์ด
          </Button>
        </form>
      </Card>
    </div>
    // </Layout>
  );
};
