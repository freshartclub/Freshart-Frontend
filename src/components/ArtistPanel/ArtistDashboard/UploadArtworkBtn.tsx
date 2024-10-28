import { GoPlus } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
const UploadArtworkBtn = ({ path }: any) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/addartwork");
  };

  return (
    <NavLink to={path}>
      <button
        className="py-1 px-2 rounded-md border-gray-100 bg-[#FF536B] text-white flex gap-1 items-center h-fit"
        onClick={handleRedirect}
      >
        <GoPlus /> Upload Artwork
      </button>
    </NavLink>
  );
};

export default UploadArtworkBtn;
