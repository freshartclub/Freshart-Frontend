import "../../App.css";
import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useState } from "react";
import { FaArrowUp, FaEye } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import postRecentArtworkMutation from "../HomePage/http/postRecentView";
import useLikeUnlikeArtworkMutation from "../HomePage/http/useLikeUnLike"; // Adjust path if needed
import { lowImageUrl } from "../utils/baseUrls";
import { FaHeart } from "react-icons/fa6";

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
  const { mutateAsync: LikeUnlikeMutate } = useLikeUnlikeArtworkMutation();
  const navigate = useNavigate();
  const [viewedImages, setViewedImages] = useState({});
  const [favoriteLists, setFavoriteLists] = useState({
    "Likes": [],
    "Artwork for Christmas": [],
    "Artworks for my office": [],
    "Gift for Jordi": []
  });
  const [showFavoriteMenu, setShowFavoriteMenu] = useState(null);
  const [showManageLists, setShowManageLists] = useState(false);
  const [newListName, setNewListName] = useState("");

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

  const handleFavoriteClick = (id) => {
    setShowFavoriteMenu(showFavoriteMenu === id ? null : id);
    setShowManageLists(false);
  };

  const addToFavoriteList = (artworkId, listName) => {
    const action = favoriteLists[listName].includes(artworkId) ? "unlike" : "like";
    const data = { id: artworkId, action };

    LikeUnlikeMutate(data)
      .then(() => {
        setFavoriteLists(prev => ({
          ...prev,
          [listName]: action === "like"
            ? [...prev[listName], artworkId]
            : prev[listName].filter(item => item !== artworkId)
        }));
        setShowFavoriteMenu(null);
      })
      .catch(error => {
        console.error(`Error updating favorite list ${listName}:`, error);
      });
  };

  const handleAddNewList = () => {
    if (newListName && !favoriteLists[newListName]) {
      setFavoriteLists(prev => ({
        ...prev,
        [newListName]: []
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
              className="flex flex-col outline-none cursor-pointer relative group max-w-[600px] mx-auto transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden p-3 h-[40vh] flex items-center justify-center bg-blue-100">
                <img
                  src={`${lowImageUrl}/${item?.media}`}
                  alt="Artwork"
                  className={`w-full transition-all duration-300 lg:w-[35vw] md:w-[35vw] object-contain h-[40vh]
                    ${
                      isOffensive && !isViewed
                        ? "blur-lg brightness-75 group-hover:blur-md"
                        : "hover:scale-105"
                    }`}
                />

                {isOffensive && !isViewed ? (
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center gap-3 font-semibold text-white px-5 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewClick(item?._id);
                      }}
                    >
                      <FaEye /> View Image
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRedirectToDescription(item?._id);
                      }}
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

              <div className="flex flex-col bg-white pt-4 relative pb-8"> {/* Added pb-8 for space */}
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  {item?.discipline}
                </p>
                <div className="flex justify-between items-start mt-2">
                  <p className="text-lg text-gray-900 font-semibold line-clamp-2 leading-tight">
                    {item?.artworkName?.length > 20
                      ? `${item?.artworkName?.slice(0, 20)}...`
                      : item?.artworkName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item?.size}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  {name(item)}
                </p>
                <p className="mt-2 text-md text-gray-800 font-bold">
                  {getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3))}{" "}
                  {item?.pricing?.basePrice}
                </p>

                {/* Favorite Arrow and Menu */}
                <div className="absolute bottom-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(item._id);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaArrowUp 
                      size="1.2rem" 
                      className={favoriteLists["Likes"].includes(item?._id) ? "text-red-500" : "text-gray-500"}
                    />
                  </button>

                  {showFavoriteMenu === item._id && (
                    <div className="absolute bottom-10 right-0 bg-white shadow-lg rounded-md p-3 w-56 z-10">
                      {Object.keys(favoriteLists).map(listName => (
                        <div
                          key={listName}
                          className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToFavoriteList(item._id, listName);
                          }}
                        >
                          <span>{listName}</span>
                          <input
                            type="checkbox"
                            checked={favoriteLists[listName].includes(item._id)}
                            readOnly
                          />
                        </div>
                      ))}
                      <div className="border-t mt-2 pt-2">
                        <button 
                          className="text-sm text-blue-500 hover:underline w-full text-left"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowManageLists(true);
                          }}
                        >
                          Manage Favorite Lists
                        </button>
                      </div>

                      {showManageLists && (
                        <div className="mt-2 border-t pt-2">
                          <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="New list name"
                            className="w-full text-sm p-1 border rounded mb-2"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddNewList();
                            }}
                            className="w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600"
                          >
                            Add List
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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