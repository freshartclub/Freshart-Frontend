import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/typedReduxHooks";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  if (isAuthorized && location.pathname === "/") {
    return <Navigate to="/home" replace />;
  }

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default AuthGuard;
