import { useEffect, useRef, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { Link, useParams, useSearchParams } from "react-router-dom";
import arrow from "../../assets/arrow_22.png";
import home from "../../assets/home.png";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import DiscoverContent from "./DiscoverContent";
import { useGetArtWorkById } from "./http/useGetArtWorkById";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";

const MagnifierImage = ({ src, alt, isOffensive, safeMode }) => {
  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
  const imgRef = useRef(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !magnifierRef.current || !imgRef.current)
      return;

    const container = containerRef.current;
    const magnifier = magnifierRef.current;
    const img = imgRef.current;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const posX = e.clientX - imgRect.left;
    const posY = e.clientY - imgRect.top;

    const percX = (posX / imgRect.width) * 100;
    const percY = (posY / imgRect.height) * 100;
    const backgroundPos = `${percX}% ${percY}%`;

    const magnifierSize = Math.min(Math.max(imgRect.width * 0.15, 100), 200);
    const magnifierOffset = magnifierSize / 2;

    let magnifierX = e.clientX - containerRect.left - magnifierOffset;
    let magnifierY = e.clientY - containerRect.top - magnifierOffset;

    magnifierX = Math.max(
      0,
      Math.min(magnifierX, containerRect.width - magnifierSize)
    );
    magnifierY = Math.max(
      0,
      Math.min(magnifierY, containerRect.height - magnifierSize)
    );

    const zoomLevel = imgRect.width < 400 ? 3 : 2;

    magnifier.style.width = `${magnifierSize}px`;
    magnifier.style.height = `${magnifierSize}px`;
    magnifier.style.left = `${magnifierX}px`;
    magnifier.style.top = `${magnifierY}px`;
    magnifier.style.backgroundPosition = backgroundPos;
    magnifier.style.backgroundSize = `${imgRect.width * zoomLevel}px ${
      imgRect.height * zoomLevel
    }px`;
  };

  const handleMouseEnter = () => {
    if (magnifierRef.current) {
      magnifierRef.current.style.display = "block";
    }
  };

  const handleMouseLeave = () => {
    if (magnifierRef.current) {
      magnifierRef.current.style.display = "none";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-zinc-100 p-2 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`${
          isOffensive && safeMode === "Off" ? "blur-lg brightness-75" : ""
        } mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh]`}
      />
      <div
        ref={magnifierRef}
        className="magnifier"
        style={{
          display: "none",
          position: "absolute",
          borderRadius: "50%",
          border: "3px solid #fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          backgroundColor: "white",
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          zIndex: 100,
          transition: "all 0.1s ease",
        }}
      />
    </div>
  );
};

const DiscoverMore = () => {
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const { id } = useParams();
  const preview = false;
  const [searchParams] = useSearchParams();
  const comingFrom = searchParams.get("comingFrom");
  const { data, isLoading } = useGetArtWorkById(id, preview, comingFrom);
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

  const handleViewClick = (id) => {
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

  // Handle slide transition
  useEffect(() => {
    if (sliderRef.current && sliderContainerRef.current) {
      const containerWidth = sliderContainerRef.current.offsetWidth;
      sliderRef.current.style.transform = `translateX(-${
        currentSlide * containerWidth
      }px)`;
    }
  }, [currentSlide]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && sliderContainerRef.current) {
        const containerWidth = sliderContainerRef.current.offsetWidth;
        sliderRef.current.style.transform = `translateX(-${
          currentSlide * containerWidth
        }px)`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  if (isLoading) return <Loader />;

  return (
    <div className="lg:mx-6 mx-3 lg:px-6 px-3">
      <ul className="flex md:p-2 gap-4 text-xl text-[#2E4053] overflow-x-auto w-full items-center mt-10 mb-5">
        <li>
          <Link to="/" className="rounded-md transition-all flex">
            <img
              src={home}
              alt="Home icon"
              className="w-[14px] h-[14px] mr-2"
            />
            <P
              variant={{ size: "small", theme: "dark", weight: "medium" }}
              className="text-[#FF536B]"
            >
              Home
            </P>
          </Link>
        </li>
        <img src={arrow} alt="Arrow" className="w-[4px] h-[6px] mr-2" />
        <li>
          <Link
            to={
              checkArtworkType === "subscription"
                ? "/all-artworks?type=subscription"
                : "/all-artworks?type=purchase"
            }
            className="rounded-md transition-all flex"
          >
            <P
              variant={{ size: "small", theme: "dark", weight: "medium" }}
              className="text-[#FF536B]"
            >
              {checkArtworkType === "subscription"
                ? "Subscription"
                : "Purchase"}
            </P>
          </Link>
        </li>
        <img src={arrow} alt="Arrow" className="w-[4px] h-[6px] mr-2" />
        <P
          className="min-w-max scrollbar"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.data.artworkName}
        </P>
      </ul>

      <div className="flex lg:w-[77%] mx-auto md:flex-row flex-col gap-0 lg:gap-5">
        <div className="flex lg:flex-row flex-col md:w-[60%] border border-zinc-300 rounded-lg shadow-md overflow-hidden w-full gap-2 items-center">
          <div className="flex lg:flex-col lg:h-[60vh] h-[4rem] w-full lg:w-[17%] overflow-x-auto lg:overflow-y-auto gap-2 lg:pl-2 scrollbar">
            {images?.map((thumb, index) => {
              const isVideo = thumb.src?.endsWith(".mp4");
              return thumb.src ? (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 cursor-pointer ${
                    currentSlide === index
                      ? "border-2 border-blue-500 rounded-lg"
                      : ""
                  }`}
                >
                  {isVideo ? (
                    <video
                      src={`${imageUrl}/videos/${thumb.src}`}
                      className={`${
                        offensive && safeMode === "Off"
                          ? "blur-md brightness-75"
                          : ""
                      } lg:w-full w-16 h-16 lg:h-20 object-cover rounded`}
                    />
                  ) : (
                    <img
                      src={`${lowImageUrl}/${thumb.src}`}
                      alt={thumb.alt}
                      className={`${
                        offensive && safeMode === "Off"
                          ? "blur-md brightness-75"
                          : ""
                      } lg:w-full w-16 h-16 lg:h-20 object-cover rounded`}
                    />
                  )}
                </div>
              ) : null;
            })}
          </div>

          <div
            ref={sliderContainerRef}
            className="flex-1 lg:w-[80%] lg:h-[22rem] w-full overflow-hidden relative"
          >
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out h-full"
            >
              {images.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  {slide.src.endsWith(".mp4") ? (
                    <video
                      src={`${imageUrl}/videos/${slide.src}`}
                      className={`${
                        offensive && safeMode === "Off"
                          ? "blur-lg brightness-75"
                          : ""
                      } shadow rounded-l mx-auto object-cover w-full h-[20rem] md:h-[60vh] lg:h-[22rem]`}
                      controls
                      autoPlay={currentSlide === index}
                    />
                  ) : (
                    <div className="relative h-full">
                      <MagnifierImage
                        src={`${lowImageUrl}/${slide.src}`}
                        alt={`Slide ${index + 1}`}
                        isOffensive={offensive}
                        safeMode={safeMode}
                      />
                      {offensive && safeMode === "Off" ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewClick(data?.data?._id);
                          }}
                          className="absolute z-[99] border bg-white px-2 py-1 rounded top-2 right-2 flex items-center gap-2"
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
                          className="absolute z-[99] border bg-white px-2 py-1 rounded top-2 right-2 flex items-center gap-2"
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
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
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
                    setCurrentSlide((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
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
        </div>

        <div className="md:w-[40%] lg:mt-0 md:mt-[5rem] w-full">
          <DiscoverContent data={data?.data} />
        </div>
      </div>

      <ProductInfo data={data} />
      <SelectedSection data={data} />
    </div>
  );
};

export default DiscoverMore;
