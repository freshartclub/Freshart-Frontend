import { useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetArtWorkBySeries } from "./http/getArtworkBySeries";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

const ArtworkSeries = ({ dark }: { dark: boolean }) => {
  const id = useParams().id as string;
  const { data, isLoading } = useGetArtWorkBySeries(id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const handleArtworkClick = (seriesName: string) => {
    const slugify = (text: string) =>
      text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/artist-series/${encodeURIComponent(seriesName)}`);
  };


  return (
    <div className={`mx-auto px-4 mt-8 relative ${dark ? "bg-[#0d1117]" : "bg-white"}`}>
      <Header
        variant={{
          size: "xl",
          theme: dark ? "light" : "dark",
          weight: "semiBold",
        }}
      >
        Series of Artwork
      </Header>

      {isLoading ? (
        <Loader />
      ) : data?.data && data?.data?.length > 0 ? (
        <div className="relative mt-6">

          <button
            onClick={scrollLeft}
            className="absolute z-[999] left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-all duration-300"
          >
            <FaChevronLeft size={16} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute z-[9999] right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-all duration-300"
          >
            <FaChevronRight size={16} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar gap-4 py-4 px-8 scroll-smooth   [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]"
          >
            {data?.data?.map((group, i: number) => (
              <div
                key={i}
                className={`flex-shrink-0 w-[300px] h-[300px] rounded-lg border transition-all duration-300 ${dark ? "bg-[#1a1a1a] border-gray-700" : "bg-white border-gray-300"
                  }`}
              >
                <div className="w-full h-[200px] p-2 overflow-hidden">
                  {group?.artworks?.length === 1 ? (
                    // one artwork
                    <div  key={i}  className="p-2 cursor-pointer flex items-center justify-center">
                      <img
                        src={`${imageUrl}/users/${group.artworks[0]?.media}`}
                        alt="Artwork"
                        className="object-cover w-[90%] sm:w-[40vw] h-[32vh] rounded-md"
                      />
                    </div>
                  ) : group?.artworks?.length === 2 ? (
                    // two artworks
                    <div  className="flex items-center justify-center gap-2 p-2">
                      {group.artworks.map((artwork, idx) => (
                        <img
                        // onClick={() => handleArtworkClick(group?.groupName)}
                          key={idx}
                          src={`${imageUrl}/users/${artwork?.media}`}
                          alt={`Artwork ${idx + 1}`}
                          className="object-cover w-[45%] sm:w-[40vw] h-[32vh] rounded-md cursor-pointer"
                        />
                      ))}
                    </div>
                  ) : group?.artworks?.length >= 3 ? (
                    // three or more
                    <div className="flex gap-2 p-2 h-[34.5vh]">
                      <div className="w-[60%]">
                        <img
                          src={`${imageUrl}/users/${group?.artworks[0]?.media}`}
                          alt="Main Artwork"
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-[40%]">
                        <div className="w-full h-[48%]">
                          <img
                            src={`${imageUrl}/users/${group.artworks[1]?.media}`}
                            alt="Artwork 2"
                            className="object-cover w-full h-full rounded-md"
                          />
                        </div>
                        <div
                          //  onClick={() => handleArtworkClick(group?.groupName)}
                          style={{
                            backgroundImage: `url(${imageUrl}/users/${group.artworks[2]?.media})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          className="relative cursor-pointer flex items-center justify-center text-center font-semibold text-white rounded-md h-[48%] w-full"
                        >
                          <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                          <span className="relative font-bold drop-shadow-lg">See All</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-400">No artworks in this group.</div>
                  )}

                </div>

                <div className="flex justify-between items-center px-3 h-[100px]">
                  <h3 className={`${dark ? "text-white" : "text-black"} font-semibold truncate`}>
                    {group?.groupName === "N/A" ? "Untitled" : group?.groupName}
                  </h3>
                  <h3 className={`${dark ? "text-white" : "text-black"} text-sm`}>
                    Artworks : {group?.artworks?.length || 0}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div
          className={`p-4 border w-full ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"
            } text-center font-semibold mt-6 rounded-md`}
        >
          No Series Found
        </div>
      )}
    </div>
  );
};

export default ArtworkSeries;
