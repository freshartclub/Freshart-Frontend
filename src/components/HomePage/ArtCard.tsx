import { useEffect, useRef, useState } from "react";
import { FaEye, FaToggleOn } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loader from "../ui/Loader";
import { lowImageUrl } from "../utils/baseUrls";
import postRecentArtworkMutation from "./http/postRecentView";
import useAddToFavorite from "./http/useAddToFavorite";
import { IoIosAdd } from "react-icons/io";
import { useGetFavoriteList } from "./http/useGetFavoriteList";
import useClickOutside from "../utils/useClickOutside";

const ArtCard = ({ data, title, viewType, loading }) => {
  const [viewedImages, setViewedImages] = useState({});
  const [favoriteLists, setFavoriteLists] = useState({});
  const favoriteListRef = useRef(null);

  const [showManageLists, setShowManageLists] = useState(false);
  const [newListName, setNewListName] = useState("");
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const scrollContainerRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [newLoading, setNewLoading] = useState(false);

  const [isFavorite, setIsFavorite] = useState("");

  const { mutate } = postRecentArtworkMutation();
  const { mutate: favoriteMutation } = useAddToFavorite();
  const isToken = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const type = "artwork";
  const { data: favoriteData } = useGetFavoriteList(type);

  useEffect(() => {
    if (favoriteData && Array.isArray(favoriteData)) {
      const favoriteObject = favoriteData.reduce((acc, curr) => {
        acc[curr.title] = Array.isArray(curr.items) ? curr.items : [];
        return acc;
      }, {});

      setFavoriteLists(favoriteObject);
    }
  }, [favoriteData]);

  const handleRedirectToDescription = (id: string) => {
    if (isToken) mutate(id);
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  const handleFavoriteClick = (id: string) => {
    setIsFavorite((prev) => (prev === id ? "" : id));
  };

  useClickOutside(favoriteListRef, () => {
    setIsFavorite("");
  });

  const addToFavoriteList = async (id: string, listName: string) => {
    try {
      const isAlreadyFavorite = favoriteLists[listName]?.includes(id);

      const newData = {
        id: id,
        name: listName,
        type: "artwork",
      };

      favoriteMutation(newData);

      setFavoriteLists((prev) => {
        const updatedList = { ...prev };

        if (isAlreadyFavorite) {
          updatedList[listName] = updatedList[listName].filter(
            (favId) => favId !== id
          );
        } else {
          updatedList[listName] = [...(updatedList[listName] || []), id];
        }

        return updatedList;
      });
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleAddNewList = async (id: string) => {
    if (!newListName.trim()) return;

    try {
      const newData = {
        id: id,
        name: newListName.trim(),
        type: "artwork",
      };

      setNewLoading(true);
      favoriteMutation(newData);
      setNewLoading(false);

      setFavoriteLists((prev) => ({
        ...prev,
        [newListName]: [],
      }));

      setNewListName("");
      setShowManageLists(false);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
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
    const hasDiscount = item?.additionalInfo?.discount > 0;

    return (
      <div
        key={item._id}
        onClick={() => {
          if (isOffensive && !isViewed) {
            return;
          }
          handleRedirectToDescription(item?._id);
        }}
        className="relative cursor-pointer p-3 border flex-shrink-0 bg-white hover:shadow-[5px_5px_5px_rgba(0,0,0,0.05)] transition-shadow duration-300 min-w-[230px] max-w-[300px] h-[300px] group"
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
              <p>Offensive</p>
              <FaToggleOn className="text-gray-600" />
            </div>
          ) : null}
        </div>

        <div className="mt-3">
          <h1 className="font-semibold text-md text-gray-900 truncate">
            {item?.artworkName?.length > 17
              ? `${item?.artworkName?.slice(0, 17)}...`
              : item?.artworkName}
          </h1>
          <p className="text-xs text-gray-600 mt-1 font-light italic">
            by {item?.owner?.artistName}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {item?.discipline?.artworkDiscipline} •{" "}
            {item?.additionalInfo?.artworkTechnic}
          </p>
          {hasDiscount ? (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-red-600 font-medium text-sm">
                ${item?.additionalInfo?.finalPrice}
              </span>
              <span className="text-gray-500 line-through text-xs">
                ${item?.additionalInfo?.originalPrice}
              </span>
              <span className="text-red-600 text-xs">
                ({item?.additionalInfo?.discount}% off)
              </span>
            </div>
          ) : (
            <p className="text-gray-700 mt-2 font-medium text-sm">
              {item?.size}
            </p>
          )}

          <div className="absolute bottom-3 right-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(item._id);
              }}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Add to favorites"
            >
              <IoHeartOutline
                size="1.1rem"
                className={
                  Object.values(favoriteLists).flat().includes(item?._id)
                    ? "text-rose-600"
                    : "text-gray-400"
                }
              />
            </button>

            {isFavorite == item._id && (
              <div
                ref={favoriteListRef}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 right-0 bg-white shadow-lg rounded-md p-3 w-56 z-10 border border-zinc-300"
              >
                {Object.keys(favoriteLists).map((listName) => (
                  <div
                    key={listName}
                    className="flex items-center justify-between px-2 py-1 hover:bg-gray-50 cursor-pointer text-xs text-gray-700 transition-colors"
                    onClick={() => addToFavoriteList(item._id, listName)}
                  >
                    <span>{listName}</span>
                    <input
                      type="checkbox"
                      checked={favoriteLists[listName].includes(item._id)}
                      readOnly
                      className="h-4 w-4 text-rose-600"
                    />
                  </div>
                ))}
                <div className="border-t mt-2 pt-2">
                  <button
                    className="text-xs flex items-center gap-1 rounded text-white py-1 justify-center bg-gray-900 w-full font-medium hover:bg-gray-700 transition-colors"
                    onClick={() => setShowManageLists((prev) => !prev)}
                  >
                    <IoIosAdd size={17} /> New List
                  </button>
                </div>

                {showManageLists && (
                  <div className="mt-2 border-t pt-2">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="New List Name"
                      className="w-full text-xs p-2 border rounded-md mb-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                    <button
                      onClick={() => handleAddNewList(item._id)}
                      className="w-full bg-gray-800 text-white text-xs py-1 rounded-md hover:bg-gray-900 transition-colors"
                    >
                      {newLoading ? "Adding..." : "Add List"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-12 mt-12">
      <h1 className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
        {title}
      </h1>
      {loading ? (
        <Loader />
      ) : data && data?.length > 0 ? (
        <>
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
              {data.map((item) => renderCard(item))}
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
        </>
      ) : (
        <div className="h-[5rem] font-semibold rounded w-full border-2 border-gray-300 flex items-center justify-center text-gray-600 bg-gray-50">
          No Artworks Available
        </div>
      )}
    </div>
  );
};

export default ArtCard;
