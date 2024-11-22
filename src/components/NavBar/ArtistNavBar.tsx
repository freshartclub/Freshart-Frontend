import React, { useState } from "react";
import logo from "../../assets/loginlogo.png";
import { IoMdSearch } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { artistPanel } from "../utils/paths";
import BackButton from "../ui/BackButton";
import { useAppDispatch, useAppSelector } from "../../store/typedReduxHooks";
import useLogOutMuttion from "../../http/auth/useLogOutMutation";
import useLogOutMutation from "../../http/auth/useLogOutMutation";
import { setIsArtist } from "../../store/userSlice/userSlice";

const ArtistNavBar = () => {
  const [isToogleOpen, setIsToggelOpen] = useState(false);
  const [isSearchBar, setIsSeachBar] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  const profile = localStorage.getItem("profile");
  const authToken = localStorage.getItem("auth_token");

  const { mutate: logOut } = useLogOutMutation();

  const url = "https://dev.freshartclub.com/images";

  console.log(`${url}/${user.profile.mainImage}`);

  const handleLogOut = () => {
    try {
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = () => {
    navigate("/home", { replace: true });
    // dispatch(setIsArtist(false));
    localStorage.setItem("profile", "user");
  };

  return (
    <div className="w-full  py-5 px-5 flex items-center gap-5 relative">
      <div className="overflow-hidden">
        <img src={logo} alt="" />
      </div>
      <div className="w-full flex  items-center gap-5 justify-between ">
        <div>
          {/* <h1 className="font-bold px-2 bg-red-200 py-2 rounded ">
            {user?.artistName}
          </h1> */}
        </div>
        <div className="flex items-center gap-8 ">
          <div className=" hidden lg:block">
            <div className="flex items-center gap-2">
              <input
                placeholder="Searsasach"
                className="rounded outline-none  px-2 py-1 border border-zinc-800"
                type="text"
              />
              <IoMdSearch className="cursor-pointer" size="2em" />
            </div>
          </div>

          <h1 className="hidden lg:block">Language</h1>
          <IoNotifications
            className="cursor-pointer hidden lg:block"
            size="2em"
          />
          <span
            onClick={() => setIsToggelOpen(!isToogleOpen)}
            className="w-12 h-12 rounded-full  flex items-center justify-center cursor-pointer"
          >
            <img
              src={`${url}/users/${user.profile.mainImage}`}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </span>
        </div>
      </div>

      {isToogleOpen && (
        <div className="absolute z-10 top-20 right-5 flex flex-col  gap-4 text-sm bg-white border rounded-lg shadow-md py-5 px-5">
          <Link
            className="font-medium hover:bg-zinc-200 transition-all duration-200"
            to={artistPanel.artistEditProfile}
            onClick={() => setIsToggelOpen(!isToogleOpen)}
          >
            Profile
          </Link>
          <button
            className="font-medium hover:bg-zinc-200 "
            onClick={handleProfile}
          >
            Switch To User Profile
          </button>
          <button
            className="bg-red-300 py-2 rounded hover:bg-red-400 font-medium"
            onClick={handleLogOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtistNavBar;
