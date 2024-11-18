import img1 from "../../assets/recent1.png";
import img2 from "../../assets/Artwork2.png";
import img3 from "../../assets/recent3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import like from "../../assets/like.png";
import { useGetArtWorkList } from "./http/getArtWorkList";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

const ArtWork = () => {
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

  const { data, isLoading } = useGetArtWorkList();

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    navigate(`/discover_more?id=${id}`);
    window.scroll(0, 0);
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#F5F2EB] py-24 mt-16">
      <div className="container mx-auto md:px-6 px-3">
        <h1 className="text-[30px] font-semibold mb-5 w-80 sm:w-full">
          Newly Added Artworks
        </h1>
        <Slider {...settings}>
          {data?.data &&
            data?.data.length > 0 &&
            data?.data?.map((item, index) => (
              <div
                key={index}
                className="sm:px-3 px-0 border-none outline-none relative"
                onClick={() => handleRedirectToDescription(item?._id)}
              >
                <img
                  src={`${data.url}/users/${item.media.mainImage}`}
                  alt="image"
                  className="w-[20vw] h-[45vh] object-cover"
                />

                <button className="absolute top-2 right-[28px] border border-[#FFD9DE] rounded-full px-3 py-3 bg-white cursor-pointer">
                  <img src={like} alt="like" className="w-[20px] h-[20px]" />
                </button>
                <div className="mt-3">
                  <p className="text-[14px] text-[#696868]">
                    {item?.discipline?.artworkDiscipline}
                  </p>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-[20px] text-[#333333] xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                      {item?.artworkName}
                    </h1>
                    <p className="text-[14px] text-[#696868]">{item.size}</p>
                  </div>
                  <p className="text-[14px] text-[#696868]">
                    {item?.owner?.artistName}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default ArtWork;
