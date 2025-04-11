import { AnimatePresence, motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { HiHome, HiOutlineCollection } from "react-icons/hi";
import { IoHeart } from "react-icons/io5";
import { RiEmotionSadLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { lowImageUrl } from "../utils/baseUrls";
import { useGetFullList } from "./http/useGetFavoruteList";

interface Artwork {
  media: string;
  title: string;
  artworkName: string;
  _id: string;
}

interface WishlistItem {
  title: string;
  items: Array<{
    type: string;
    item: Artwork | null;
  }>;
}

const Wishlist = () => {
  const { data, isLoading } = useGetFullList();
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);

  const handleRedirectToDescription = (id: string) => {
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center text-sm mb-8">
          <Link
            to="/"
            className={`flex items-center ${
              isLoading ? "pointer-events-none" : ""
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
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
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
            className={`text-center ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {data?.length || 0} collections
          </P>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence>
              {data && data.length > 0 ? (
                data.map((item: WishlistItem, index: number) => (
                  <motion.div
                    key={index}
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
                        {item.title}
                      </P>
                    </div>

                    {item.items.length === 1 && item.items[0]?.item === null ? (
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
                        {item.items.map(
                          (i, idx) =>
                            i.type === "artwork" &&
                            i.item && (
                              <motion.div
                                key={idx}
                                onClick={() =>
                                  handleRedirectToDescription(i.item?._id)
                                }
                                className={`relative group overflow-hidden rounded-lg border pb-1 cursor-pointer ${
                                  dark
                                    ? "hover:shadow-lg border-gray-600 hover:shadow-gray-800/30"
                                    : "hover:shadow-md"
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div
                                  className={`aspect-square overflow-hidden ${
                                    dark ? "bg-gray-800" : "bg-gray-100"
                                  }`}
                                >
                                  <img
                                    src={`${lowImageUrl}/${i.item.media}`}
                                    alt={i.item.artworkName}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="mt-2 px-1">
                                  <P
                                    variant={{
                                      theme: "dark",
                                      weight: "medium",
                                    }}
                                    className={`truncate ${
                                      dark ? "text-gray-200" : "text-gray-800"
                                    }`}
                                  >
                                    {i.item.artworkName}
                                  </P>
                                  <P
                                    variant={{
                                      theme: "light",
                                      weight: "normal",
                                    }}
                                    className={`truncate ${
                                      dark ? "text-gray-400" : "text-gray-500"
                                    }`}
                                  >
                                    {i.item.title}
                                  </P>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // handleFavoriteClick(i.item._id, i.type);
                                  }}
                                  className={`absolute top-2 right-2 p-2 rounded-full ${
                                    dark
                                      ? "bg-gray-700/90 hover:bg-gray-600/90"
                                      : "bg-white/90 hover:bg-gray-100"
                                  } backdrop-blur-sm transition-colors shadow-sm`}
                                  aria-label="Remove from favorites"
                                >
                                  <IoHeart
                                    className="text-rose-500"
                                    size={18}
                                  />
                                </button>
                              </motion.div>
                            )
                        )}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
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
                        className={`${
                          dark ? "text-gray-400" : "text-gray-500"
                        }`}
                        size={28}
                      />
                    </div>
                    <P
                      variant={{ theme: "dark", weight: "medium" }}
                      className={`mb-3 ${
                        dark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Your wishlist is empty
                    </P>
                    <P
                      variant={{ theme: "light", weight: "normal" }}
                      className={`mb-6 ${
                        dark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Discover amazing artworks and add them to your favorites
                    </P>
                    <NavLink to="/all-artworks?type=subscription">
                      <Button
                        variant={{
                          size: "md",
                          rounded: "lg",
                          fontWeight: "medium",
                        }}
                        className={`w-full ${
                          dark ? "bg-blue-600 hover:bg-blue-700" : ""
                        }`}
                      >
                        Browse Artworks
                      </Button>
                    </NavLink>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
