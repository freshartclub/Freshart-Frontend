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
  console.log(id);
  const { data, isLoading } = useGetArtWorkById(id);
  console.log("this is from more", data);

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

  const images = data?.data
    ? [
        { src: data?.data.media?.mainImage, alt: "Main Image" },
        { src: data?.data.media?.backImage, alt: "Back Image" },
        { src: data?.data.media?.inProcessImage, alt: "In Process Image" },
      ]
    : [];

  if (isLoading) {
    return <Loader />;
  }
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

        <div className="flex md:flex-row flex-col items-center gap-10 mt-10">
          <div className="flex md:flex-row flex-col gap-4 md:w-[50%] w-full md:items-center">
            {/* Thumbnails Container */}
            <div className="flex md:flex-col flex-row md:gap-0 gap-2 w-[15%] lg:ml-4 ">
              {images.map((thumb, index) => {
                console.log(thumb);
                return (
                  <img
                    key={index}
                    src={`${data?.url}/users/${thumb.src}`}
                    alt={thumb.alt}
                    className="mb-4 lg:w-20 lg:h-24 object-cover"
                    onClick={() => handleThumbnailClick(index)}
                  />
                );
              })}
            </div>

            {/* Slider Container */}
            <div className="flex-1 md:w-[70%] w-full">
              <Slider {...settings} ref={sliderRef} className="discover_more">
                {images.map((slide, index) => (
                  <div key={index}>
                    <img
                      src={`${data?.url}/users/${slide.src}`}
                      alt={`Slide ${index + 1}`}
                      className="mx-auto w-[35vw] h-[80vh] object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="md:w-[50%] w-full ">
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
