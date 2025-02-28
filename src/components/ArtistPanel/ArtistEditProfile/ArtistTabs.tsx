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
      <div className="bg-gray-200 mt-6 flex scrollbar gap-4 p-2 border border-gray-300 rounded max-w-full w-full overflow-x-auto font-semibold">
        <P
          variant={{ size: "base", theme: "dark", weight: "semiBold" }}
          onClick={() => setActiveTab("notification")}
          className={`flex items-center gap-2 flex-shrink-0 border-none px-4 py-2 rounded cursor-pointer transition ${
            activeTab === "notification"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <img src={bell} alt="notification" className="h-4 w-4" />
          {t("Notifications")}
        </P>

        <P
          variant={{ size: "base", theme: "dark", weight: "semiBold" }}
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 flex-shrink-0 border-none px-4 py-2 rounded cursor-pointer transition ${
            activeTab === "security"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <img src={security} alt="security" className="h-3 w-4" />
          {t("Security")}
        </P>

        <P
          variant={{ size: "base", theme: "dark", weight: "semiBold" }}
          onClick={() => setActiveTab("language")}
          className={`flex items-center gap-2 flex-shrink-0 border-none px-4 py-2  rounded cursor-pointer transition ${
            activeTab === "language"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <img src={security} alt="language" className="h-3 w-4" />
          {t("Language")}
        </P>
      </div>

      {activeTab === "notification" && <Notification />}
      {activeTab === "security" && <Security />}
      {activeTab === "language" && <Language />}
    </>
  );
};

export default ArtistTabs;
