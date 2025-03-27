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
  const imgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  // Calculate image dimensions when it loads
  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !magnifierRef.current || !imgRef.current) return;

    const container = containerRef.current;
    const magnifier = magnifierRef.current;
    const img = imgRef.current;

    // Get container and image dimensions
    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    // Calculate mouse position relative to the image
    const posX = e.clientX - imgRect.left;
    const posY = e.clientY - imgRect.top;

    // Calculate position in percentages
    const percX = (posX / imgRect.width) * 100;
    const percY = (posY / imgRect.height) * 100;
    const backgroundPos = `${percX}% ${percY}%`;

    // Calculate magnifier size relative to image size (15% of image width)
    const magnifierSize = Math.min(
      Math.max(imgRect.width * 0.15, 100), // Minimum 100px, 15% of image width
      200 // Maximum 200px
    );
    const magnifierOffset = magnifierSize / 2;

    // Position the magnifier (centered on cursor)
    let magnifierX = e.clientX - containerRect.left - magnifierOffset;
    let magnifierY = e.clientY - containerRect.top - magnifierOffset;

    // Boundary checks
    magnifierX = Math.max(0, Math.min(magnifierX, containerRect.width - magnifierSize));
    magnifierY = Math.max(0, Math.min(magnifierY, containerRect.height - magnifierSize));

    // Calculate zoom level (2x by default, adjust based on image size)
    const zoomLevel = imgRect.width < 400 ? 3 : 2;

    // Apply styles
    magnifier.style.width = `${magnifierSize}px`;
    magnifier.style.height = `${magnifierSize}px`;
    magnifier.style.left = `${magnifierX}px`;
    magnifier.style.top = `${magnifierY}px`;
    magnifier.style.backgroundPosition = backgroundPos;
    magnifier.style.backgroundSize = `${imgRect.width * zoomLevel}px ${imgRect.height * zoomLevel}px`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (magnifierRef.current) {
      magnifierRef.current.style.display = "block";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (magnifierRef.current) {
      magnifierRef.current.style.display = "none";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#f8f8ea] p-2 w-full h-full"
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
        } mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh] !lg:h-[22rem]`}
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
