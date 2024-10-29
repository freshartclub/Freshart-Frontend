import profile from "./assets/a.jpg.png";

const UserImage = ({ user }) => {
  console.log(user.avatar);
  return (
    <div className="lg:w-[20%] md:w-[25%] w-full">
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/uploads/users/${user?.avatar}`}
        alt="user profile"
        className="w-full sm:w-auto"
      />
    </div>
  );
};

export default UserImage;
