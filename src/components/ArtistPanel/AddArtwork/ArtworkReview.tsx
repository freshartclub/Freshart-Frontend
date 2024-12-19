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

const DiscoverMore = () => {
  const sliderRef = useRef<Slider>(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const preview = searchParams.get("preview") || false;

  const { data, isLoading } = useGetArtWorkById(id, preview);

  const settings = {
    dots: false,
    arrow: false,
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
          arrow: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow: false,
        },
      },
      {
        breakpoint: 150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow: false,
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

  const images = data?.data
    ? [
        { src: data?.data.media?.mainImage, alt: "Main Image" },
        { src: data?.data.media?.backImage, alt: "Back Image" },
        { src: data?.data.media?.inProcessImage, alt: "In Process Image" },
        ...additionalImage?.map((item) => ({
          src: item,
          alt: "Additional Image",
        })),
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
              <P
                variant={{ size: "small", theme: "dark", weight: "medium" }}
                className="text-[#FF536B]"
              >
                Artwork preview
              </P>
            </Link>
          </li>
        </ul>

        <div className="flex md:flex-row flex-col  gap-10 mt-10">
          <div className="flex md:flex-row flex-col gap-4 md:w-[50%] w-full md:items-center">
            <div className="flex md:flex-col flex-row md:gap-0 gap-2 w-[15%] lg:ml-4 ">
              {images.map((thumb, index) => {
                return (
                  <img
                    key={index}
                    src={`${data?.url}/users/${thumb.src}`}
                    alt={thumb.alt}
                    className="mb-4 lg:w-20 w-24 h-24 lg:h-24"
                    onClick={() => handleThumbnailClick(index)}
                  />
                );
              })}
            </div>

            <div className="flex-1 md:w-[70%] w-[50vw]">
              <Slider {...settings} ref={sliderRef} className="discover_more">
                {images.map((slide, index) => (
                  <div key={index}>
                    <img
                      src={`${data?.url}/users/${slide.src}`}
                      alt={`Slide ${index + 1}`}
                      className="md:w-[40vw] w-full h-[50vh] md:h-[70vh] object-cover overflow-y-hidden"
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
