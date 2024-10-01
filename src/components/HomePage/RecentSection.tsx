import img1 from "../../assets/recent1.png";
import img2 from "../../assets/Artwork2.png";
import img3 from "../../assets/recent3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import like from "../../assets/like.png";

const recentData = [
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
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
];

const RecentSection = () => {
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

  return (
    <div className="bg-[#F5F2EB] py-24 mt-16">
      <div className="container mx-auto md:px-6 px-3">
        <h1 className="text-[30px] font-semibold mb-5">
          Recent Viewed Artworks
        </h1>
        <Slider {...settings}>
          {recentData.map((item, index) => (
            <div key={index} className="md:px-3 px-0 border-none outline-none">
              <img src={item.image} alt="image" className="w-full h-full" />
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

export default RecentSection;
