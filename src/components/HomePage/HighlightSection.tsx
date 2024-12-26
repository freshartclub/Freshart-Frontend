import img1 from "../../assets/Overlay+Shadow (1).png";
import img2 from "../../assets/oiloncanvasofalittlegirl.jpg.png";
import img3 from "../../assets/Frame 1000009408.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import like from "../../assets/like.png";
import { useNavigate } from "react-router-dom";

import postRecentArtworkMutation from "./http/postRecentView";

const HighlightSection = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
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

  const { mutate, isPending } = postRecentArtworkMutation();

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    mutate(id);
    navigate(`/discover_more?id=${id}`);
    window.scroll(0, 0);
  };

  return (
    <div className="container mx-auto md:px-6 px-3 mt-10">
      <h1 className=" text-[25px]  md:text-[30px] font-semibold mb-5 w-1/2 sm:w-full">
        Highlighted for you
      </h1>
      <div>
        {data?.highlighted?.length < 4 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {data?.highlighted?.map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer w-full sm:w-[18rem] md:w-[22rem] lg:w-[25rem] px-3"
                onClick={() => handleRedirectToDescription(item?._id)}
              >
                <img
                  src={`${data.url}/users/${item.media.mainImage}`}
                  alt="image"
                  className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover rounded-lg"
                />
                <button className="absolute top-2 right-2 border border-[#FFD9DE] rounded-full p-2 bg-white cursor-pointer">
                  <img src={like} alt="like" className="w-5 h-5" />
                </button>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    {item?.discipline?.artworkDiscipline}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <h1 className="font-bold text-lg text-gray-800 line-clamp-2">
                      {item?.artworkName}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {`${item?.additionalInfo?.length} x ${item?.additionalInfo?.width}`}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{item?.size}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item?.owner?.artistName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {data?.highlighted?.map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer px-3"
                onClick={() => handleRedirectToDescription(item?._id)}
              >
                <img
                  src={`${data.url}/users/${item.media.mainImage}`}
                  alt="image"
                  className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover "
                />
                <button className="absolute top-2 right-7 border border-[#FFD9DE] rounded-full p-2 bg-white cursor-pointer">
                  <img src={like} alt="like" className="w-5 h-5" />
                </button>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    {item?.discipline?.artworkDiscipline}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <h1 className="font-bold text-lg text-gray-800 line-clamp-2">
                      {item?.artworkName}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {`${item?.additionalInfo?.length} x ${item?.additionalInfo?.width} cm`}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{item?.size}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item?.owner?.artistName}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default HighlightSection;
