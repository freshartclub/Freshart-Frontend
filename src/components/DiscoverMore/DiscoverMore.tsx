import { useRef } from "react";
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
import { imageUrl } from "../utils/baseUrls";

const DiscoverMore = () => {
  const sliderRef = useRef<Slider>(null);
  const id = useParams().id;
  const preview = false;

  const { data, isLoading } = useGetArtWorkById(id, preview);

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

  const checkArtworkType = data?.data?.commercialization?.activeTab;

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
            <div className="flex lg:justify-start justify-center lg:flex-col lg:max-h-[60vh] lg:h-[60vh] md:w-[20rem] overflow-x-auto lg:overflow-y-auto gap-2 lg:w-[15%] lg:ml-4 scrollbar">
              {images?.map((thumb, index) => {
                const isVideo = thumb.src && thumb.src.endsWith(".mp4");
                if (thumb.src) {
                  return isVideo ? (
                    <video
                      key={index}
                      src={`${imageUrl}/videos/${thumb.src}`}
                      className="md:mb-0 mb-4 lg:w-20 w-24 h-24 lg:h-24 cursor-pointer object-cover"
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ) : (
                    <img
                      key={index}
                      src={`${imageUrl}/users/${thumb.src}`}
                      alt={thumb.alt}
                      className="md:mb-0 mb-4 lg:w-20 w-24 h-24 lg:h-24 cursor-pointer object-cover"
                      onClick={() => handleThumbnailClick(index)}
                    />
                  );
                }
                return null;
              })}
            </div>

            <div className="flex-1 md:w-[80%] w-full">
              {images.length > 1 ? (
                <Slider {...settings} ref={sliderRef} className="discover_more">
                  {images.map(
                    (slide, index) =>
                      slide.src && (
                        <div key={index}>
                          {slide.src.endsWith(".mp4") ? ( // Check if it's a video
                            <video
                              src={`${imageUrl}/videos/${slide.src}`}
                              className="shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]"
                              controls
                            />
                          ) : (
                            <img
                              src={`${imageUrl}/users/${slide.src}`}
                              alt={`Slide ${index + 1}`}
                              className="shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]"
                            />
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
                    className="shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]"
                    controls
                    autoPlay={true}
                  />
                ) : (
                  <img
                    src={`${imageUrl}/users/${images[0]?.src}`}
                    alt="Single Image"
                    className="shadow rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]"
                  />
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
