import { useState } from "react";
import P from "../../ui/P";
import general from "./assets/general.png";
import bill from "./assets/bill.png";
import bell from "./assets/bell.png";
import share from "./assets/share.png";
import security from "./assets/key.png";
import GeneralUpload from "./GeneralUpload";

const ArtistTabs = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <>
      <div className="my-5  dark:border-gray-700 flex sm:flex-row flex-col-reverse items-center">
        <ul
          className="flex -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-5"
            role="presentation"
          >
            <button
              className={` pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "general"
                  ? "border-b-2 border-black text-black "
                  : "hover:text-gray-600 hover:border-gray-300 "
              }`}
              id="highlight-tab"
              onClick={() => setActiveTab("general")}
              data-tabs-target="#general"
              type="button"
              role="tab"
              aria-controls="general"
              aria-selected={activeTab === "highlight"}
            >
              <img src={general} alt="general" />
              General
            </button>
          </P>

          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-5"
            role="presentation"
          >
            <button
              className={` pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "billing"
                  ? "border-b-2 border-black "
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="billing-tab"
              onClick={() => setActiveTab("billing")}
              data-tabs-target="#billing"
              type="button"
              role="tab"
              aria-controls="billing"
              aria-selected={activeTab === "billing"}
            >
              <img src={bill} alt="general" />
              Billing
            </button>
          </P>

          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-5"
            role="presentation"
          >
            <button
              className={` pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "notification"
                  ? "border-b-2 border-black "
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="notification-tab"
              onClick={() => setActiveTab("notification")}
              data-tabs-target="#notification"
              type="button"
              role="tab"
              aria-controls="notification"
              aria-selected={activeTab === "notification"}
            >
              <img src={bell} alt="general" />
              Notifications
            </button>
          </P>

          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-5"
            role="presentation"
          >
            <button
              className={` pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "social"
                  ? "border-b-2 border-black "
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="social-tab"
              onClick={() => setActiveTab("social")}
              data-tabs-target="#social"
              type="button"
              role="tab"
              aria-controls="social"
              aria-selected={activeTab === "social"}
            >
              <img src={share} alt="general" />
              Social links
            </button>
          </P>

          <P
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mx-5"
            role="presentation"
          >
            <button
              className={` pb-2 rounded-t-lg flex items-center gap-1 ${
                activeTab === "security"
                  ? "border-b-2 border-black "
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="security-tab"
              onClick={() => setActiveTab("security")}
              data-tabs-target="#security"
              type="button"
              role="tab"
              aria-controls="security"
              aria-selected={activeTab === "security"}
            >
              <img src={security} alt="general" />
              Security
            </button>
          </P>
        </ul>
      </div>
      <div id="default-tab-content">
        {activeTab === "general" && (
          <>
            <GeneralUpload />
          </>
        )}

        {activeTab === "billing" && (
          <>
            <P variant={{}}>Billing</P>
          </>
        )}

        {activeTab === "notification" && <P variant={{}}>Notification</P>}

        {activeTab === "social" && <P variant={{}}>Social Links</P>}

        {activeTab === "security" && <P variant={{}}>Security</P>}
      </div>
    </>
  );
};

export default ArtistTabs;
