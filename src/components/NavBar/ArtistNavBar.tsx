import { useRef, useState } from "react";
import logo from "../../assets/loginlogo.png";
import navigation_1 from "../../assets/navigation_1.png";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useLogOutMutation from "../../http/auth/useLogOutMutation";
import { useAppSelector } from "../../store/typedReduxHooks";
import useClickOutside from "../utils/useClickOutside";
import { imageUrl } from "../utils/baseUrls";
import { useGetNotification } from "./http/useGetNotification";

const ArtistNavBar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isToogleOpen, setIsToggelOpen] = useState(false);
  const [isOpenNotify, setIsOpenNotify] = useState(false);

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const closePopup = useRef(null);

  const { mutate: logOut } = useLogOutMutation();

  useClickOutside(closePopup, () => {
    setIsToggelOpen(false);
    // setSidebarOpen(false);
  });

  // const { data, isLoading } = useGetNotification();

  // console.log(data)

  const handleLogOut = () => {
    try {
      logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfile = () => {
    navigate("/home", { replace: true });
    localStorage.setItem("profile", "user");
  };
  const handleRedirect = () => {
    navigate("/artist-panel/artdashboard");
  };

  const handleNotifaction = () => {
    setIsOpenNotify((prev) => !prev);
  };

  return (
    <div className="w-full fixed top-0 left-0 z-[99] bg-white shadow-md">
      <div className="w-full py-5 px-5 flex items-center gap-5 relative justify-between">
        <GiHamburgerMenu
          className="cursor-pointer block sm:hidden md:hidden lg:hidden xl:hidden"
          size="2em"
          onClick={() => setSidebarOpen((prev) => !prev)}
        />
        {/* Logo */}
        <div className="overflow-hidden cursor-pointer ">
          <img
            onClick={handleRedirect}
            className="w-[8rem]  lg:block left-[20%] top-[50%] lg:w-full object-cover"
            src={logo}
            alt="Logo"
          />
        </div>
        {/* {isOpenNotify ? (
          <div className="absolute transition-all duration-500 top-[100%] right-0 w-[20vw] h-[100vh] bg-red-200"></div>
        ) : null} */}

        <div className="flex items-center gap-5 ">
          <div className="relative">
            <IoNotifications
              // onClick={handleNotifaction}
              className="cursor-pointer hidden lg:block"
              size="1.5em"
            />
            {/* <div className="w-4 h-4 text-center bg-red-400 absolute rounded-full bottom-3 left-3 text-black"></div> */}
          </div>

          <span
            onClick={() => setIsToggelOpen(!isToogleOpen)}
            className="rounded-full flex items-center justify-center cursor-pointer border p-1"
          >
            <img
              src={`${imageUrl}/users/${user.profile.mainImage}`}
              alt="User Profile"
              className="w-8 h-8 object-cover rounded-full "
            />
            <p className="font-semibold ml-2 hidden lg:block">
              {user.artistName} {user.artistSurname1} {user.artistSurname2}
            </p>
            <img
              className={`ml-1 transition-transform duration-300 ${
                isToogleOpen ? "rotate-180" : "rotate-0"
              }`}
              src={navigation_1}
              alt="Toggle"
            />
          </span>

          {/* Dropdown Menu */}
          {isToogleOpen && (
            <div
              ref={closePopup}
              className="absolute  z-10 top-20 right-5 flex flex-col gap-4 text-sm bg-white border rounded-lg shadow-md py-5 px-6"
            >
              <Link
                className="font-medium hover:bg-zinc-200 transition-all duration-200"
                to="/artist-panel/edit-artistprofile"
                onClick={() => setIsToggelOpen(false)}
              >
                Profile
              </Link>

              <Link
                className="font-medium hover:bg-zinc-200 transition-all duration-200"
                to="/artist-panel/user/settings"
                onClick={() => setIsToggelOpen(false)}
              >
                User Settings
              </Link>

              <Link
                className="font-medium hover:bg-zinc-200 transition-all duration-200"
                to="/artist-panel/user/settings"
                onClick={() => setIsToggelOpen(false)}
              >
                Notification
              </Link>
              {/* 
              <button
                className="font-medium hover:bg-zinc-200"
                onClick={handleProfile}
              >
                Switch To User Profile
              </button> */}
              <button
                className="bg-red-300 flex flex-col items-center justify-center gap-1 py-2 rounded hover:bg-red-400 font-medium"
                onClick={handleLogOut}
              >
                <span>Sign Out</span>
                <span className="text-[12px]">{user.email}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistNavBar;
