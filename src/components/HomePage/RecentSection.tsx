import img1 from "../../assets/recent1.png";
import img2 from "../../assets/Artwork2.png";
import img3 from "../../assets/recent3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import like from "../../assets/like.png";
import { useGetRecentArtwork } from "./http/getRecentArtwork";
import postRecentArtworkMutation from "./http/postRecentView";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";

const recentData = [
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img2,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img3,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
];

const RecentSection = () => {
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

  const { data, isLoading } = useGetRecentArtwork();
  console.log("this is from recent artwork", data);

  // const { mutate, isPending } = postRecentArtworkMutation();
  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    console.log("gvdsfkma", id);
    // mutate(id);
    navigate(`/discover_more?id=${id}`);
    window.scroll(0, 0);
  };

  return (
    <div className="bg-[#F5F2EB] py-24 mt-16">
      <div className="container mx-auto md:px-6 px-3">
        <h1 className="text-[30px] font-semibold mb-5 w-80 sm:w-full">
          Recent Viewed Artworks
        </h1>

        {data?.data?.length === 1 ? (
          data?.data?.map((item, index) => (
            <div
              key={index}
              className="sm:px-3 px-0 z-50 border-none outline-none w-[20rem] cursor-pointer relative"
              onClick={() => handleRedirectToDescription(item?._id)}
            >
              <img
                src={`${imageUrl}/users/${item.media.mainImage}`}
                alt="image"
                className="w-[20rem] h-[50vh] object-cover"
              />

              <span className="absolute border top-0 right-0 border-[#FFD9DE] rounded-full px-3 py-3 bg-white cursor-pointer">
                <img src={like} alt="like" className="w-[20px] h-[20px]" />
              </span>

              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">
                  {item?.discipline?.artworkDiscipline}
                </p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333] xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                    {item?.artworkName}
                  </h1>
                  <p className="text-[14px] text-[#696868]">
                    {item.additionalInfo?.length}x{item.additionalInfo?.width}
                  </p>
                </div>
                <p className="text-[14px] text-[#696868]">
                  {item.owner?.artistName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <Slider {...settings}>
            {data?.data?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleRedirectToDescription(item?._id)}
                className="sm:px-3 px-0 border-none outline-none relative cursor-pointer"
              >
                <img
                  src={`${imageUrl}/users/${item.media.mainImage}`}
                  alt="image"
                  className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover "
                />

                <button className="absolute top-2 right-7 border border-[#FFD9DE] rounded-full p-2 bg-white cursor-pointer">
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
                    <p className="text-[14px] text-[#696868]">
                      {" "}
                      {item.additionalInfo?.length}x{item.additionalInfo?.width}
                    </p>
                  </div>
                  <p className="text-[14px] text-[#696868]">
                    {item.owner?.artistName}
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

export default RecentSection;
