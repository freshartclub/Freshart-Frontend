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
  const url = "https://dev.freshartclub.com/images";
  console.log(user);

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <div className="container mx-auto md:px-6 px-3 pt-5">
        <ul className="flex p-2 gap-4 text-xl text-[#2E4053] items-center">
          <li>
            <Link to="/" className="rounded-md transition-all flex">
              <img
                src={home}
                alt="Home icon"
                className="w-[14px] h-[14px] mr-2"
              />
              <P
                variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                className="text-[#FF536B]"
              >
                Home
              </P>
            </Link>
          </li>
          <img src={arrow} alt="Home icon" className="w-[4px] h-[6px] mr-1" />
          <li>
            <Link
              to="/user_profile"
              className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
            >
              <P
                variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                className="text-[#203F58]"
              >
                Profile
              </P>
            </Link>
          </li>
        </ul>

        <div className="flex md:flex-row flex-col w-full xl:gap-10 lg:gap-5 gap-5 mt-8">
          <UserImage user={user} url={url} />
          <UserDescription user={user} />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default UserProfile;
