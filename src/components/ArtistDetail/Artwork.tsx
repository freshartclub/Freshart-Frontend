import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdModeEditOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAppSelector } from "../../store/typedReduxHooks";
import deleteimg from "../ArtistDetail/assets/Container (2).png";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetArtWorkList } from "./http/getArtWorkList";
import { ArtworkViewPopup } from "./Pop";

const Artwork = () => {
  const [selectedArtwork, setSelectedArtwork] = useState("Series");
  const isArtProvider = useAppSelector((state) => state.user.isArtProvider);

  const { data, isLoading, refetch, isRefetching } =
    useGetArtWorkList(selectedArtwork);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [status, setStatus] = useState(null);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [selectedArtwork]);

  const handleArtworkSelect = (name:string) => {
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

  if (isLoading) return <Loader />;

  return (
    <div className="px-3">
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4 mt-3"
      >
        {t("Artworks")}
      </Header>

      <div className="flex flex-col mb-4 gap-3">
        <div className="flex gap-2">
          <span
            onClick={() => handleArtworkSelect("Series")}
            className={`border px-2 py-2 font-medium rounded cursor-pointer text-md ${
              selectedArtwork === "Series" && "bg-black text-white"
            }`}
          >
            {t("Series")}
          </span>

          <span
            onClick={() => handleArtworkSelect("Discipline")}
            className={`border px-2 py-2 font-medium rounded cursor-pointer text-md ${
              selectedArtwork === "Discipline" && "bg-black text-white"
            }`}
          >
            {t("Discipline")}
          </span>
          {isArtProvider === "Yes" ? (
            <span
              onClick={() => handleArtistName("artprovider")}
              className={`border ${
                selectedArtwork !== "Series" && selectedArtwork !== "Discipline"
                  ? "bg-black text-white"
                  : ""
              }px-2 py-2 bg-white font-medium rounded cursor-pointer text-md`}
            >
              {t("Artist Name")}
            </span>
          ) : null}
        </div>

        <div className="flex bg-white p-2 rounded gap-2 w-full max-w-full scrollbar overflow-x-auto pt-2">
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
            <p className="text-[14px] w-max text-black">
              {t("Not Available")}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#696868] flex items-center"></div>
            <p className="text-[14px] text-black">{t("Purchased")}</p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#a74343] flex items-center"></div>
            <p className="text-[14px] w-max text-black">
              {t("Coming Soon")}
            </p>
          </div>
        </div>
      </div>
      {isRefetching ? (
        <Loader />
      ) : (
        <div>
          {data?.data && data?.data.length > 0 ? (
            data?.data.map((item, i) => (
              <div key={i} className="mb-5">
                <h1 className="font-semibold mb-3 mt-5 text-xl capitalize text-[#333333] xl:w-[80%] lg:w-[70%] w-[90%] line-clamp-2">
                  {item?.groupName || t("No Name")}
                </h1>

                <div className="flex flex-wrap gap-6">
                  {item?.artworks?.map((art, idx) => (
                    <div
                      key={idx}
                      className={`bg-white relative rounded-lg border-4 pb-5 overflow-hidden flex  flex-col items-center ${
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
                        minWidth: "250px",
                        maxWidth: "calc(33.333% - 1rem)",
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
                          {art?.artworkName}
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
