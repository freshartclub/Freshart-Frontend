import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import { useGetArtWorkList } from "./http/getArtWorkList";
import Loader from "../ui/Loader";
import { NavLink } from "react-router-dom";
import edit from "../ArtistDetail/assets/edit.png";
import deleteimg from "../ArtistDetail/assets/Container (2).png";
import { ArtworkViewPopup } from "./Pop";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper default styles
import "swiper/css/navigation"; // If you're using navigation controls
import "swiper/css/pagination"; // If you're using pagination
import { useAppSelector } from "../../store/typedReduxHooks";

const Artwork = () => {
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState("series");
  const isArtProvider = useAppSelector((state) => state.user.isArtProvider);

  const { data, isLoading, refetch, isRefetching } =
    useGetArtWorkList(selectedArtwork);

  const profile = localStorage.getItem("profile");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [action, setAction] = useState("");
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [status, setStatus] = useState(null);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAction = (actionType) => {
    setAction(actionType);
  };

  useEffect(() => {
    refetch();
  }, [selectedArtwork]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, data]);
  const handleArtworkSelect = (artwork) => {
    const currentValue = artwork.target.innerHTML;
    setSelectedArtwork(currentValue);
  };

  const handleArtworkClick = (artworkId, status) => {
    setSelectedArtworkId(artworkId);
    setIsPopupOpen(true);
    setStatus(status);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-3 lg:px-0">
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4 mt-4"
      >
        Artworks
      </Header>

      <div className="flex flex-col sm:flex-row justify-start mb-4 gap-3 pb-3 ">
        <span
          onClick={handleArtworkSelect}
          className="px-2 py-2 bg-white font-medium rounded cursor-pointer text-md"
        >
          Series
        </span>

        <span
          onClick={handleArtworkSelect}
          className="px-2 py-2 bg-white font-medium rounded cursor-pointer text-md"
        >
          Discipline
        </span>

        {isArtProvider === "Yes" ? (
          <span
            onClick={handleArtworkSelect}
            className="px-2 py-2 bg-white font-medium rounded cursor-pointer text-md"
          >
            Artist Name
          </span>
        ) : null}

        <div className="flex gap-2 flex-wrap justify-end pt-2">
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#00DE00] flex items-center"></div>
            <p className="text-[14px] text-black">Published</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#f0dd32] flex items-center"></div>
            <p className="text-[14px] text-black">Draft</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#D8F002] flex items-center"></div>
            <p className="text-[14px] text-black">Pending</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#ac329e] flex items-center"></div>
            <p className="text-[14px] text-black">Modified</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-blue-600 flex items-center"></div>
            <p className="text-[14px] text-black">Subscription</p>
          </div>
          {/* <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#FFA600] flex items-center"></div>
          <p className="text-[14px] text-black">In subscription</p>
        </div> */}
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full   bg-[#EE1D52]   flex items-center"></div>
            <p className="text-[14px] text-black">Not Available</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[.8em] h-[.8em] rounded-full bg-[#696868] flex items-center"></div>
            <p className="text-[14px] text-black">Purchased</p>
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
                <h1 className="font-bold mb-5 mt-5 text-[20px] capitalize text-[#333333] xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                  {item?.groupName || "No Name"}
                </h1>

                <Swiper
                  spaceBetween={20}
                  slidesPerView={"auto"}
                  autoplay={false}
                  loop
                  pagination={{ clickable: true }}
                >
                  {item?.artworks?.map((art, idx) => (
                    <div
                      key={idx}
                      className={`bg-red-300 rounded-lg pb-5 border-4 ${
                        art?.status === "published"
                          ? "border-[#00DE00]"
                          : art?.status === "pending"
                          ? "border-[#D8F002]"
                          : art?.status === "draft"
                          ? "border-[#696868]"
                          : art?.status === "pending"
                          ? "border-[#D8F002]"
                          : art?.status === "modified"
                          ? "border-[#ac329e]"
                          : art?.status === "notAvailable"
                          ? "border-[#e53a3a]"
                          : "border-[#D8F002]"
                      }`}
                    >
                      <SwiperSlide
                        className={`w-fit rounded-lg pb-5 border-4 overflow-hidden ${
                          art?.status === "published"
                            ? "border-[#00DE00]"
                            : art?.status === "pending"
                            ? "border-[#D8F002]"
                            : art?.status === "modified"
                            ? "border-[#ac329e]"
                            : art?.status === "subscription"
                            ? "border-blue-600"
                            : art?.status === "draft"
                            ? "border-[#f0dd32]"
                            : art.status === "notAvailable"
                            ? "border-[#e53a3a]"
                            : art?.status === "purchased"
                            ? "border-[#D8F002]"
                            : null
                        }`}
                      >
                        <img
                          className="w-[20rem] h-[20rem] object-cover"
                          src={`${data?.url}/users/${art?.media}`}
                          alt=""
                        />
                        <p className="text-[14px] text-center text-zinc-800]">
                          {art?.discipline?.artworkDiscipline}
                        </p>
                        <h1 className="font-semibold text-center text-[20px] text-black ">
                          {art?.artworkName}
                        </h1>
                        <p className="text-[12px] text-center text-zinc-800">
                          {art?.artworkTechnic}
                        </p>

                        {profile === "artist" && (
                          <div
                            onClick={() =>
                              handleArtworkClick(art._id, art?.status)
                            }
                            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[#D9D9D9] bg-fixed flex gap-10 items-center justify-center opacity-0 transition duration-300 ease-in-out hover:opacity-[0.7] hover:cursor-pointer"
                          >
                            {item?.status === "draft" ? (
                              <div className="flex gap-5">
                                <NavLink
                                  to={`/artist-panel/artwork/add?id=${item._id}`}
                                >
                                  <img src={edit} alt="edit" />
                                </NavLink>
                                <img src={deleteimg} alt="delete" />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </SwiperSlide>
                    </div>
                  ))}
                </Swiper>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] border border-zinc-300">
              <p className="text-lg text-center font-medium mb-4">
                You don't have any artwork yet.
              </p>
              <NavLink to="/artist-panel/artwork/add">
                <button className="px-6 py-2 bg-zinc-800 text-white rounded-lg">
                  Add Artwork
                </button>
              </NavLink>
            </div>
          )}
        </div>
      )}

      <ArtworkViewPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAction={handleAction}
        id={selectedArtworkId}
        status={status}
      />
    </div>
  );
};

export default Artwork;
