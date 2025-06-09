import Slider from "react-slick";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import profile from "./assets/artist-9.jpg.png";
import img1 from "./assets/card1.png";
import img2 from "./assets/card2.png";
import img3 from "./assets/card3.png";
import img4 from "./assets/card4.png";
import like from "./assets/like.png";

const highlightData = [
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65.00",
  },
  {
    image: img2,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65.00",
  },
  {
    image: img3,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65.00",
  },
  {
    image: img4,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65.00",
  },
];
const ArtworkGroup = () => {
  const settings = {
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
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto sm:px-6 px-3">
      <div className="flex lg:gap-10 sm:gap-4 gap-24 items-center my-10">
        <div className="flex md:flex-row flex-col items-center md:!text-left text-center gap-2">
          <img src={profile} alt="profile image" />
          <div>
            <Header
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            >
              Zara Beasley
            </Header>
            <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
              2 posters
            </P>
          </div>
        </div>
        <div className="">
          <Button
            variant={{ theme: "light", fontWeight: "500" }}
            className="text-sm uppercase border border-[#102030] !py-2 rounded-full"
          >
            Follow
          </Button>
        </div>
        <hr className="2xl:w-[75%] xl:w-[70%] lg:w-[65%] w-[55%] sm:block hidden h-0.5 bg-black dark:bg-gray-700" />
      </div>
      <div className="my-10 artwork_group">
        <Slider {...settings}>
          {highlightData?.map((item, index) => (
            <div key={index} className="sm:px-3 px-0 border-none outline-none">
              <img src={item?.image} alt="image" className="w-full" />
              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">{item?.title}</p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333]">
                    {item?.heading}
                  </h1>
                  <div className="">
                    <img src={like} alt="" className="" />
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">{item?.para}</p>
                <p className="text-[14px] text-[#696868]">{item?.size}</p>
                <P
                  variant={{ theme: "dark", weight: "semiBold" }}
                  className="text-[14px] "
                >
                  {item?.price}
                </P>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ArtworkGroup;
