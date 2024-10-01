import img1 from "../../assets/Overlay+Shadow (1).png";
import img2 from "../../assets/oiloncanvasofalittlegirl.jpg.png";
import img3 from "../../assets/Frame 1000009408.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import like from "../../assets/like.png";
import { useNavigate } from "react-router-dom";

const highlightData = [
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img2,
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
    image: img2,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
];

const HighlightSection = () => {
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
  const handleRedirectToDescription = () => {
    navigate("/discover_more");
    window.scroll(0, 0);
  };

  return (
    <div className="container mx-auto md:px-6 px-3 mt-10">
      <h1 className="text-[30px] font-semibold mb-5 w-52 sm:w-full">
        Highlighted for you
      </h1>
      <div onClick={handleRedirectToDescription}>
        <Slider {...settings}>
          {highlightData.map((item, index) => (
            <div key={index} className="sm:px-3 px-0 border-none outline-none">
              <img src={item.image} alt="image" className="w-full" />
              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">{item.title}</p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333]">
                    {item.heading}
                  </h1>
                  <div className="border border-[#FFD9DE] rounded-full px-3 py-3">
                    <img src={like} alt="" className="w-[20px] h-[20px]" />
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">{item.para}</p>
                <p className="text-[14px] text-[#696868]">{item.size}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
    </div>
  );
};

export default HighlightSection;
