import { useRef } from "react";
import Slider from "react-slick";
import eye from "./assets/eye.png";
import share from "./assets/share.png";
import DiscoverContent from "./DiscoverContent";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../../ui/Loader";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import P from "../../ui/P";
import Button from "../../ui/Button";
import Header from "../../ui/Header";

const DiscoverMore = () => {
  const sliderRef = useRef<Slider>(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const preview = searchParams.get("preview") || false;

  const { data, isLoading } = useGetArtWorkById(id, preview);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const additionalImage = data?.data.media?.images?.map((item, index) => item);

  const additionalVideo = data?.data.media?.otherVideo?.map((item) => item);

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
          src: data?.data.media?.inProcessImage
            ? data?.data.media?.inProcessImage
            : null,
          alt: "In Process Image",
        },

        ...additionalImage?.map((item) => ({
          src: item,
          alt: "Additional Image",
        })),
        {
          src: data?.data.media?.mainVideo ? data?.data.media?.mainVideo : null,
          alt: "Main Video",
        },
        ...additionalVideo?.map((item) => ({
          src: item,
          alt: "Video",
          type: "video",
        })),
      ].filter((image) => image.src !== null)
    : [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto md:px-6 px-3">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="text-black mt-10 "
        >
          Artwork Review
        </Header>

        <div className="flex lg:flex-row  flex-col gap-10 mt-10">
          <div className="flex lg:flex-row flex-col gap-4 lg:w-[50%] w-full items-center mb-2">
            <div className="flex lg:justify-start justify-center flex-row lg:flex-col lg:max-h-[60vh] lg:h-[60vh] lg:overflow-y-auto  gap-2 w-[15%]  lg:ml-4 ">
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

            <div className="flex-1 md:w-[70%] w-[50vw] ">
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
