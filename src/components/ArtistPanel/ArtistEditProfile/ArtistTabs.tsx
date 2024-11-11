import { useState } from "react";
import P from "../../ui/P";
import general from "./assets/general.png";
import bill from "./assets/bill.png";
import bell from "./assets/bell.png";
import share from "./assets/share.png";
import security from "./assets/key.png";
import GeneralUpload from "./GeneralUpload";
import Notification from "./Notification";
import Sociallinks from "./Sociallinks";
import Security from "./Security";
import Language from "./Language";
import Billing from "./Billing";

const ArtistTabs = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <>
      {/* Tabs Container */}
      <div className="my-5 dark:border-gray-700 flex sm:flex-row flex-col items-center ">
        {/* Tab List with Scrollable Feature on Small Screens */}
        <ul
          className="flex -mb-px text-sm font-medium text-center overflow-x-auto scrollbar-hide w-full sm:w-auto"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {/* General Tab */}
          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-2 sm:mx-5 flex-shrink-0"
            role="presentation"
          >
            <button
              className={`pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "general"
                  ? "border-b-2 border-black text-black"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              id="general-tab"
              onClick={() => setActiveTab("general")}
              type="button"
              role="tab"
              aria-controls="general"
              aria-selected={activeTab === "general"}
            >
              <img src={general} alt="general" className="h-4 w-4" />
              General
            </button>
          </P>

          {/* Billing Tab */}
          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-2 sm:mx-5 flex-shrink-0"
            role="presentation"
          >
            <button
              className={`pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "billing"
                  ? "border-b-2 border-black"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("billing")}
              type="button"
              role="tab"
              aria-controls="billing"
              aria-selected={activeTab === "billing"}
            >
              <img src={bill} alt="billing" className="h-4 w-4" />
              Billing
            </button>
          </P>

          {/* Notification Tab */}
          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-2 sm:mx-5 flex-shrink-0"
            role="presentation"
          >
            <button
              className={`pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "notification"
                  ? "border-b-2 border-black"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("notification")}
              type="button"
              role="tab"
              aria-controls="notification"
              aria-selected={activeTab === "notification"}
            >
              <img src={bell} alt="notification" className="h-4 w-4" />
              Notifications
            </button>
          </P>

          {/* Social Links Tab */}
          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-2 sm:mx-5 flex-shrink-0"
            role="presentation"
          >
            <button
              className={`pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "social"
                  ? "border-b-2 border-black"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("social")}
              type="button"
              role="tab"
              aria-controls="social"
              aria-selected={activeTab === "social"}
            >
              <img src={share} alt="social" className="h-4 w-4" />
              Social links
            </button>
          </P>

          {/* Security Tab */}
          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-2 sm:mx-5 flex-shrink-0"
            role="presentation"
          >
            <button
              className={`pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "security"
                  ? "border-b-2 border-black"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("security")}
              type="button"
              role="tab"
              aria-controls="security"
              aria-selected={activeTab === "security"}
            >
              <img src={security} alt="security" className="h-3 w-4" />
              Security
            </button>
          </P>

          {/* Language Tab */}
          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-2 sm:mx-5 flex-shrink-0"
            role="presentation"
          >
            <button
              className={`pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "language"
                  ? "border-b-2 border-black"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("language")}
              type="button"
              role="tab"
              aria-controls="language"
              aria-selected={activeTab === "language"}
            >
              <img src={security} alt="language" className="h-3 w-4" />
              Language
            </button>
          </P>
        </ul>
      </div>

      {/* Tab Content */}
      <div id="default-tab-content">
        {activeTab === "general" && <GeneralUpload />}
        {activeTab === "billing" && <Billing />}
        {activeTab === "notification" && <Notification />}
        {activeTab === "social" && <Sociallinks />}
        {activeTab === "security" && <Security />}
        {activeTab === "language" && <Language />}
      </div>
    </>
  );
};

export default ArtistTabs;
