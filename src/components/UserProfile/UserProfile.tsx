import { useAppSelector } from "../../store/typedReduxHooks";
import UserDescription from "./UserDescription";
import UserImage from "./UserImage";

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const dark = useAppSelector((state) => state.theme.mode);

  return (
    <div className={`${dark ? "bg-gray-900" : "bg-white"} mx-auto md:px-6 px-3 pt-5`}>
      <div className="flex md:flex-row flex-col w-full gap-5 py-5">
        <UserImage img={user?.mainImage} dark={dark} />
        <UserDescription user={user} dark={dark} />
      </div>
    </div>
  );
};

export default UserProfile;
