import { GoPlus } from "react-icons/go";
import { NavLink } from "react-router-dom";

const UploadArtworkBtn = ({ path }: any) => {
  return (
    <NavLink
      className="py-1 px-2 rounded-md border-gray-100 bg-[#FF536B] text-white flex gap-1 items-center h-fit"
      to={path}
    >
      <GoPlus /> Upload Artwork
    </NavLink>
  );
};

export default UploadArtworkBtn;
