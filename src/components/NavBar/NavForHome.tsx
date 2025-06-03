import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GoSearch, GoX } from "react-icons/go";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoIosFlower } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import bag from "../../assets/Bag.png";
import heart from "../../assets/Heart.png";
import selling from "../../assets/Images-cuate 1.png";
import useLogOutMutation from "../../http/auth/useLogOutMutation";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import ShoppingCard from "../pages/ShoppingCard";
import { imageUrl } from "../utils/baseUrls";
import useClickOutside from "../utils/useClickOutside";
import { useGetPicklist } from "./http/getPickList";
import logo from "/logofarcwhite.svg";

const NavForHome = () => {
  const isArtist = useAppSelector((state) => state?.user?.isArtist) || null;
  const user = useAppSelector((state) => state?.user?.user);
  const isAuthorized = useAppSelector((state) => state?.user?.isAuthorized);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const closePopup = useRef(null);
  const dropDownPopup = useRef(null);
  const mobileNavPopup = useRef(null);

  const { data: seriesPickList } = useGetPicklist();
  const { data: cartItem } = useGetCartItems();
  const { data: disciplineData } = useGetDiscipline();
  const { mutate: logOut } = useLogOutMutation();

  const selectSeriesPicklist = seriesPickList?.data?.filter((item) => item?.picklistName === "Series");

  useClickOutside(closePopup, () => {
    setIsProfileDropdown(false);
  });

  const handleClickOutside = (event) => {
    if (dropDownPopup.current && !dropDownPopup.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useClickOutside(mobileNavPopup, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfile = () => {
    if (isArtist) {
      navigate("/artist-panel", { replace: true });
      localStorage.setItem("profile", "artist");
      window.location.reload();
    } else {
      navigate("/home", { replace: true });
      localStorage.setItem("profile", "user");
      window.location.reload();
    }
  };

  const redirectToHomepage = () => {
    navigate("/home");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((Modalprev) => !Modalprev);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = (e) => {
    e.stopPropagation();
    setInputValue("");
    setIsFocused(false);
  };

  return (
    <>
      <nav
        className={`z-[9999] ${
          isScrolled ? "bg-[#102030]" : "bg-transparent"
        } hover:bg-[#102030] py-3 px-4 sm:px-6 fixed top-0 left-0 w-full transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {isAuthorized ? (
            <div className="w-full relative flex flex-col gap-2 items-center">
              <div className="w-full flex justify-between items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none lg:hidden" aria-label="Toggle menu">
                  {isOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
                </button>

                <div className="cursor-pointer" onClick={() => navigate("/home")}>
                  <img src={logo} alt="logo" className="w-36 sm:w-40 md:w-48" />
                </div>

                <div className="relative mx-2 hidden lg:block flex-1 max-w-2xl">
                  <input
                    className="w-full bg-white/75 py-2 px-10 focus:px-3 focus:outline-none focus:border-b-2 focus:border-b-[#E19D00] transition-all duration-300 rounded-md"
                    type="text"
                    placeholder="Artwork, Categories, Topic..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  <span className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 ${isFocused ? "right-0 pr-2" : "left-0 pl-2"}`}>
                    {inputValue === "" ? <GoSearch size="1.3em" className="text-gray-600" /> : null}
                  </span>
                </div>

                <div className="flex gap-3 sm:gap-4 justify-end items-center">
                  <Link to="/wishlist" className="focus:outline-none hidden lg:block" aria-label="Wishlist">
                    <img src={heart} alt="heart" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </Link>

                  <button onClick={() => navigate("/circle")} aria-label="Circle" className="hidden sm:block">
                    <IoIosFlower className="cursor-pointer" fontSize="1.8em" color="white" />
                  </button>
                 

                  <ShoppingCard isOpen={isSidebarOpen} onClose={toggleSidebar} />

                  <button onClick={toggleSidebar} className="relative focus:outline-none" aria-label="Shopping cart">
                    <img src={bag} alt="bag" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    {cartItem?.data?.cart?.length > 0 && (
                      <span className="absolute bg-red-500 text-white text-xs w-4 h-4 -right-1 -top-1 rounded-full flex items-center justify-center">
                        {cartItem?.data?.cart?.length}
                      </span>
                    )}
                  </button>

                  <div className="relative" ref={closePopup}>
                    <button className="focus:outline-none" onClick={() => setIsProfileDropdown((prev) => !prev)} aria-label="User profile">
                      {user?.mainImage ? (
                        <img
                          src={`${imageUrl}/users/${user?.mainImage}`}
                          alt="Profile"
                          className="text-white rounded-full object-cover w-7 h-7 sm:w-8 sm:h-8 border border-white"
                        />
                      ) : (
                        <FaUserCircle size="1.8em" color="white" />
                      )}
                    </button>

                    {isProfileDropdown && (
                      <div className="absolute right-0 z-20 top-10 w-56 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1">
                        <div className="flex flex-col gap-2 px-4 py-2 text-sm text-gray-700 dark:text-white">
                          <Link
                            to="/user_profile"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded"
                            onClick={() => setIsProfileDropdown(false)}
                          >
                            View Profile
                          </Link>
                          <Link
                            to="/account_setting"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded"
                            onClick={() => setIsProfileDropdown(false)}
                          >
                            Account Settings
                          </Link>
                          <Link
                            to="/wishlist"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded"
                            onClick={() => setIsProfileDropdown(false)}
                          >
                            Favourites ArtWork
                          </Link>

                          <Link
                            to="/offer-request"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded"
                            onClick={() => setIsProfileDropdown(false)}
                          >
                            Offers Request
                          </Link>

                          {isArtist && (
                            <button className="text-left hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded" onClick={handleProfile}>
                              Switch To Artist Profile
                            </button>
                          )}
                          <Link to="/priceandplans" className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded">
                            Subscription Plan
                          </Link>
                          <Link to="/my_card" className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded">
                            Saved Card
                          </Link>
                          <Link to="/my_plans" className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded">
                            My Plans
                          </Link>
                          <Link to="/create_invite" className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded">
                            Create Invite
                          </Link>
                          <Link
                            to="/order"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded"
                            onClick={() => setIsProfileDropdown(false)}
                          >
                            My Orders
                          </Link>
                          <Link
                            to="/support"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded"
                            onClick={() => setIsProfileDropdown(false)}
                          >
                            Support
                          </Link>
                        </div>
                        <div className="border-t border-gray-100 px-4 pb-2 pt-3">
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setIsProfileDropdown(false);
                            }}
                            className="w-full text-center bg-[#EE1D52] text-white hover:bg-red-50 hover:text-[#EE1D52] px-2 py-2.5 rounded text-sm font-medium"
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex gap-6 text-white pt-2">
                <Link to="/home" className="font-medium text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300 pb-1">
                  Home
                </Link>
                <div className="cursor-pointer" ref={dropDownPopup}>
                  <div
                    className="font-medium text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300 pb-1 flex items-center gap-1"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    Subscribe
                    <svg
                      className={`w-3 h-3 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </div>
                  {isDropdownOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute left-0 z-10 top-24 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm bg-white border shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    >
                      <div className="space-y-4">
                        <h3 className="uppercase font-bold dark:text-gray-400 text-gray-800">Discipline</h3>
                        <ul className="space-y-3">
                          {disciplineData?.data?.map((item, i) => (
                            <li key={i} onClick={() => setIsDropdownOpen(false)}>
                              <Link to={`${item.disciplineName}?option=subscription`} className="dark:text-white text-gray-600 ">
                                {item?.disciplineName}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="uppercase font-bold dark:text-gray-400 text-gray-800">Series</h3>
                        <ul className="space-y-3">
                          {seriesPickListLoading ? (
                            <span>Loading....</span>
                          ) : (
                            selectSeriesPicklist?.[0]?.picklist?.map((item, i) => (
                              <li key={i} onClick={() => setIsDropdownOpen(false)}>
                                <span className="dark:text-white text-gray-600 cursor-pointer">{item?.name}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="uppercase font-bold dark:text-gray-400 text-gray-800">Collection</h3>
                        <ul className="space-y-3">
                          <li onClick={() => setIsDropdownOpen(false)}>
                            <span className="text-gray-600 dark:text-white cursor-pointer">Collection</span>
                          </li>
                        </ul>
                      </div>

                      <div className="md:col-span-1">
                        <h3 className="uppercase font-bold dark:text-gray-400 text-gray-800 text-sm mb-3">Top selling product</h3>
                        <img src={selling} alt="selling product" className="rounded-lg shadow" />
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/all-artworks?type=purchase"
                  className="font-medium text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300 pb-1"
                >
                  Purchase
                </Link>
                <Link
                  to="/all_artist"
                  className="font-medium text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300 pb-1"
                >
                  Artist
                </Link>
                <Link
                  to="/priceandplans"
                  className="font-medium text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300 pb-1"
                >
                  Subscription Plan
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="cursor-pointer" onClick={redirectToHomepage}>
                <img src={logo} alt="logo" className="w-36 sm:w-40 md:w-48" />
              </div>

              <div className="flex gap-3 sm:gap-4 items-center">
                <ShoppingCard isOpen={isSidebarOpen} onClose={toggleSidebar} />

                <button onClick={toggleSidebar} className="relative focus:outline-none" aria-label="Shopping cart">
                  <img src={bag} alt="bag" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  {cartItem?.data?.cart?.length > 0 && (
                    <span className="absolute bg-red-500 text-white text-xs w-4 h-4 -right-1 -top-1 rounded-full flex items-center justify-center">
                      {cartItem?.data?.cart?.length}
                    </span>
                  )}
                </button>

                <Link
                  to="/login"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-white rounded-md hover:bg-gray-200 focus:outline-none transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/signup" className="text-sm text-white hover:text-gray-200 transition-colors">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>

        {isOpen && (
          <div ref={mobileNavPopup} className="absolute lg:hidden top-full left-0 right-0 z-20 bg-[#102030] text-white px-6 py-4 shadow-lg">
            <div className="relative mb-4">
              <input
                className="w-full bg-white/90 py-2 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E19D00]"
                type="text"
                placeholder="Search artworks..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                {inputValue === "" ? (
                  <GoSearch size="1.3em" className="text-gray-600" />
                ) : (
                  <GoX size="1.3em" className="cursor-pointer text-gray-600" onClick={clearInput} />
                )}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <Link to="/home" className="font-medium py-2 border-b border-white/20" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/all-artworks?type=subscription" className="font-medium py-2 border-b border-white/20" onClick={() => setIsOpen(false)}>
                Subscribe
              </Link>
              <Link to="/all-artworks?type=purchase" className="font-medium py-2 border-b border-white/20" onClick={() => setIsOpen(false)}>
                Purchase
              </Link>
              <Link to="/all_artist" className="font-medium py-2 border-b border-white/20" onClick={() => setIsOpen(false)}>
                Artist
              </Link>
              <Link to="/priceandplans" className="font-medium py-2 border-b border-white/20" onClick={() => setIsOpen(false)}>
                Subscription Plan
              </Link>
              <Link to="/my_card" className="font-medium py-2 border-b border-white/20" onClick={() => setIsOpen(false)}>
                Saved Card
              </Link>
              <Link to="/circle" className="font-medium py-2 border-b border-white/20 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <IoIosFlower size={20} />
                Circle
              </Link>
              <Link to="/wishlist" className="font-medium py-2 border-b border-white/20 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <img src={heart} alt="heart" className="w-5 h-5" />
                Wishlist
              </Link>
            </div>
          </div>
        )}
      </nav>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 dark:bg-gray-700">
            <button
              type="button"
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <HiOutlineX size={24} />
            </button>
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-[#EE1D52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">Are you sure you want to logout?</h3>
              <p className="text-gray-500 mb-6 dark:text-gray-400">You'll need to sign in again to access your account.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium dark:text-white text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button onClick={() => logOut()} className="px-4 py-2 bg-[#FF536B] rounded-md text-sm font-medium text-white hover:bg-[#ee1d51c2]">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavForHome;
