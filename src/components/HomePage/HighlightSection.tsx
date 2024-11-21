import img1 from "../../assets/Overlay+Shadow (1).png";
import img2 from "../../assets/oiloncanvasofalittlegirl.jpg.png";
import img3 from "../../assets/Frame 1000009408.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import like from "../../assets/like.png";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    navigate(`/discover_more?id=${id}`);
    window.scroll(0, 0);
  };

  return (
    <div className="container mx-auto md:px-6 px-3 mt-10">
      <h1 className="text-[30px] font-semibold mb-5 w-52 sm:w-full">
        Highlighted for you
      </h1>
      <div>
        {data?.highlighted?.length > 4 ? (
          data?.highlighted?.map((item, index) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none relative "
              onClick={() => handleRedirectToDescription(item?._id)}
            >
              <img
                src={`${data.url}/users/${item.media.mainImage}`}
                alt="image"
                className="w-[20vw] h-[50vh] object-cover"
              />

              <button className="absolute top-2 right-[28px] border border-[#FFD9DE] rounded-full px-3 py-3 bg-white cursor-pointer">
                <img src={like} alt="like" className="w-[20px] h-[20px]" />
              </button>

              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">
                  {item?.discipline?.artworkDiscipline}
                </p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333]  xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                    {item?.artworkName}
                  </h1>
                  <p className="text-[14px] text-[#696868]">
                    {`${item?.additionalInfo?.length} x ${item?.additionalInfo?.width}`}
                  </p>
                  <div>
                    <p className="text-[14px] text-[#696868]">{item?.size}</p>
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">
                  {item?.owner?.artistName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <Slider {...settings}>
            {data?.highlighted &&
              data?.highlighted.length > 0 &&
              data?.highlighted.map((item, index) => (
                <div
                  key={index}
                  className="sm:px-3 px-0 border-none outline-none relative "
                  onClick={() => handleRedirectToDescription(item?._id)}
                >
                  <img
                    src={`${data.url}/users/${item.media.mainImage}`}
                    alt="image"
                    className="w-[20vw] h-[50vh] object-cover"
                  />

                  <button className="absolute top-2 right-[28px] border border-[#FFD9DE] rounded-full px-3 py-3 bg-white cursor-pointer">
                    <img src={like} alt="like" className="w-[20px] h-[20px]" />
                  </button>

                  <div className="mt-3">
                    <p className="text-[14px] text-[#696868]">
                      {item?.discipline?.artworkDiscipline}
                    </p>
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-[20px] text-[#333333]  xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                        {item?.artworkName}
                      </h1>
                      <p className="text-[14px] text-[#696868]">
                        {`${item?.additionalInfo?.length} x ${item?.additionalInfo?.width}`}
                      </p>
                      <div>
                        <p className="text-[14px] text-[#696868]">
                          {item?.size}
                        </p>
                      </div>
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

export default HighlightSection;
