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
    <div className="px-3">
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4 mt-3"
      >
        {t("Artworks")}
      </Header>

      <div className="flex flex-col mb-3 gap-3">
        <div className="flex w-full max-w-full overflow-y-auto gap-2">
          <span
            onClick={() => handleArtworkSelect("Discipline")}
            className={`p-2 font-medium shadow rounded cursor-pointer text-md ${
              selectedArtwork === "Discipline"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {t("Discipline")}
          </span>

          <span
            onClick={() => handleArtworkSelect("Series")}
            className={`p-2 font-medium rounded shadow cursor-pointer text-md ${
              selectedArtwork === "Series" ? "bg-black text-white" : "bg-white"
            }`}
          >
            {t("Series")}
          </span>
          {isArtProvider === "Yes" ? (
            <span
              onClick={() => handleArtistName("artprovider")}
              className={`${
                selectedArtwork !== "Series" &&
                selectedArtwork !== "Discipline" &&
                selectedArtwork !== "Subscription" &&
                selectedArtwork !== "Purchase"
                  ? "bg-black text-white"
                  : "bg-white"
              } p-2 shadow font-medium rounded cursor-pointer text-md`}
            >
              {t("Artist Name")}
            </span>
          ) : null}

          <span
            onClick={() => handleArtworkSelect("Subscription")}
            className={`p-2 font-medium rounded shadow cursor-pointer text-md ${
              selectedArtwork === "Subscription"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {t("Subscription")}
          </span>

          <span
            onClick={() => handleArtworkSelect("Purchase")}
            className={`p-2 font-medium rounded shadow cursor-pointer text-md ${
              selectedArtwork === "Purchase"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {t("Purchase")}
          </span>
        </div>

        <div className="flex border bg-white px-2 py-1 rounded-full gap-2 w-full max-w-full scrollbar overflow-x-auto">
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#00DE00] flex items-center"></div>
            <p className="text-[14px] text-black">{t("Published")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#f0dd32] flex items-center"></div>
            <p className="text-[14px] text-black">{t("Draft")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#D8F002] flex items-center"></div>
            <p className="text-[14px] w-max text-black">
              {t("Pending Approval")}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#ac329e] flex items-center"></div>
            <p className="text-[14px] text-black">{t("Modified")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-blue-600 flex items-center"></div>
            <p className="text-[14px] text-black">{t("Subscription")}</p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full   bg-[#EE1D52]   flex items-center"></div>
            <p className="text-[14px] w-max text-black">{t("Not Available")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#696868] flex items-center"></div>
            <p className="text-[14px] text-black">{t("Purchased")}</p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#a74343] flex items-center"></div>
            <p className="text-[14px] w-max text-black">{t("Coming Soon")}</p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {data?.data && data?.data.length > 0 ? (
            data?.data.map((item, i: number) => (
              <div key={i} className="mb-5 bg-white shadow rounded-lg border">
                <h1 className="font-semibold bg-gray-200 mb-3 p-2 text-lg capitalize border-b border-gray-300 pb-1 text-[#333333]">
                  {t("Group")} - {item?.groupName || t("No Name")}
                </h1>

                <div className="flex px-2 flex-wrap mx-auto pb-2 md:h-[70vh] md:max-h-[70vh] max-h-[61vh] overflow-y-auto scrollbar2 gap-6">
                  {item?.artworks?.map((art, idx: number) => (
                    <div
                      key={idx}
                      className={`relative rounded-lg border-2 sm:mx-0 mx-auto shadow-md pb-5 overflow-hidden flex flex-col items-center ${
                        art?.status === "published"
                          ? "border-[#00DE00]"
                          : art?.status === "pending"
                          ? "border-[#D8F002]"
                          : art?.status === "draft"
                          ? "border-[#696868]"
                          : art?.status === "modified"
                          ? "border-[#ac329e]"
                          : art?.status === "notAvailable"
                          ? "border-[#e53a3a]"
                          : "border-[#D8F002]"
                      }`}
                      style={{
                        flex: "1 1 calc(33.333% - 1rem)",
                        minWidth: "270px",
                        maxWidth: "270px",
                        maxHeight: "410px",
                      }}
                    >
                      <div className="w-full">
                        <img
                          className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
                          src={`${imageUrl}/users/${art?.media}`}
                          alt={art?.artworkName || "Artwork"}
                        />
                        <p className="text-sm sm:text-base text-center text-zinc-800 mt-2">
                          {t(art?.discipline?.artworkDiscipline)}
                        </p>
                        <h1 className="font-semibold text-center text-lg sm:text-xl text-black mt-1">
                          {art?.artworkName.length > 17
                            ? `${art?.artworkName?.slice(0, 17)}...`
                            : art?.artworkName}
                        </h1>
                        <p className="text-sm text-center text-zinc-800 mt-1">
                          {t(art?.artworkTechnic)}
                        </p>
                        <div
                          onClick={() =>
                            handleArtworkClick(art._id, art?.status)
                          }
                          className="absolute inset-0 bg-[#D9D9D9] bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-70 transition duration-300 cursor-pointer z-10"
                        >
                          <div className="flex gap-5">
                            <NavLink
                              className="flex items-center py-1 px-3 bg-zinc-800"
                              to={`/artist-panel/artwork/add?id=${art._id}`}
                            >
                              <MdModeEditOutline
                                className="text-white"
                                fontSize={20}
                              />
                            </NavLink>
                            <img src={deleteimg} alt="delete" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] border border-zinc-300">
              <p className="text-lg text-center font-medium mb-4">
                {t("You don't have any artwork yet.")}
              </p>
              <NavLink to="/artist-panel/artwork/add">
                <button className="px-6 py-2 bg-zinc-800 text-white rounded-lg">
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
