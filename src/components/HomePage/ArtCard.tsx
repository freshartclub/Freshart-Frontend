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
import useLikeUnlikeArtworkMutation from "./http/useLikeUnLike";

const ArtCard = ({ data, tittle, artistData, viewType, loading }) => {
  const [viewedImages, setViewedImages] = useState({});
  const [favoriteLists, setFavoriteLists] = useState({
    Likes: [],
    "Artwork for Christmas": [],
    "Artworks for my office": [],
    "Gift for Jordi": [],
  });
  const [showFavoriteMenu, setShowFavoriteMenu] = useState(null);
  const [showManageLists, setShowManageLists] = useState(false);
  const [newListName, setNewListName] = useState("");
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const scrollContainerRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { mutate } = postRecentArtworkMutation();
  const { mutateAsync: LikeUnlikeMutate } = useLikeUnlikeArtworkMutation();
  const isToken = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const handleRedirectToDescription = (id: string) => {
    if (isToken) mutate(id);
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (artistData) {
      setFavoriteLists((prev) => ({
        ...prev,
        Likes: artistData?.likedArtworks || [],
      }));
    }
  }, [artistData]);

  const handleFavoriteClick = (id) => {
    setShowFavoriteMenu(showFavoriteMenu === id ? null : id);
    setShowManageLists(false);
  };

  const addToFavoriteList = (artworkId, listName) => {
    const action = favoriteLists[listName].includes(artworkId)
      ? "unlike"
      : "like";
    const data = { id: artworkId, action };

    LikeUnlikeMutate(data)
      .then(() => {
        setFavoriteLists((prev) => ({
          ...prev,
          [listName]:
            action === "like"
              ? [...prev[listName], artworkId]
              : prev[listName].filter((item) => item !== artworkId),
        }));
        setShowFavoriteMenu(null);
      })
      .catch((error) => {
        console.error(`Error updating favorite list ${listName}:`, error);
      });
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

  const handleAddNewList = () => {
    if (newListName && !favoriteLists[newListName]) {
      setFavoriteLists((prev) => ({
        ...prev,
        [newListName]: [],
      }));
      setNewListName("");
    }
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
              <FaToggleOn class="text-gray-600" />
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
                  favoriteLists["Likes"].includes(item?._id)
                    ? "text-rose-600"
                    : "text-gray-400"
                }
              />
            </button>

            {showFavoriteMenu === item._id && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-10 right-0 bg-white shadow-lg rounded-md p-3 w-56 z-10 border border-gray-100"
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
                    className="text-xs text-gray-600 hover:text-gray-900 w-full text-left font-medium"
                    onClick={() => setShowManageLists(true)}
                  >
                    Manage Collections
                  </button>
                </div>

                {showManageLists && (
                  <div className="mt-2 border-t pt-2">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="New collection name"
                      className="w-full text-xs p-2 border rounded-md mb-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                    <button
                      onClick={handleAddNewList}
                      className="w-full bg-gray-800 text-white text-xs py-1 rounded-md hover:bg-gray-900 transition-colors"
                    >
                      Create Collection
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
        {tittle}
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
