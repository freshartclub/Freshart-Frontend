import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaToggleOn,
} from "react-icons/fa6";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../App.css";
import { lowImageUrl } from "../utils/baseUrls";
import Loader from "../ui/Loader";
// import { AiFillLike } from "react-icons/ai";

const CommonCardData = ({
  heading,
  highlightData,
  isLoading = false,
}: {
  heading: string;
  highlightData: HighlightItem[];
  isLoading?: boolean;
}) => {
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const [viewedImages, setViewedImages] = useState({});
  const scrollContainerRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
    const filteredData = {};
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
      setIsEnd(
        container.scrollLeft + container.clientWidth >= container.scrollWidth
      );
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollCheck);
      handleScrollCheck();
    }

    return () => container?.removeEventListener("scroll", handleScrollCheck);
  }, []);

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

  const renderContent =
    highlightData?.length == 0 ? (
      <div className="p-2 border w-full bg-white mx-auto text-center font-semibold">
        No Artwork Found
      </div>
    ) : (
      <div className="relative">
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
            isStart ? "hidden" : "bg-gray-800 hover:bg-gray-900 text-white"
          }`}
          onClick={() => handleScroll("left")}
          disabled={isStart}
        >
          <FaChevronLeft size={20} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll no-scrollbar space-x-4 pb-2 scrollbar"
        >
          {highlightData?.map((item, index: number) => {
            const isOffensive = item?.additionalInfo?.offensive === "Yes";
            const isViewed = viewedImages[item?._id];
            const hasDiscount = item?.additionalInfo?.discount > 0;

            return (
              <div
                key={index}
                onClick={() => {
                  if (isOffensive && !isViewed) {
                    return;
                  }
                  handleRedirectToDescription(item?._id);
                }}
                className="relative cursor-pointer p-3 border flex-shrink-0 bg-white hover:shadow-[5px_5px_5px_rgba(0,0,0,0.05)] transition-shadow duration-300 min-w-[230px] max-w-[300px] h-[313px] group"
              >
                <div className="relative overflow-hidden rounded-md h-[200px] w-full">
                  <img
                    src={`${lowImageUrl}/${item?.mainImage}`}
                    alt="Artwork"
                    className={`w-full h-full object-contain transition-all duration-300
                    ${isOffensive && !isViewed ? "blur-lg brightness-75" : ""}
                      hover:scale-105`}
                  />

                  {isOffensive && !isViewed ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                        onClick={() => handleViewClick(item?._id)}
                      >
                        <FaEye /> View Image
                      </button>
                      <button
                        onClick={() => handleRedirectToDescription(item?._id)}
                        className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
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
                      className="absolute bg-white/90 px-2 py-1 rounded-full top-2 right-2 flex items-center gap-1 text-xs"
                    >
                      <p>Hide</p>
                      <FaToggleOn className="text-gray-600" />
                    </div>
                  ) : null}
                </div>

                <div className="mt-3">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-[16px] text-[#333333]">
                      {item?.artworkName?.length > 17
                        ? `${item?.artworkName?.slice(0, 17)}...`
                        : item?.artworkName}
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                      {item?.discipline} •{" "}
                      {item?.additionalInfo?.technic || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {`${item?.additionalInfo?.length || "--"} x ${
                        item?.additionalInfo?.width || "--"
                      } x ${item?.additionalInfo?.height || "--"}`}{" "}
                      cm
                    </p>
                  </div>

                  {item?.pricing?.basePrice ? (
                    <p className="text-[14px] font-bold">
                      {getSymbolFromCurrency(
                        item?.pricing?.currency.split(" ")[0]
                      ) +
                        " " +
                        item?.pricing?.basePrice}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
            isEnd ? "hidden" : "bg-gray-800 hover:bg-gray-900 text-white"
          }`}
          onClick={() => handleScroll("right")}
          disabled={isEnd}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    );

  return (
    <div className="my-7">
      <h2 className="sm:text-[23px] text-[20px] font-semibold mb-4">
        {heading}
      </h2>

      {isLoading ? <Loader /> : renderContent}
    </div>
  );
};

interface HighlightItem {
  mainImage: string;
  discipline: string;
  additionalInfo: {
    length: string;
    width: string;
    height: string;
    technic: string;
  };
  pricing: {
    currency: string;
    basePrice: string;
  };
  artworkName: string;
  _id: string;
  title: string;
  heading: string;
  size: string;
  para: string;
  price: string;
}

export default CommonCardData;
