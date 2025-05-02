import { FaUserCircle } from "react-icons/fa";
import { imageUrl } from "../utils/baseUrls";
import { useAppSelector } from "../../store/typedReduxHooks";

const UserImage = ({ img }) => {
  const dark = useAppSelector((state)=> state.theme.mode)
  return (
    <div className="lg:w-[20%] md:w-[25%] w-[30%]">
      {img ? (
        <img
          src={`${imageUrl}/users/${img}`}
          alt="Profile"
          className="w-full sm:w-auto"
        />
      ) : (
        <FaUserCircle size="8em" />
      )}

    </div>
  );
};

export default UserImage;