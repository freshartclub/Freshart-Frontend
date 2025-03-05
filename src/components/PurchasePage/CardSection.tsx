import "../../App.css";

import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import postRecentArtworkMutation from "../HomePage/http/postRecentView";
import { lowImageUrl } from "../utils/baseUrls";

const CardSection = ({ data }) => {
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  const { mutate } = postRecentArtworkMutation();
  const navigate = useNavigate();
  const [viewedImages, setViewedImages] = useState({});

  const handleRedirectToDescription = (id: string) => {
    mutate(id);
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  const handleViewClick = (id: string) => {
    const newViewedImages = { ...viewedImages, [id]: Date.now() };
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setViewedImages(newViewedImages);
  };

  const handleHideClick = (id: string) => {
    const newViewedImages = { ...viewedImages };
    delete newViewedImages[id];
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setViewedImages(newViewedImages);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("viewedImages") || "{}");
    const currentTime = Date.now();
    const filteredData: Record<string, number> = {};

    Object.keys(storedData).forEach((key) => {
      if (currentTime - storedData[key] < TEN_DAYS_MS) {
        filteredData[key] = storedData[key];
      }
    });

    localStorage.setItem("viewedImages", JSON.stringify(filteredData));
    setViewedImages(filteredData);
  }, []);

  return (
    <div className="grid max-[440px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1450px]:grid-cols-5 gap-x-5 gap-y-10 mx-auto">
      {data && data?.length > 0 ? (
        data.map((item, index: string) => {
          const isOffensive = item?.additionalInfo?.offensive === "Yes";
          const isViewed = viewedImages[item?._id];

          return (
            <div
              key={index}
              onClick={() => {
                if (!isOffensive || isViewed) {
                  handleRedirectToDescription(item?._id);
                }
              }}
              className="flex flex-col outline-none cursor-pointer relative group"
            >
              <div className="relative overflow-hidden w-full">
                <img
                  src={`${lowImageUrl}/${item?.media}`}
                  alt="Artwork"
                  className={`w-full h-[250px] md:h-[300px] lg:h-[350px] min-[1450px]:h-[400px] object-cover shadow-lg transition-all duration-300 
                    ${
                      isOffensive && !isViewed
                        ? "blur-lg brightness-75 group-hover:blur-md group-hover:brightness-50"
                        : ""
                    }
                  `}
                />

                {isOffensive && !isViewed ? (
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-blue-500 flex items-center gap-3 font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={() => handleViewClick(item?._id)}
                    >
                      <FaEye /> View Image
                    </button>
                    <button
                      onClick={() => handleRedirectToDescription(item?._id)}
                      className="bg-red-500 flex items-center gap-3 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      <MdOutlineOpenInNew /> View Details
                    </button>
                  </div>
                ) : null}

                {isOffensive && isViewed ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHideClick(item?._id);
                    }}
                    className="absolute bg-white px-2 py-1 rounded top-2 right-2 flex items-center gap-2"
                  >
                    <p className="text-[12px] ">Offensive View</p>
                    <FaToggleOn size={20} className="text-green-500" />
                  </div>
                ) : null}
              </div>

              {/* Artwork Details */}
              <div className="mt-4">
                <p className="text-sm text-gray-500">{item?.discipline}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-md text-gray-800 font-bold line-clamp-2">
                    {item?.artworkName}
                  </p>
                  <p className="text-sm text-gray-500">{item?.size}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{name(item)}</p>
                <p className="mt-1 text-sm text-gray-600">
                  {getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3))}{" "}
                  {item?.pricing?.basePrice}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="h-[5rem] font-semibold rounded md:w-[90vw] w-[92vw] border-2 border-gray-300 flex items-center justify-center">
          No Artworks Available
        </div>
      )}
    </div>
  );
};

export default CardSection;
