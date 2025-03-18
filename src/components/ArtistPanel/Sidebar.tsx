import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useClickOutside from "../utils/useClickOutside";
import circle from "./assets/bar.png";
import dashboard from "./assets/dashboard.png";
import artwork from "./assets/HANGER.png";
import mail from "./assets/mail.png";
import order from "./assets/SHOPPING.png";
import logo from "../../assets/loginlogo.png";
import invoice from "./assets/sign.png";
import toggle from "./assets/toggle_arrow.png";
import arrow from "./assets/turn-right.png";
import user from "./assets/user.png";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";

const sections = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    path: "artdashboard",
    submenu: [
      { key: "overview", label: "OverView", path: "artdashboard" },
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
    ],
  },
  {
    key: "order",
    label: "Order",
    icon: order,
    path: "order",
    submenu: [{ key: "current", label: "Current Orders", path: "order" }, 
      { key: "Custom", label: "Custom Orders", path: "order/custom" }
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
    submenu: [{ key: "circle", label: "Circle List", path: "circle" }],
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

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsOpen, isOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const closePopup = useRef(null);
  const [smallWidth, setSmallWidth] = useState(false);
  const { t } = useTranslation();

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
  }, [setIsOpen, setSidebarOpen]);

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
      className={`flex transition-all h-[95vh] max-h-[95vh] scrollbar overflow-y-auto overflow-x-hidden duration-300 fixed top-[5rem] left-0 z-50 ${
        smallWidth
          ? sidebarOpen
            ? "fixed left-[0] w-64 !max-h-[100vh] !h-[100vh] !top-0 z-[100]"
            : "left-[-20rem] !max-h-[100vh] !h-[100vh] !top-0 z-[100]"
          : isOpen
          ? "w-64"
          : "w-14"
      } h-screen bg-white shadow-md`}
    >
      <div ref={closePopup} className="flex flex-col w-full">
        <button
          onClick={toggleSidebar}
          className={`absolute z-10 top-6 invisible sm:visible right-0 bg-white shadow-lg px-4 py-3.5 rounded-full transform transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
        >
          <img src={toggle} alt="Toggle Arrow" />
        </button>

        <div className="w-full sm:hidden py-6 pb-[1.6rem] shadow-md px-5 flex border-b items-center gap-5 relative justify-between">
          <GiHamburgerMenu
            className="cursor-pointer"
            size="2em"
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
          <img
            // onClick={handleRedirect}
            className="w-[8rem]  lg:block left-[20%] top-[50%] lg:w-full object-cover"
            src={logo}
            alt="Logo"
          />
        </div>

        <ul className="flex flex-col gap-2">
          {sections.map((section) => (
            <li key={section.key} className="relative sidebar-li">
              <Link to={`/artist-panel/${section.path}`}>
                <button
                  onClick={() => handleSubmenuToggle(section.key)}
                  className={`w-full text-left flex items-center space-x-4 p-4 hover:bg-gray-100 ${
                    location.pathname.includes(section.path)
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  <img src={section.icon} alt={section.label} className="w-6" />
                  {(isOpen || smallWidth) && <span>{t(section.label)}</span>}
                </button>
              </Link>
              {section.submenu &&
                openSubmenu === section.key &&
                (isOpen || smallWidth) && (
                  <ul className="ml-6 space-y-2">
                    {section.submenu.map((sub) => (
                      <li key={sub.key}>
                        <Link to={`/artist-panel/${sub.path}`}>
                          <button
                            className={`text-left flex items-center space-x-2 p-2 hover:bg-gray-100 ${
                              location.pathname === `/artist-panel/${sub.path}`
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            <img
                              src={arrow}
                              alt="Submenu Arrow"
                              className="w-4"
                            />
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
