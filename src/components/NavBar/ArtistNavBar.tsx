import { useEffect, useRef, useState } from "react";
import logo from "../../assets/loginlogo.png";
import navigation_1 from "../../assets/navigation_1.png";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useLogOutMutation from "../../http/auth/useLogOutMutation";
import { useAppDispatch, useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl } from "../utils/baseUrls";
import useClickOutside from "../utils/useClickOutside";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setProfile } from "../../store/userSlice/userSlice";
import { FaTimes } from "react-icons/fa";
import { useGetNotification } from "./http/useGetNotification";

const ArtistNavBar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isToogleOpen, setIsToggelOpen] = useState(false);

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const closePopup = useRef(null);
  const isNotificationOpen = useRef(null);

  const { mutate: logOut } = useLogOutMutation();

  const { data, isLoading } = useGetNotification();

  console.log(data);
  const disptach = useDispatch();

  useClickOutside(closePopup, () => {
    setIsToggelOpen(false);
  });

  useClickOutside(isNotificationOpen, () => {
    setIsOpen(false);
  });

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

  const openNotification = () => {
    setIsOpen((prev) => !prev);
  };

  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <div className="w-full fixed top-0 left-0 z-[99] bg-white shadow-md">
      <div className="w-full py-5 px-5 flex items-center gap-5 relative justify-between">
        <GiHamburgerMenu
          className="cursor-pointer block sm:hidden"
          size="2em"
          onClick={() => setSidebarOpen((prev) => !prev)}
        />
        <div
          className={`overflow-hidden cursor-pointer ${
            sidebarOpen ? "hidden" : "block"
          }`}
        >
          <img
            onClick={handleRedirect}
            className="w-[8rem]  lg:block left-[20%] top-[50%] lg:w-full object-cover"
            src={logo}
            alt="Logo"
          />
        </div>

        <div
          ref={isNotificationOpen}
          className={`absolute top-20 right-0 ${
            isOpen ? "block" : "hidden"
          } w-full max-w-lg h-screen  bg-white transition-all duration-500`}
        >
          <FaTimes
            size="1.8em"
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <ul className="px-2 py-3 ">
            {data?.data &&
              data?.data?.notifications?.map((item, index) => (
                <div className="border border-zinc-300 shadow-lg rounded-lg px-3 py-3 ">
                  <li className="text-black  font-semibold py-1" key={index}>
                    {item?.subject}
                  </li>
                  <span className="text-sm font-medium tracking-tighter leading-none">
                    {item?.message}
                  </span>
                </div>
              ))}
          </ul>
        </div>

        <div className="flex items-center gap-5 ">
          <div onClick={openNotification} className="relative">
            <IoNotifications className="cursor-pointer lg:block" size="1.5em" />
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
            <p className="font-semibold ml-2 hidden lg:block">{name(user)}</p>
            <img
              className={`ml-1 transition-transform duration-300 ${
                isToogleOpen ? "rotate-180" : "rotate-0"
              }`}
              src={navigation_1}
              alt="Toggle"
            />
          </span>

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
                {t("Profile")}
              </Link>

              <Link
                className="font-medium hover:bg-zinc-200 transition-all duration-200"
                to="/artist-panel/user/settings"
                onClick={() => setIsToggelOpen(false)}
              >
                {t("User Settings")}
              </Link>

              <Link
                className="font-medium hover:bg-zinc-200 transition-all duration-200"
                to="/artist-panel/user/settings"
                onClick={() => setIsToggelOpen(false)}
              >
                {t("Notification")}
              </Link>

              <button
                className="font-medium hover:bg-zinc-200"
                onClick={handleProfile}
              >
                {t("Switch To User Profile")}
              </button>
              <button
                className="bg-red-300 flex flex-col items-center justify-center gap-1 py-2 rounded hover:bg-red-400 font-medium"
                onClick={handleLogOut}
              >
                <span>{t("Sign Out")}</span>
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
