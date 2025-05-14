import { useRef, useState } from "react";
import logoWhite from "/logofarcwhite.svg";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useLogOutMutation from "../../http/auth/useLogOutMutation";
import { useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl } from "../utils/baseUrls";
import useClickOutside from "../utils/useClickOutside";

import { RxCross2 } from "react-icons/rx";
import useDeleteNotification from "./http/useDeleteNotification";
import { useGetNotification } from "./http/useGetNotification";
import useReadNotification from "./http/useReadNotification";
import ReferralPopup from "./ReferralPopup";
import { BsChevronDown } from "react-icons/bs";

const ArtistNavBar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isToogleOpen, setIsToggelOpen] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const dark = useAppSelector((state) => state.theme.mode);

  const closePopup = useRef(null);
  const isNotificationOpen = useRef(null);

  const { mutate: logOut } = useLogOutMutation();

  const { data } = useGetNotification();
  const { mutateAsync } = useReadNotification();
  const { mutate } = useDeleteNotification();

  useClickOutside(closePopup, () => {
    setIsToggelOpen(false);
  });

  useClickOutside(isNotificationOpen, () => {
    setIsOpen(false);
  });

  const handleReadNotification = (id: string) => {
    mutateAsync(id);
  };

  const handleDeleteNotification = (id: string) => {
    mutate(id);
  };

  const handleInvitePopUp = () => {
    setPopUp((prev) => !prev);
  };

  const handleLogOut = () => {
    logOut();
  };

  const handleProfile = () => {
    navigate("/home", { replace: true });
    localStorage.setItem("profile", "user");
    window.location.reload();
  };

  const handleRedirect = () => {
    navigate("/artist-panel");
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

  const unreadCount = data?.data?.notifications?.filter((notification) => !notification.isRead)?.length || 0;

  return (
    <div className={`w-full fixed top-0 left-0 z-[99] bg-[#102030] shadow-md`}>
      <div className="w-full py-4 px-6 flex items-center gap-5 relative justify-between">
        <GiHamburgerMenu className={`cursor-pointer block text-white sm:hidden`} size="2em" onClick={() => setSidebarOpen((prev) => !prev)} />
        <div className={`overflow-hidden cursor-pointer ${sidebarOpen ? "hidden" : "block"}`}>
          <img onClick={handleRedirect} className="w-[15rem]" src={logoWhite} alt="Logo" />
        </div>

        <div
          ref={isNotificationOpen}
          className={`absolute top-20 right-0 ${isOpen ? "right-0" : "right-[-20rem]"} w-80 h-screen bg-white transition-all duration-500`}
        >
          <div className="flex items-center justify-between border-y py-2 gap-3 px-5">
            <button
              onClick={() => handleDeleteNotification()}
              className="px-3 py-2 border border-zinc-200 rounded-lg font-bold bg-zinc-50 hover:bg-zinc-100"
            >
              {t("Remove All")}
            </button>
            <button onClick={openNotification} className="px-3 py-2 border border-zinc-200 rounded-lg font-bold bg-zinc-50 hover:bg-zinc-100">
              {t("Close")}
            </button>
          </div>

          <ul className="px-2 py-3 flex flex-col gap-3 ">
            {data?.data?.notifications?.length ? (
              data?.data?.notifications?.map((item, index: number) => (
                <div
                  key={index}
                  className={`border border-zinc-300 shadow-lg rounded-lg px-3 py-3 relative flex flex-col ${item?.isRead ? "" : "bg-zinc-100"}`}
                >
                  <li className="text-black  font-semibold py-1" key={index}>
                    {item?.subject}
                  </li>
                  <span className="text-sm font-medium tracking-tighter  ">{item?.message}</span>
                  {item?.isRead ? null : (
                    <button
                      onClick={() => handleReadNotification(item?._id)}
                      className="px-2 py-1 border border-zinc-200  mt-2 hover:bg-zinc-300 text-sm font-semibold tracking-tight leading-none"
                    >
                      {t("Mark As Read")}
                    </button>
                  )}
                  <RxCross2 size="1.8em" className="absolute top-2 right-2 cursor-pointer" onClick={() => handleDeleteNotification(item?._id)} />
                </div>
              ))
            ) : (
              <li className="text-black text-center font-semibold py-1">{t("No Notification")}</li>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-5 ">
          <div onClick={openNotification} className="relative cursor-pointer">
            <IoNotifications color={"white"} className="lg:block" size="1.5em" />
            <div className="w-5 h-5 bg-red-500 text-black rounded-full -top-3 right-0 absolute flex items-center justify-center font-semibold">
              {unreadCount}
            </div>
          </div>

          <span
            ref={closePopup}
            onClick={() => setIsToggelOpen(!isToogleOpen)}
            className={`rounded-full flex items-center justify-center cursor-pointer border border-gray-600 text-white p-1`}
          >
            <img src={`${imageUrl}/users/${user?.mainImage}`} alt="User Profile" className="w-8 h-8 object-cover rounded-full " />
            <p className="font-semibold ml-2 hidden lg:block">{name(user)}</p>
            <BsChevronDown className="mx-1" size={13} />

            {isToogleOpen && (
              <div className={`absolute z-[99] top-16 right-6 w-56 ${dark ? "bg-gray-700" : "bg-white"} rounded-md shadow-lg py-1`}>
                <div className={`flex flex-col gap-2 px-4 py-2 text-sm ${dark ? "text-white" : "text-gray-700"}`}>
                  <Link
                    className={`${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"} px-2 py-1 rounded`}
                    to="/artist-panel/edit-artistprofile"
                    onClick={() => setIsToggelOpen(false)}
                  >
                    {t("Profile")}
                  </Link>

                  <Link
                    className={`${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"} px-2 py-1 rounded`}
                    to="/artist-panel/settings"
                    onClick={() => setIsToggelOpen(false)}
                  >
                    {t("User Settings")}
                  </Link>

                  <span className={`${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"} px-2 py-1 rounded`} onClick={handleInvitePopUp}>
                    {t("Invite Artist")}
                  </span>

                  <span className={`${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"} px-2 py-1 rounded`} onClick={handleProfile}>
                    {t("Switch To User Profile")}
                  </span>
                  <button
                    className={`bg-[#EE1D52] text-white flex flex-col items-center justify-center gap-1 py-2 rounded hover:bg-[#EE1D52]/80 font-medium`}
                    onClick={handleLogOut}
                  >
                    <span>{t("Sign Out")}</span>
                    <span className="text-[12px]">{user.email}</span>
                  </button>
                </div>
              </div>
            )}
          </span>
        </div>

        {popUp && <ReferralPopup onClose={() => setPopUp(false)} user={user} />}
      </div>
    </div>
  );
};

export default ArtistNavBar;
