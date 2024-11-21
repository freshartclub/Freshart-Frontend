import profile1 from "../../assets/profile_1.png";
import profile2 from "../../assets/profile_2.png";
import profile3 from "../../assets/profile_3.png";
import profile4 from "../../assets/profile_4.png";
import img1 from "../../assets/product_4_1.png";
import img2 from "../../assets/product_4_2.png";
import img3 from "../../assets/product_4_3.png";
import img4 from "../../assets/product_4_4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ArtistPortfoilio.css";
import Header from "../ui/Header";
import { useNavigate } from "react-router-dom";
import ViewButton from "../ui/ViewButton";
import { useGetAllArtist } from "./http/useGetAllArtist";
import Loader from "../ui/Loader";

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

const ArtistPortfolio = ({ data }) => {
  const navigate = useNavigate();
  const redirectToAllArtistPage = () => {
    navigate("/all_artist");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const handleArtistDesc = (id) => {
    console.log("this is from artistPortfoloio", id);
    navigate(`/artist_detail?id=${id}`);
    window.scroll(0, 0);
  };

  return (
    <div className="container mx-auto md:px-6 px-3">
      <div className="mt-10">
        <div className="flex sm:flex-row flex-col justify-between">
          <Header
            variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
            className="text-[30px] font-semibold"
          >
            Artist Portfolio
          </Header>

          <ViewButton onClick={redirectToAllArtistPage} />
        </div>
      </div>
      <div className="artist_slider">
        <Slider {...settings}>
          {data?.artists?.map((item, index) => (
            <div
              key={index}
              className="px-2 text-center cursor-pointer"
              onClick={() => handleArtistDesc(item._id)}
            >
              <div className="mt-14 rounded-lg border border-[#FF536B] flex  flex-col items-center">
                <img
                  src={`${data.url}/users/${item?.profile?.mainImage}`}
                  alt="profile"
                  className="-mt-10 w-[10vh] h-[10vh] rounded-full object-cover"
                />
                <h1 className="text-xl line-clamp-1">
                  {item.artistName + " " + item.artistSurname1}
                </h1>
                <p className="text-sm flex gap-2 min-h-[20px]">
                  {item?.aboutArtist?.discipline?.map((item, i) => (
                    <h1 className=" ">{item?.discipline}</h1>
                  ))}
                </p>
                <img
                  src={`${data.url}/users/${item?.profile?.inProcessImage}`}
                  alt="Artwork"
                  className="p-4 w-[30vw] h-[30vh] object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ArtistPortfolio;
