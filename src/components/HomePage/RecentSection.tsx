import { useEffect, useRef, useState } from "react";
import { FaEye, FaToggleOn } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Loader from "../ui/Loader";
import { lowImageUrl } from "../utils/baseUrls";
import { useGetRecentArtwork } from "./http/getRecentArtwork";

const RecentSection = () => {
  const dark = useAppSelector((state) => state.theme.mode);

  const { data, isLoading } = useGetRecentArtwork();
  const [viewedImages, setViewedImages] = useState({});
  const scrollContainerRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

  const navigate = useNavigate();
  const handleRedirectToDescription = (id: string) => {
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

  useEffect(() => {
    const handleScrollCheck = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      setIsStart(container.scrollLeft === 0);
      setIsEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollCheck);
      handleScrollCheck();
    }

    return () => container?.removeEventListener("scroll", handleScrollCheck);
  }, [data]);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderCard = (item) => {
    const isOffensive = item?.additionalInfo?.offensive === "Yes";
    const isViewed = viewedImages[item?._id];

    return (
      <div
        key={item._id}
        onClick={() => {
          if (isOffensive && !isViewed) {
            return;
          }
          handleRedirectToDescription(item?._id);
        }}
        className={`relative cursor-pointer p-3 border flex-shrink-0 ${
          dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        } hover:shadow-[5px_5px_5px_rgba(0,0,0,0.05)] transition-shadow duration-300 min-w-[230px] max-w-[300px] h-[300px] group`}
      >
        <div className="relative overflow-hidden rounded-md h-[200px] w-full">
          <img
            src={`${lowImageUrl}/${item?.media}`}
            alt="Artwork"
            className={`w-full h-full object-contain transition-all duration-300
                ${isOffensive && !isViewed ? "blur-lg brightness-75" : ""}
                hover:scale-105`}
          />

          {isOffensive && !isViewed ? (
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className={`${
                  dark ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
                } px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-2`}
                onClick={() => handleViewClick(item?._id)}
              >
                <FaEye /> View Image
              </button>
              <button
                onClick={() => handleRedirectToDescription(item?._id)}
                className={`${
                  dark ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
                } px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-2`}
              >
                <MdOutlineOpenInNew /> Details
              </button>
            </div>
          ) : null}

          {isOffensive && isViewed ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleHideClick(item?._id);
              }}
              className={`absolute ${dark ? "bg-gray-700/90" : "bg-white/90"} px-2 py-1 rounded-full top-2 right-2 flex items-center gap-1 text-xs`}
            >
              <p>Offensive</p>
              <FaToggleOn className={`${dark ? "text-gray-400" : "text-gray-600"}`} />
            </div>
          ) : null}
        </div>

        <div className="mt-3">
          <h1 className={`font-semibold text-md ${dark ? "text-gray-100" : "text-gray-900"} truncate`}>
            {item?.artworkName?.length > 17 ? `${item?.artworkName?.slice(0, 17)}...` : item?.artworkName}
          </h1>
          <p className={`text-xs ${dark ? "text-gray-300" : "text-gray-600"} mt-1 font-light italic`}>by {item?.owner?.artistName}</p>
          <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"} mt-1`}>
            {item?.discipline?.artworkDiscipline} • {item?.additionalInfo?.artworkTechnic}
          </p>
        </div>
      </div>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`container ${dark ? "bg-gray-800" : "bg-[#F5F2EB]"} mx-auto pt-5 pb-10 md:px-6 px-3 mt-10`}>
      <h1 className={`text-[25px] md:text-[30px] font-semibold mb-5 w-1/2 sm:w-full ${dark ? "text-gray-100" : "text-gray-900"}`}>Recent Viewed</h1>

      {data && data?.length > 0 ? (
        <div className="relative">
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
              isStart ? "hidden" : `${dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"} text-white`
            }`}
            onClick={() => handleScroll("left")}
            disabled={isStart}
          >
            <FaChevronLeft size={20} />
          </button>

          <div ref={scrollContainerRef} className="flex overflow-x-scroll no-scrollbar space-x-4 pb-2 scrollbar">
            {data.map((item) => renderCard(item))}
          </div>

          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
              isEnd ? "hidden" : `${dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"} text-white`
            }`}
            onClick={() => handleScroll("right")}
            disabled={isEnd}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      ) : (
        <div
          className={`h-[5rem] font-semibold rounded w-full border-2 ${
            dark ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-300 bg-gray-50 text-gray-600"
          } flex items-center justify-center`}
        >
          No Artworks Available
        </div>
      )}
    </div>
  );
};

export default RecentSection;
