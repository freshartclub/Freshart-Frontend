import Slider from "react-slick";
import banner from "../../assets/main banner.png";
import Header from "../ui/Header";
import P from "../ui/P";
import banner2 from "../../assets/banner_2.jpg";
import banner3 from "../../assets/banner3.png";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
  const navigate = useNavigate();

  const bannerData = [
    {
      image1: banner,
      header: "Worlds Wonderful Art Collections",
      para: "Accumsan lacus vel facilisis volutpat est. Egestas dui id ornare arcu odio. Viverra nibhcras pulvinar mattis nunc sed blandit libero. Amet justo donec enim vulputate ut pharetra. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue.",
      btn: "View Collection",
    },
    {
      image1: banner2,
      header: "Latest Technologies Art Works!",
      para: "Accumsan lacus vel facilisis volutpat est. Egestas dui id ornare arcu odio. Viverra nibhcras pulvinar mattis nunc sed blandit libero. Amet justo donec enim vulputate ut pharetra. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue.",
      btn: "View Collection",
    },
    {
      image1: banner3,
      header: "Discover Original Works of Artist.",
      para: "Accumsan lacus vel facilisis volutpat est. Egestas dui id ornare arcu odio. Viverra nibhcras pulvinar mattis nunc sed blandit libero. Amet justo donec enim vulputate ut pharetra. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue.",
      btn: "View Collection",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          fade: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          fade: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          fade: true,
        },
      },
    ],
  };

  const handleCollection = () => {
    navigate("/purchase");
  };

  return (
    <>
      <Slider {...settings} className="banner_arrow">
        {bannerData.map((item, index) => (
          <div key={index} className=" flex items-center">
            <img
              src={item.image1}
              alt="banner"
              className="w-full h-screen relative object-fill"
            />
            <div className="container mx-auto">
              <div className="absolute top-[30%] left-12">
                <div className="w-[90%] sm:w-[90%] md:w-[90%] xl:w-[80%] 2xl:w-[50%] md:text-left text-center text-white">
                  <Header
                    variant={{ theme: "light", weight: "light" }}
                    className="xl:text-[65px] lg:text-[60px] md:text-[40px] sm:text-[35px] text-[30px] capitalize animate-fadeInDown"
                  >
                    {item.header}
                  </Header>

                  <P
                    variant={{ weight: "light", theme: "light" }}
                    className="md:text-[18px] sm:text-[14px] hidden sm:block mb-6 md:w-[88%] w-full mt-4  animate-fadeIn"
                  >
                    {item.para}
                  </P>
                  <button
                    onClick={handleCollection}
                    className="!border-b !bg-transparent"
                  >
                    {item.btn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default BannerSection;
