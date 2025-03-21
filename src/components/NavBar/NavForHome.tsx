import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GoSearch, GoX } from "react-icons/go";
import { IoIosFlower } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logofarcwhite.svg";
import bag from "../../assets/Bag.png";
import heart from "../../assets/Heart.png";
import selling from "../../assets/Images-cuate 1.png";
import useLogOutMutation from "../../http/auth/useLogOutMutation";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import ShoppingCard from "../pages/ShoppingCard";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
import { imageUrl } from "../utils/baseUrls";
import useClickOutside from "../utils/useClickOutside";
import { useGetPicklist } from "./http/getPickList";

const NavForHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const closePopup = useRef(null);
  const dropDownPopup = useRef(null);
  const mobileNavPopup = useRef(null);

  const { data: seriesPickList, isLoading: seriesPickListLoading } =
    useGetPicklist();
  const { data: cartItem, isLoading: cartLoading } = useGetCartItems();
  const { data: disciplineData } = useGetDiscipline();

  const selectSeriesPicklist = seriesPickList?.data?.filter(
    (item) => item?.picklistName === "Series"
  );

  const { isLoading, refetch } = useGetArtistDetails();

  useEffect(() => {
    refetch();
  }, []);

  const isArtist = useAppSelector((state) => state?.user?.isArtist) || null;
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (isLoading || seriesPickListLoading || cartLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, cartLoading, seriesPickListLoading]);
  const token = localStorage.getItem("auth_token");
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const { mutate: logOut } = useLogOutMutation();

  useClickOutside(closePopup, () => {
    setIsProfileDropdown(false);
    setIsModalOpen(false);
  });

  const handleClickOutside = (event) => {
    if (
      dropDownPopup.current &&
      !dropDownPopup.current.contains(event.target)
    ) {
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
      if (currentScrollY > lastScrollY) {
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
    <nav
      className={`z-[9999] ${
        isScrolled ? "bg-[#102030]" : "bg-transparent"
      } hover:bg-[#102030] pt-4 sm:pb-2 pb-4 px-6 fixed top-0 left-0 w-full transition-all duration-300 ${
        isVisible ? "translate-y-0 " : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        {token && isAuthorized ? (
          <div className="w-full mx-auto flex flex-col gap-2 items-center">
            <div className="w-full mx-auto flex justify-between  items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none sm:hidden"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>

              <div
                className="sm:block hidden"
                onClick={() => navigate("/home")}
              >
                <img src={logo} alt="logo" className="w-[15rem]" />
              </div>

              <div className="relative mx-2 hidden lg:block">
                <input
                  className="w-[45vw] bg-white/75 py-1 px-10 focus:px-3 focus:outline-none focus:border-b-2 focus:border-b-[#102030] transition-all duration-300"
                  type="text"
                  placeholder="Artwork, Categories, Topic..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(true)}
                />

                <span
                  className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isFocused ? "right-0 pr-2" : "left-0 pl-2"
                  }`}
                >
                  {inputValue === "" ? (
                    <GoSearch size="1.3em" />
                  ) : (
                    <GoX
                      size="1.3em"
                      className="cursor-pointer z-20"
                      onClick={clearInput}
                    />
                  )}
                </span>
              </div>

              <div className="flex gap-4 justify-end">
                <Link
                  to="/wishlist"
                  className="focus:outline-none lg:block hidden"
                >
                  <img
                    src={heart}
                    alt="heart"
                    className="w-8 h-8 text-white mx-2 "
                  />
                </Link>

                <IoIosFlower
                  onClick={() => navigate("/circle")}
                  className="cursor-pointer"
                  fontSize="2em"
                  color="white"
                />

                <ShoppingCard isOpen={isSidebarOpen} onClose={toggleSidebar} />

                <button
                  onClick={toggleSidebar}
                  className="relative focus:outline-none"
                >
                  <img
                    src={bag}
                    alt="bag"
                    className="w-8 h-8 text-white mx-2 "
                  />
                  <span className="absolute bg-red-300 w-4 h-4 right-0 top-0  rounded-full flex items-center justify-center">
                    {cartItem ? (
                      <h1 className="text-sm font-semibold">
                        {cartItem?.data?.cart?.length}
                      </h1>
                    ) : null}
                  </span>
                </button>

                <button
                  ref={closePopup}
                  className="focus:outline-none relative"
                >
                  {user?.mainImage ? (
                    <img
                      src={`${imageUrl}/users/${user?.mainImage}`}
                      alt="Profile"
                      onClick={() => setIsProfileDropdown((prev) => !prev)}
                      className=" text-white mx-2 rounded-full object-cover w-8 h-8"
                    />
                  ) : (
                    <FaUserCircle
                      onClick={() => setIsProfileDropdown((prev) => !prev)}
                      size="2em"
                      color="white"
                    />
                  )}

                  {isProfileDropdown && (
                    <div className="absolute w-[13rem] right-0 z-10 top-[4rem] bg-white divide-y divide-gray-100 rounded-md shadow dark:bg-gray-700 dark:divide-gray-600 pb-3">
                      <ul
                        className="text-sm flex flex-col gap-4 p-4"
                        aria-labelledby="dropdownInformationButton"
                      >
                        <Link
                          className="text-left"
                          to="/user_profile"
                          onClick={(prev) => setIsProfileDropdown(!prev)}
                        >
                          View Profile
                        </Link>
                        <Link
                          className="text-left"
                          to="/account_setting"
                          onClick={(prev) => setIsProfileDropdown(!prev)}
                        >
                          Account Settings
                        </Link>
                        <Link
                          className="text-left"
                          to="/wishlist"
                          onClick={(prev) => setIsProfileDropdown(!prev)}
                        >
                          Favourites ArtWork
                        </Link>
                        {isArtist ? (
                          <button className="text-left" onClick={handleProfile}>
                            Switch To Artist Profile
                          </button>
                        ) : null}
                        <Link className="text-left" to="/create_invite">
                          Create Invite
                        </Link>
                        <Link
                          className="text-left"
                          to="/order"
                          onClick={(prev) => setIsProfileDropdown(!prev)}
                        >
                          My Orders
                        </Link>
                        <Link
                          className="text-left"
                          onClick={(prev) => setIsProfileDropdown(!prev)}
                          to="/support"
                        >
                          Support
                        </Link>
                      </ul>

                      <div className="pt-2">
                        <a
                          className="cursor-pointer flex items-center justify-center"
                          onClick={() => setIsModalOpen((prev) => !prev)}
                        >
                          <Button
                            variant={{
                              fontSize: "md",
                              theme: "dark",
                              fontWeight: "400",
                              rounded: "md",
                            }}
                            type="button"
                            className="mx-2 w-full bg-red-600 text-white border border-transparent"
                          >
                            Log Out
                          </Button>
                        </a>

                        {isModalOpen && (
                          <div
                            id="popup-modal"
                            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                          >
                            <div className="relative p-4 w-full max-w-md max-h-full">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                  type="button"
                                  onClick={toggleModal}
                                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                  <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  <Header
                                    variant={{
                                      size: "lg",
                                      theme: "dark",
                                      weight: "semiBold",
                                    }}
                                    className="mb-5"
                                  >
                                    Are you sure you want to logout?
                                  </Header>

                                  <P
                                    variant={{
                                      size: "base",
                                      weight: "medium",
                                    }}
                                    className=" text-[#696868]"
                                  >
                                    Are you sure you want to logout this
                                    account?
                                  </P>
                                  <P
                                    variant={{
                                      size: "base",
                                      weight: "medium",
                                    }}
                                    className="mb-5 text-[#696868]"
                                  >
                                    Click on the right to logout.
                                  </P>
                                  <div className="flex items-center justify-center">
                                    <Button
                                      variant={{
                                        fontSize: "md",
                                        theme: "light",
                                        fontWeight: "500",
                                      }}
                                      onClick={toggleModal}
                                      type="button"
                                      className="mx-2 border border-gray w-40"
                                    >
                                      Cancel
                                    </Button>

                                    <Button
                                      variant={{
                                        fontSize: "md",
                                        theme: "dark",
                                        fontWeight: "400",
                                        rounded: "md",
                                      }}
                                      onClick={() => {
                                        setIsModalOpen((prev) => !prev);
                                        logOut();
                                      }}
                                      type="button"
                                      className="mx-2 bg-red-600 text-white border border-transparent w-40"
                                    >
                                      Yes
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="hidden lg:flex lg:gap-2 xl:space-x-6 lg:space-x-0 text-white">
              <Link
                to="/home"
                className="group  font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
              >
                Home
              </Link>
              <div className="cursor-pointer" ref={dropDownPopup}>
                <span
                  className="group  font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300 flex px-2"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  Subscribe
                  <svg
                    className="w-2.5 h-2.5 ml-1 mt-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                  {isDropdownOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute w-full left-0 z-10 top-[5.6rem] grid grid-cols-[1fr_1fr_1fr_1fr_4fr] gap-4 text-sm bg-white border shadow-md p-8"
                    >
                      <div className="text-gray-900 md:pb-4 flex px-5">
                        <ul className="space-y-4 w-[10vw]">
                          <li className="uppercase font-bold">Discipline</li>

                          {disciplineData && disciplineData?.data?.length > 0
                            ? disciplineData?.data?.map((item, i) => (
                                <li
                                  key={i}
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  <Link
                                    to={`${item.disciplineName}?option=subscription`}
                                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                                  >
                                    {item?.disciplineName}
                                  </Link>
                                </li>
                              ))
                            : null}
                        </ul>

                        <ul
                          className="space-y-4  px-5  w-[10vw] "
                          aria-labelledby="mega-menu-dropdown-button"
                        >
                          <li className="uppercase font-bold">Series</li>

                          {selectSeriesPicklist &&
                            selectSeriesPicklist.length > 0 &&
                            selectSeriesPicklist[0]?.picklist?.map(
                              (item, i) => (
                                <li
                                  key={i}
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  <h1 className=" text-gray-500  dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                    {item?.name}
                                  </h1>
                                </li>
                              )
                            )}
                        </ul>

                        <ul
                          className="space-y-4 mr-6"
                          aria-labelledby="mega-menu-dropdown-button"
                        >
                          <li className="uppercase font-bold">Collection</li>

                          <li onClick={() => setIsDropdownOpen(false)}>
                            <a className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                              Collection
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <Header
                          variant={{
                            theme: "dark",
                            weight: "bold",
                          }}
                          className="uppercase text-sm w-[30vw] "
                        >
                          Top selling product
                        </Header>
                        <img src={selling} alt="selling product " />
                      </div>
                    </div>
                  )}
                </span>
              </div>
              <Link
                to="/all-artworks?type=purchase"
                className="group  font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
              >
                Purchase
              </Link>
              <Link
                to="/all_artist"
                className="group  font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
              >
                Artist
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex items-center justify-center "
              onClick={redirectToHomepage}
            >
              <img src={logo} alt="logo" className="w-[15rem]" />
            </div>

            <div className="flex gap-4 items-center justify-center">
              <div className="overflow-x-hidden">
                <ShoppingCard isOpen={isSidebarOpen} onClose={toggleSidebar} />

                <button
                  onClick={toggleSidebar}
                  className="relative focus:outline-none"
                >
                  <img
                    src={bag}
                    alt="bag"
                    className="w-8 h-8 text-white mx-2"
                  />
                  <span className="absolute bg-red-300 w-4 h-4 right-0 top-0  rounded-full flex items-center justify-center">
                    {cartItem ? (
                      <h1 className="text-sm font-semibold">
                        {cartItem?.data?.cart?.length}
                      </h1>
                    ) : null}
                  </span>
                </button>
              </div>
              <Link
                to="/login"
                className="px-4 py-2 text-sm bg-white rounded-md hover:bg-gray-200 focus:outline-none"
              >
                Sign In
              </Link>
              <Link to="/signup" className="text-sm text-white">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>

      {isOpen ? (
        <div
          ref={mobileNavPopup}
          className="absolute sm:hidden border-t-2 top-16 left-0 right-0 z-10 flex flex-col gap-3 bg-[#102030] text-white px-6 pb-4"
        >
          <Link
            to="/home"
            className="font-semibold w-max pt-3 text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/all-artworks?type=subscription"
            className="font-semibold w-max text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
          >
            Subscribe
          </Link>
          <Link
            to="/all-artworks?type=purchase"
            className="font-semibold w-max text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
          >
            Purchase
          </Link>
          <Link
            to="/all_artist"
            className="font-semibold w-max text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
          >
            Artist
          </Link>
        </div>
      ) : null}
    </nav>
  );
};

export default NavForHome;
