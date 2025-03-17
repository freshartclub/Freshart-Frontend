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
    const filteredData = {};
    Object.keys(storedData).forEach((key) => {
      if (currentTime - storedData[key] < TEN_DAYS_MS) {
        filteredData[key] = storedData[key];
      }
    });
    localStorage.setItem("viewedImages", JSON.stringify(filteredData));
    setViewedImages(filteredData);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto px-4 max-w-[1440px]">
      {data && data?.length > 0 ? (
        data.map((item, index) => {
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
              className="flex flex-col outline-none cursor-pointer px-5 py-2 relative bg-[#DBEAFE] group max-w-[600px] mx-auto   shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-[300px] h-[200px] overflow-hidden ">
                <img
                  src={`${lowImageUrl}/${item?.media}`}
                  alt="Artwork"
                  className={`w-full h-full object-contain transition-all duration-300 
                    ${isOffensive && !isViewed ? "blur-lg brightness-75 group-hover:blur-md" : "hover:scale-105"}`}
                />

                {isOffensive && !isViewed ? (
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center gap-3 font-semibold text-white px-5 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
                      onClick={() => handleViewClick(item?._id)}
                    >
                      <FaEye /> View Image
                    </button>
                    <button
                      onClick={() => handleRedirectToDescription(item?._id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 flex items-center gap-3 font-semibold text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
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
                    className="absolute bg-white/90 px-3 py-1 rounded-lg top-3 right-3 flex items-center gap-2 hover:bg-white transition-colors duration-200"
                  >
                    <p className="text-xs font-medium text-gray-700">Hide</p>
                    <FaToggleOn size={18} className="text-green-500" />
                  </div>
                ) : null}
              </div>

              {/* Artwork Details */}
              <div className="p-4 flex flex-col bg-white mt-3 ">
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  {item?.discipline}
                </p>
                <div className="flex justify-between items-start mt-2">
                  <p className="text-lg text-gray-900 font-semibold line-clamp-2 leading-tight">
                    {item?.artworkName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item?.size}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1 font-medium">{name(item)}</p>
                <p className="mt-2 text-md text-gray-800 font-bold">
                  {getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3))}{" "}
                  {item?.pricing?.basePrice}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="h-[5rem] font-semibold rounded md:w-[90vw] w-[92vw] border-2 border-gray-300 flex items-center justify-center text-gray-600 bg-gray-50">
          No Artworks Available
        </div>
      )}
    </div>
  );
};

export default CardSection;