import { useEffect, useRef, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Loader from "../ui/Loader";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import ArtworkVisualizer from "./ArtworkVisualizer";
import DiscoverContent from "./DiscoverContent";
import { useGetArtWorkById } from "./http/useGetArtWorkById";
import { MagnifierImage } from "./MagniferImage";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";

const DiscoverMore = () => {
  const dark = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const { id } = useParams() as { id: string };
  const preview = false;
  const [searchParams] = useSearchParams();
  const comingFrom = searchParams.get("comingFrom") as string;
  const { data, isLoading, isError } = useGetArtWorkById({
    id,
    preview,
    comingFrom,
    userId: user?._id,
  });

  const [safeMode, setSafeMode] = useState("Off");
  const [viewedImages, setViewedImages] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const sliderContainerRef = useRef(null);

  const images = data?.data
    ? [
        { src: data?.data.media?.mainImage, alt: "Main Image" },
        { src: data?.data.media?.backImage, alt: "Back Image" },
        { src: data?.data.media?.mainVideo, alt: "Main Video" },
        ...data?.data.media?.images?.map((item) => ({
          src: item,
          alt: "Additional Image",
        })),
        { src: data?.data.media?.inProcessImage, alt: "In Process Image" },
        ...data?.data.media?.otherVideo?.map((item) => ({
          src: item,
          alt: "Additional Video",
        })),
      ].filter((image) => image.src)
    : [];

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
  };

  const checkArtworkType = data?.data?.commercialization?.activeTab;
  const offensive = data?.data?.additionalInfo?.offensive === "Yes";

  const handleViewClick = (id: string) => {
    const newViewedImages = { ...viewedImages, [id]: Date.now() };
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setSafeMode("On");
    setViewedImages(newViewedImages);
  };

  const handleHideClick = (id) => {
    const newViewedImages = { ...viewedImages };
    delete newViewedImages[id];
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setSafeMode("Off");
    setViewedImages(newViewedImages);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("viewedImages") || "{}");
    const currentTime = Date.now();
    const filteredData = {};
    Object.keys(storedData).forEach((key) => {
      if (currentTime - storedData[key] < TEN_DAYS_MS) {
        filteredData[key] = storedData[key];
      }
    });
    localStorage.setItem("viewedImages", JSON.stringify(filteredData));
    setSafeMode(filteredData[id] ? "On" : "Off");
    setViewedImages(filteredData);
  }, [id]);

  useEffect(() => {
    if (sliderRef.current && sliderContainerRef?.current) {
      const containerWidth = sliderContainerRef?.current.offsetWidth;
      sliderRef.current.style.transform = `translateX(-${currentSlide * containerWidth}px)`;
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && sliderContainerRef?.current) {
        const containerWidth = sliderContainerRef?.current.offsetWidth;
        sliderRef.current.style.transform = `translateX(-${currentSlide * containerWidth}px)`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  if (isLoading) return <Loader theme={dark} />;

  return (
    <div className={`${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
      <div className="py-5 mx-2 lg:px-6 px-3 min-h-screen">
        <div className="mb-6">
          <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>Artwork Detail</h1>
          <div className={`flex items-center text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            <span className="hover:underline cursor-pointer" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="mx-2">•</span>
            <span className="hover:underline cursor-pointer" onClick={() => navigate(`/all-artworks?type=${checkArtworkType}`)}>
              {checkArtworkType === "subscription" ? "Subscription" : "Purchase"}
            </span>
            <span className="mx-2">•</span>
            <span>{data?.data.artworkName}</span>
          </div>
        </div>
        <div className="flex lg:w-[70%] mx-auto md:flex-row flex-col gap-0 md:gap-10">
          <div
            className={`flex md:flex-row flex-col md:h-[300px] py-2 md:w-[60%] ${
              dark ? "border-gray-700 bg-gray-800" : "border-zinc-300 bg-white"
            } rounded-lg shadow-md overflow-hidden w-full gap-2 items-center`}
          >
            <div
              className={`flex md:flex-col lg:px-0 px-2 md:h-[280px] w-full md:w-[17%] overflow-x-auto lg:overflow-y-auto gap-2 lg:pl-2 scrollbar ${
                dark ? "bg-gray-800" : "bg-zinc-100"
              }`}
            >
              {images?.map((thumb, index) => {
                const isVideo = thumb.src?.endsWith(".mp4");
                return thumb.src ? (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 w-[4rem] h-[4rem] overflow-hidden cursor-pointer ${
                      currentSlide === index ? (dark ? "border-2 border-blue-400" : "border-2 border-blue-500") : ""
                    } rounded-lg`}
                  >
                    {isVideo ? (
                      <video
                        src={`${imageUrl}/videos/${thumb?.src}`}
                        className={`${
                          offensive && safeMode === "Off" ? "blur-md brightness-75" : ""
                        } lg:w-full w-[4rem] h-[4rem] object-cover rounded`}
                      />
                    ) : (
                      <img
                        src={`${lowImageUrl}/${thumb?.src}`}
                        alt={thumb.alt}
                        className={`${
                          offensive && safeMode === "Off" ? "blur-md brightness-75" : ""
                        } lg:w-full w-[4rem] h-[4rem] object-cover rounded`}
                      />
                    )}
                  </div>
                ) : null;
              })}
            </div>

            <div ref={sliderContainerRef} className="flex-1 lg:w-[80%] md:h-[280px] h-[350px] w-full overflow-hidden relative">
              <div ref={sliderRef} className="flex transition-transform duration-300 ease-in-out h-full">
                {images.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 h-full">
                    {slide.src.endsWith(".mp4") ? (
                      <div className="h-full flex items-center justify-center bg-black">
                        <video
                          src={`${imageUrl}/videos/${slide?.src}`}
                          className={`${
                            offensive && safeMode === "Off" ? "blur-lg brightness-75" : ""
                          } shadow rounded-l mx-auto object-contain max-h-full max-w-full`}
                          controls
                          autoPlay={currentSlide === index}
                        />
                      </div>
                    ) : (
                      <div className="relative h-full flex items-center justify-center">
                        <MagnifierImage
                          src={`${lowImageUrl}/${slide?.src}`}
                          alt={`Slide ${index + 1}`}
                          isOffensive={offensive}
                          safeMode={safeMode}
                          enableZoom={index === 0}
                        />
                        {offensive && safeMode === "Off" ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewClick(data?.data?._id);
                            }}
                            className={`absolute z-[99] border ${
                              dark ? "bg-gray-700 border-gray-600" : "bg-white"
                            } px-2 py-1 rounded top-2 right-2 flex items-center gap-2 cursor-pointer`}
                          >
                            <p className="text-[12px]">Offensive View Off</p>
                            <FaToggleOff size={20} className="text-green-500" />
                          </div>
                        ) : offensive && safeMode === "On" ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHideClick(data?.data?._id);
                            }}
                            className={`absolute z-[99] border ${
                              dark ? "bg-gray-700 border-gray-600" : "bg-white"
                            } px-2 py-1 rounded top-2 right-2 flex items-center gap-2 cursor-pointer`}
                          >
                            <p className="text-[12px]">Offensive View On</p>
                            <FaToggleOn size={20} className="text-green-500" />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 ${
                      dark ? "bg-gray-700/80 hover:bg-gray-600" : "bg-white/80 hover:bg-white"
                    } p-2 rounded-full shadow-md`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                      dark ? "bg-gray-700/80 hover:bg-gray-600" : "bg-white/80 hover:bg-white"
                    } p-2 rounded-full shadow-md`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:w-[40%] md:mt-0 mt-4 w-full">
            <DiscoverContent data={data?.data} />
          </div>
        </div>

        <ProductInfo data={data} />
        <ArtworkVisualizer artwork={data} isLoading={isLoading} error={isError} />

        <SelectedSection data={data} />
      </div>
    </div>
  );
};

export default DiscoverMore;
