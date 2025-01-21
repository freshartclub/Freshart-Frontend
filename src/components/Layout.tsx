import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import LogNaveBar from "./NavBar/LogNaveBar";
import NavBar from "./NavBar/NavBar";
import { useAppSelector } from "../store/typedReduxHooks";
import Loader from "./ui/Loader";
import ArtistNavBar from "./NavBar/ArtistNavBar";
import { Navigate, useNavigate } from "react-router";
import NavForHome from "./NavBar/NavForHome";

interface LayoutProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  check?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isAuthenticated,
  check,
}) => {
  const isArtist = useAppSelector((state) => state.user.isArtist);
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const user = localStorage.getItem("profile");

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";
  const isForgetPassword = location.pathname === "/forget-password";
  const becomeAnArtist = location.pathname === "/become_artist";
  const home = location.pathname === "/home";

  // let RoleBaseNavBar;

  // if (user === "artist") {
  //   RoleBaseNavBar = null;
  // } else {
  //   RoleBaseNavBar = NavBar;
  // }

  return (
    <div>
      {isLoginPage || isSignUpPage || isForgetPassword || becomeAnArtist ? (
        <LogNaveBar />
      ) : home ? (
        <NavForHome />
      ) : user === "artist" ? null : ( // <NavBar /> // <NavForHome />
        <NavBar />
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
