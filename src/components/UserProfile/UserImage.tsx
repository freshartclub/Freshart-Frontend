import { FaUserCircle } from "react-icons/fa";
const UserImage = ({ user, url }) => {
  return (
    <div className="lg:w-[20%] md:w-[25%] w-full">
      {user?.profile?.mainImage ? (
        <img
          src={`${url}/users/${user?.profile?.mainImage}`}
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
