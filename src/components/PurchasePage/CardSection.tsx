import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../App.css";
import like from "../../assets/like.png";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import like_btn from "./assets/like.png";
import promot1 from "./assets/promot1.png";
import promot2 from "./assets/promot2.png";
import scan_btn from "./assets/scan.png";
import view_btn from "./assets/view.png";

import getSymbolFromCurrency from "currency-symbol-map";
import { useNavigate } from "react-router-dom";
import postRecentArtworkMutation from "../HomePage/http/postRecentView";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";

const promot_artwork = [
  {
    promot: promot1,
    fashion: "Black & White Fashion",
    title: "Ornamental Goblet Poster",
    des: "Quia in harum exercitationem sit sequi omnis. Tenetur id facere illo dolor.",
    size: "Size: 37 x 45 cm",
    price: "$110.00 – $140.00",
    view: "View Detail",
    view_img: view_btn,
    scan: scan_btn,
    like: like_btn,
  },
  {
    promot: promot2,
    fashion: "Black & White Fashion",
    title: "Ornamental Goblet Poster",
    des: "Quia in harum exercitationem sit sequi omnis. Tenetur id facere illo dolor.",
    size: "Size: 37 x 45 cm",
    price: "$110.00 – $140.00",
    view: "View Detail",
    view_img: view_btn,
    scan: scan_btn,
    like: like_btn,
  },
  {
    promot: promot1,
    fashion: "Black & White Fashion",
    title: "Ornamental Goblet Poster",
    des: "Quia in harum exercitationem sit sequi omnis. Tenetur id facere illo dolor.",
    size: "Size: 37 x 45 cm",
    price: "$110.00 – $140.00",
    view: "View Detail",
    view_img: view_btn,
    scan: scan_btn,
    like: like_btn,
  },
];

const CardSection = ({ data, isLoading }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  const { mutate } = postRecentArtworkMutation();
  const navigate = useNavigate();

  const handleRedirectToDescription = (id) => {
    mutate(id);
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto md:px-6 px-3 mt-10">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-4 md:gap-4">
        {data?.data && data?.data?.length > 0
          ? data?.data.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-[18rem] md:w-[22rem] lg:w-[22rem] px-3 border-none outline-none relative cursor-pointer"
                onClick={() => handleRedirectToDescription(item?._id)}
              >
                <div className="relative">
                  <img
                    src={`${imageUrl}/users/${item?.media}`}
                    alt="Artwork"
                    className="w-full h-[15rem] sm:h-[18rem] md:h-[25rem] object-cover shadow-lg"
                  />
                  <button className="absolute top-2 right-2 border border-[#FFD9DE] rounded-full p-2 bg-white cursor-pointer">
                    <img src={like} alt="like" className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{item?.discipline}</p>
                  <div className="flex justify-between items-center mt-2">
                    <Header
                      variant={{ weight: "bold" }}
                      className="text-md text-gray-800 line-clamp-2"
                    >
                      {item?.artworkName}
                    </Header>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="text-sm text-gray-500"
                    >
                      {item?.size}
                    </P>
                  </div>
                  <P
                    variant={{ size: "base", theme: "dark", weight: "medium" }}
                    className="text-sm text-gray-500 mt-1"
                  >
                    {name(item)}
                  </P>
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="mt-1 text-sm text-gray-600"
                  >
                    {getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3))}{" "}
                    {item?.pricing?.basePrice}
                  </P>
                </div>
              </div>
            ))
          : "No artworks available"}
      </div>

      {/* <div className="my-16">
        <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
          Promoted artworks
        </Header>
        <div className="mt-4">
          <Slider {...settings}>
            {promot_artwork.map((item, index) => (
              <div
                key={index}
                className="p-5 border-none outline-none !flex sm:flex-row flex-col 2xl:gap-10 gap-4 shadow-xl rounded-lg"
              >
                <img src={item.promot} alt="image" className="" />
                <div className="mt-3">
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="uppercase mb-2 text-[#696868]"
                  >
                    {item.fashion}
                  </P>
                  <div className="flex justify-between items-center">
                    <Header
                      variant={{ size: "lg", weight: "bold" }}
                      className=" text-[#333333]"
                    >
                      {item.title}
                    </Header>
                  </div>
                  <P
                    variant={{
                      size: "small",
                      theme: "dark",
                      weight: "medium",
                    }}
                    className="text-[#696868] my-2"
                  >
                    {item.des}
                  </P>
                  <P
                    variant={{
                      size: "small",
                      theme: "dark",
                      weight: "medium",
                    }}
                    className="text-[#696868]"
                  >
                    {item.size}
                  </P>
                  <P
                    variant={{
                      size: "small",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="my-2"
                  >
                    {item.price}
                  </P>

                  <div className="flex 2xl:gap-10 xl:gap-2 sm:gap-4 items-center">
                    <Button
                      variant={{
                        fontWeight: "500",
                        theme: "dark",
                        rounded: "full",
                      }}
                      className="flex items-center gap-2 text-sm px-3"
                    >
                      <img src={item.view_img} alt="view" />
                      <P variant={{ theme: "light" }} className="text-sm">
                        {item.view}
                      </P>
                    </Button>

                    <Button className="px-2">
                      <img src={item.like} alt="" className="" />
                    </Button>

                    <Button className="px-2">
                      <img src={item.scan} alt="" className="" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div> */}
    </div>
  );
};

export default CardSection;
