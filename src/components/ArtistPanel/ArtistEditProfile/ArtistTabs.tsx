import { useState } from "react";
import P from "../../ui/P";
import bell from "./assets/bell.png";
import security from "./assets/key.png";
import Language from "./Language";
import Notification from "./Notification";
import Security from "./Security";
import { useTranslation } from "react-i18next";

const ArtistTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("notification");

  return (
    <>
      <div className="my-5 dark:border-gray-700 flex sm:flex-row flex-col items-center ">
        <ul
          className="flex -mb-px text-sm font-medium text-center overflow-x-auto scrollbar-hide w-full sm:w-auto"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
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
              {t("Notifications")}
            </button>
          </P>

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
              {t("Security")}
            </button>
          </P>

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
              {t("Language")}
            </button>
          </P>
        </ul>
      </div>

      <div id="default-tab-content">
        {activeTab === "notification" && <Notification />}
        {activeTab === "security" && <Security />}
        {activeTab === "language" && <Language />}
      </div>
    </>
  );
};

export default ArtistTabs;
