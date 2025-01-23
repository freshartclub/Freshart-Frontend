import Slider from "react-slick";

import { useRef } from "react";
import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";

const ArtistHeader = ({ data }) => {
  const sliderRef = useRef<Slider>(null);
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
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

  const additionalImage = data?.artist?.profile?.additionalImage?.map(
    (item) => item
  );

  const additionalVidoes = data?.artist?.profile?.additionalVideo?.map(
    (item) => item
  );

  const images = data?.artist
    ? [
        {
          src: data?.artist?.profile?.mainImage
            ? data?.artist?.profile?.mainImage
            : null,
          alt: "Main Image",
        },
        {
          src: data?.artist?.profile?.inProcessImage
            ? data?.artist?.profile?.inProcessImage
            : null,
          alt: "In Process Image",
        },
        {
          src: data?.artist?.profile?.mainVideo
            ? data?.artist?.profile?.mainVideo
            : null,
          alt: "Main Video",
        },
        ...additionalImage?.map((item) => ({
          src: item,
          alt: "Additional Image",
        })),
        ...additionalVidoes?.map((item) => ({
          src: item,
          alt: "Additional Video",
        })),
      ].filter((image) => image.src !== null)
    : [];

  const name = (val: {
    artistName: string;
    artistSurname1: string;
    artistSurname2: string;
  }) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <div className="lg:w-[80%] w-[90%] m-auto">
      <ul className="flex p-2 my-5 gap-4 text-xl text-[#2E4053] items-center">
        <li>
          <Link to="/" className="rounded-md transition-all flex gap-1">
            <img src={home} alt="Home icon" className="w-[14px] h-[14px]" />
            <P
              variant={{ size: "small", theme: "dark", weight: "semiBold" }}
              className="text-[#FF536B]"
            >
              Home
            </P>
          </Link>
        </li>

        <img src={arrow} alt="Home icon" className="w-[4px] h-[6px]" />

        <li>
          <Link
            to="/all_artist"
            className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
          >
            <P
              variant={{ size: "small", theme: "dark", weight: "semiBold" }}
              className="text-[#FF536B]"
            >
              Artists
            </P>
          </Link>
        </li>

        <img src={arrow} alt="Home icon" className="w-[4px] h-[6px]" />

        <li>
          <P
            variant={{ size: "small", theme: "dark", weight: "semiBold" }}
            className="text-[#203F58]"
          >
            {name(data?.artist)}
          </P>
        </li>
      </ul>

      <div className="mt-4">
        <div className="">
          {images && images.length === 1 ? (
            images.map((image, index) => {
              const isVideo = image?.src && image?.src.endsWith(".mp4"); // Check if the source is a video
              return (
                <div key={index}>
                  {isVideo ? (
                    <video
                      src={`${imageUrl}/videos/${image?.src}`}
                      className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                      controls
                    />
                  ) : (
                    <img
                      src={`${imageUrl}/users/${image?.src}`}
                      alt={`Slide ${index + 1}`}
                      className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                    />
                  )}
                </div>
              );
            })
          ) : (
            <Slider {...settings} ref={sliderRef} className="discover_more">
              {images.map((slide, index) => {
                const isVideo = slide?.src && slide?.src.endsWith(".mp4"); // Check if the source is a video
                return (
                  <div key={index}>
                    {isVideo ? (
                      <video
                        src={`${imageUrl}/videos/${slide?.src}`}
                        className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                        controls
                      />
                    ) : (
                      <img
                        src={`${imageUrl}/users/${slide?.src}`}
                        alt={`Slide ${index + 1}`}
                        className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                      />
                    )}
                  </div>
                );
              })}
            </Slider>
          )}
        </div>

        <div className="flex gap-5 justify-center my-5 overflow-x-auto">
          {images.map((thumb, index) => {
            const isVideo = thumb?.src && thumb?.src?.endsWith(".mp4");
            if (isVideo) {
              return (
                <video
                  key={index}
                  src={`${imageUrl}/videos/${thumb.src}`}
                  className="mb-4 w-12 h-16 md:w-16 md:h-20 lg:w-20 lg:h-24 object-cover"
                  controls
                />
              );
            }
            return (
              <img
                key={index}
                src={`${imageUrl}/users/${thumb?.src}`}
                alt={thumb.alt}
                className="mb-4 w-12 h-16 md:w-16 md:h-20 lg:w-20 lg:h-24 object-cover"
                onClick={() => handleThumbnailClick(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
