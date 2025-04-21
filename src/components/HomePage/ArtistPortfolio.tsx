import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl } from "../utils/baseUrls";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ArtistPortfolio = ({ data }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const redirectToAllArtistPage = () => {
    navigate("/all_artist");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArtistDesc = (id: string) => {
    navigate(`/artist_detail/${id}`);
    window.scroll(0, 0);
  };

  const name = (val: { artistName: string; artistSurname1: string; artistSurname2: string }) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  const mapData = (val: string[]) => {
    if (!val || val.length === 0) return "";
    return val.join(" | ");
  };

  useEffect(() => {
    const handleScrollCheck = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      setIsStart(container.scrollLeft === 0);
      setIsEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollCheck);
      handleScrollCheck();
    }

    return () => container?.removeEventListener("scroll", handleScrollCheck);
  }, [data]);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`mx-auto px-4 md:px-8 lg:px-12 mt-10 ${dark ? "bg-gray-900" : "bg-white"}`}>
      <h1 className={`text-xl font-semibold ${dark ? "text-gray-100" : "text-gray-900"} mb-6 tracking-tight`}>Artist Portfolio's</h1>

      <div className="relative">
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
            isStart ? "hidden" : `${dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"} text-white`
          }`}
          onClick={() => handleScroll("left")}
          disabled={isStart}
        >
          <FaChevronLeft size={20} />
        </button>

        <div ref={scrollContainerRef} className="overflow-x-auto scrollbar pb-4">
          <div className="flex gap-4 px-2" style={{ paddingTop: "3rem" }}>
            {data?.artists?.map((item, i: number) => (
              <div
                key={i}
                className={`relative cursor-pointer p-3 border flex-shrink-0 ${
                  dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } hover:shadow-lg transition-shadow duration-300 w-[230px] h-[320px]`}
                onClick={() => handleArtistDesc(item._id)}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[4.5rem] h-[4.5rem] z-50 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <img
                    src={`${imageUrl}/users/${item?.profile?.mainImage}`}
                    alt="profile"
                    className="w-full h-full object-cover bg-gray-100"
                    onError={(e) =>
                      (e.currentTarget.src = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg")
                    }
                  />
                </div>

                <div className="h-full flex flex-col items-center pt-8">
                  <h3 className={`text-lg font-medium text-center ${dark ? "text-gray-100" : "text-gray-900"}`}>
                    {name(item).length > 17 ? name(item).slice(0, 17) + "..." : name(item)}
                  </h3>

                  <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"} text-center line-clamp-2`}>
                    {item?.aboutArtist?.discipline && mapData(item.aboutArtist.discipline.map((d) => d.discipline))}
                  </p>

                  <div className="mt-4 w-full h-52 overflow-hidden rounded">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      src={
                        item?.profile?.inProcessImage || item?.profile?.mainImage
                          ? `${imageUrl}/users/${item?.profile?.inProcessImage || item?.profile?.mainImage}`
                          : "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                      }
                      alt="Artwork"
                      onError={(e) =>
                        (e.currentTarget.src = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg")
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg z-10 ${
            isEnd ? "hidden" : `${dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-900"} text-white`
          }`}
          onClick={() => handleScroll("right")}
          disabled={isEnd}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ArtistPortfolio;
