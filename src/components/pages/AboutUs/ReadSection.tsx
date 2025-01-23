import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../../ui/Header";
import P from "../../ui/P";
import "./../../../App.css";
import card from "./assets/Card01.png";
import ceo1 from "./assets/ceo1.webp";
import readbanner from "./assets/read.webp";
import review from "./assets/Review.webp";

const data = [
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
  {
    star: review,
    heading:
      "Vast Conference is second to none. Lorem ipsum dolor sit amet, vnbvbv consectetur adipiscing elit. Congue pharetr non.",
    logo: ceo1,
    name: "Natalie Hernandez",
    designation: "CEO@Stacksy",
  },
];

const ReadSection = () => {
  return (
    <div className="relative py-10">
      <img
        src={readbanner}
        alt="banner"
        className="object-cover absolute h-full -z-10 w-full"
      />
      <Header
        variant={{ theme: "light", size: "2xl", weight: "normal" }}
        className="lgw-[38%] 2xl:ml-[200px] xl:ml-[100px] lg:ml-[80px] sm:w-[50%] w-[70%] m-auto 2xl:my-[50px] xl:my-[30px] md:my-[40px] my-[50px] md:text-2xl  text-xl "
      >
        Read what users are saying about us.
      </Header>

      <div>
        <div className="lg:w-[63%] md:w-[90%] sm:w-[50%] w-[80%] container m-auto">
          <div className="container mt-5 mb-5 pb-5 ">
            <Swiper
              pagination={{
                clickable: true,
              }}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1250: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
              
              navigation={false}
              modules={[Navigation, Autoplay, Pagination, FreeMode]}
              className="mySwiper"
            >
              {data.map((item) => (
                <>
                  <SwiperSlide>
                    <img
                      src={card}
                      alt=""
                      className="backdrop-blur-lg mb-10 opacity-60"
                    />

                    <div className="absolute xl:top-0 lg:top-[20px] md:top-[30px] top-[20px] 2xl:p-10 xl:p-5 lg:p-8 md:p-8  p-5 left-0">
                      <img
                        src={item.star}
                        alt=""
                        className="2xl:mb-10 xl:mb-5 lg:mb-5 md:mb-8  mb-8"
                      />
                      <Header
                        variant={{
                          theme: "light",
                          size: "base",
                          weight: "normal",
                        }}
                        className="2xl:mb-14 xl:mb-7 lg:mb-10 md:mb-8  mb-8"
                      >
                        {item.heading}
                      </Header>

                      <div className="flex">
                        <div>
                          <img src={item.logo} alt="logo" />
                        </div>
                        <div className="ml-8">
                          <P
                            variant={{
                              size: "base",
                              theme: "light",
                              weight: "normal",
                            }}
                          >
                            {item.name}
                          </P>

                          <P
                            variant={{
                              size: "base",
                              theme: "light",
                              weight: "normal",
                            }}
                          >
                            {item.designation}
                          </P>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadSection;
