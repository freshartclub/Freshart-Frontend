import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdModeEditOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import deleteimg from "../ArtistDetail/assets/Container (2).png";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetArtWorkList } from "./http/getArtWorkList";
import { ArtworkViewPopup } from "./Pop";

const Artwork = () => {
  const [selectedArtwork, setSelectedArtwork] = useState("Discipline");
  const isArtProvider = useAppSelector((state) => state.user.isArtProvider);
  const dark = useAppSelector((state) => state.theme.mode);
  const { data, isLoading } = useGetArtWorkList(selectedArtwork);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [status, setStatus] = useState(null);

  const closePopup = () => setIsPopupOpen(false);

  const handleArtworkSelect = (name: string) => setSelectedArtwork(name);
  const handleArtistName = (artist) => setSelectedArtwork(artist);

  const handleArtworkClick = (artworkId, status) => {
    setSelectedArtworkId(artworkId);
    setIsPopupOpen(true);
    setStatus(status);
  };

  const { t } = useTranslation();

  const statusColors = {
    published: "#00DE00",
    pending: "#D8F002",
    draft: "#f0dd32",
    modified: "#ac329e",
    notAvailable: "#EE1D52",
    subscription: "#3b82f6",
    purchased: "#696868",
    comingSoon: "#a74343",
  };

  return (
    <div className={`px-4 md:px-6 lg:px-8 pt-2.5 ${dark ? "bg-gray-900" : "bg-white"}`}>
      <Header variant={{ size: "xl", theme: dark ? "light" : "dark", weight: "semiBold" }} className="mb-4">
        {t("Artworks")}
      </Header>

      <div className="flex flex-col mb-4 gap-4">
        <div className="flex w-full max-w-full overflow-x-auto gap-2 pb-2 scrollbar">
          {["Discipline", "Series", "Subscription", "Purchase"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleArtworkSelect(filter)}
              className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors ${
                selectedArtwork === filter
                  ? dark
                    ? "bg-[#EE1D52] text-white shadow-md"
                    : "bg-[#EE1D52] text-white shadow-md"
                  : dark
                  ? "bg-gray-700 text-gray-300 shadow-sm hover:bg-gray-600"
                  : "bg-gray-100 shadow-sm hover:bg-gray-100"
              }`}
            >
              {t(filter)}
            </button>
          ))}
          {isArtProvider === "Yes" && (
            <button
              onClick={() => handleArtistName("artprovider")}
              className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors ${
                selectedArtwork !== "Series" &&
                selectedArtwork !== "Discipline" &&
                selectedArtwork !== "Subscription" &&
                selectedArtwork !== "Purchase"
                  ? dark
                    ? "bg-[#EE1D52] text-white shadow-md"
                    : "bg-[#EE1D52] text-white shadow-md"
                  : dark
                  ? "bg-gray-700 text-gray-300 shadow-sm hover:bg-gray-600"
                  : "bg-gray-100 shadow-sm hover:bg-gray-100"
              }`}
            >
              {t("Artist Name")}
            </button>
          )}
        </div>

        <div className={`flex flex-wrap gap-3 p-3 rounded-lg shadow-sm border ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          {Object.entries(statusColors).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <p className={`text-sm whitespace-nowrap ${dark ? "text-gray-300" : "text-gray-700"}`}>
                {t(key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="space-y-6 pb-6">
          {data?.data && data?.data.length > 0 ? (
            data.data.map((item, i) => (
              <div
                key={i}
                className={`rounded-lg shadow-md overflow-hidden border ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <h1
                  className={`font-semibold p-3 text-lg border-b ${
                    dark ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-gray-100 text-gray-800 border-gray-200"
                  }`}
                >
                  {t("Group")} - {item?.groupName || t("No Name")}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto max-h-[60vh] scrollbar">
                  {item.artworks?.map((art, idx) => (
                    <div
                      key={idx}
                      className={`relative group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
                        dark ? "bg-gray-700" : "bg-white"
                      }`}
                      style={{
                        border: `2px solid ${statusColors[art?.status] || "#e5e7eb"}`,
                        boxShadow: dark ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className={`h-48 w-full ${dark ? "bg-gray-600" : "bg-gray-100"} flex items-center justify-center overflow-hidden relative`}
                      >
                        <img
                          className="object-contain w-full h-full p-2"
                          src={`${imageUrl}/users/${art?.media}`}
                          alt={art?.artworkName || "Artwork"}
                        />

                        <div
                          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                          onClick={() => handleArtworkClick(art._id, art?.status)}
                        >
                          <div className="flex gap-4">
                            <NavLink
                              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                                dark ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-100"
                              }`}
                              to={`/artist-panel/artwork/add?id=${art._id}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MdModeEditOutline className={dark ? "text-white" : "text-gray-800"} size={18} />
                            </NavLink>
                            <button
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                dark ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-100"
                              }`}
                            >
                              <img src={deleteimg} alt="delete" className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={`p-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                        <p className={`text-xs font-light italic mb-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                          {t(art?.discipline?.artworkDiscipline)} | {t(art?.artworkTechnic)}
                        </p>
                        <h3 className="font-medium text-center truncate">
                          {art?.artworkName?.length > 17 ? `${art.artworkName.slice(0, 17)}...` : art?.artworkName}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div
              className={`flex flex-col items-center justify-center h-64 rounded-lg ${
                dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              } border`}
            >
              <p className={`text-lg mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("You don't have any artwork yet.")}</p>
              <NavLink to="/artist-panel/artwork/add">
                <button
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    dark ? "bg-[#EE1D52] hover:bg-[#EE1D52]/90 text-white" : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  {t("Add Artwork")}
                </button>
              </NavLink>
            </div>
          )}
        </div>
      )}

      <ArtworkViewPopup isOpen={isPopupOpen} onClose={closePopup} id={selectedArtworkId} status={status} dark={dark} />
    </div>
  );
};

export default Artwork;
