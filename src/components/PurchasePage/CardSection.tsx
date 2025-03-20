import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import postRecentArtworkMutation from "../HomePage/http/postRecentView";
import useLikeUnlikeArtworkMutation from "../HomePage/http/useLikeUnLike"; // Adjust path if needed
import { lowImageUrl } from "../utils/baseUrls";

const CardSection = ({ data, type }) => {
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
    Likes: [],
    "Artwork for Christmas": [],
    "Artworks for my office": [],
    "Gift for Jordi": [],
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
      {data && data?.length > 0 ? (
        data.map((item, index: number) => {
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
              className={`relative cursor-pointer p-3 border flex-shrink-0 bg-white hover:shadow-[5px_5px_5px_rgba(0,0,0,0.05)] transition-shadow duration-300 min-w-[250px] max-w-[300px] ${
                type === "purchase" ? "h-[317px]" : "h-[295px]"
              } group`}
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
                    <p className="text-xs font-medium text-gray-700">Hide</p>
                    <FaToggleOn size={18} className="text-gray-600" />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col bg-white mt-3 relative">
                <p className="text-xs text-gray-500">{item?.discipline}</p>

                <p className="text-lg text-gray-900 font-semibold line-clamp-2 leading-tight">
                  {item?.artworkName?.length > 17
                    ? `${item?.artworkName?.slice(0, 17)}...`
                    : item?.artworkName}
                </p>

                <p className="text-xs text-gray-600 font-light italic">
                  by {name(item)}
                </p>
                {type === "purchase" ? (
                  <p className="mt-1 text-gray-800 font-bold">
                    {getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3))}{" "}
                    {item?.pricing?.basePrice}
                  </p>
                ) : null}

                <div className="absolute bottom-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(item._id);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <IoHeartOutline
                      size="1.2rem"
                      className={
                        favoriteLists["Likes"].includes(item?._id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    />
                  </button>

                  {showFavoriteMenu === item._id && (
                    <div className="absolute bottom-10 right-0 bg-white shadow-lg rounded-md p-3 w-56 z-10">
                      {Object.keys(favoriteLists).map((listName) => (
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
        <div className="h-[5rem] font-semibold col-span-4 rounded w-full border-2 border-gray-300 flex items-center justify-center text-gray-600 bg-gray-50">
          No Artworks Available
        </div>
      )}
    </div>
  );
};

export default CardSection;
