import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/loginlogo.png";
import { useAppSelector } from "../../store/typedReduxHooks";
import useClickOutside from "../utils/useClickOutside";
import circle from "./assets/bar.png";
import dashboard from "./assets/dashboard.png";
import artwork from "./assets/HANGER.png";
import mail from "./assets/mail.png";
import order from "./assets/SHOPPING.png";
import invoice from "./assets/sign.png";
import user from "./assets/user.png";
import { FaLongArrowAltRight } from "react-icons/fa";

const sections = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    path: "",
    // submenu: [
    //   { key: "overview", label: "Overview", path: "artdashboard" },
    //   { key: "analytics", label: "Analytics", path: "artdashboard/analytics" },
    // ],
  },
  {
    key: "artwork",
    label: "Artwork",
    icon: artwork,
    path: "artwork",
    submenu: [
      { key: "myArt", label: "My Artwork", path: "artwork" },
      { key: "addArt", label: "Add Artwork", path: "artwork/add" },
    ],
  },
  {
    key: "user",
    label: "Artist",
    icon: user,
    path: "profile",
    submenu: [{ key: "profile", label: "Artist Profile", path: "profile" }],
  },
  // {
  //   key: "order",
  //   label: "Order",
  //   icon: order,
  //   path: "order/purchase",
  //   submenu: [
  //     { key: "purchase", label: "Purchase Orders", path: "order/purchase" },
  //     { key: "subscription", label: "Subscription Orders", path: "order/subscription" },

  //     { key: "custom", label: "Custom Orders", path: "order/custom" },
  //   ],
  // },
  // {
  //   key: "offers",
  //   label: "Offers Request",
  //   icon: invoice,
  //   path: "offer",
  // },
  // {
  //   key: "circle",
  //   label: "Circle",
  //   icon: circle,
  //   path: "circle",
  //   submenu: [{ key: "circle", label: "Circle List", path: "circle" }],
  // },
  // {
  //   key: "mail",
  //   label: "Mail",
  //   icon: mail,
  //   path: "mail",
  // },
  {
    key: "help",
    label: "Help & Support",
    icon: mail,
    path: "ticket",
    submenu: [
      { key: "ticket", label: "Raise Ticket", path: "ticket" },
      { key: "ticketList", label: "Ticket List", path: "ticket/all" },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsOpen, isOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const closePopup = useRef(null);
  const [smallWidth, setSmallWidth] = useState(false);
  const { t } = useTranslation();
  const dark = useAppSelector((state) => state.theme.mode);
  const sideBarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsOpen(false);
        setSmallWidth(true);
        setSidebarOpen(false);
      } else {
        setIsOpen(true);
        setSmallWidth(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen, setSidebarOpen, smallWidth]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(sideBarRef, () => {
    setSidebarOpen(false);
  });

  const handleSubmenuToggle = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <div
      ref={sideBarRef}
      className={`flex scrollbar transition-all lg:h-[88vh] max-h-[88vh] 2xl:h-[92vh] 2xl:max-h-[92vh] overflow-auto duration-300 fixed top-[4.8rem] left-0 z-50 ${
        smallWidth
          ? sidebarOpen
            ? "fixed left-[0] w-72 !max-h-[100vh] !h-[100vh] !top-0 z-[100]"
            : "left-[-20rem] !max-h-[100vh] !h-[100vh] !top-0 z-[100]"
          : isOpen
          ? "w-72"
          : "w-14"
      } h-screen ${dark ? "bg-gray-800" : "bg-white"} shadow-md`}
    >
      <div ref={closePopup} className="flex flex-col w-full">
        <button
          onClick={toggleSidebar}
          className={`absolute z-10 border top-6 invisible sm:visible right-0 ${
            dark ? "bg-gray-700 border-gray-600" : "bg-gray-50"
          } shadow-lg px-2 py-2 rounded-full transform transition-transform ${isOpen ? "" : "rotate-180"}`}
        >
          <FiChevronLeft size={20} className={`${dark ? "text-white" : "text-gray-800"}`} />
        </button>

        <div
          className={`w-full sm:hidden py-6 px-4 flex border-b items-center gap-5 relative justify-between ${
            dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
          }`}
        >
          <GiHamburgerMenu
            className={`cursor-pointer ${dark ? "text-white" : "text-gray-800"}`}
            size="2em"
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
          <img className="w-[8rem] lg:block left-[20%] top-[50%] lg:w-full object-cover" src={logo} alt="Logo" />
        </div>

        <ul className="flex flex-col gap-1 lg:pb-[1.5rem] p-2">
          {sections.map((section) => (
            <li key={section.key} className="relative">
              <Link to={`/artist-panel/${section.path}`}>
                <button
                  onClick={() => handleSubmenuToggle(section.key)}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors ${
                    location.pathname.includes(section.path) && !section.submenu
                      ? dark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-900"
                      : dark
                      ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                      : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={section.icon} alt={section.label} className={`w-5 h-5`} />
                    {(isOpen || smallWidth) && <span className="font-medium">{t(section.label)}</span>}
                  </div>
                  {section.submenu && (isOpen || smallWidth) && (
                    <span>{openSubmenu === section.key ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}</span>
                  )}
                </button>
              </Link>

              {section.submenu && openSubmenu === section.key && (isOpen || smallWidth) && (
                <ul className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
                  {section.submenu.map((sub) => (
                    <li key={sub.key}>
                      <Link to={`/artist-panel/${sub.path}`}>
                        <button
                          className={`w-full text-left flex items-center space-x-2 p-2 pl-3 rounded-lg transition-colors ${
                            location.pathname === `/artist-panel/${sub.path}`
                              ? dark
                                ? "bg-gray-700 text-white font-medium"
                                : "bg-gray-100 text-gray-900 font-medium"
                              : dark
                              ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                              : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <FaLongArrowAltRight />
                          <span>{t(sub.label)}</span>
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
