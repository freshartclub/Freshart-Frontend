import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import like from "../../assets/like.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const CommonCardData = ({
  heading,
  highlightData,
}: {
  heading: string;
  highlightData: Items;
}) => {
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const settings = {
    dots: true,
    infinite: highlightData?.artworks?.length > 1,
    speed: 500,
    slidesToShow: highlightData?.artworks?.length === 1 ? 1 : 4,
    slidesToScroll: 1,
    autoplay: highlightData?.artworks?.length > 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: highlightData?.artworks?.length === 1 ? 1 : 3,
          slidesToScroll: 1,
          infinite: highlightData?.artworks?.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: highlightData?.artworks?.length === 1 ? 2 : 2,
          slidesToScroll: 1,
          infinite: highlightData?.artworks?.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightData?.artworks?.length > 1,
          dots: true,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleRedirectToDescription = (id: string) => {
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  const handleLikeClick = (index: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  const renderContent =
    highlightData?.artworks?.length === 1 ? (
      <div
        key={0}
        className="sm:px-3 px-0 border-none outline-none relative  lg:w-[30vw] xl:w-[20vw] md:w-[30vw] sm:w-[50vw]"
      >
        <div className="relative">
          <img
            src={`${highlightData?.url}/users/${highlightData?.artworks[0]?.media?.mainImage}`}
            alt="image"
            className="lg:w-[35vw] md:w-[35vw]  object-cover h-[40vh]"
            onClick={() =>
              handleRedirectToDescription(highlightData?.artworks[0]?._id)
            }
          />
          <button
            onClick={() => handleLikeClick(0)}
            className={`absolute top-2 right-2 border rounded-full px-3 py-3 cursor-pointer
                  ${likes[0] ? "bg-[#FFD9DE]" : "bg-white"} transition-all`}
          >
            <img
              src={like}
              alt="like"
              className={`w-[20px] h-[20px] ${
                likes[0] ? "filter brightness-0 saturate-100" : ""
              }`}
            />
          </button>
        </div>
        <div className="mt-3">
          {/* Artwork Style */}
          <p className="text-[14px] text-[#696868] mb-1">
            {Array.isArray(
              highlightData?.artworks[0]?.additionalInfo?.artworkStyle
            ) &&
              highlightData?.artworks[0]?.additionalInfo?.artworkStyle.map(
                (item, i) => (
                  <span key={i}>
                    {item}
                    {i <
                      highlightData?.artworks[0]?.additionalInfo?.artworkStyle
                        .length -
                        1 && ", "}
                  </span>
                )
              )}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1">
            <h1 className="font-bold text-[16px] sm:text-[20px] text-[#333333] sm:w-[70%] w-full line-clamp-2">
              {highlightData?.artworks[0]?.artworkName}
            </h1>

            <div className="mt-2 sm:mt-0">
              <p className="text-[12px] sm:text-[14px] text-[#696868]">
                {highlightData?.artworks[0]?.additionalInfo?.length || null}x
                {highlightData?.artworks[0]?.additionalInfo?.width || null}
              </p>
            </div>
          </div>

          <p className="text-[12px] sm:text-[14px] text-[#696868] mb-1">
            {highlightData?.data?.owner?.artistName +
              " " +
              highlightData?.data?.owner?.artistSurname1}
          </p>

          <p className="text-[14px] font-bold text-[#333333]">
            {getSymbolFromCurrency(
              highlightData?.artworks[0]?.pricing?.currency?.slice(0, 3)
            ) +
              " " +
              highlightData?.artworks[0]?.pricing?.basePrice}
          </p>
        </div>
      </div>
    ) : (
      <Slider {...settings}>
        {highlightData?.artworks?.map((item, index) => (
          <div
            key={index}
            className="sm:px-3 px-0 border-none outline-none relative"
          >
            <div className="relative">
              <img
                src={`${highlightData?.url}/users/${item?.media?.mainImage}`}
                alt="image"
                className="w-full object-cover h-[40vh] cursor-pointer"
                onClick={() => handleRedirectToDescription(item?._id)}
              />
              <button
                onClick={() => handleLikeClick(index)}
                className={`absolute top-2 right-2 border rounded-full px-3 py-3 cursor-pointer
                  ${likes[index] ? "bg-[#FFD9DE]" : "bg-white"} transition-all`}
              >
                <img
                  src={like}
                  alt="like"
                  className={`w-[20px] h-[20px] ${
                    likes[index] ? "filter brightness-0 saturate-100" : ""
                  }`}
                />
              </button>
            </div>
            <div className="mt-3">
              <p className="text-[14px] text-[#696868]">
                {Array.isArray(item?.additionalInfo?.artworkStyle) &&
                  item?.additionalInfo?.artworkStyle.map((iw, i) => (
                    <span key={i}>
                      {iw}
                      {i < item?.additionalInfo?.artworkStyle.length - 1 &&
                        ", "}
                    </span>
                  ))}
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between justify-center sm:items-center gap-2">
                <h1 className="font-bold text-[16px] sm:text-[20px] text-[#333333] sm:w-[70%] w-full line-clamp-2">
                  {item?.artworkName}
                </h1>
                <p className="text-[12px] sm:text-[14px] text-[#696868] sm:w-auto w-full">
                  {`${item?.additionalInfo?.length || "--"} x ${
                    item?.additionalInfo?.width || "--"
                  } x ${item?.additionalInfo?.height || "--"}`}{" "}
                  cm
                </p>
              </div>

              <p className="text-[14px] text-[#696868]">
                {highlightData?.data?.owner?.artistName +
                  " " +
                  highlightData?.data?.owner?.artistSurname1}
              </p>
              <p className="text-[14px] font-bold">
                {getSymbolFromCurrency(item?.pricing?.currency.split(" ")[0]) +
                  " " +
                  item?.pricing?.basePrice}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    );

  return (
    <div className="my-10">
      <h1 className="text-[30px] font-semibold mb-5 w-52 sm:w-full">
        {heading}
      </h1>
      {renderContent}
    </div>
  );
};

interface Items {
  artworks: HighlightItem[];
  url: string;
  data: {
    owner: {
      artistName: string;
      artistSurname1: string;
    };
  };
}

interface HighlightItem {
  media: {
    mainImage: string;
  };
  additionalInfo: {
    length: string;
    width: string;
    height: string;
    artworkStyle: string[];
    colors: string[];
  };
  pricing: {
    currency: string;
    basePrice: string;
  };
  artworkName: string;
  _id: string;
  title: string;
  heading: string;
  size: string;
  para: string;
  price: string;
}

export default CommonCardData;
