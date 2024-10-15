import profile from "./assets/a.jpg.png";

const UserImage = ({avatar}) => {
  return (
    <div className="lg:w-[20%] md:w-[25%] w-full">
      <img src={avatar} alt="user profile" className="w-full sm:w-auto" />
    </div>
  );
};

export default UserImage;
