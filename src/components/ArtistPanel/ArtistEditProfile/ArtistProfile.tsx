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
    <div className="bg-white p-10  ">
      <Header
        variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
        className="mt-6 flex gap-2 items-center"
      >
        {t("Artist Profile")}
      </Header>

      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center mx-2 text-sm font-medium text-gray-700 "
            >
              {t("Artist")}
            </a>
          </li>
          <img src={dot} alt="dot" />
          <li>
            <div className="flex items-center">
              <a href="#" className=" text-sm mx-2 font-medium text-[#919EAB]">
                {t("Profile")}
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <GeneralUpload isActiveStatus={isActiveStatus} />
    </div>
  );
};

export default ArtistProfile;
