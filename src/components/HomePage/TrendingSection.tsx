import img1 from "../../assets/Trending1.png";
import img3 from "../../assets/Trending3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import trending from "../../assets/Trend.png";
import like from "../../assets/like.png";
import trending_bg from "../../assets/trending_bg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const trendingData = [
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img3,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
];

const TrendingSection = () => {
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
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const navigate = useNavigate();
  const handleRedirectToDescription = () => {
    navigate("/discover_more");
    window.scroll(0, 0);
  };

  return (
    <div className="container mx-auto md:px-6 px-3 mt-20">
      <div className="flex justify-between">
        <h1 className="text-[25px]  md:text-[30px] font-semibold  w-52 sm:w-full">
          Trending This Month
        </h1>
        <img
          src={trending}
          alt="trending"
          className="mb-[-50px] hidden sm:block"
        />
      </div>
      <img
        src={trending_bg}
        alt="bg_trending"
        className="absolute md:left-[150px] left-[80px] object-cover"
        style={{ zIndex: -1 }}
      />
      <div>
        <Slider {...settings}>
          {trendingData.map((item, index) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none relative"
              onClick={handleRedirectToDescription}
            >
              <img src={item.image} alt="image" className="w-full" />

              <div
                className="absolute top-2 right-[28px] bg-white border border-[#FFD9DE] rounded-full px-3 py-3 cursor-pointer"
                onClick={handleLikeClick}
              >
                <img
                  src={isLiked ? like : like}
                  alt="like button"
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">{item.title}</p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333] xl:w-[80%] lg:w-[70%] w-[70%] line-clamp-2">
                    {item.heading}
                  </h1>
                  <div>
                    <p className="text-[14px] text-[#696868]">{item.size}</p>
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">{item.para}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingSection;
