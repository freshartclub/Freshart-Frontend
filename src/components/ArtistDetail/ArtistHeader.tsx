import Slider from "react-slick";
import slide1 from "./assets/Rectangle 2224.png";
import slide2 from "./assets/Rectangle 2224 (1).png";
import slide3 from "./assets/Rectangle 2224 (2).png";
import slide4 from "./assets/Rectangle 2224 (3).png";
import slider_show from "./assets/Frame 1171276322.png";
import { useRef } from "react";
import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";
import P from "../ui/P";

const ArtistHeader = () => {
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
            to="/"
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
              Zara Beasley
            </P>
          </Link>
        </li>
      </ul>

      <div className="mt-4">
        {/* Slider Container */}
        <div className=" ">
          <Slider {...settings} ref={sliderRef} className="discover_more">
            <div>
              <img src={slider_show} alt="Slide 1" className="w-full " />
            </div>
            <div>
              <img src={slider_show} alt="Slide 2" className="w-full " />
            </div>
            <div>
              <img src={slider_show} alt="Slide 3" className="w-full " />
            </div>
            <div>
              <img src={slider_show} alt="Slide 4" className="w-full " />
            </div>
          </Slider>
        </div>

        {/* Thumbnails Container */}
        <div className="flex gap-5 justify-center my-5">
          {[
            { src: slide1, alt: "Thumbnail 1" },
            { src: slide2, alt: "Thumbnail 2" },
            { src: slide3, alt: "Thumbnail 3" },
            { src: slide4, alt: "Thumbnail 4" },
          ].map((thumb, index) => (
            <img
              key={index}
              src={thumb.src}
              alt={thumb.alt}
              className="sm:w-24 sm:h-24 w-14 h-14"
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
