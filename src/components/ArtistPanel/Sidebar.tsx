import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dashboard from "./assets/dashboard.png";
import artwork from "./assets/HANGER.png";
import user from "./assets/user.png";
import order from "./assets/SHOPPING.png";
import invoice from "./assets/sign.png";
import circle from "./assets/bar.png";
import mail from "./assets/mail.png";
import toggle from "./assets/toggle_arrow.png";
import arrow from "./assets/turn-right.png";
import logo from "../../assets/loginlogo.png";
import useClickOutside from "../utils/useClickOutside";
export const sections = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    path: "artdashboard",
    submenu: [
      { key: "overview", label: "Overview", path: "artdashboard" },
      { key: "analytics", label: "Analytics", path: "artdashboard/analytics" },
    ],
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
    path: "edit-artistprofile",
    submenu: [
      { key: "profile", label: "Artist Profile", path: "edit-artistprofile" },
      // { key: "settings", label: "User Settings", path: "user/settings" },
    ],
  },
  {
    key: "order",
    label: "Order",
    icon: order,
    path: "order",
    submenu: [
      { key: "current", label: "Current Orders", path: "order" },
      // { key: "history", label: "Order History", path: "order/approve-order" },
    ],
  },
  {
    key: "invoice",
    label: "Invoice",
    icon: invoice,
    path: "invoice",
  },
  {
    key: "circle",
    label: "Circle",
    icon: circle,
    path: "circle",
  },
  {
    key: "mail",
    label: "Mail",
    icon: mail,
    path: "mail",
  },
  {
    key: "help",
    label: "Help & Support",
    icon: mail,
    path: "ticket",
    submenu: [
      { key: "ticket", label: "Raise Ticket", path: "ticket" },
      { key: "ticketList", label: "Ticket List", path: "ticket/tickets" },
    ],
  },
];

const Sidebar: React.FC = ({
  sidebarOpen,
  setSidebarOpen,
  setIsOpen,
  isOpen,
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const closePopup = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsOpen(true);
      }
    };

    const handleNormal = () => {
      if (window.innerWidth > 640) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    handleNormal();

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleNormal);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleNormal);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(closePopup, () => {
    console.log("clickOutside");
    setSidebarOpen(false);
  });

  const handleSubmenuToggle = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <div
      className={`flex transition-width duration-300 relative md:w-14  ${
        isOpen
          ? "lg:fixed lg:w-64 xl:fixed xl:w-64 md:fixed md:w-64 "
          : "lg:fixed lg:w-14 xl:fixed xl:w-14 md:fixed md:w-14"
      }  `}
    >
      <div
        // ref={closePopup}
        className={`${isOpen ? "w-64" : "w-14"} ${
          sidebarOpen ? "left-[-20rem]" : "left-0"
        } transition-all duration-300 h-screen absolute sm:relative md:relative lg:relative z-[50] flex flex-col bg-white`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-0 invisible sm:visible lg:visible md:visible -right-5 bg-white shadow-lg px-4 py-3.5 rounded-full transform transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
        >
          <img src={toggle} alt="Toggle Arrow" />
        </button>

        <ul className="space-y-2 mt-4">
          {/* <img src={logo} alt="logo" className="px-4" /> */}
          {sections.map((section) => (
            <li key={section.key}>
              <Link to={`/artist-panel/${section.path}`}>
                <button
                  onClick={() => handleSubmenuToggle(section.key)}
                  className={`w-full text-left flex items-center space-x-4 p-4 hover:bg-gray-100 ${
                    location.pathname.includes(section.path)
                      ? "bg-[#919EAB14 font-bold"
                      : ""
                  }`}
                >
                  <img src={section.icon} alt={section.label} className="w-6" />
                  {isOpen && <span className="flex-grow">{section.label}</span>}
                </button>
              </Link>

              {section.submenu && openSubmenu === section.key && isOpen && (
                <ul className="ml-10 space-y-1">
                  {section.submenu && (
                    <img
                      src={arrow}
                      alt="Arrow"
                      className={`w-4 h-4  ${
                        openSubmenu === section.key ? "rotate-0" : ""
                      }`}
                    />
                  )}
                  {section.submenu.map((sub) => (
                    <div className="">
                      <li key={sub.key} className="ml-4 ">
                        <Link to={`/artist-panel/${sub.path}`}>
                          <button
                            className={`text-left flex space-x-4 p-3 hover:bg-gray-100 ${
                              location.pathname === `/artist-panel/${sub.path}`
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            <span>{sub.label}</span>
                          </button>
                        </Link>
                      </li>
                    </div>
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
