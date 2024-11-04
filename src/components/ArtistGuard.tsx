import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/typedReduxHooks";
// import { components } from "react-select";

interface ArtistGuardProps {
  children: React.ReactNode;
}

const ArtistGuard = ({ children }: ArtistGuardProps) => {
  const isArtist = useAppSelector((state) => state.user.isArtist);

  if (!isArtist) return <Navigate to="/home" replace />;

  return <>{children}</>;
};

export default ArtistGuard;
