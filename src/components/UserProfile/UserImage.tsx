import { FaUserCircle } from "react-icons/fa";
import { imageUrl } from "../utils/baseUrls";
const UserImage = ({ user }) => {
  return (
    <div className="lg:w-[20%] md:w-[25%] w-full">
      {user?.profile?.mainImage ? (
        <img
          src={`${imageUrl}/users/${user?.profile?.mainImage}`}
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
