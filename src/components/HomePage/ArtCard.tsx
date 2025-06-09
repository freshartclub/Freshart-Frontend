import getSymbolFromCurrency from "currency-symbol-map";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEye, FaToggleOn } from "react-icons/fa";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Loader from "../ui/Loader";
import { lowImageUrl } from "../utils/baseUrls";
import postRecentArtworkMutation from "./http/postRecentView";
import useAddToFavorite from "./http/useAddToFavorite";
import { useGetFavoriteList } from "./http/useGetFavoriteList";
import { FaHandshake } from "react-icons/fa";

// Constants
const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
const SCROLL_AMOUNT = 300;
const CARD_WIDTH = 230;

interface ArtworkItem {
  _id: string;
  media: string;
  artworkName: string;
  owner: {
    artistName: string;
  };
  provideArtistName?: string;
  discipline: {
    artworkDiscipline: string;
  };
  additionalInfo: {
    artworkTechnic: string;
    offensive?: string;
  };
  activeTab?: string;
  currency?: string;
  price?: number;
  discount?: number;
}

interface ArtCardProps {
  data: ArtworkItem[];
  title: string;
  viewType: string;
  loading: boolean;
}

const ArtCard = memo(({ data, title, viewType, loading }: ArtCardProps) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [viewedImages, setViewedImages] = useState<Record<string, number>>({});
  const [favoriteLists, setFavoriteLists] = useState<Record<string, string[]>>({});
  const favoriteListRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showManageLists, setShowManageLists] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState<string | null>(null);
  const { mutate: postRecentView } = postRecentArtworkMutation();
  const { mutateAsync: favoriteMutation } = useAddToFavorite();
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const navigate = useNavigate();
  const type = "artwork";
  const { data: favoriteData } = useGetFavoriteList(type);

  useEffect(() => {
    if (favoriteData && Array.isArray(favoriteData)) {
      const favoriteObject = favoriteData?.reduce((acc, curr) => {
        acc[curr.title] = Array.isArray(curr.items) ? curr.items : [];
        return acc;
      }, {} as Record<string, string[]>);

      setFavoriteLists(favoriteObject);
    }
  }, [favoriteData]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("viewedImages") || "{}") as Record<string, number>;
    const currentTime = Date.now();

    const filteredData = Object.fromEntries(Object.entries(storedData).filter(([_, timestamp]) => currentTime - timestamp < TEN_DAYS_MS));

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
      container.addEventListener("scroll", handleScrollCheck, { passive: true });
      handleScrollCheck();
    }

    return () => {
      container?.removeEventListener("scroll", handleScrollCheck);
    };
  }, [data]);

  const handleRedirectToDescription = useCallback(
    (id: string) => {
      if (isAuthorized) postRecentView(id);
      navigate(`/discover_more/${id}?comingFrom=${viewType}`);
      window.scroll(0, 0);
    },
    [isAuthorized, postRecentView, navigate, viewType]
  );

  const handleFavoriteClick = useCallback((id: string) => {
    setIsFavorite((prev) => (prev === id ? null : id));
  }, []);

  const handleScroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  }, []);

  const addToFavoriteList = useCallback(
    (id: string, listName: string) => {
      const isAlreadyFavorite = favoriteLists[listName]?.includes(id);

      const newData = {
        id,
        name: listName,
        type: "artwork",
      };

      favoriteMutation(newData);
      setIsFavorite(null);
      setFavoriteLists((prev) => {
        const updatedList = { ...prev };

        if (isAlreadyFavorite) {
          updatedList[listName] = updatedList[listName].filter((favId) => favId !== id);
        } else {
          updatedList[listName] = [...(updatedList[listName] || []), id];
        }

        return updatedList;
      });
    },
    [favoriteLists, favoriteMutation]
  );

  const handleAddNewList = useCallback(
    async (id: string) => {
      if (!newListName.trim()) return;

      try {
        const newData = {
          id,
          name: newListName.trim(),
          type: "artwork",
        };

        setNewLoading(true);
        await favoriteMutation(newData);
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
    },
    [favoriteMutation, newListName]
  );

  const handleViewClick = useCallback(
    (id: string) => {
      const newViewedImages = { ...viewedImages, [id]: Date.now() };
      localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
      setViewedImages(newViewedImages);
    },
    [viewedImages]
  );

  const handleHideClick = useCallback((id: string) => {
    setViewedImages((prev) => {
      const newViewedImages = { ...prev };
      delete newViewedImages[id];
      localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
      return newViewedImages;
    });
  }, []);

  const renderCard = useCallback(
    (item: ArtworkItem) => {
      const isOffensive = item?.additionalInfo?.offensive === "Yes";
      const isViewed = viewedImages[item?._id];
      const isFavorited = Object.values(favoriteLists).flat().includes(item?._id);

      return (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            if (isOffensive && !isViewed) return;
            handleRedirectToDescription(item?._id);
          }}
          className={`relative cursor-pointer p-3 border flex-shrink-0 py-2 ${
            dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } hover:shadow-[5px_5px_5px_rgba(0,0,0,0.05)] transition-all duration-300 min-w-[${CARD_WIDTH}px] max-w-[300px] h-[320px] group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
            {item?.exclusive  && (
              <div className="absolute top-2 left-2 bg-[#E05A48] text-white text-[10px] tracking-wider font-bold uppercase px-2 py-1 rounded shadow-sm z-[9999]">
                Exclusive
              </div>
            )}         
          <div className="relative overflow-hidden rounded-md h-[200px] w-full">
            <motion.img
              src={`${lowImageUrl}/${item?.media}`}
              alt="Artwork"
              className={`w-full h-full object-contain transition-all duration-300 ${isOffensive && !isViewed ? "blur-lg brightness-75" : ""}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            {isOffensive && !isViewed && (
              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className={`${
                    dark ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
                  } px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-2`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick(item?._id);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> View Image
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRedirectToDescription(item?._id);
                  }}
                  className={`${
                    dark ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
                  } px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdOutlineOpenInNew /> View Details
                </motion.button>
              </motion.div>
            )}

            {isOffensive && isViewed && (
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                  handleHideClick(item?._id);
                }}
                className={`absolute ${
                  dark ? "bg-gray-700/90" : "bg-white/90"
                } px-2 py-1 rounded-full top-2 right-2 flex items-center gap-1 text-xs cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p>Offensive</p>
                <FaToggleOn className={`${dark ? "text-gray-400" : "text-gray-600"}`} />
              </motion.div>
            )}
          </div>

          <div className="mt-3 ">
            <h1 className={`font-semibold text-md ${dark ? "text-gray-100" : "text-gray-900"} truncate`}>
              {item?.artworkName?.length > 17 ? `${item?.artworkName?.slice(0, 17)}...` : item?.artworkName}
            </h1>
            <p className={`text-xs ${dark ? "text-gray-300" : "text-gray-600"} mt-1 font-light italic`}>
              {item?.owner?.artistName.length > 25 ? `${item?.owner?.artistName?.slice(0, 25)}...` : item?.owner?.artistName}{" "}
              {item?.provideArtistName
                ? `by ${item?.provideArtistName?.length > 25 ? `${item?.provideArtistName?.slice(0, 25)}...` : item?.provideArtistName} `
                : null}
            </p>
            <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"} mt-1`}>
              {item?.discipline?.artworkDiscipline} • {item?.additionalInfo?.artworkTechnic}
            </p>
            {item?.activeTab == "purchase" && (
              <p className={`mt-1 flex gap-2  items-center ${dark ? "text-gray-100" : "text-gray-800"} font-bold `}>
                {item?.currency ? getSymbolFromCurrency(item?.currency?.slice(0, 3)) : null} {item?.price}
                {item?.discount && (
                  <span>
                    | <span className="text-red-500">{item?.discount}%</span>
                  </span>
                )}

              {item?.purchaseType === "Downward Offer"  ?   <FaHandshake  size={32} color={dark ? "#ffffff" : "#000000"} />  : null}

              </p>
              )}

            {item?.purchaseType === "Upward Offer"  ?   <FaHandshake  size={32} color={dark ? "#ffffff" : "#000000"} />  : null}
            <div className="absolute bottom-3 right-3">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick(item?._id);
                }}
                className={`p-1 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isFavorited ? "#e11d48" : "none"}
                  stroke={isFavorited ? "#e11d48" : dark ? "#9ca3af" : "#9ca3af"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.button>

              <AnimatePresence>
                {isFavorite === item?._id && (
                  <motion.div
                    ref={favoriteListRef}
                    onClick={(e) => e?.stopPropagation()}
                    className={`absolute bottom-0 right-0 ${
                      dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } shadow-lg rounded-md p-3 w-56 z-10 border`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Object.keys(favoriteLists).map((listName) => (
                      <motion.div
                        key={listName}
                        className={`flex items-center justify-between px-2 py-1 ${
                          dark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        } cursor-pointer text-xs ${dark ? "text-gray-300" : "text-gray-700"} transition-colors`}
                        onClick={() => addToFavoriteList(item?._id, listName)}
                        whileHover={{ x: 2 }}
                      >
                        <span>{listName}</span>
                        <input type="checkbox" checked={favoriteLists[listName].includes(item?._id)} readOnly className="h-4 w-4 text-rose-600" />
                      </motion.div>
                    ))}
                    <div className={`${dark ? "border-gray-700" : "border-gray-200"} border-t mt-2 pt-2 flex flex-col items-center gap-1`}>
                      <motion.button
                        className={`text-xs flex items-center gap-1 rounded ${
                          dark ? "text-white bg-gray-700 hover:bg-gray-600" : "text-white bg-gray-800 hover:bg-gray-900"
                        } py-1 justify-center w-full font-medium transition-colors`}
                        onClick={() => setShowManageLists((prev) => !prev)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <IoIosAdd size={17} /> New List
                      </motion.button>
                      <motion.button
                        className={`text-xs flex items-center gap-1 rounded ${
                          dark ? "text-white bg-gray-700 hover:bg-gray-600" : "text-white bg-gray-800 hover:bg-gray-900"
                        } py-1 justify-center w-full font-medium transition-colors`}
                        onClick={() => {
                          setIsFavorite(null);
                          setShowManageLists(false);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <IoIosClose size={17} /> Cancel
                      </motion.button>
                    </div>

                    {showManageLists && (
                      <motion.div
                        className={`${dark ? "border-gray-700" : "border-gray-200"} border-t mt-2 pt-2`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="text"
                          value={newListName}
                          onChange={(e) => setNewListName(e?.target?.value)}
                          placeholder="New List Name"
                          className={`w-full text-xs p-2 ${
                            dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-200 text-gray-800"
                          } border rounded-md mb-2 focus:outline-none focus:ring-1 ${dark ? "focus:ring-gray-500" : "focus:ring-gray-300"}`}
                        />
                        <motion.button
                          onClick={() => handleAddNewList(item?._id)}
                          className={`w-full ${
                            dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"
                          } text-white text-xs py-1 rounded-md transition-colors`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {newLoading ? "Adding..." : "Add List"}
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      );
    },
    [
      dark,
      favoriteLists,
      handleAddNewList,
      handleFavoriteClick,
      handleHideClick,
      handleRedirectToDescription,
      handleViewClick,
      isFavorite,
      newListName,
      newLoading,
      showManageLists,
      viewedImages,
    ]
  );

  return (
    <div className={`mx-auto px-4 md:px-8 lg:px-12 mt-12 ${dark ? "bg-gray-900" : "bg-white"}`}>
      <motion.h1
        className={`text-xl font-semibold ${dark ? "text-gray-100" : "text-gray-900"} mb-6 tracking-tight`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h1>
      {loading ? (
        <Loader />
      ) : data && data?.length > 0 ? (
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <AnimatePresence>
            {!isStart && (
              <motion.button
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
                  dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"
                } text-white`}
                onClick={() => handleScroll("left")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <div ref={scrollContainerRef} className="flex overflow-x-scroll no-scrollbar space-x-4 pb-2 scrollbar">
            {data?.map((item) => renderCard(item))}
          </div>

          <AnimatePresence>
            {!isEnd && (
              <motion.button
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
                  dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"
                } text-white`}
                onClick={() => handleScroll("right")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            // whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className={`h-[5rem] font-semibold rounded w-full border-2 ${
            dark ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-300 bg-gray-50 text-gray-600"
          } flex items-center justify-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No Artworks Available
        </motion.div>
      )}
    </div>
  );
});

export default ArtCard;
