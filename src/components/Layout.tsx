import React from "react";
import { useLocation } from "react-router-dom";
import LogNaveBar from "./NavBar/LogNaveBar";
import NavBar from "./NavBar/NavBar";
import NavForHome from "./NavBar/NavForHome";
import { useAppSelector } from "../store/typedReduxHooks";

interface LayoutProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  check?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const user = localStorage.getItem("profile");
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";
  const isForgetPassword = location.pathname === "/forget-password";
  const becomeAnArtist = location.pathname === "/become_artist";
  const home = location.pathname === "/home";

  return (
    <div>
      {isLoginPage || isSignUpPage || isForgetPassword || becomeAnArtist ? (
        <LogNaveBar />
      ) : home ? (
        <NavForHome />
      ) : user === "artist" && isAuthorized ? null : (
        <NavBar />
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
