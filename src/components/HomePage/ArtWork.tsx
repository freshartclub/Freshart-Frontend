import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import like from "../../assets/like.png";
import { useNavigate } from "react-router-dom";

const ArtWork = ({ data }) => {
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

  console.log(data?.newAdded);
  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    navigate(`/discover_more?id=${id}`);
    window.scroll(0, 0);
  };

  console.log(data);

  return (
    <div className="bg-[#F5F2EB] py-24 mt-16">
      <div className="container mx-auto md:px-6 px-3">
        <h1 className="text-[30px] font-semibold mb-5 w-80 sm:w-full">
          Newly Added Artworks
        </h1>

        {data?.newAdded?.length > 0 ? (
          data?.newAdded?.map((item, index) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none relative "
              onClick={() => handleRedirectToDescription(item?._id)}
            >
              <img
                src={`${data.url}/users/${item.media.mainImage}`}
                alt="image"
                className="w-[18vw] h-[50vh] object-cover"
              />

              <button className="absolute top-2 right-[75%] border border-[#FFD9DE] rounded-full px-3 py-3 bg-white cursor-pointer">
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
          ))
        ) : (
          <Slider {...settings}>
            {data?.newAdded &&
              data?.newAdded.length > 0 &&
              data?.newAdded.map((item, index) => (
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
        )}
      </div>
    </div>
  );
};

export default ArtWork;
