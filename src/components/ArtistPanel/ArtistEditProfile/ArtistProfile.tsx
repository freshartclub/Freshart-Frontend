import { useEffect, useState } from "react";
import Header from "../../ui/Header";
import dot from "./assets/dot.png";
import GeneralUpload from "./GeneralUpload";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import Loader from "../../ui/Loader";
import { useDispatch } from "react-redux";

const ArtistProfile = () => {
  const { data, isLoading } = useGetArtistDetails();

  const [isActiveStatus, setIsActiveStatus] = useState("");

  useEffect(() => {
    if (data?.data?.artist?.isActivated !== undefined) {
      setIsActiveStatus(data?.data?.artist?.profileStatus);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-10  ">
      <Header
        variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
        className="mt-6 flex gap-2 items-center"
      >
        Artist Profile
      </Header>

      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center mx-2 text-sm font-medium text-gray-700 "
            >
              Artist
            </a>
          </li>
          <img src={dot} alt="dot" />
          <li>
            <div className="flex items-center">
              <a href="#" className=" text-sm mx-2 font-medium text-[#919EAB]">
                Profile
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
