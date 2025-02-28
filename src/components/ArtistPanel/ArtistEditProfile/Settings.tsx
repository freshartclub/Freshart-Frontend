import { useTranslation } from "react-i18next";
import Header from "../../ui/Header";
import ArtistTabs from "./ArtistTabs";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="p-3">
      <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
        {t("Artist Setting")}
      </Header>

      <ArtistTabs />
    </div>
  );
};

export default Settings;
