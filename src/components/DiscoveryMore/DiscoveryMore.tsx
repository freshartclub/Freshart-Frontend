import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "../ui/BackButton";
import { useRef, useState } from "react";
import Slider from "react-slick";
import slide1 from "./assets/nature.png";
import slide2 from "./assets/Images4.png";
import slide3 from "./assets/Images3.png";
import slide4 from "./assets/Images1.png";
import slide5 from "./assets/Images.png";
import slider_show from "./assets/nature.png";
import Header from "../ui/Header";
import P from "../ui/P";
import { useGetArtWorkById } from "../DiscoverMore/http/useGetArtWorkById";

const DiscoveryMore = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  const [fade, setFade] = useState(false);


  const handleBack = () => {
    navigate("/");
  };

  const thumbnail_data = [
    {
      slide_image: slide1,
      alt: "thumbnail",
      title: "Nature",
    },
    {
      slide_image: slide2,
      alt: "thumbnail",
      title: "Abstract",
    },
    {
      slide_image: slide3,
      alt: "thumbnail",
      title: "World",
    },
    {
      slide_image: slide4,
      alt: "thumbnail",
      title: "Ocean",
    },
    {
      slide_image: slide5,
      alt: "thumbnail",
      title: "Volcano",
    },
  ];

  const slider_images = [
    {
      slide_images: slider_show,
      alt: "slide",
    },
    {
      slide_images: slider_show,
      alt: "slide",
    },
    {
      slide_images: slider_show,
      alt: "slide",
    },
    {
      slide_images: slider_show,
      alt: "slide",
    },
    {
      slide_images: slider_show,
      alt: "slide",
    },
  ];

  const text_data = [
    {
      heading: "Nature",
      desc: "Experience the serene beauty and tranquility of the natural world.",
    },
    {
      heading: "Abstract",
      desc: "Dive into a realm of imagination with through provoking abstract design",
    },
    {
      heading: "World",
      desc: "Explore the diverse culture that make up our global tapestry.",
    },
    {
      heading: "Ocean",
      desc: "Immense yourself in the captivating depth and mysteries of the ocean.",
    },
    {
      heading: "volcano",
      desc: "Witness the awe inspiring power nd mystery of the volcanic eruption.",
    },
  ];

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   arrows: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   vertical: true,
  //   autoplay: true,
  //   centerPadding: "10px",
  //   draggable: false,
  //   pauseOnHover: false,
  //   swipe: false,
  //   touchMove: false,
  //   verticalScrolling: true,
  //   autoplaySpeed: 2000,
  //   useTransform: true,
  //   cssEase: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  //   adaptiveHeight: true,
  // };

  const settings = {
    dots: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    afterChange: (current: any) => {
      setFade(true);
      setTimeout(() => {
        setSelectedIndex(current);
        setFade(false);
      });
    },
  };

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      setSelectedIndex(index);
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="container mx-auto sm:px-6 px-3">
      <BackButton
        onClick={handleBack}
        iconClass="text-text_primary_dark font-semibold"
        className="py-4 hidden md:flex mb-4"
      />

      <div className="mt-4 flex md:flex-row flex-col gap-10">
        <div className="lg:w-[47%] md:w-[48%] w-full">
          <div className="flex flex-col gap-2">
            <Header variant={{ size: "4xl", theme: "dark", weight: "bold" }}>
              {text_data[selectedIndex].heading}
            </Header>

            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
              {text_data[selectedIndex].desc}
            </P>
          </div>

          <div className="flex xl:gap-5 gap-3 md:my-20 my-5">
            {thumbnail_data.map((thumb, index) => (
              <div className="flex flex-col gap-2">
                <img
                  key={index}
                  src={thumb.slide_image}
                  alt={thumb.alt}
                  className="sm:w-24 sm:h-24 w-14 h-14 rounded-xl"
                  onClick={() => handleThumbnailClick(index)}
                />
                <P
                  variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                >
                  {thumb.title}
                </P>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-[47%] md:w-[48%] w-full">
          <Slider {...settings} ref={sliderRef} className="discover_more">
            {slider_images.map((thumb, index) => (
              <div className="flex flex-col gap-2">
                <img
                  key={index}
                  src={thumb.slide_images}
                  alt={thumb.alt}
                  className="rounded-xl"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryMore;
