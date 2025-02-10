import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetRecentArtwork } from "./http/getRecentArtwork";

const RecentSection = () => {
  const { data, isLoading } = useGetRecentArtwork();

  const settings = {
    dots: true,
    infinite: data && data.length > 1 ? true : false,
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
          infinite: data && data.length > 1 ? true : false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: data && data.length > 1 ? true : false,
          dots: true,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: data && data.length > 1 ? true : false,
          dots: true,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container bg-[#F5F2EB] mx-auto pt-5 pb-10 md:px-6 px-3 mt-10">
      <h1 className="text-[25px] md:text-[30px] font-semibold mb-5 w-1/2 sm:w-full">
        Recent Viewed
      </h1>

      <Slider {...settings}>
        {data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((item, index) => (
            <div key={index} className="relative cursor-pointer px-3 ">
              <img
                onClick={() => handleRedirectToDescription(item?._id)}
                src={`${imageUrl}/users/${item?.media?.mainImage}`}
                alt="image"
                className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover shadow-lg"
              />

              <div className="mt-3">
                <h1 className="font-bold text-lg text-gray-800 line-clamp-2">
                  <span>{item?.artworkName}</span>
                </h1>
                <div className="flex flex-col items-start mt-2">
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    {item?.owner?.artistName}
                  </p>
                </div>
                <div>
                  <p className="text-sm flex items-center justify-between text-gray-500">
                    <span>{item?.discipline?.artworkDiscipline}</span>
                    <span> {item?.additionalInfo?.artworkTechnic}</span>
                  </p>
                </div>

                <p className="text-sm text-gray-500">{item?.size}</p>
                <p className="text-sm text-gray-500">
                  {`${item?.additionalInfo?.length} x ${item?.additionalInfo?.width} cm`}
                </p>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default RecentSection;
