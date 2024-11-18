import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import like from "../../assets/like.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface HighlightItem {
  image: string;
  title: string;
  heading: string;
  size: string;
  para: string;
  price: string;
}

interface HandleLikeClickParams {
  heading: string;
  highlightData: HighlightItem[];
}

const CommonCardData = ({ heading, highlightData }: HandleLikeClickParams) => {
  const [isLiked, setIsLiked] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    navigate(`/discover_more?id=${id}`);
    window.scroll(0, 0);
  };
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <>
      <div className="my-10">
        <h1 className="text-[30px] font-semibold mb-5 w-52 sm:w-full">
          {heading}
        </h1>
        <Slider {...settings}>
          {highlightData &&
            highlightData?.artworks?.length > 0 &&
            highlightData?.artworks?.map((item, index) => (
              <div
                key={index}
                className="sm:px-3 px-0 border-none outline-none relative"
              >
                <img
                  src={`${highlightData?.url}/users/${item.media?.mainImage}`}
                  alt="image"
                  className="w-[35vw] object-cover h-[40vh]"
                  onClick={() => handleRedirectToDescription(item?._id)}
                />
                <button
                  onClick={handleLikeClick}
                  className={`absolute top-2 right-[28px] border rounded-full px-3 py-3 cursor-pointer
        ${isLiked ? "bg-[#FFD9DE]" : "bg-white"} transition-all`}
                >
                  <img
                    src={like}
                    alt="like"
                    className={`w-[20px] h-[20px] ${
                      isLiked ? "filter brightness-0 saturate-100" : ""
                    }`}
                  />
                </button>
                <div className="mt-3">
                  <p className="text-[14px] text-[#696868]">
                    {Array.isArray(item?.additionalInfo?.artworkStyle) &&
                      item?.additionalInfo?.artworkStyle.map((iw, i) => (
                        <span className="" key={i}>
                          {iw}
                          {i < item.additionalInfo.artworkStyle.length - 1 &&
                            ", "}
                        </span>
                      ))}
                  </p>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-[20px] text-[#333333] xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                      {item.artworkName}
                    </h1>
                    <div>
                      <p className="text-[14px] text-[#696868]">
                        {item?.additionalInfo?.length ||
                          null + "x" + item?.additionalInfo?.width ||
                          null}
                      </p>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#696868]">
                    {highlightData?.data?.owner?.artistName +
                      " " +
                      highlightData?.data?.owner?.artistSurname1}
                  </p>
                  <p className="text-[14px] font-bold">
                    {"$ " + item?.pricing?.basePrice}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default CommonCardData;
