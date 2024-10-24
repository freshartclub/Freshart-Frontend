import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./ArtistDashboard/Dashboard";
import Artwork from "../ArtistDetail/Artwork";
import AddArtwork from "./AddArtwork/AddArtwork";
import Orders from "./Orders";
import ArtistProfile from "./ArtistEditProfile/ArtistProfile";

const ArtistPanel = () => {
  return (
    <div className=" flex w-full">
      <Sidebar />
      <div className="flex-1 sm:px-6 p-3 bg-zinc-100">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="artdashboard" element={<Dashboard />} />
          <Route path="artwork" element={<Artwork />} />
          <Route path="order" element={<Orders />} />
          <Route path="artwork/add" element={<AddArtwork />} />
          <Route path="edit-artistprofile" element={<ArtistProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default ArtistPanel;
