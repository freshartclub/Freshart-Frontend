import { FaUserCircle } from "react-icons/fa";
import { imageUrl } from "../utils/baseUrls";

const UserImage = ({ img }) => {
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
