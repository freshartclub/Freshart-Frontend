import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import P from "../../ui/P";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageUrl } from "../../utils/baseUrls";
import DiscoverContent from "./DiscoverContent";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import ProductInfo from "./ProductInfo";

const DiscoverMore = () => {
  const sliderRef = useRef<Slider>(null);
  const id = useParams().id;
  const preview = true;

  const { t } = useTranslation();

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

  const additionalImage = data?.data.media?.images?.map((item) => item);
  const additionalVideo = data?.data.media?.otherVideo?.map((item) => item);
  const url2 = `${imageUrl}/videos`;

  const images =
    data && data.data
      ? [
          {
            src: data.data.media?.mainImage || null,
            alt: "Main Image",
          },
          {
            src: data.data.media?.backImage || null,
            alt: "Back Image",
          },
          {
            src: data.data.media?.inProcessImage || null,
            alt: "In Process Image",
          },
          ...(Array.isArray(additionalImage)
            ? additionalImage.map((item) => ({
                src: item,
                alt: "Additional Image",
              }))
            : []),
          {
            src: data.data.media?.mainVideo || null,
            alt: "Main Video",
          },
          ...(Array.isArray(additionalVideo)
            ? additionalVideo.map((item) => ({
                src: item,
                alt: "Video",
                type: "video",
              }))
            : []),
        ].filter((image) => image.src !== null)
      : [];

  if (isLoading) return <Loader />;

  return (
    <div className="m-3">
      <div className="flex min-[1450px]:w-[75%] mx-auto items-center flex-wrap text-lg text-black">
        <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
          {t("Artwork Review")}
        </Header>
        <span className="mx-1">
          <IoIosArrowBack />
        </span>
        {data?.data.artworkName}{" "}
        <span className="text-[12px] translate-y-[2px] ml-2 text-[#a5a5a5]">
          ({data?.data.artworkId})
        </span>
      </div>

      <div className="flex lg:flex-row gap-3 min-[1450px]:w-[75%] mx-auto flex-col mt-5">
        <div className="flex lg:flex-row flex-col gap-4 lg:w-[50%] w-full items-center lg:items-start">
          <div className="flex scrollbar lg:justify-start justify-center flex-row lg:flex-col max-w-full lg:w-fit w-full overflow-x-auto lg:max-h-[23rem] lg:h-[23rem] lg:overflow-y-auto gap-2">
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
                    src={`${imageUrl}/users/${thumb.src}`}
                    alt={thumb.alt}
                    className="mb-4 lg:w-20 w-24 h-24 lg:h-24 cursor-pointer object-cover"
                    onClick={() => handleThumbnailClick(index)}
                  />
                );
              }
              return null;
            })}
          </div>

          <div className="md:w-full sm:w-full lg:w-[70%] w-full">
            {images.length > 1 ? (
              <Slider {...settings} ref={sliderRef} className="discover_more">
                {images.map(
                  (slide, index) =>
                    slide.src && (
                      <div key={index} className="">
                        {slide.src.endsWith(".mp4") ? (
                          <video
                            src={`${url2}/${slide.src}`}
                            className="mx-auto w-full object-cover h-[20rem] md:h-[23rem] lg:h-[23rem]"
                            controls
                          />
                        ) : (
                          <img
                            src={`${imageUrl}/users/${slide.src}`}
                            alt={`Slide ${index + 1}`}
                            className="mx-auto w-full object-cover h-[20rem] md:h-[23rem] lg:h-[23rem]"
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
                  className="md:w-[40vw] md:h-[23rem] object-cover overflow-y-hidden"
                  controls
                  autoPlay={true}
                />
              ) : (
                <img
                  src={`${imageUrl}/users/${images[0]?.src}`}
                  alt="Single Image"
                  className="w-[40vw] md:h-[23rem] object-cover overflow-y-hidden"
                />
              ))
            )}
          </div>
        </div>

        <div className="bg-white px-4 py-2 rounded-lg border w-full">
          <DiscoverContent data={data?.data} />
        </div>
      </div>

      <div className="flex justify-center items-center mt-2 md:w-[50%] w-full gap-5">
        <div className="flex items-center cursor-pointer gap-1">
          <FaEye />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            {t("View in Room")}
          </P>
        </div>
        <div className="flex items-center cursor-pointer gap-1">
          <FaShareFromSquare />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            {t("Share")}
          </P>
        </div>
      </div>

      <ProductInfo data={data} />
    </div>
  );
};

export default DiscoverMore;
