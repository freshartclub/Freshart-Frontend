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

  const { data, isLoading } = useGetArtWorkList(selectedArtwork);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [status, setStatus] = useState(null);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleArtworkSelect = (name: string) => {
    setSelectedArtwork(name);
  };

  const handleArtistName = (artist) => {
    setSelectedArtwork(artist);
  };

  const handleArtworkClick = (artworkId, status) => {
    setSelectedArtworkId(artworkId);
    setIsPopupOpen(true);
    setStatus(status);
  };

  const { t } = useTranslation();

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4 mt-3"
      >
        {t("Artworks")}
      </Header>

      <div className="flex flex-col mb-4 gap-4">
        <div className="flex w-full max-w-full overflow-x-auto gap-2 pb-2 scrollbar">
          <button
            onClick={() => handleArtworkSelect("Discipline")}
            className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors ${
              selectedArtwork === "Discipline"
                ? "bg-black text-white shadow-md"
                : "bg-white shadow-sm hover:bg-gray-100"
            }`}
          >
            {t("Discipline")}
          </button>

          <button
            onClick={() => handleArtworkSelect("Series")}
            className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors ${
              selectedArtwork === "Series"
                ? "bg-black text-white shadow-md"
                : "bg-white shadow-sm hover:bg-gray-100"
            }`}
          >
            {t("Series")}
          </button>

          {isArtProvider === "Yes" && (
            <button
              onClick={() => handleArtistName("artprovider")}
              className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors ${
                selectedArtwork !== "Series" &&
                selectedArtwork !== "Discipline" &&
                selectedArtwork !== "Subscription" &&
                selectedArtwork !== "Purchase"
                  ? "bg-black text-white shadow-md"
                  : "bg-white shadow-sm hover:bg-gray-100"
              }`}
            >
              {t("Artist Name")}
            </button>
          )}

          <button
            onClick={() => handleArtworkSelect("Subscription")}
            className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors ${
              selectedArtwork === "Subscription"
                ? "bg-black text-white shadow-md"
                : "bg-white shadow-sm hover:bg-gray-100"
            }`}
          >
            {t("Subscription")}
          </button>

          <button
            onClick={() => handleArtworkSelect("Purchase")}
            className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors ${
              selectedArtwork === "Purchase"
                ? "bg-black text-white shadow-md"
                : "bg-white shadow-sm hover:bg-gray-100"
            }`}
          >
            {t("Purchase")}
          </button>
        </div>

        <div className="flex flex-wrap gap-3 bg-white p-3 rounded-lg shadow-sm border">
          {[
            { color: "bg-[#00DE00]", label: "Published" },
            { color: "bg-[#f0dd32]", label: "Draft" },
            { color: "bg-[#D8F002]", label: "Pending Approval" },
            { color: "bg-[#ac329e]", label: "Modified" },
            { color: "bg-blue-600", label: "Subscription" },
            { color: "bg-[#EE1D52]", label: "Not Available" },
            { color: "bg-[#696868]", label: "Purchased" },
            { color: "bg-[#a74343]", label: "Coming Soon" },
          ].map((status, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
              <p className="text-sm text-gray-700 whitespace-nowrap">
                {t(status.label)}
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
        <div className="space-y-6">
          {data?.data && data?.data.length > 0 ? (
            data?.data.map((item, i: number) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <h1 className="font-semibold bg-gray-100 p-3 text-lg text-gray-800 border-b">
                  {t("Group")} - {item?.groupName || t("No Name")}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto max-h-[60vh] scrollbar">
                  {item?.artworks?.map((art, idx: number) => (
                    <div
                      key={idx}
                      className={`relative group border rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                        art?.status === "published"
                          ? "border-[#00DE00]"
                          : art?.status === "pending"
                          ? "border-[#D8F002]"
                          : art?.status === "draft"
                          ? "border-[#696868]"
                          : art?.status === "modified"
                          ? "border-[#ac329e]"
                          : art?.status === "notAvailable"
                          ? "border-[#EE1D52]"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          className="object-contain w-full h-full p-2"
                          src={`${imageUrl}/users/${art?.media}`}
                          alt={art?.artworkName || "Artwork"}
                        />
                      </div>

                      <div className="p-3">
                        <p className="text-xs text-gray-500 text-center font-light italic mb-1">
                          {t(art?.discipline?.artworkDiscipline)} |{" "}
                          {t(art?.artworkTechnic)}
                        </p>
                        <h3 className="font-medium text-gray-900 text-center truncate">
                          {art?.artworkName.length > 17
                            ? art?.artworkName.slice(0, 17) + "..."
                            : art?.artworkName}
                        </h3>
                      </div>

                      <div
                        onClick={() => handleArtworkClick(art._id, art?.status)}
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex gap-4">
                          <NavLink
                            className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            to={`/artist-panel/artwork/add?id=${art._id}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MdModeEditOutline
                              className="text-gray-800"
                              size={18}
                            />
                          </NavLink>
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <img
                              src={deleteimg}
                              alt="delete"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border border-gray-200 rounded-lg bg-white">
              <p className="text-lg text-gray-700 mb-4">
                {t("You don't have any artwork yet.")}
              </p>
              <NavLink to="/artist-panel/artwork/add">
                <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  {t("Add Artwork")}
                </button>
              </NavLink>
            </div>
          )}
        </div>
      )}

      <ArtworkViewPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        id={selectedArtworkId}
        status={status}
      />
    </div>
  );
};

export default Artwork;
