import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/loginlogo.png";
import navigation_1 from "../../assets/navigation_1.png";

import { IoMdSearch } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { artistPanel } from "../utils/paths";
import { useAppDispatch, useAppSelector } from "../../store/typedReduxHooks";
import useLogOutMutation from "../../http/auth/useLogOutMutation";
import { setIsArtist } from "../../store/userSlice/userSlice";
import i18n from "../utils/i18n";
import useClickOutside from "../utils/useClickOutside";

const ArtistNavBar = () => {
  const [isToogleOpen, setIsToggelOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("GB");

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [language, setLanguage] = useState("eng");
  const closePopup = useRef(null);

  const dispatch = useAppDispatch();
  const profile = localStorage.getItem("profile");
  const authToken = localStorage.getItem("auth_token");

  const { mutate: logOut } = useLogOutMutation();

  const countries = [
    { code: "GB", flag: "https://flagcdn.com/w320/gb.png", name: "English" },
    {
      code: "US",
      flag: "https://flagcdn.com/w320/us.png",
      name: "English (US)",
    },
    { code: "ES", flag: "https://flagcdn.com/w320/es.png", name: "Spanish" },
    { code: "CA", flag: "https://flagcdn.com/w320/cat.png", name: "Catalan" },
  ];
  useClickOutside(closePopup, () => {
    setIsToggelOpen(false);
  });

  const url = "https://dev.freshartclub.com/images";

  useEffect(() => {
    i18n.changeLanguage(language.toLocaleLowerCase());
  }, [language]);

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

  return (
    <div className="w-full py-5 px-5 flex items-center gap-5 relative justify-between">
      {/* Logo */}
      <div className="overflow-hidden">
        <img src={logo} alt="Logo" />
      </div>

      {/* Main Navbar */}
      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2">
            <input
              placeholder="Search"
              className="rounded outline-none px-2 py-1 border border-zinc-800 w-20"
              type="text"
            />
            <IoMdSearch className="cursor-pointer" size="1.5em" />
          </div>
        </div>

        {/* Country Selector */}
        <div className="relative inline-block">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsLanguageOpen((prev) => !prev)}
          >
            <img
              src={
                countries.find((country) => country.code === selectedCountry)
                  .flag
              }
              alt={`${selectedCountry} Flag`}
              className="w-6 h-4 rounded"
            />
            <span>
              {
                countries.find((country) => country.code === selectedCountry)
                  .name
              }
            </span>
          </div>

          {isLanguageOpen && (
            <div className="absolute mt-2 bg-white border rounded shadow-md z-10 w-40">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCountry(country.code);
                    setIsLanguageOpen(false);
                    setLanguage(country.name);
                  }}
                >
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-6 h-4 rounded"
                  />
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <IoNotifications
          className="cursor-pointer hidden lg:block"
          size="1.5em"
        />

        {/* User Profile */}
        <span
          onClick={() => setIsToggelOpen(!isToogleOpen)}
          className="rounded-full flex items-center justify-center cursor-pointer border p-1"
        >
          <img
            src={`${url}/users/${user.profile.mainImage}`}
            alt="User Profile"
            className="w-8 h-8 object-cover rounded-full"
          />
          <p className="font-semibold ml-2">{user.artistName}</p>
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
            className="absolute z-10 top-20 right-5 flex flex-col gap-4 text-sm bg-white border rounded-lg shadow-md py-5 px-5"
          >
            <Link
              className="font-medium hover:bg-zinc-200 transition-all duration-200"
              to={artistPanel.artistEditProfile}
              onClick={() => setIsToggelOpen(false)}
            >
              Profile
            </Link>
            <button
              className="font-medium hover:bg-zinc-200"
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
    </div>
  );
};

export default ArtistNavBar;
