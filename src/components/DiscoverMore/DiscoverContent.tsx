import getSymbolFromCurrency from "currency-symbol-map";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
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

  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerType, setOfferType] = useState("");
  const [favoriteLists, setFavoriteLists] = useState<Record<string, string[]>>({});
  const [isFavorite, setIsFavorite] = useState<string | null>(null);
  const [showManageLists, setShowManageLists] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [newListName, setNewListName] = useState("");
  const favoriteListRef = useRef<HTMLDivElement>(null);

  const token = useMemo(() => localStorage.getItem("auth_token"), []);

  const checkCartItem = useMemo(() => cartItem?.data?.cart?.filter((item) => item?._id === data?._id) || [], [cartItem, data?._id]);
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
    if (purchaseType === "Upward Offer" || purchaseType === "Downward Offer") {
      return (
        <P
          className={`my-3 ${dark ? "text-gray-300" : "text-[#999999]"} !text-[13px]`}
          variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}
        >
          Offer Type: {purchaseType}
        </P>
      );
    }

    if (hasBasePrice) {
      const currencySymbol = getSymbolFromCurrency(data.pricing.currency?.slice(0, 3));
      return (
        <Header variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }} className="my-2">
          {`${currencySymbol} ${data.pricing.basePrice}`}
        </Header>
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
    toast.success("Item added to cart successfully");
  };

  const handleLikeToggle = () => {
    likeMutation({
      id: data?._id,
      action: isInWishlist ? "unlike" : "like",
    });
  };

  const handleMakeAnoffer = (type: string) => {
    setOfferType(type);
    setIsOfferPopupOpen(true);
  };

  // CSS classes
  const textThemeClass = dark ? "text-gray-100" : "text-gray-800";
  const borderClass = dark ? "border-gray-700" : "border-gray-200";
  const secondaryTextClass = dark ? "text-gray-300" : "text-[#999999]";
  const borderColorClass = dark ? "border-gray-600" : "border-zinc-300";
  const iconColor = dark ? "#9CA3AF" : "#999999";

  const actionButtonClasses = `
    text-base flex items-center justify-center w-full 
    ${isInCart ? "pointer-events-none opacity-50" : ""} 
  `;

  const containerClasses = `
    ${isCommingSoon ? "pointer-events-none cursor-not-allowed opacity-50" : ""} 
    ${hasBasePrice ? "" : "mt-10"}
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
        acc[curr.title] = Array.isArray(curr.items) ? curr.items : [];
        return acc;
      }, {} as Record<string, string[]>);

      setFavoriteLists(favoriteObject);
    }
  }, [favoriteData]);

  return (
    <div className={textThemeClass}>
      <div className={`border-b ${borderClass} pb-0.5`}>
        <Header
          variant={{ size: "xl", theme: dark ? "light" : "dark", weight: "bold" }}
          className="items-center flex scrollbar whitespace-nowrap capitalize !w-full !max-w-full overflow-x-auto"
        >
          {data?.artworkName}
        </Header>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <Header className="!text-[13px]" variant={{ size: "base", theme: dark ? "light" : "dark", weight: "medium" }}>
            Author:
          </Header>
          <P
            className={`${secondaryTextClass} !text-[13px] items-center flex scrollbar whitespace-nowrap capitalize !w-full !max-w-full overflow-x-auto`}
            variant={{ size: "small", weight: "medium" }}
          >
            {formatArtistName(data?.owner)}
          </P>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex gap-2">
          <P className="!text-[13px]" variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            Year of Creation:
          </P>
          <P className={`${secondaryTextClass} !text-[13px]`} variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            {data?.artworkCreationYear}
          </P>
        </div>

        <div className="flex gap-2">
          <P className="!text-[13px]" variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            Series:
          </P>
          <P className={`${secondaryTextClass} !text-[13px]`} variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            {data?.artworkSeries || "N/A"}
          </P>
        </div>

        <div className="flex gap-2">
          <P className="!text-[13px]" variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            Discipline:
          </P>
          <P className={`${secondaryTextClass} !text-[13px]`} variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            {data?.discipline || "N/A"}
          </P>
        </div>

        <div className="flex gap-3">
          <P className="!text-[13px]" variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            Size:
          </P>
          <P className={`${secondaryTextClass} !text-[13px]`} variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }}>
            {data?.additionalInfo?.length || "0"} × {data?.additionalInfo?.width || "0"} × {data?.additionalInfo?.height || "0"} cm
          </P>
        </div>
      </div>

      {getPriceDisplay()}

      <div className={containerClasses}>
        {purchaseType === "Fixed Price" || isSubscription ? (
          <Button
            onClick={() => handleAddToCart(data?._id)}
            variant={{
              theme: dark ? "light" : "dark",
              fontWeight: "600",
              rounded: "full",
            }}
            className={`${actionButtonClasses} gap-2 ${dark ? "hover:bg-gray-200" : "hover:bg-gray-700"}`}
            disabled={isInCart || isCommingSoon}
          >
            <FaCartPlus className={`${dark ? "text-black" : "text-white"}`} />
            <P variant={{ size: "base", theme: dark ? "dark" : "light", weight: "normal" }}>
              {isInCart ? "Already Added" : isPending ? "Adding..." : "Add to cart"}
            </P>
          </Button>
        ) : null}

        {isSubscription ? (
          <Button className="text-base flex items-center justify-center border rounded-full w-full">
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>Purchase Type: {data?.commercialization?.purchaseOption}</P>
          </Button>
        ) : purchaseType === "Fixed Price" ? null : purchaseType === "Price By Request" ? (
          <Button
            variant={{
              theme: dark ? "light" : "",
              rounded: "full",
            }}
            className={`text-base flex ${borderColorClass} items-center justify-center border w-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-800`}
          >
            <img src={mark} alt="" className="w-4 h-4 md:mx-2 mx-1" aria-hidden="true" />
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>Price By Request</P>
          </Button>
        ) : (
          <>
            {offerData?.status == "pending" ? (
              <span
                onClick={() => navigate("/offer-request")}
                className={`text-sm cursor-pointer flex ${borderColorClass} items-center justify-center border p-2.5 gap-2 rounded-full w-full transition-colors hover:bg-gray-600 hover:!text-white`}
              >
                <MdLink />
                Offer Process Going on (View offer)
              </span>
            ) : (
              <span
                onClick={() => handleMakeAnoffer(purchaseType)}
                className={`text-base cursor-pointer flex ${borderColorClass} items-center justify-center border p-2.5 gap-2 rounded-full w-full transition-colors hover:bg-gray-600 hover:!text-white`}
              >
                <IoMdPricetags />
                Make an offer
              </span>
            )}
          </>
        )}
      </div>

      <div className="flex flex-wrap w-full items-center justify-between relative mt-5 px-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick(data?._id);
          }}
          className={`p-1 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
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
        </button>

        {isFavorite === data?._id && (
          <div
            ref={favoriteListRef}
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 left-0 ${
              dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            } shadow-lg rounded-md p-3 w-56 z-10 border`}
          >
            {Object.keys(favoriteLists).map((listName) => (
              <div
                key={listName}
                className={`flex items-center justify-between px-2 py-1 ${dark ? "hover:bg-gray-700" : "hover:bg-gray-50"} cursor-pointer text-xs ${
                  dark ? "text-gray-300" : "text-gray-700"
                } transition-colors`}
                onClick={() => addToFavoriteList(data?._id, listName)}
              >
                <span>{listName}</span>
                <input type="checkbox" checked={favoriteLists[listName].includes(data?._id)} readOnly className="h-4 w-4 text-rose-600" />
              </div>
            ))}
            <div className={`${dark ? "border-gray-700" : "border-gray-200"} border-t mt-2 pt-2 flex flex-col items-center gap-1`}>
              <button
                className={`text-xs flex items-center gap-1 rounded ${
                  dark ? "text-white bg-gray-700 hover:bg-gray-600" : "text-white bg-gray-800 hover:bg-gray-900"
                } py-1 justify-center w-full font-medium transition-colors`}
                onClick={() => setShowManageLists((prev) => !prev)}
              >
                <IoIosAdd size={17} /> New List
              </button>
              <button
                className={`text-xs flex items-center gap-1 rounded ${
                  dark ? "text-white bg-gray-700 hover:bg-gray-600" : "text-white bg-gray-800 hover:bg-gray-900"
                } py-1 justify-center w-full font-medium transition-colors`}
                onClick={() => {
                  setIsFavorite(null);
                  setShowManageLists(false);
                }}
              >
                <IoIosClose size={17} /> Cancel
              </button>
            </div>

            {showManageLists && (
              <div className={`${dark ? "border-gray-700" : "border-gray-200"} border-t mt-2 pt-2`}>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="New List Name"
                  className={`w-full text-xs p-2 ${
                    dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-200 text-gray-800"
                  } border rounded-md mb-2 focus:outline-none focus:ring-1 ${dark ? "focus:ring-gray-500" : "focus:ring-gray-300"}`}
                />
                <button
                  onClick={() => handleAddNewList(data._id)}
                  className={`w-full ${
                    dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"
                  } text-white text-xs py-1 rounded-md transition-colors`}
                >
                  {newLoading ? "Adding..." : "Add List"}
                </button>
              </div>
            )}
          </div>
        )}

        <button aria-label="Like artwork" onClick={handleLikeToggle} className="transition-transform hover:scale-110">
          {isInWishlist ? <AiFillLike size="1.5rem" color="red" /> : <AiOutlineLike size="1.5rem" color={iconColor} />}
        </button>

        <button aria-label="Get help" className="transition-transform hover:scale-110">
          <BsFillQuestionCircleFill size="1.5rem" color={iconColor} />
        </button>

        <button aria-label="Share artwork" className="transition-transform hover:scale-110">
          <FaShareFromSquare size="1.5rem" color={iconColor} />
        </button>
      </div>

      {/* Offer Popup */}
      {isOfferPopupOpen && (
        <div className="relative">
          <MakeAnOfferPopUp setIsOpen={setIsOfferPopupOpen} offerType={offerType} data={data} />
        </div>
      )}
    </div>
  );
};

export default DiscoverContent;
