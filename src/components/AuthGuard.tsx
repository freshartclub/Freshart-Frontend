import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/typedReduxHooks";
// import { components } from "react-select";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  console.log(isAuthorized);

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default AuthGuard;
