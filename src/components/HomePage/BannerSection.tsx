import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner from "../../assets/main banner.png";
import banner2 from "../../assets/banner_2.jpg";
import banner3 from "../../assets/banner3.png";
import Header from "../ui/Header";

const bannerData = [
  {
    image: banner,
    header: "World's Wonderful Art Collections",
    para: "Accumsan lacus vel facilisis volutpat est. Egestas dui id ornare arcu odio. Viverra nibh cras pulvinar mattis nunc sed blandit libero.",
    btn: "View Collection",
  },
  {
    image: banner2,
    header: "Latest Technologies Art Works!",
    para: "Accumsan lacus vel facilisis volutpat est. Egestas dui id ornare arcu odio. Viverra nibh cras pulvinar mattis nunc sed blandit libero.",
    btn: "View Collection",
  },
  {
    image: banner3,
    header: "Discover Original Works of Artists.",
    para: "Accumsan lacus vel facilisis volutpat est. Egestas dui id ornare arcu odio. Viverra nibh cras pulvinar mattis nunc sed blandit libero.",
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
  autoplaySpeed: 4000,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1, fade: true },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, fade: true },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, fade: true },
    },
  ],
};

const BannerSection = () => {
  const navigate = useNavigate();

  const handleCollection = () => {
    navigate("/collections");
  };

  return (
    <Slider {...settings} className="banner_arrow">
      {bannerData.map((item, index) => (
        <div key={index} className="relative w-full h-screen">
          <img
            src={item.image}
            alt={`banner-${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-start">
            <div className="container mx-auto px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-white max-w-2xl"
              >
                <Header
                  variant={{ theme: "light", weight: "light" }}
                  className="text-3xl sm:text-4xl md:text-6xl font-semibold capitalize leading-tight"
                >
                  {item.header}
                </Header>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-4 text-base sm:text-lg md:text-xl"
                >
                  {item.para}
                </motion.p>

                <motion.button
                  onClick={handleCollection}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="mt-6 inline-block bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-medium py-3 px-8 rounded-full border transition-all duration-500"
                >
                  {item.btn}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default BannerSection;
