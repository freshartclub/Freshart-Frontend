import { FaUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { imageUrl } from "../utils/baseUrls";

const UserImage = ({ img, dark }) => {
  return (
    <div className="lg:w-[20%] md:w-[25%] w-[30%] flex flex-col items-center">
      <div className="relative group">
        {img ? (
          <img
            src={`${imageUrl}/users/${img}`}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
          />
        ) : (
          <FaUserCircle size="8rem" className={dark ? "text-gray-700" : "text-gray-300"} />
        )}
        <button
          className={`absolute bottom-2 right-2 ${
            dark ? "bg-gray-700 text-white" : "bg-white text-gray-700"
          } p-2 rounded-full group-hover:opacity-100 transition-opacity duration-200 shadow-md`}
        >
          <FiEdit2 size="1rem" />
        </button>
      </div>
    </div>
  );
};

export default UserImage;
