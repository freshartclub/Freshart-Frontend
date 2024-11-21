import profile from "./assets/a.jpg.png";

const UserImage = ({ user, url }) => {
  return (
    <div className="lg:w-[20%] md:w-[25%] w-full">
      <img
        src={`${url}/users/${user?.profile?.mainImage}`}
        alt="user profile"
        className="w-full sm:w-auto"
      />
    </div>
  );
};

export default UserImage;
