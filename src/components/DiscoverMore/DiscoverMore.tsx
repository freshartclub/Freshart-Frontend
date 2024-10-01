import { useRef } from "react";
import slider1 from "./assets/slide_1.png";
import slider2 from "./assets/slider2.png";
import slider3 from "./assets/slider3.png";
import slider4 from "./assets/slider4.png";
import slider5 from "./assets/slider5.png";
import slide_1 from "./assets/slider1.png";
import slide_2 from "./assets/slide_2.png";
import slide_3 from "./assets/slide_3.png";
import slide_4 from "./assets/slide_4.png";
import slide_5 from "./assets/slide_5.png";
import Slider from "react-slick";
import eye from "./assets/eye.png";
import share from "./assets/share.png";
import P from "../ui/P";
import DiscoverContent from "./DiscoverContent";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";
import { Link } from "react-router-dom";
import arrow from "../../assets/arrow_22.png";
import home from "../../assets/home.png";

const DiscoverMore = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
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
    <>
      <div className="container mx-auto px-6 sm:px-3">
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
          <img src={arrow} alt="Home icon" className="w-[4px] h-[6px] mr-2" />
          <li>
            <Link to="/" className="rounded-md transition-all flex">
              <P
                variant={{ size: "small", theme: "dark", weight: "medium" }}
                className="text-[#FF536B]"
              >
                Purchase
              </P>
            </Link>
          </li>
          <img src={arrow} alt="Home icon" className="w-[4px] h-[6px] mr-2" />
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

        <div className="flex  items-center mt-10">
          <div className="flex gap-4 w-[50%]">
            {/* Thumbnails Container */}
            <div className="flex flex-col w-[15%] ml-4 col-span-1">
              {[
                { src: slide_1, alt: "Thumbnail 1" },
                { src: slide_2, alt: "Thumbnail 2" },
                { src: slide_3, alt: "Thumbnail 3" },
                { src: slide_4, alt: "Thumbnail 4" },
                { src: slide_5, alt: "Thumbnail 5" },
                { src: slide_5, alt: "Thumbnail 6" },
              ].map((thumb, index) => (
                <img
                  key={index}
                  src={thumb.src}
                  alt={thumb.alt}
                  className="mb-4 w-20 h-24"
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>

            {/* Slider Container */}
            <div className="flex-1 w-[70%]">
              <Slider {...settings} ref={sliderRef} className="discover_more">
                <div>
                  <img src={slider1} alt="Slide 1" className=" mx-auto " />
                </div>
                <div>
                  <img src={slider2} alt="Slide 2" className=" mx-auto" />
                </div>
                <div>
                  <img src={slider3} alt="Slide 3" className=" mx-auto" />
                </div>
                <div>
                  <img src={slider4} alt="Slide 4" className=" mx-auto" />
                </div>
                <div>
                  <img src={slider5} alt="Slide 5" className=" mx-auto" />
                </div>
                <div>
                  <img src={slider5} alt="Slide 6" className=" mx-auto" />
                </div>
              </Slider>
            </div>
          </div>

          <div className="w-[50%] ml-20">
            <DiscoverContent />
          </div>
        </div>
        <div className="flex justify-center w-[50%] gap-10 mb-10">
          <div className="flex gap-1">
            <img src={eye} alt="eye" className="w-[19px] h-[12px] mt-1" />
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
              View in Room
            </P>
          </div>
          <div className="flex gap-1">
            <img src={share} alt="share" />
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
              Share
            </P>
          </div>
        </div>

        <ProductInfo />
        <SelectedSection />
      </div>
    </>
  );
};

export default DiscoverMore;
