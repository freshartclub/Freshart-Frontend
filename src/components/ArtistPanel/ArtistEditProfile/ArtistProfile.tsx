import { useState } from "react";
import Header from "../../ui/Header";
import dot from "./assets/dot.png";
import GeneralUpload from "./GeneralUpload";
import { useGetArtistDetails } from "./http/useGetDetails";
import Loader from "../../ui/Loader";

const ArtistProfile = () => {
  const [isActivated, setIsActivated] = useState(true);
  const { data, isLoading } = useGetArtistDetails();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-10 ">
      <Header
        variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
        className="mt-6 flex gap-2 items-center"
      >
        Artist Profile
        {/* <div>
          <h1 className="text-[15px] flex items-center">
            {" "}
            <span
              className={`w-[1vh] h-[1vh] border rounded-full ${
                isActivated ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>{" "}
            Under Maintenance
          </h1>
        </div> */}
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

      <GeneralUpload />
    </div>
  );
};

export default ArtistProfile;
