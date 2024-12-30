import Slider from "react-slick";

import { useRef } from "react";
import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";
import P from "../ui/P";

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
    (item, index) => item
  );

  const additionalVidoes = data?.artist?.profile?.additionalVideo?.map(
    (item, index) => item
  );

  const url2 = "https://dev.freshartclub.com/images/videos";

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
          <Link
            to="/"
            className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
          >
            <P
              variant={{ size: "small", theme: "dark", weight: "semiBold" }}
              className="text-[#203F58]"
            >
              {data?.artist?.artistName +
                " " +
                data?.artist?.artistSurname1 +
                " " +
                data?.artist?.artistSurname2}
            </P>
          </Link>
        </li>
      </ul>

      <div className="mt-4">
        <div className=" ">
          <Slider {...settings} ref={sliderRef} className="discover_more">
            {images.map((slide, index) => {
              const isVideo = slide?.src && slide?.src?.endsWith(".mp4"); // Check if the source is a video

              return (
                <div key={index}>
                  {isVideo ? (
                    <video
                      src={`${url2}/${slide?.src}`}
                      className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                      controls
                    />
                  ) : (
                    <img
                      src={`${data?.url}/users/${slide?.src}`}
                      alt={`Slide ${index + 1}`}
                      className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                    />
                  )}
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="flex gap-5 justify-center my-5 overflow-x-auto">
          {images.map((thumb, index) => {
            console.log(thumb);
            const isVideo = thumb?.src && thumb?.src?.endsWith(".mp4");
            if (isVideo) {
              return (
                <video
                  key={index}
                  src={`${url2}/${thumb.src}`}
                  className="mb-4 w-12 h-16 md:w-16 md:h-20 lg:w-20 lg:h-24 object-cover"
                  controls
                />
              );
            }
            return (
              <img
                key={index}
                src={`${data?.url}/users/${thumb?.src}`}
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
