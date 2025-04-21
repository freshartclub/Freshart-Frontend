import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../ui/Header";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import dot from "./assets/dot.png";
import GeneralUpload from "./GeneralUpload";
import { useAppSelector } from "../../../store/typedReduxHooks";

const ArtistProfile = () => {
  const { data, isLoading } = useGetArtistDetails();
  const [isActiveStatus, setIsActiveStatus] = useState("");
  const dark = useAppSelector((state) => state.theme.mode);

  const { t } = useTranslation();

  useEffect(() => {
    if (data?.data?.artist?.isActivated !== undefined) {
      setIsActiveStatus(data?.data?.artist?.profileStatus);
    }
  }, [data]);

  return (
    <div className={`${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="p-4">
        <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}> {t("Artist Profile")}</h1>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>{t("View/Update your artist profile")}</p>
      </div>

      <GeneralUpload isActiveStatus={isActiveStatus} isLoading={isLoading} />
    </div>
  );
};

export default ArtistProfile;
