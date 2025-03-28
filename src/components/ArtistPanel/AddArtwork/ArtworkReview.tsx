import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
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

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const url2 = `${imageUrl}/videos`;

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

  const settings = {
    dots: false,
    infinite: images.length > 1,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (isLoading) return <Loader />;

  return (
    <div className="m-3">
      <div className="flex flex-col mb-5 min-[1450px]:w-[75%] mx-auto flex-wrap text-lg text-black">
        <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
          {t("Artwork Review")}
        </Header>

        <span className="text-[12px] text-[#a5a5a5]">
          {data?.data.artworkName} ({data?.data.artworkId})
        </span>
      </div>

      <div className="flex lg:w-[77%] mx-auto md:flex-row flex-col gap-0 lg:gap-5">
        <div className="flex lg:flex-row flex-col md:w-[60%] w-full gap-2 items-center">
          <div className="flex overflow-hidden lg:justify-start justify-center lg:flex-col lg:max-h-[60vh] h-[5rem] lg:h-[60vh] md:w-[20rem] overflow-x-auto lg:overflow-y-auto gap-2 lg:w-[15%] lg:ml-4 scrollbar">
            {images?.map((thumb, index) => {
              const isVideo = thumb.src && thumb.src.endsWith(".mp4");
              if (thumb.src) {
                return isVideo ? (
                  <video
                    key={index}
                    src={`${url2}/${thumb.src}`}
                    className="md:mb-0 mb-4 lg:w-20 w-16 h-16 lg:h-24 cursor-pointer object-cover"
                    onClick={() => handleThumbnailClick(index)}
                  />
                ) : (
                  <img
                    key={index}
                    src={`${imageUrl}/users/${thumb.src}`}
                    alt={thumb.alt}
                    className="md:mb-0 mb-4 lg:w-20 w-16 h-16 lg:h-24 cursor-pointer object-cover"
                    onClick={() => handleThumbnailClick(index)}
                  />
                );
              }
              return null;
            })}
          </div>

          <div className="flex-1 md:w-[80%] lg:h-[22rem] w-full overflow-hidden">
            {images.length > 1 ? (
              <Slider {...settings} ref={sliderRef} className="discover_more">
                {images.map(
                  (slide, index) =>
                    slide.src && (
                      <div
                        key={index}
                        className="relative bg-[#f8f8ea] p-2 w-full h-full"
                      >
                        {slide.src.endsWith(".mp4") ? (
                          <video
                            src={`${url2}/${slide.src}`}
                            className="rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] !lg:h-[22rem]"
                            controls
                          />
                        ) : (
                          <img
                            src={`${imageUrl}/users/${slide.src}`}
                            alt={`Slide ${index + 1}`}
                            className="mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh] !lg:h-[22rem]"
                          />
                        )}
                      </div>
                    )
                )}
              </Slider>
            ) : (
              <div className="relative bg-[#f8f8ea] p-2 w-full h-full">
                {images[0]?.src &&
                  (images[0].src.endsWith(".mp4") ? (
                    <video
                      src={`${url2}/${images[0].src}`}
                      className="rounded mx-auto object-cover md:w-[25rem] lg:w-[25rem] h-[20rem] md:h-[60vh] lg:h-[60vh]"
                      controls
                      autoPlay={true}
                    />
                  ) : (
                    <img
                      src={`${imageUrl}/users/${images[0]?.src}`}
                      alt="Single Image"
                      className="mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh] !lg:h-[22rem]"
                    />
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:w-[40%] lg:mt-0 md:mt-[5rem] w-full">
          <DiscoverContent data={data?.data} />
        </div>
      </div>

      <ProductInfo data={data} />
    </div>
  );
};

export default DiscoverMore;
