import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiHome, HiOutlineCollection } from "react-icons/hi";
import { IoHeart } from "react-icons/io5";
import { MdBrush } from "react-icons/md";
import { RiEmotionSadLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import { useGetFullList } from "./http/useGetFavoruteList";
import { useGetFavArtist } from "./http/useGetFavArtist";
import useArtistUnFollowMutation from "../ArtistDetail/http/useArtistUnFollowMutation";

// Type definitions
interface Artwork {
  media: string;
  title: string;
  artworkName: string;
  _id: string;
}

interface Artist {
  _id: string;
  name: string;
  profileImage: string;
  bio: string;
  artworksCount?: number;
}

// Series interface removed

interface WishlistItem {
  title: string;
  items: Array<{
    type: string;
    item: Artwork | null;
  }>;
}


const Tab = ({ active, onClick, icon, label, count, dark }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
      active
        ? dark
          ? "bg-gray-800 text-white border-b-2 border-[#EE1D52]"
          : "bg-white text-gray-900 border-b-2 border-[#EE1D52] shadow-sm"
        : dark
        ? "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-300"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {count !== undefined && (
      <span
        className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
          active
            ? dark
              ? "bg-[#EE1D52] text-white"
              : "bg-[#EE1D52] text-white"
            : dark
            ? "bg-gray-700 text-gray-300"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {count}
      </span>
    )}
  </motion.button>
);


const EmptyState = ({ type, dark, navigateTo }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center py-16 text-center"
  >
    <div
      className={`p-8 rounded-xl ${
        dark ? "bg-gray-800" : "bg-white"
      } shadow-sm max-w-md w-full border ${
        dark ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div
        className={`w-16 h-16 mx-auto rounded-full ${
          dark ? "bg-gray-700" : "bg-gray-100"
        } flex items-center justify-center mb-4`}
      >
        <RiEmotionSadLine
          className={`${dark ? "text-gray-400" : "text-gray-500"}`}
          size={28}
        />
      </div>
      <P
        variant={{ theme: "dark", weight: "medium" }}
        className={`mb-3 ${dark ? "text-white" : "text-gray-800"}`}
      >
        Your {type} favorites are empty
      </P>
      <P
        variant={{ theme: "light", weight: "normal" }}
        className={`mb-6 ${dark ? "text-gray-400" : "text-gray-500"}`}
      >
        Discover amazing {type.toLowerCase()} and add them to your favorites
      </P>
      <NavLink to={navigateTo}>
        <Button
          variant={{
            size: "md",
            rounded: "lg",
            fontWeight: "medium",
          }}
          className={`w-full ${dark ? "bg-blue-600 hover:bg-blue-700" : ""}`}
        >
          Browse {type}
        </Button>
      </NavLink>
    </div>
  </motion.div>
);


const ArtworkCard = ({ item, dark, onRedirect, onRemoveFavorite }) => (
  <motion.div
    onClick={() => onRedirect(item._id)}
    className={`relative group overflow-hidden rounded-lg border pb-1 cursor-pointer ${
      dark
        ? "hover:shadow-lg border-gray-600 hover:shadow-gray-800/30"
        : "hover:shadow-md border-gray-200 hover:border-gray-300"
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ y: -5 }}
  >
    <div
      className={`aspect-square overflow-hidden ${
        dark ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <img
        src={`${lowImageUrl}/${item.media}`}
        alt={item.artworkName}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="mt-2 px-2">
      <P
        variant={{
          theme: "dark",
          weight: "medium",
        }}
        className={`truncate ${dark ? "text-gray-200" : "text-gray-800"}`}
      >
        {item.artworkName}
      </P>
      <P
        variant={{
          theme: "light",
          weight: "normal",
        }}
        className={`truncate ${dark ? "text-gray-400" : "text-gray-500"}`}
      >
        {item.title}
      </P>
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemoveFavorite(item._id, "artwork");
      }}
      className={`absolute top-2 right-2 p-2 rounded-full ${
        dark
          ? "bg-gray-700/90 hover:bg-gray-600/90"
          : "bg-white/90 hover:bg-gray-100"
      } backdrop-blur-sm transition-colors shadow-sm`}
      aria-label="Remove from favorites"
    >
      <IoHeart className="text-rose-500" size={18} />
    </button>
  </motion.div>
);


const ArtistCard = ({ artist, dark, onRedirect, onRemoveFavorite }) => (
  <motion.div
    onClick={() => onRedirect(artist._id)}
    className={`relative group overflow-hidden rounded-lg border pb-3 cursor-pointer ${
      dark
        ? "hover:shadow-lg border-gray-600 hover:shadow-gray-800/30"
        : "hover:shadow-md border-gray-200 hover:border-gray-300"
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ y: -5 }}
  >
    <div
      className={`aspect-square overflow-hidden ${
        dark ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <img
        src={`${imageUrl}/users/${artist.mainImg}`}
        alt={artist.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="mt-3 px-3 text-center">
      <P
        variant={{
          theme: "dark",
          weight: "semiBold",
        }}
        className={`truncate ${dark ? "text-gray-200" : "text-gray-800"}`}
      >
        {artist?.artistName}
      </P>
     
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemoveFavorite(artist._id);
      }}
      className={`absolute top-2 right-2 p-2 rounded-full ${
        dark
          ? "bg-gray-700/90 hover:bg-gray-600/90"
          : "bg-white/90 hover:bg-gray-100"
      } backdrop-blur-sm transition-colors shadow-sm`}
      aria-label="Remove from favorites"
    >
      <IoHeart className="text-rose-500" size={18} />
    </button>
  </motion.div>
);

// Series card component removed

const Wishlist = () => {
  const [activeTab, setActiveTab] = useState("artwork");
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);

  // Fetch data for different tabs
  const { data: artworkData, isLoading: artworkLoading } = useGetFullList();
  const { data: artistData, isLoading: artistLoading } = useGetFavArtist();

  const {mutate } = useArtistUnFollowMutation()


  console.log(artistData)

  const handleRedirectToDescription = (id, type) => {
    const routes = {
      artwork: `/discover_more/${id}`,
      artist: `/artist/${id}`,
    };
    navigate(routes[type] || routes.artwork);
    window.scroll(0, 0);
  };

  const handleRemoveFavorite = (id, type) => {
    // Implementation of favorite removal functionality
    console.log(`Remove ${type} with ID ${id} from favorites`);
  };


  const handleRemoveArtist = (id)=>{
    console.log(id)
    mutate(id)
  }

  // Tab content rendering
  const renderTabContent = () => {
    // Artwork tab content
    if (activeTab === "artwork") {
      if (artworkLoading) {
        return (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        );
      }

      if (!artworkData || artworkData.length === 0) {
        return (
          <EmptyState
            type="Artwork"
            dark={dark}
            navigateTo="/all-artworks?type=subscription"
          />
        );
      }

      return (
        <div className="space-y-8">
          <AnimatePresence>
            {artworkData.map((collection, index) => (
              <motion.div
                key={`artwork-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div
                  className={`px-4 py-2 rounded-lg inline-flex items-center ${
                    dark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <HiOutlineCollection
                    className={`mr-2 text-[#EE1D52]`}
                    size={18}
                  />
                  <P
                    variant={{
                      size: "md",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className={dark ? "text-white" : "text-gray-800"}
                  >
                    {collection.title}
                  </P>
                </div>

                {collection.items.length === 1 &&
                collection.items[0]?.item === null ? (
                  <div
                    className={`p-6 text-center border rounded-lg ${
                      dark
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <RiEmotionSadLine
                      className={`mx-auto mb-3 ${
                        dark ? "text-gray-500" : "text-gray-400"
                      }`}
                      size={32}
                    />
                    <P
                      variant={{
                        size: "md",
                        theme: "light",
                        weight: "normal",
                      }}
                      className={dark ? "text-gray-400" : "text-gray-500"}
                    >
                      No items in this collection
                    </P>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {collection.items.map(
                      (item, idx) =>
                        item.type === "artwork" &&
                        item.item && (
                          <ArtworkCard
                            key={`artwork-item-${idx}`}
                            item={item.item}
                            dark={dark}
                            onRedirect={(id) =>
                              handleRedirectToDescription(id, "artwork")
                            }
                            onRemoveFavorite={handleRemoveFavorite}
                          />
                        )
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      );
    }

    // Artist tab content
    if (activeTab === "artist") {
      if (artistLoading) {
        return (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        );
      }

      if (!artistData || artistData.length === 0) {
        return (
          <EmptyState
            type="Artist"
            dark={dark}
            navigateTo="/artists"
          />
        );
      }

      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          <AnimatePresence>
            {artistData.map((artist, index) => (
              <ArtistCard
                key={`artist-${index}`}
                artist={artist}
                dark={dark}
                onRedirect={(id) => handleRedirectToDescription(id, "artist")}
                onRemoveFavorite={handleRemoveArtist}
              />
            ))}
          </AnimatePresence>
        </div>
      );
    }

    // Series tab content removed

    return null;
  };

  // Get count for artwork tab
  const getArtworkCount = () => {
    if (!artworkData) return 0;
    return artworkData.reduce((total, collection) => {
      return (
        total +
        collection.items.filter((i) => i.type === "artwork" && i.item).length
      );
    }, 0);
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Tab navigation at the top */}
        <div className={`flex items-center justify-between mb-6 pb-4 border-b ${dark ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <Link
              to="/"
              className={`flex items-center ${
                artworkLoading || artistLoading
                  ? "pointer-events-none"
                  : ""
              }`}
            >
              <HiHome
                className={`mr-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
                size={16}
              />
              <P
                variant={{ theme: "light", weight: "normal" }}
                className="text-[#EE1D52] hover:text-[#ff386a]"
              >
                Home
              </P>
            </Link>
            <FiChevronRight
              className={`mx-2 ${dark ? "text-gray-500" : "text-gray-400"}`}
              size={14}
            />
            <P
              variant={{ theme: "light", weight: "normal" }}
              className={dark ? "text-gray-300" : "text-gray-600"}
            >
              Favorite List
            </P>
          </div>
          
          <div className="flex items-center gap-2">
            <Tab
              active={activeTab === "artwork"}
              onClick={() => setActiveTab("artwork")}
              icon={<HiOutlineCollection size={18} className="mr-2" />}
              label="Artworks"
              count={getArtworkCount()}
              dark={dark}
            />
            <Tab
              active={activeTab === "artist"}
              onClick={() => setActiveTab("artist")}
              icon={<MdBrush size={18} className="mr-2" />}
              label="Artists"
              count={artistData?.length || 0}
              dark={dark}
            />
          </div>
        </div>

        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Header
            variant={{ size: "2xl", theme: "dark", weight: "bold" }}
            className={`text-center mb-2 ${
              dark ? "text-white" : "text-gray-800"
            }`}
          >
            My Favorite List
          </Header>
          <P
            variant={{ theme: "light", weight: "normal" }}
            className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            All your favorite artworks and artists in one place
          </P>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;