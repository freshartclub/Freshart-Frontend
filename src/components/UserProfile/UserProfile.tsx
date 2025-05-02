import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";
import P from "../ui/P";
import UserImage from "./UserImage";
import UserDescription from "./UserDescription";
import { useAppSelector } from "../../store/typedReduxHooks";
import Loader from "../ui/Loader";

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const dark = useAppSelector((state) => state.theme.mode);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className={dark ? "dark" : "bg-white"}>
      <div className=" mx-auto md:px-6 px-3 pt-5 dark:bg-gray-900 dark:text-white min-h-screen">
        <ul className="flex p-2 gap-4 text-xl items-center">
          <li>
            <Link to="/" className="rounded-md transition-all flex">
              <img
                src={home}
                alt="Home icon"
                className="w-[14px] h-[14px] mr-2"
              />
              <P
                variant={{ size: "small", theme: dark ? "light" : "dark", weight: "semiBold" }}
                className={dark ? "text-[#FF8A98]" : "text-[#FF536B]"}
              >
                Home
              </P>
            </Link>
          </li>
          <img 
            src={arrow} 
            alt="Home icon" 
            className={`w-[4px] h-[6px] mr-1 ${dark ? "opacity-70" : ""}`} 
          />
          <li>
            <Link
              to="/user_profile"
              className={`cursor-pointer rounded-md transition-all duration-300 ${
                dark ? "hover:bg-gray-700" : "hover:bg-[#E8DAEF]"
              }`}
            >
              <P
                variant={{ size: "small", theme: dark ? "light" : "dark", weight: "semiBold" }}
                className={dark ? "text-gray-300" : "text-[#203F58]"}
              >
                Profile
              </P>
            </Link>
          </li>
        </ul>

        <div className="flex md:flex-row flex-col w-full xl:gap-10 lg:gap-5 gap-5 mt-8">
          <UserImage img={user?.mainImage} />
          <UserDescription user={user} dark={dark} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;