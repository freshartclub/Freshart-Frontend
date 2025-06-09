import getSymbolFromCurrency from "currency-symbol-map";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { FaHandshake, FaShareFromSquare, FaXmark } from 'react-icons/fa6';
import { FaFacebook, FaTwitter, FaInstagram, FaLink } from 'react-icons/fa';
import { IoMdPricetags } from "react-icons/io";

// Custom hooks
import { useAppSelector } from "../../store/typedReduxHooks";
import useLikeUnlikeArtworkMutation from "../HomePage/http/useLikeUnLike";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import { useGetLikedItems } from "../pages/http/useGetLikedItems";
import useAddToCartMutation from "./http/useAddToCartMutation";

// Components
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import MakeAnOfferPopUp from "./MakeAnOfferPopUp";

// Assets
import { IoIosAdd, IoIosClose } from "react-icons/io";
import useAddToFavorite from "../HomePage/http/useAddToFavorite";
import { useGetFavoriteList } from "../HomePage/http/useGetFavoriteList";
import mark from "./assets/offer.png";
import { useGetMakeOfferDetials } from "./http/useGetMakeOfferDetials";
import { MdLink } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DiscoverContent = ({ data }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const { mutate: addToCartMutation, isPending } = useAddToCartMutation();
  const { data: cartItem } = useGetCartItems();
  const { mutate: likeMutation } = useLikeUnlikeArtworkMutation();
  const { data: likedItems } = useGetLikedItems();
  const { mutateAsync: favoriteMutation } = useAddToFavorite();
  const { data: offerData } = useGetMakeOfferDetials(data?._id);


  console.log(offerData)

  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerType, setOfferType] = useState("");
  const [favoriteLists, setFavoriteLists] = useState<Record<string, string[]>>({});
  const [isFavorite, setIsFavorite] = useState<string | null>(null);
  const [showManageLists, setShowManageLists] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [newListName, setNewListName] = useState("");
  const favoriteListRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const token = useMemo(() => localStorage.getItem("auth_token"), []);

  const checkCartItem = useMemo(() => cartItem?.cart?.filter((item) => item?._id === data?._id) || [], [cartItem, data?._id]);
  const isInCart = useMemo(() => checkCartItem.length > 0, [checkCartItem]);
  const checkWishlist = useMemo(() => likedItems?.likedArtworks?.filter((item) => item?._id === data?._id) || [], [likedItems, data?._id]);
  const isInWishlist = useMemo(() => checkWishlist.length > 0, [checkWishlist]);

  const isCommingSoon = data?.commingSoon === true;
  const hasBasePrice = Boolean(data?.pricing?.basePrice);
  const purchaseType = data?.commercialization?.purchaseType;
  const isSubscription = data?.commercialization?.activeTab === "subscription";

  const formatArtistName = (artist) => {
    if (!artist) return "";

    let fullName = artist.artistName || "";
    if (artist.artistSurname1) fullName += " " + artist.artistSurname1;
    if (artist.artistSurname2) fullName += " " + artist.artistSurname2;
    return fullName.trim();
  };

  const getPriceDisplay = () => {
    if (hasBasePrice && purchaseType !== "Upward Offer") {
      const currencySymbol = getSymbolFromCurrency(data?.pricing?.currency?.slice(0, 3));

      return (
        <div className="flex flex-col gap-1 my-2">
    
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={`text-base sm:text-lg font-semibold ${dark ? "text-white" : "text-black"}`}>
              {`${currencySymbol} ${data?.pricing?.basePrice}`}
            </h2>

            {purchaseType === "Downward Offer" ? <FaHandshake size={32} color={dark ? "#ffffff" : "#000000"} /> : null}

            {data?.pricing?.dpersentage > 0 && (
              <p className={`text-xs sm:text-sm font-medium ${dark ? "text-gray-300" : "text-gray-600"}`}>
                (inc. {data?.pricing?.dpersentage}% discount)
              </p>
            )}
          </div>

          <p className={`text-[10px]  font-medium ${dark ? "text-gray-300" : "text-gray-600"} whitespace-nowrap overflow-x-auto scrollbar-thin`}>
            (Taxes and shipping included for delivery to Spain)
          </p>
        </div>
      );
    }

    return null;
  };

  const handleAddToCart = (id: string) => {
    if (isInCart) {
      return;
    }

    if (!token) {
      try {
        const items = JSON.parse(localStorage.getItem("_my_cart") || "[]");
        if (!items.includes(id)) {
          items.push(id);
          localStorage.setItem("_my_cart", JSON.stringify(items));
          toast.success("Item temporarily added to cart");
        } else {
          toast.error("Item already in cart");
        }
      } catch (error) {
        console.error("Error handling cart in localStorage:", error);
        toast.error("Failed to add to cart");
      }
      return;
    }

    addToCartMutation(id);
  };



  const handleMakeAnoffer = (type: string) => {
    setOfferType(type);
    setIsOfferPopupOpen(true);
  };

  const textThemeClass = dark ? "text-gray-100" : "text-gray-800";
  const borderClass = dark ? "border-gray-700" : "border-gray-200";
  const secondaryTextClass = dark ? "text-gray-300" : "text-gray-600";
  const borderColorClass = dark ? "border-gray-600" : "border-zinc-300";
  const iconColor = dark ? "#9CA3AF" : "#666666";

  const actionButtonClasses = `
    text-sm sm:text-base flex items-center justify-center w-full 
    ${isInCart ? "pointer-events-none opacity-50" : ""} 
  `;

  const containerClasses = `
    ${hasBasePrice && purchaseType !== "Upward Offer" && purchaseType !== "Downward Offer" ? "mt-3" : "mt-4 sm:mt-6"}
    flex flex-col gap-2
  `;

  const isFavorited = Object.values(favoriteLists).flat().includes(data?._id);

  const handleFavoriteClick = useCallback((id: string) => {
    setIsFavorite((prev) => (prev === id ? null : id));
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

  const type = "artwork";
  const { data: favoriteData } = useGetFavoriteList(type);

  useEffect(() => {
    if (favoriteData && Array.isArray(favoriteData)) {
      const favoriteObject = favoriteData?.reduce((acc, curr) => {
        acc[curr?.title] = Array?.isArray(curr?.items) ? curr?.items : [];
        return acc;
      }, {} as Record<string, string[]>);

      setFavoriteLists(favoriteObject);
    }
  }, [favoriteData]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this amazing artwork!");

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/', '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className={`${textThemeClass} p-2 sm:p-4`}>
      <div className={`border-b ${borderClass} pb-0.5`}>
        <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${dark ? "text-white" : "text-black"} capitalize break-words`}>
          {data?.artworkName}
        </h1>
      </div>

      <div className="mt-3 space-y-2 sm:space-y-3">
        <div className="flex items-start gap-2">
          <p
            className={`text-sm sm:text-base font-medium ${dark ? "text-white" : "text-black"} break-words`}
          >
            {formatArtistName(data?.owner)} ({data?.artworkCreationYear}
            {data?.inventoryShipping?.location ? `, ${data?.inventoryShipping?.location}` : ""})
          </p>
        </div>

        {data?.isArtProvider === "Yes" ? <p ><span className="text-xs sm:text-sm font-medium">Supplied By:</span> <span className={`text-xs sm:text-sm font-medium ${secondaryTextClass} break-words`}>{data?.provideArtistName}</span>  </p> : null}

        {data?.artworkSeries !== "N/A" && (
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <p className={`text-xs sm:text-sm font-medium ${dark ? "text-white" : "text-black"} flex-shrink-0`}>Series:</p>
            <p className={`text-xs sm:text-sm font-medium ${secondaryTextClass} break-words`}>
              {data?.artworkSeries || "N/A"}
            </p>
          </div>
        )}

        <div className="flex items-start gap-2">
          <p className={`text-xs sm:text-sm font-medium ${dark ? "text-white" : "text-black"} break-words`}>
            {data?.discipline}, {data?.additionalInfo?.artworkTechnic}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          <p className={`text-xs sm:text-sm font-medium ${secondaryTextClass}`}>
            {data?.additionalInfo?.height || "0"} × {data?.additionalInfo?.width || "0"}
            {data?.additionalInfo?.depth ? data?.additionalInfo?.depth : null}  cm
            
          </p>
        </div>

        {/* {isSubscription && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <p className={`text-xs sm:text-sm font-medium ${dark ? "text-white" : "text-black"}`}>Purchase Type:</p>
            <span className="bg-[#EE1D52] text-xs text-white px-2 py-1 rounded-full">Yes</span>
          </div>
        )} */}

        {(purchaseType === "Upward Offer") && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <FaHandshake size={32} color={dark ? "#ffffff" : "#000000"} />
          </div>
        )}
      </div>

      {getPriceDisplay()}

      <div className={containerClasses}>
        {data?.commingSoon ? (
          <Button className={`text-sm sm:text-base flex items-center justify-center border w-full transition-colors py-2 sm:py-3 ${dark ? "bg-black hover:bg-gray-800 border-gray-700 text-white" : "bg-white hover:bg-gray-100 border-gray-300 text-black"}`}>
            <span className="font-normal">Notify When Available</span>
          </Button>
        ) : (
          <>
            {(purchaseType === "Fixed Price" || isSubscription || purchaseType === "Downward Offer") && (
              <Button
                onClick={() => handleAddToCart(data?._id)}
                className={`${actionButtonClasses} gap-2 w-full rounded-full transition-colors py-2 sm:py-3 ${dark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-700"}`}
                disabled={isInCart || isCommingSoon}
              >
                <FaCartPlus className={`w-4 h-4 ${dark ? "text-black" : "text-white"}`} />
                <span className="text-sm sm:text-base font-normal">
                  {isInCart ? "Already Added" : isPending ? "Adding..." : "Add to cart"}
                </span>
              </Button>
            )}

            {purchaseType === "Price By Request" && (
              <Button className={`text-sm sm:text-base flex items-center justify-center border w-full transition-colors py-2 sm:py-3 ${dark ? "bg-black text-white hover:bg-gray-800 border-gray-700" : "bg-white text-black hover:bg-gray-100 border-gray-300"} ${borderColorClass}`}>
                <img src={mark} alt="" className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" aria-hidden="true" />
                <span className="font-normal">Price By Request</span>
              </Button>
            )}

            {(purchaseType === "Upward Offer" || purchaseType === "Downward Offer") && !isInCart && (
              <>
                {offerData?.status === "pending" ? (
                  <span
                    onClick={() => navigate("/offer-request")}
                    className={`text-xs sm:text-sm cursor-pointer flex items-center justify-center border p-2 sm:p-2.5 gap-2 rounded-full w-full transition-colors ${dark ? "bg-black text-white hover:bg-gray-800 border-gray-700" : "bg-white text-black hover:bg-gray-100 border-gray-300"} ${borderColorClass}`}
                  >
                    <MdLink className="w-4 h-4" />
                    <span className="break-words text-center">Offer Process Going on (View offer)</span>
                  </span>
                ) : (
                  <span
                    onClick={() => handleMakeAnoffer(purchaseType)}
                    className={`text-sm sm:text-base cursor-pointer flex items-center justify-center border p-2 sm:p-2.5 gap-2 rounded-full w-full transition-colors ${dark ? "bg-black text-white hover:bg-gray-800 border-gray-700" : "bg-white text-black hover:bg-gray-100 border-gray-300"} ${borderColorClass}`}
                  >
                    <IoMdPricetags className="w-4 h-4" />
                    Make an offer
                  </span>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div className="flex flex-wrap w-full items-center justify-between relative mt-4 sm:mt-5 px-1 gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick(data?._id);
          }}
          className={`p-1 sm:p-2 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isFavorited ? "#e11d48" : "none"}
            stroke={isFavorited ? "#e11d48" : iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors sm:w-5 sm:h-5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>

        </button>

        {isFavorite === data?._id && (
          <div
            ref={favoriteListRef}
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-8 left-0 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-lg rounded-md p-3 w-48 sm:w-56 z-10 border max-h-64 overflow-y-auto`}
          >
            {Object?.keys(favoriteLists)?.map((listName) => (
              <div
                key={listName}
                className={`flex items-center justify-between px-2 py-1 ${dark ? "hover:bg-gray-700" : "hover:bg-gray-50"} cursor-pointer text-xs ${dark ? "text-gray-300" : "text-gray-700"} transition-colors`}
                onClick={() => addToFavoriteList(data?._id, listName)}
              >
                <span className="truncate flex-1 mr-2">{listName}</span>
                <input
                  type="checkbox"
                  checked={favoriteLists[listName]?.includes(data?._id)}
                  readOnly
                  className="h-3 w-3 sm:h-4 sm:w-4 text-rose-600 flex-shrink-0"
                />
              </div>
            ))}
            <div className={`${dark ? "border-gray-700" : "border-gray-200"} border-t mt-2 pt-2 flex flex-col items-center gap-1`}>
              <button
                className={`text-xs flex items-center gap-1 rounded py-1 justify-center w-full font-medium transition-colors ${dark ? "text-white bg-gray-700 hover:bg-gray-600" : "text-white bg-gray-800 hover:bg-gray-900"}`}
                onClick={() => setShowManageLists((prev) => !prev)}
              >
                <IoIosAdd size={15} /> New List
              </button>
              <button
                className={`text-xs flex items-center gap-1 rounded py-1 justify-center w-full font-medium transition-colors ${dark ? "text-white bg-gray-700 hover:bg-gray-600" : "text-white bg-gray-800 hover:bg-gray-900"}`}
                onClick={() => {
                  setIsFavorite(null);
                  setShowManageLists(false);
                }}
              >
                <IoIosClose size={15} /> Cancel
              </button>
            </div>

            {showManageLists && (
              <div className={`${dark ? "border-gray-700" : "border-gray-200"} border-t mt-2 pt-2`}>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e?.target?.value)}
                  placeholder="New List Name"
                  className={`w-full text-xs p-2 border rounded-md mb-2 focus:outline-none focus:ring-1 ${dark ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500" : "bg-white border-gray-200 text-gray-800 focus:ring-gray-300"}`}
                />
                <button
                  onClick={() => handleAddNewList(data?._id)}
                  className={`w-full text-white text-xs py-1 rounded-md transition-colors ${dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"}`}
                >
                  {newLoading ? "Adding..." : "Add List"}
                </button>
              </div>
            )}
          </div>
        )}

        <button aria-label="Get help" className="transition-transform hover:scale-110 p-1">
          <BsFillQuestionCircleFill size="1.25rem" color={iconColor} className="sm:text-2xl" />
        </button>

        <div className="relative">
          <button
            aria-label="Share artwork"
            className="transition-all duration-300 p-1 group hover:text-[#4a6fa5]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaShareFromSquare
              size="1.65rem"
              className={`sm:text-2xl group-hover:scale-110  transition-all duration-300 p-1 group ${dark ? 'hover:text-amber-100' : 'hover:text-amber-600'}`}
            />
          </button>

          <div
            ref={popupRef}
            className={`absolute right-0 bottom-full mb-2 w-56 rounded-lg z-50 overflow-hidden transform transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} bg-[#102030] shadow-xl shadow-black/50 ring-1 ring-[#4a6fa5]/30`}
          >
            <div className="py-1">
              <div className="flex justify-between items-center px-4 py-3 border-b border-[#4a6fa5]/30">
                <h3 className="text-sm font-medium text-[#e0e7ff]">Share This Masterpiece</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full transition-colors text-[#e0e7ff] hover:bg-[#4a6fa5]/30"
                >
                  <FaXmark size="0.9rem" />
                </button>
              </div>

              <button
                onClick={() => shareOnSocial('facebook')}
                className="flex items-center w-full px-4 py-3 text-sm text-[#e0e7ff] hover:bg-[#4a6fa5]/20 transition-colors"
              >
                <FaFacebook className="mr-3 text-[#1877F2] text-opacity-90" size="1.1rem" />
                <span>Facebook</span>

              </button>

              <button
                onClick={() => shareOnSocial('twitter')}
                className="flex items-center w-full px-4 py-3 text-sm text-[#e0e7ff] hover:bg-[#4a6fa5]/20 transition-colors"
              >
                <FaTwitter className="mr-3 text-[#1DA1F2] text-opacity-90" size="1.1rem" />
                <span>Twitter</span>

              </button>

              <button
                onClick={() => shareOnSocial('instagram')}
                className="flex items-center w-full px-4 py-3 text-sm text-[#e0e7ff] hover:bg-[#4a6fa5]/20 transition-colors"
              >
                <FaInstagram className="mr-3 text-[#E4405F] text-opacity-90" size="1.1rem" />
                <span>Instagram</span>

              </button>

              <button
                onClick={() => shareOnSocial('copy')}
                className="flex items-center w-full px-4 py-3 text-sm text-[#e0e7ff] hover:bg-[#4a6fa5]/20 transition-colors"
              >
                <FaLink className="mr-3 text-[#4a6fa5]" size="1.1rem" />
                <span>Copy Link</span>
              </button>

            </div>
          </div>
        </div>
      </div>

      {isOfferPopupOpen && (
        <div className="relative">
          <MakeAnOfferPopUp setIsOpen={setIsOfferPopupOpen} offerType={offerType} data={data} />
        </div>
      )}
    </div>
  );
};

export default DiscoverContent;