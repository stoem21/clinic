import { Navbar, Dropdown } from "flowbite-react";
import React, { FC, ReactNode, useEffect } from "react";

import useLayoutStore from "../store/layoutStore";
import useAuthStore, { Role } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const { isLoading } = useLayoutStore();
  const { userData, logout, getProfile } = useAuthStore();
  const { pathname } = location;
  const navigate = useNavigate();
  // toast
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!userData) {
      getProfile();
    }
  }, []);

  return (
    <div>
      <Navbar fluid rounded border={true} className="shadow-sm">
        <Navbar.Brand>
          {/* <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          /> */}
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Clinic
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown arrowIcon={true} inline label={userData?.username}>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {/* check logged in */}
          <Navbar.Link
            className={`${
              pathname === "/client-profile" ? "" : "cursor-pointer"
            }`}
            onClick={() => navigate("/client-profile")}
            active={pathname === "/client-profile"}
          >
            Client
          </Navbar.Link>
          <Navbar.Link
            className={`${
              pathname === "/treatment-record" ? "" : "cursor-pointer"
            }`}
            onClick={() => navigate("/treatment-record")}
            active={pathname === "/treatment-record"}
          >
            Treatment Record
          </Navbar.Link>
          {userData?.role !== Role.USER && (
            <Navbar.Link
              className={`${pathname === "/user" ? "" : "cursor-pointer"}`}
              onClick={() => navigate("/user")}
              active={pathname === "/user"}
            >
              User
            </Navbar.Link>
          )}
          {userData?.role !== Role.USER && (
            <Navbar.Link
              className={`${pathname === "/dentist" ? "" : "cursor-pointer"}`}
              onClick={() => navigate("/dentist")}
              active={pathname === "/dentist"}
            >
              Dentist
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Loading isLoading={isLoading} bgColor="bg-black/30" />
      {/* modal using with modal config */}
      {/* toast */}
      {children}
    </div>
  );
};
