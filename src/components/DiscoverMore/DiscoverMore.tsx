import { useRef } from "react";
import Slider from "react-slick";
import eye from "./assets/eye.png";
import share from "./assets/share.png";
import P from "../ui/P";
import DiscoverContent from "./DiscoverContent";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";
import { Link, useSearchParams } from "react-router-dom";
import arrow from "../../assets/arrow_22.png";
import home from "../../assets/home.png";
import Button from "../ui/Button";
import { useGetArtWorkById } from "./http/useGetArtWorkById";
import Loader from "../ui/Loader";

const DiscoverMore = () => {
  const sliderRef = useRef<Slider>(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const preview = false;

  const { data, isLoading } = useGetArtWorkById(id, preview);

  // const additionalImage = data?.data.media?.images?.map((item) => item);
  // const additionalVideo = data?.data.media?.otherVideo?.map((item) => item);

  const url2 = "https://dev.freshartclub.com/images/videos";

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
      <div className="container mx-auto md:px-6 px-3">
        <ul className="flex p-2 gap-4 text-xl text-[#2E4053] items-center mt-10">
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
          <li>
            <Link
              to="/products"
              className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
            >
              <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
                Print art website
              </P>
            </Link>
          </li>
        </ul>

        <div className="flex md:flex-row flex-col  gap-10 ">
          <div className="flex lg:flex-row  flex-col gap-4 md:w-[50%] w-full items-center">
            <div className="flex lg:justify-start justify-center  lg:flex-col lg:max-h-[60vh] lg:h-[60vh] lg:overflow-y-auto  gap-2 w-[15%] lg:ml-4">
              {images?.map((thumb, index) => {
                const isVideo = thumb.src && thumb.src.endsWith(".mp4");
                if (thumb.src) {
                  return isVideo ? (
                    <video
                      key={index}
                      src={`${url2}/${thumb.src}`}
                      className="mb-4 lg:w-20 w-24 h-24 lg:h-24 cursor-pointer object-cover"
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ) : (
                    <img
                      key={index}
                      src={`${data?.url}/users/${thumb.src}`}
                      alt={thumb.alt}
                      className="mb-4 lg:w-20 w-24 h-24 lg:h-24 cursor-pointer object-cover"
                      onClick={() => handleThumbnailClick(index)}
                    />
                  );
                }
                return null;
              })}
            </div>

            <div className="flex-1 md:w-[70%] w-full">
              {images.length > 1 ? (
                <Slider {...settings} ref={sliderRef} className="discover_more">
                  {images.map(
                    (slide, index) =>
                      slide.src && (
                        <div key={index} className="">
                          {slide.src.endsWith(".mp4") ? ( // Check if it's a video
                            <video
                              src={`${url2}/${slide.src}`}
                              className="mx-auto object-cover h-[20rem] md:h-[60vh] lg:h-[60vh]"
                              controls
                            />
                          ) : (
                            <img
                              src={`${data?.url}/users/${slide.src}`}
                              alt={`Slide ${index + 1}`}
                              className="mx-auto object-cover h-[20rem] md:h-[60vh] lg:h-[60vh]"
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
                    src={`${url2}/${images[0].src}`}
                    className="md:w-[40vw] w-full h-[50vh] md:h-[70vh] object-cover overflow-y-hidden"
                    controls
                    autoPlay={true}
                  />
                ) : (
                  <img
                    src={`${data?.url}/users/${images[0]?.src}`}
                    alt="Single Image"
                    className="md:w-[40vw] w-full h-[50vh] md:h-[70vh] object-cover overflow-y-hidden"
                  />
                ))
              )}
            </div>
          </div>

          <div className="md:w-[50%] w-full">
            <DiscoverContent data={data?.data} />
          </div>
        </div>

        <div className="flex justify-center md:w-[50%] w-full gap-10 mb-10">
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
