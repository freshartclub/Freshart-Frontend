import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import postRecentArtworkMutation from "../HomePage/http/postRecentView";
import useAddToFavorite from "../HomePage/http/useAddToFavorite";
import { useGetFavoriteList } from "../HomePage/http/useGetFavoriteList";
import { lowImageUrl } from "../utils/baseUrls";
import useClickOutside from "../utils/useClickOutside";
import { useAppSelector } from "../../store/typedReduxHooks";

const CardSection = ({ data, type, darkMode }) => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const [favoriteLists, setFavoriteLists] = useState({});
  const [isFavorite, setIsFavorite] = useState("");
  const favoriteListRef = useRef(null);

  const name = (val) => {
    let fullName = val?.artistName || "";
    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;
    return fullName.trim();
  };

  useClickOutside(favoriteListRef, () => {
    setIsFavorite("");
  });

  const { mutate } = postRecentArtworkMutation();
  const { mutate: favoriteMutation } = useAddToFavorite();
  const navigate = useNavigate();
  const [viewedImages, setViewedImages] = useState({});

  const [newLoading, setNewLoading] = useState(false);
  const [showManageLists, setShowManageLists] = useState(false);
  const [newListName, setNewListName] = useState("");

  const listType = "artwork";
  const { data: favoriteData } = useGetFavoriteList(listType);

  const handleRedirectToDescription = (id: string) => {
    if (isAuthorized) mutate(id);
    navigate(`/discover_more/${id}?comingFrom=search`);
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

  const handleFavoriteClick = (id: string) => {
    setIsFavorite((prev) => (prev === id ? "" : id));
  };

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
          updatedList[listName] = updatedList[listName].filter((favId) => favId !== id);
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

  useEffect(() => {
    if (favoriteData && Array.isArray(favoriteData)) {
      const favoriteObject = favoriteData?.reduce((acc, curr) => {
        acc[curr.title] = Array.isArray(curr.items) ? curr.items : [];
        return acc;
      }, {});

      setFavoriteLists(favoriteObject);
    }
  }, [favoriteData]);

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
    <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 p-2">
      {data && data?.length > 0 ? (
        data?.map((item, index: number) => {
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
              className={`relative rounded-lg cursor-pointer p-2 border ${
                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-[#e0e1e3]"
              } hover:shadow-md transition-shadow duration-200 w-full group`}
            >
              <div className="relative overflow-hidden rounded-md aspect-[4/3] w-full">
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
                        darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
                      } px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-2`}
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
                      className={`${
                        darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
                      } px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-2`}
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
                    className={`absolute ${
                      darkMode ? "bg-gray-700" : "bg-white/90"
                    } px-2 py-1 rounded-full top-2 right-2 flex items-center gap-1 text-xs`}
                  >
                    <p className={`text-xs font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Hide</p>
                    <FaToggleOn size={18} className={darkMode ? "text-gray-400" : "text-gray-600"} />
                  </div>
                ) : null}
              </div>

              <div className={`flex flex-col ${darkMode ? "bg-gray-800" : "bg-white"} mt-1 relative text-sm`}>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{item?.discipline}</p>

                <p className={`text-lg ${darkMode ? "text-gray-100" : "text-gray-900"} font-semibold line-clamp-2 leading-tight`}>
                  {item?.artworkName?.length > 17 ? `${item?.artworkName?.slice(0, 17)}...` : item?.artworkName}
                </p>

                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} font-light italic`}>
                  by {name(item).length > 25 ? `${name(item)?.slice(0, 25)}...` : name(item)}
                </p>
                {type === "purchase" ? (
                  <p className={`mt-1 flex gap-1 items-center ${darkMode ? "text-gray-200" : "text-gray-800"} font-bold`}>
                    {item?.pricing?.currency ? getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3)) : null} {item?.pricing?.basePrice}
                    {item?.pricing?.dpersentage ? (
                      <span>
                        | <span className="text-[#EE1D52]">{item?.pricing?.dpersentage}%</span>
                      </span>
                    ) : null}
                  </p>
                ) : null}

                <div className="absolute bottom-0 right-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(item?._id);
                    }}
                    className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <IoHeartOutline
                      size="1.2rem"
                      className={
                        Object.values(favoriteLists).flat().includes(item?._id) ? "text-red-500" : darkMode ? "text-gray-400" : "text-gray-500"
                      }
                    />
                  </button>

                  {isFavorite === item?._id && (
                    <div
                      ref={favoriteListRef}
                      className={`absolute bottom-10 right-0 ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg rounded-md p-3 w-56 z-10`}
                    >
                      {Object.keys(favoriteLists).map((listName) => (
                        <div
                          key={listName}
                          className={`flex items-center justify-between px-2 py-1 ${
                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                          } cursor-pointer text-sm`}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToFavoriteList(item?._id, listName);
                          }}
                        >
                          <span className={darkMode ? "text-gray-200" : ""}>{listName}</span>
                          <input
                            type="checkbox"
                            checked={favoriteLists[listName].includes(item._id)}
                            readOnly
                            className={darkMode ? "accent-blue-500" : ""}
                          />
                        </div>
                      ))}
                      <div className="border-t mt-2 pt-2">
                        <button
                          className={`text-xs flex items-center gap-1 rounded text-white py-1 justify-center ${
                            darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-900 hover:bg-gray-700"
                          } w-full font-medium transition-colors`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowManageLists((prev) => !prev);
                          }}
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
                            onClick={(e) => e.stopPropagation()}
                            placeholder="New List Name"
                            className={`w-full text-sm p-1 border rounded mb-2 ${
                              darkMode ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : ""
                            }`}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddNewList(item?._id);
                            }}
                            className={`w-full ${
                              darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-800 hover:bg-gray-900"
                            } text-white text-xs py-1 rounded-md transition-colors`}
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
        })
      ) : (
        <div
          className={`h-[5rem] font-semibold col-span-4 rounded w-full border-2 ${
            darkMode ? "border-gray-600 bg-gray-800 text-gray-300" : "border-gray-300 bg-gray-50 text-gray-600"
          } flex items-center justify-center`}
        >
          No Artworks Available
        </div>
      )}
    </div>
  );
};

export default CardSection;
