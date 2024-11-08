import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/typedReduxHooks";
// import { components } from "react-select";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const isArtist = useAppSelector((state) => state.user.isArtist);
  const profile = localStorage.getItem("profile");
  const currentPath = useLocation();
  console.log("this is a current path name", location.pathname);

  if (isAuthorized && location.pathname === "/") {
    console.log("hhey working fine");
    return <Navigate to="/home" replace />;
  }

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default AuthGuard;
