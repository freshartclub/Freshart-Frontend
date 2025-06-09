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
        <div className="w-full max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row gap-4">
        
          <div
            className={`flex gap-2 px-2 py-2 md:flex-col items-center md:items-start overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto md:h-[500px] max-w-full md:max-w-[100px] min-w-[80px]  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-lg ${dark ? "bg-gray-800" : "bg-zinc-100"} [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
          // style={{ maxWidth: '100px', minWidth: '80px' }}
          >
            {images?.map((thumb, index) => {
              const isVideo = thumb?.src?.endsWith(".mp4");
              return (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-20 h-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg
                    ${currentSlide === index ? (dark ? "border-2 border-blue-400" : "border-2 border-blue-500  transition-transform duration-[700ms] ease-[cubic-bezier(0.77,0,0.175,1)]") : ""}`}
                >
                  {isVideo ? (
                    <video
                      src={`${imageUrl}/videos/${thumb?.src}`}
                      className={`object-cover w-full h-full rounded ${offensive && safeMode === "Off" ? "blur-md brightness-75" : ""
                        }`}
                    />
                  ) : (
                    <img
                      src={`${lowImageUrl}/${thumb?.src}`}
                      alt={thumb?.alt}
                      className={`object-cover w-full h-full rounded ${offensive && safeMode === "Off" ? "blur-md brightness-75" : ""
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            ref={sliderContainerRef}
            className="relative flex-1 w-full md:w-[40%] h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <div ref={sliderRef} className="flex transition-transform duration-[700ms] ease-[cubic-bezier(0.77,0,0.175,1)] h-full">

            {images?.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 h-full">
                  {slide?.src?.endsWith(".mp4") ? (
                    <div className="h-full flex items-center justify-center bg-black">
                      <video
                        src={`${imageUrl}/videos/${slide?.src}`}
                        className={`object-contain w-full h-full ${offensive && safeMode === "Off" ? "blur-lg brightness-75" : ""
                          }`}
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
                    </div>
                  )}
                </div>
            ))}

            </div>

            {images?.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                  className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md transition-colors duration-300 ${dark
                    ? 'bg-black/80 hover:bg-black text-white'
                    : 'bg-white/80 hover:bg-white text-black'
                    }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                  }
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md transition-colors duration-300 ${dark
                    ? 'bg-black/80 hover:bg-black text-white'
                    : 'bg-white/80 hover:bg-white text-black'
                    }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

          </div>

          <div className="w-full md:w-[30%]">
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
