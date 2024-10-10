import { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo01 1.png";
import call from "../../assets/PhoneCall 1.png";
import down from "../../assets/downarrow.png";
import us_flag from "../../assets/Clip path group.png";
import search from "../../assets/Search.png";
import heart from "../../assets/Heart.png";
import bag from "../../assets/Bag.png";
// import profile from "../../assets/Avatar.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import P from "../ui/P";
import Header from "../ui/Header";
import selling from "../../assets/Images-cuate 1.png";
import ShoppingCard from "../pages/ShoppingCard";
import Button from "../ui/Button";
import profile1 from "../../assets/profile_image.png";

const categories = [
  {
    title: "Category 1",
    products: ["Products 01", "Products 02", "Products 03"],
  },
  {
    title: "Category 2",
    products: [
      "Product 01",
      "Product 02",
      "Product 03",
      "Product 04",
      "Product 05",
    ],
  },
  {
    title: "Category 3",
    products: ["Product 01", "Product 02", "Product 03"],
  },
  {
    title: "Category 4",
    products: ["Product 01", "Product 02"],
  },
];

const profile_data = [
  { to: "/user_profile", label: "View Profile" },
  { to: "/account_setting", label: "Account Settings" },
  { to: "/wishlist", label: "Favourites Artworks" },
  { to: "/", label: "Switch to artist Account" },
  { to: "/create_invite", label: "Create Invite" },
  { to: "/order", label: "My Orders" },
  { to: "/support", label: "Support" },
];

const mobile_links = [
  { path: "/", label: "Home" },
  { path: "/", label: "Subscribe" },
  { path: "/purchase", label: "Purchase" },
  { path: "/all_artist", label: "Artist" },
  { path: "/blog", label: "Blog" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedUserName) setUserName(storedUserName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const token = localStorage.getItem("auth_token");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const redirectToHomepage = () => {
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleProfile = () => {
    setIsProfileDropdown((prevStateForProfile) => !prevStateForProfile);
  };

  const toggleModal = () => {
    setIsModalOpen((Modalprev) => !Modalprev);
  };
  const redirectModalToHomepage = () => {
    setIsModalOpen((Modalprev) => !Modalprev);
    localStorage.removeItem("auth_token");
    // localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto lg:px-6 px-3 flex flex-col lg:flex-row justify-between items-center py-2">
          <div className="flex items-center mb-2 lg:mb-0">
            <img src={call} alt="call icon" className="mr-2" />
            <P
              variant={{ size: "base", weight: "medium", theme: "dark" }}
              className=" text-[#102030]"
            >
              (219) 555-0114
            </P>
          </div>
          <div className="text-center mb-2 lg:mb-0">
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
              Free shipping over $55 • Happiness guarantee • Delivery in 3-6
              business days
            </P>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center mx-3">
              <img src={us_flag} alt="US flag" className="mr-1" />
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="text-sm"
              >
                Eng
              </P>
              <img src={down} alt="arrow" className="ml-2" />
            </div>
            <div className="flex items-center mx-3">
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="text-sm"
              >
                USD
              </P>
              <img src={down} alt="arrow" className="ml-2" />
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-[#102030] py-8 px-28 ">
        <div className="container sm:px-6  flex justify-between">
          <div className="hidden  lg:flex xl:space-x-6 lg:space-x-0 text-white ">
            <Link
              to="/"
              className="group mt-3 font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
            >
              <div className="relative inline-block px-2">
                Home
                <div className="absolute left-0 top-6 transform -translate-y-1/2 h-3 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
                <div className="absolute right-0 -bottom-2 h-3.5 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
              </div>
            </Link>
            <Link
              to="#"
              className="group mt-3 font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
              id="mega-menu-dropdown-button"
              onClick={toggleDropdown}
            >
              <div className="relative flex px-2">
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
                <div className="absolute left-0 top-6 transform -translate-y-1/2 h-3 w-0.5 bg-[#E19D00] hidden group-hover:block "></div>
                <div className="absolute right-0 -bottom-2 h-3.5 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
              </div>

              {isDropdownOpen && (
                <div
                  id="mega-menu-dropdown"
                  className="absolute z-10 top-[9rem] grid grid-cols-[1fr_1fr_1fr_1fr_4fr] gap-4 text-sm bg-white border rounded-lg shadow-md p-8"
                >
                  {categories.map((category, index) => (
                    <div key={index} className="text-gray-900 md:pb-4">
                      <ul
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <li>
                          <a href="#" className="uppercase font-bold">
                            {category.title}
                          </a>
                        </li>
                        {category.products.map((product, prodIndex) => (
                          <li key={prodIndex}>
                            <a
                              href="#"
                              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                            >
                              {product}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div>
                    <Header
                      variant={{
                        theme: "dark",
                        weight: "bold",
                      }}
                      className="uppercase text-sm"
                    >
                      Top selling product
                    </Header>
                    <img src={selling} alt="selling product" />
                  </div>
                </div>
              )}
            </Link>

            <Link
              to="/purchase"
              className="group mt-3 font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
            >
              <div className="relative inline-block px-2">
                Purchase
                <div className="absolute left-0 top-6 transform -translate-y-1/2 h-3 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
                <div className="absolute right-0 -bottom-2 h-3.5 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
              </div>
            </Link>
            <Link
              to="/all_artist"
              className="group mt-3 font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
            >
              <div className="relative inline-block px-2">
                Artist
                <div className="absolute left-0 top-6 transform -translate-y-1/2 h-3 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
                <div className="absolute right-0 -bottom-2 h-3.5 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
              </div>
            </Link>
            <Link
              to="/blog"
              className="group mt-3 font-semibold text-white border-b-2 border-transparent hover:border-[#E19D00] transition duration-300"
            >
              <div className="relative inline-block px-2">
                Blog
                <div className="absolute left-0 top-6 transform -translate-y-1/2 h-3 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
                <div className="absolute right-0 -bottom-2 h-3.5 w-0.5 bg-[#E19D00] hidden group-hover:block"></div>
              </div>
            </Link>
          </div>

          <div
            className="flex items-center justify-center "
            onClick={redirectToHomepage}
          >
            <img src={logo} alt="logo" className="" />
          </div>

          {token ? (
            <>
              <div className="lg:flex hidden space-x-4  justify-end mt-3">
                <Link to="/" className="focus:outline-none">
                  <img
                    src={search}
                    alt="search"
                    className="w-8 h-8 text-white mx-2"
                  />
                </Link>
                <Link to="/wishlist" className="focus:outline-none">
                  <img
                    src={heart}
                    alt="heart"
                    className="w-8 h-8 text-white mx-2"
                  />
                </Link>

                <ShoppingCard isOpen={isSidebarOpen} onClose={toggleSidebar} />
                <button onClick={toggleSidebar} className="focus:outline-none">
                  <img
                    src={bag}
                    alt="bag"
                    className="w-8 h-8 text-white mx-2"
                  />
                </button>
                <button className="focus:outline-none">
                  <img
                    src={profile1}
                    alt="profile"
                    onClick={toggleProfile}
                    id="dropdownInformationButton"
                    data-dropdown-toggle="dropdownInformation"
                    className=" text-white mx-2"
                  />
                </button>

                {isProfileDropdown && (
                  <>
                    <div
                      id="dropdownInformation"
                      className="absolute z-10 top-[8rem] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 pb-3"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="flex justify-between gap-3 items-center">
                          <div>
                            <P
                              variant={{
                                size: "base",
                                theme: "dark",
                                weight: "normal",
                              }}
                            >
                              {userName ?? ""}
                            </P>
                            <P
                              variant={{
                                size: "base",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="font-medium truncate"
                            >
                              {email ?? ""}
                            </P>
                          </div>
                        </div>
                      </div>
                      <ul
                        className="text-sm"
                        aria-labelledby="dropdownInformationButton"
                      >
                        {profile_data.map((item, index) => (
                          <Link
                            key={index}
                            to={item.to}
                            className="block px-4 py-2 text-sm"
                            onClick={() => setIsProfileDropdown(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </ul>

                      <div className="">
                        {token ? (
                          <a
                            onClick={toggleModal}
                            className="block px-4 py-2 text-sm cursor-pointer"
                          >
                            Log out
                          </a>
                        ) : (
                          <a
                            onClick={() => navigate("/login")}
                            className="block px-4 py-2 text-sm cursor-pointer"
                          >
                            Login
                          </a>
                        )}

                        {/* Modal */}
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
                                    onClick={redirectModalToHomepage}
                                    type="button"
                                    className="mx-2 bg-red-600 text-white border border-transparent w-40"
                                  >
                                    Yes
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="lg:hidden relative">
                <button
                  onClick={toggleMenu}
                  className="text-white focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
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
              </div>
            </>
          ) : (
            <div className="flex text-white gap-5 items-center">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>SignUp</button>
              <button
                onClick={() => navigate("become_artist")}
                className="w-[10rem] "
              >
                Become An Artist
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-48 left-0 right-0 z-10 bg-[#102030] text-white px-6 pb-4">
            {mobile_links.map((link, index) => (
              <Link to={link.path} className="block py-2" key={index}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
