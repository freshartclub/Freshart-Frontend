import { useEffect, useRef, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import arrow from "../../assets/arrow_22.png";
import home from "../../assets/home.png";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import DiscoverContent from "./DiscoverContent";
import { useGetArtWorkById } from "./http/useGetArtWorkById";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";

// New MagnifierImage Component
const MagnifierImage = ({ src, alt, isOffensive, safeMode }) => {
  const containerRef = useRef(null);
  const magnifierRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const magnifier = magnifierRef.current;
    if (!container || !magnifier) {
      // console.error("Refs missing", { container, magnifier });
      return;
    }

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clampedX = Math.max(0, Math.min(x, rect.width));
    const clampedY = Math.max(0, Math.min(y, rect.height));

    const bgX = (clampedX / rect.width) * 100;
    const bgY = (clampedY / rect.height) * 100;

    magnifier.style.left = `${clampedX}px`;
    magnifier.style.top = `${clampedY}px`;
    magnifier.style.backgroundPosition = `${bgX}% ${bgY}%`;

    // console.log("Mouse Move:", { x, y, clampedX, clampedY, bgX, bgY, rect });
  };

  const handleMouseEnter = () => {
    const magnifier = magnifierRef.current;
    if (magnifier) {
      magnifier.style.display = "block";
      // console.log("Magnifier Enter: Shown");
    }
  };

  const handleMouseLeave = () => {
    const magnifier = magnifierRef.current;
    if (magnifier) {
      magnifier.style.display = "none";
      // console.log("Magnifier Leave: Hidden");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#f8f8ea] p-2 w-full h-full"
      style={{ position: "relative", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className={`${
          isOffensive && safeMode === "Off" ? "blur-lg brightness-75" : ""
        } mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh] !lg:h-[22rem]`}
      />
      <div
        ref={magnifierRef}
        style={{
          display: "block",
          position: "absolute",
          width: "128px",
          height: "128px",
          borderRadius: "50%",
          border: "2px solid #666",
          backgroundColor: "white",
          backgroundImage: `url(${imageUrl}/users/${src.split("/").pop()})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "300%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 100,
          top: "50%",
          left: "50%",
        }}
      />
    </div>
  );
};

const DiscoverMore = () => {
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const sliderRef = useRef(null);
  const { id } = useParams();
  const preview = false;

  const { data, isLoading } = useGetArtWorkById(id, preview);
  const [safeMode, setSafeMode] = useState("Off");
  const [viewedImages, setViewedImages] = useState({});

  const images = data?.data
    ? [
        { src: data?.data.media?.mainImage, alt: "Main Image" },
        { src: data?.data.media?.backImage, alt: "Back Image" },
        { src: data?.data.media?.mainVideo, alt: "Main Video" },
        { src: data?.data.media?.inProcessImage, alt: "In Process Image" },
        ...data?.data.media?.images?.map((item) => ({
          src: item,
          alt: "Additional Image",
        })),
      ].filter((image) => image.src)
    : [];

  const settings = {
    dots: false,
    infinite: images.length > 1,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleThumbnailClick = (index) => {
    sliderRef.current?.slickGoTo(index);
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

  if (isLoading) return <Loader />;

  return (
    <div className="lg:mx-6 mx-3 lg:px-6 px-3">
      {/* Breadcrumbs */}
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
        <div className="flex lg:flex-row flex-col md:w-[60%] w-full gap-2 items-center">
          {/* Thumbnails */}
          <div className="flex overflow-hidden lg:justify-start justify-center lg:flex-col lg:max-h-[60vh] h-[5rem] lg:h-[60vh] md:w-[20rem] overflow-x-auto lg:overflow-y-auto gap-2 lg:w-[15%] lg:ml-4 scrollbar">
            {images?.map((thumb, index) => {
              const isVideo = thumb.src?.endsWith(".mp4");
              return thumb.src ? (
                isVideo ? (
                  <video
                    key={index}
                    src={`${imageUrl}/videos/${thumb.src}`}
                    className={`${
                      offensive && safeMode === "Off"
                        ? "blur-md brightness-75"
                        : ""
                    } md:mb-0 mb-4 lg:w-20 w-16 h-16 lg:h-24 cursor-pointer object-cover`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ) : (
                  <img
                    key={index}
                    src={`${lowImageUrl}/${thumb.src}`}
                    alt={thumb.alt}
                    className={`${
                      offensive && safeMode === "Off"
                        ? "blur-md brightness-75"
                        : ""
                    } md:mb-0 mb-4 lg:w-20 w-16 h-16 lg:h-24 cursor-pointer object-cover`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                )
              ) : null;
            })}
          </div>

          {/* Main Image/Video Slider */}
          <div className="flex-1 md:w-[80%] lg:h-[22rem] w-full overflow-hidden">
            {images.length > 1 ? (
              <Slider {...settings} ref={sliderRef} className="discover_more">
                {images.map(
                  (slide, index) =>
                    slide.src && (
                      <div key={index} className="mt-2 overflow-hidden">
                        {slide.src.endsWith(".mp4") ? (
                          <video
                            src={`${imageUrl}/videos/${slide.src}`}
                            className={`${
                              offensive && safeMode === "Off"
                                ? "blur-lg brightness-75"
                                : ""
                            } shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] !lg:h-[22rem]`}
                            controls
                          />
                        ) : (
                          <div className="relative">
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
                                <p className="text-[12px]">
                                  Offensive View Off
                                </p>
                                <FaToggleOff
                                  size={20}
                                  className="text-green-500"
                                />
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
                                <FaToggleOn
                                  size={20}
                                  className="text-green-500"
                                />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    )
                )}
              </Slider>
            ) : (
              images[0]?.src &&
              (images[0].src.endsWith(".mp4") ? (
                <video
                  src={`${imageUrl}/videos/${images[0].src}`}
                  className={`${
                    offensive && safeMode === "Off"
                      ? "blur-lg brightness-75"
                      : ""
                  } shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]`}
                  controls
                  autoPlay
                />
              ) : (
                <div className="relative">
                  <MagnifierImage
                    src={`${lowImageUrl}/${images[0].src}`}
                    alt="Single Image"
                    isOffensive={offensive}
                    safeMode={safeMode}
                  />
                </div>
              ))
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
