import React, { FC, useEffect } from "react";
import "./styles.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { User } from "./pages/User";
import { Login } from "./pages/Login";
import { TreatmentRecord } from "./pages/TreatmentRecord";
import { ClientProfile } from "./pages/ClientProfile";
import { Dentist } from "./pages/Dentist";
import useLayoutStore from "./store/layoutStore";
import { ChangePassword } from "./pages/ChangePassword";
import useAuthStore from "./store/authStore";

export const App: FC<{ name?: string }> = ({}) => {
  const { target, setTarget } = useLayoutStore();
  const { userData } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && !userData.isChangedPassword) {
      navigate("/change-password");
    }
  }, [userData]);
  useEffect(() => {
    if (target) {
      navigate(target);
      setTarget("");
    }
  }, [target]);
  return (
    // <>
    //   <Button color="blue">Blue</Button>
    // </>
    // <BrowserRouter>
    <Routes>
      <Route path="*" element={<>PAGE NOT FOUND</>} />
      <Route path="/" element={<Login />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/client-profile" element={<ClientProfile />} />
      <Route path="/dentist" element={<Dentist />} />
      <Route path="/treatment-record" element={<TreatmentRecord />} />
      <Route path="/user" element={<User />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default App;
