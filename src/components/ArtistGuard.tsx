import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/typedReduxHooks";

interface ArtistGuardProps {
  children: React.ReactNode;
}

const ArtistGuard = ({ children }: ArtistGuardProps) => {
  const isArtist = useAppSelector((state) => state.user.isArtist);
  const profile = localStorage.getItem("profile");

  if (!isArtist) {
    return <Navigate to="/home" replace />;
  } else if (profile === "artist") {
    return <>{children}</>;
  }
};

export default ArtistGuard;
