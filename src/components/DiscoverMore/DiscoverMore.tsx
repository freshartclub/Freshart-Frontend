import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import eye from "./assets/eye.png";
import share from "./assets/share.png";
import P from "../ui/P";
import DiscoverContent from "./DiscoverContent";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";
import { Link, useParams } from "react-router-dom";
import arrow from "../../assets/arrow_22.png";
import home from "../../assets/home.png";
import Button from "../ui/Button";
import { useGetArtWorkById } from "./http/useGetArtWorkById";
import Loader from "../ui/Loader";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import { motion } from "framer-motion";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const DiscoverMore = () => {
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
  const sliderRef = useRef<Slider>(null);
  const id = useParams().id;
  const preview = false;
  const containerRef = useRef(null);

  const { data, isLoading } = useGetArtWorkById(id, preview);
  const [safeMode, setSafeMode] = useState("Off");
  const [viewedImages, setViewedImages] = useState({});

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const images = data?.data
    ? [
        {
          src: data?.data.media?.mainImage ? data?.data.media?.mainImage : null,
          alt: "Main Image",
        },
        {
          src: data?.data.media?.backImage ? data?.data.media?.backImage : null,
          alt: "Back Image",
        },
        {
          src: data?.data.media?.mainVideo ? data?.data.media?.mainVideo : null,
          alt: "Main Video",
        },
        {
          src: data?.data.media?.inProcessImage
            ? data?.data.media?.inProcessImage
            : null,
          alt: "In Process Image",
        },
        ...data?.data.media?.images?.map((item) => ({
          src: item,
          alt: "Additional Image",
        })),
      ].filter((image) => image.src !== null)
    : [];

  const settings = {
    dots: false,
    infinite: images.length > 1,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  // const [size, setSize] = useState({
  //   width: "0",
  //   height: "0",
  // });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setPosition({ x, y });
    // setSize({ width, height });
  };

  const checkArtworkType = data?.data?.commercialization?.activeTab;
  const offensive = data?.data?.additionalInfo?.offensive == "Yes";

  const handleViewClick = (id: string) => {
    const newViewedImages = { ...viewedImages, [id]: Date.now() }; // Store timestamp
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setSafeMode("On");
    setViewedImages(newViewedImages);
  };

  const handleHideClick = (id: string) => {
    const newViewedImages = { ...viewedImages };
    delete newViewedImages[id];
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setSafeMode("Off");
    setViewedImages(newViewedImages);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("viewedImages") || "{}");
    const currentTime = Date.now();
    const filteredData: Record<string, number> = {};

    Object.keys(storedData).forEach((key) => {
      if (currentTime - storedData[key] < TEN_DAYS_MS) {
        filteredData[key] = storedData[key];
      }
    });

    localStorage.setItem("viewedImages", JSON.stringify(filteredData));
    setSafeMode(filteredData[id] ? "On" : "Off");
    setViewedImages(filteredData);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
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

        <div className="flex md:flex-row flex-col gap-5">
          <div className="flex lg:flex-row flex-col md:w-[50%] w-full items-center">
            <div className="flex overflow-hidden lg:justify-start justify-center lg:flex-col lg:max-h-[60vh] lg:h-[60vh] md:w-[20rem] overflow-x-auto lg:overflow-y-auto gap-2 lg:w-[15%] lg:ml-4 scrollbar">
              {images?.map((thumb, index) => {
                const isVideo = thumb.src && thumb.src.endsWith(".mp4");

                if (thumb.src) {
                  return isVideo ? (
                    <video
                      key={index}
                      src={`${imageUrl}/videos/${thumb.src}`}
                      className={`${
                        offensive && safeMode == "Off"
                          ? "blur-md brightness-75"
                          : ""
                      } md:mb-0 mb-4 lg:w-20 w-24 h-24 lg:h-24 cursor-pointer object-cover`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ) : (
                    <img
                      key={index}
                      src={`${lowImageUrl}/${thumb.src}`}
                      alt={thumb.alt}
                      className={`${
                        offensive && safeMode == "Off"
                          ? "blur-md brightness-75"
                          : ""
                      } md:mb-0 mb-4 lg:w-20 w-24 h-24 lg:h-24 cursor-pointer object-cover`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  );
                }
                return null;
              })}
            </div>

            <div className="flex-1 md:w-[80%] w-full overflow-hidden">
              {images.length > 1 ? (
                <Slider {...settings} ref={sliderRef} className="discover_more">
                  {images.map(
                    (slide, index) =>
                      slide.src && (
                        <div key={index} className="overflow-hidden">
                          {slide.src.endsWith(".mp4") ? (
                            <video
                              src={`${imageUrl}/videos/${slide.src}`}
                              className={`${
                                offensive && safeMode == "Off"
                                  ? "blur-lg brightness-75"
                                  : ""
                              } shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]`}
                              controls
                            />
                          ) : (
                            <div
                              ref={containerRef}
                              className="relative w-full"
                              onMouseMove={handleMouseMove}
                              onMouseEnter={() => setVisible(true)}
                              onMouseLeave={() => setVisible(false)}
                            >
                              <img
                                src={`${lowImageUrl}/${slide.src}`}
                                alt={`Slide ${index + 1}`}
                                className={`${
                                  offensive && safeMode == "Off"
                                    ? "blur-lg brightness-75"
                                    : ""
                                } shadow rounded mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh] lg:h-[60vh]`}
                              />

                              {offensive && safeMode == "Off" ? (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewClick(data?.data?._id);
                                  }}
                                  className="absolute z-[99] border bg-white px-2 py-1 rounded top-2 right-2 flex items-center gap-2"
                                >
                                  <p className="text-[12px] ">
                                    Offensive View Off
                                  </p>
                                  <FaToggleOff
                                    size={20}
                                    className="text-green-500"
                                  />
                                </div>
                              ) : offensive && safeMode == "On" ? (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleHideClick(data?.data?._id);
                                  }}
                                  className="absolute z-[99] border bg-white px-2 py-1 rounded top-2 right-2 flex items-center gap-2"
                                >
                                  <p className="text-[12px] ">
                                    Offensive View On
                                  </p>
                                  <FaToggleOn
                                    size={20}
                                    className="text-green-500"
                                  />
                                </div>
                              ) : null}
                              {visible && (
                                <motion.div
                                  className="absolute w-32 h-32 rounded-full border-2 border-gray-500 overflow-hidden bg-white shadow-lg pointer-events-none"
                                  style={{
                                    top: `${position.y}%`,
                                    left: `${position.x}%`,
                                    transform: "translate(-50%, -50%)",
                                    backgroundImage: `url(${`${imageUrl}/users/${slide.src}`})`,
                                    backgroundPosition: `${position.x * 1.5}% ${
                                      position.y * 1.2
                                    }%`,
                                    backgroundSize: "400%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1.5 }}
                                />
                              )}
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
                      offensive && !safeMode ? "blur-lg brightness-75" : ""
                    } shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]`}
                    controls
                    autoPlay={true}
                  />
                ) : (
                  <div
                    ref={containerRef}
                    className="relative w-full"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setVisible(true)}
                    onMouseLeave={() => setVisible(false)}
                  >
                    <img
                      src={`${lowImageUrl}/${images[0].src}`}
                      alt="Single Image"
                      className={`${
                        offensive && !safeMode ? "blur-lg brightness-75" : ""
                      } shadow rounded mx-auto object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh] lg:h-[60vh]`}
                    />
                    {visible && (
                      <motion.div
                        className="absolute w-32 h-32 rounded-full border-2 border-gray-500 overflow-hidden bg-white shadow-lg pointer-events-none"
                        style={{
                          top: `${position.y}%`,
                          left: `${position.x}%`,
                          transform: "translate(-50%, -50%)",
                          backgroundImage: `url(${`${imageUrl}/users/${images[0].src}`})`,
                          backgroundPosition: `${position.x}% ${position.y}%`,
                          backgroundSize: "300%",
                          backgroundRepeat: "no-repeat",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="md:w-[50%] w-full">
            <DiscoverContent data={data?.data} />
          </div>
        </div>

        <div className="flex justify-center md:w-[55%] w-full gap-10 mb-10">
          <div className="flex gap-1">
            <img src={eye} alt="eye" className="w-[19px] h-[12px] mt-1" />
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
              View in Room
            </P>
          </div>
          <Button className="flex gap-1 !p-0">
            <img src={share} alt="share" className="w-[19px] h-[16px] mt-1" />
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
              Share
            </P>
          </Button>
        </div>

        <ProductInfo data={data} />
      </div>

      <SelectedSection data={data} />
    </>
  );
};

export default DiscoverMore;
