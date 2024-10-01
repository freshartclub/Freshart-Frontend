import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import pic1 from "../../assets/Pic1.png";
import pic2 from "../../assets/Pic2.png";
import pic3 from "../../assets/Pic3 (1).png";
import pic4 from "../../assets/Pic4.png";

const exploreData = [
  { img: pic1 },
  { img: pic2 },
  { img: pic3 },
  { img: pic4 },
];

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

const ExploreSection = () => {
  return (
    <div className="bg-[#F5F2EB] py-20">
      <div className="container mx-auto md:px-6 px-3">
        <p className="md:text-[30px] text-[20px] text-center w-[80%] mx-auto">
          Explore our art catalog carefully curated by our team of experts with
          a wide variety of artists and styles from emerging talents to the most
          established ones.
        </p>
        <div className="w-full artist_slider mt-4">
          <Slider {...settings}>
            {exploreData.map((item, index) => (
              <div key={index} className="px-2">
                <img
                  src={item.img}
                  alt={`pic-${index}`}
                  className="w-full h-[320px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
