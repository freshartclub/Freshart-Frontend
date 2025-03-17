import Slider from "react-slick";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa"; // Import the play icon from react-icons
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";

const ArtistHeader = ({ data }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true, // Enable dots to hint at multiple slides
    autoplay: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  const mainImage = data?.artist?.profile?.mainImage || null;
  const mainVideo = data?.artist?.profile?.mainVideo || null;

  console.log(mainVideo)

  const media = mainImage && mainVideo ? [
    { type: "image", src: `${imageUrl}/users/${mainImage}`, alt: "Main Image" },
    { type: "video", src: `${imageUrl}/videos/${mainVideo}`, alt: "Main Video" },
  ] : [];

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

        <img src={arrow} alt="Arrow icon" className="w-[4px] h-[6px]" />

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

        <img src={arrow} alt="Arrow icon" className="w-[4px] h-[6px]" />

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
        {media.length === 2 ? (
          <Slider {...settings} ref={sliderRef} className="discover_more">
            {media.map((item, index) => (
              <div key={index} className="relative">
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                      autoPlay
                      muted // Required for autoplay in most browsers
                      loop // Optional: loops the video
                      controls // Optional: remove if you don’t want controls
                    />
                    {/* Play icon overlay using react-icons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaPlay
                        className="text-white opacity-70 hover:opacity-100 transition-opacity"
                        size={48} // Adjust size as needed
                      />
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </Slider>
        ) : mainImage ? (
          <img
            src={`${imageUrl}/users/${mainImage}`}
            alt="Main Image"
            className="mx-auto w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] object-cover rounded-lg"
          />
        ) : (
          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="text-center"
          >
            No media available.
          </P>
        )}
      </div>
    </div>
  );
};

export default ArtistHeader;