import { useEffect, useState } from "react";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import dot from "./assets/dot.png";
import GeneralUpload from "./GeneralUpload";
import { useTranslation } from "react-i18next";

const ArtistProfile = () => {
  const { data, isLoading } = useGetArtistDetails();
  const [isActiveStatus, setIsActiveStatus] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    if (data?.data?.artist?.isActivated !== undefined) {
      setIsActiveStatus(data?.data?.artist?.profileStatus);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="m-2">
      <Header
        variant={{ theme: "dark", weight: "semiBold" }}
        className="mt-6 ml-2 text-xl flex gap-2 items-center"
      >
        {t("Artist Profile")}
      </Header>

      <ol className="flex mt-2 items-center">
        <li className="mx-2 text-sm font-medium text-gray-70">{t("Artist")}</li>
        <img src={dot} alt="dot" />
        <li className="text-[#919EAB] text-sm mx-2 font-medium">
          {t("Profile")}
        </li>
      </ol>

      <GeneralUpload isActiveStatus={isActiveStatus} />
    </div>
  );
};

export default ArtistProfile;
