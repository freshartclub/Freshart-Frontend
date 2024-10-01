import Slider from "react-slick";
import img1 from "./assets/Pic.png";
import img2 from "./assets/Pic1.png";
import img3 from "./assets/Pic2.png";
import Header from "../ui/Header";

const artwork_data = [
  {
    image: img1,
  },
  {
    image: img2,
  },
  {
    image: img3,
  },
  {
    image: img2,
  },
];

const ArtworkSeries = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrow: false,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrow: false,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrow: false,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="mt-8 series_artwork">
      <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
        Series of Artwork
      </Header>
      <Slider {...settings}>
        {artwork_data.map((item, index) => (
          <div key={index} className="p-5 border-none outline-none">
            <img src={item.image} alt="image" className="bg-gray-200" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ArtworkSeries;
