import React, { useState } from "react";
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
      { key: "myArt", label: "My Art", path: "artwork" },
      { key: "addArt", label: "Add Art", path: "artwork/add" },
    ],
  },
  {
    key: "user",
    label: "User",
    icon: user,
    path: "edit-artistprofile",
    submenu: [
      { key: "profile", label: "Profile", path: "edit-artistprofile" },
      { key: "settings", label: "Settings", path: "user/settings" },
    ],
  },
  {
    key: "order",
    label: "Order",
    icon: order,
    path: "order",
    submenu: [
      { key: "current", label: "Current Orders", path: "order" },
      { key: "history", label: "Order History", path: "order/history" },
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
    submenu: [{ key: "ticket", label: "Raise Ticket", path: "ticket" }],
  },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmenuToggle = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <div className={`flex transition-width duration-300 relative`}>
      <div
        className={`${
          isOpen ? "w-64" : "w-14"
        } transition-all duration-300 h-screen flex flex-col bg-white`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-0 -right-5 bg-white shadow-lg px-4 py-3.5 rounded-full transform transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
        >
          <img src={toggle} alt="Toggle Arrow" />
        </button>

        <ul className="space-y-2 mt-4">
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
