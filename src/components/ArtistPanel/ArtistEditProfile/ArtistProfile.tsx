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
        <span
          className={`text-sm ${
            isActiveStatus === "active"
              ? "bg-green-200 "
              : isActiveStatus === "under-review"
              ? "bg-yellow-200"
              : isActiveStatus === "inactive"
              ? "bg-red-200"
              : null
          }  px-2 flex items-center gap-1 rounded-md  `}
        >
          <span className="w-1.5 h-1.5 block bg-black rounded-full"></span>{" "}
          {isActiveStatus === "active"
            ? "Active"
            : isActiveStatus === "under-review"
            ? "Under-Review"
            : isActiveStatus === "inactive"
            ? "Inactive"
            : null}
        </span>
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
