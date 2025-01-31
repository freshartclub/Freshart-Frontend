import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Header from "../ui/Header";
import ViewButton from "../ui/ViewButton";
import "./ArtistPortfoilio.css";
import { imageUrl } from "../utils/baseUrls";

const ArtistPortfolio = ({ data }) => {
  const settings = {
    dots: true,
    infinite: data && data.length > 1 ? true : false,
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
        breakpoint: 480,
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

  const redirectToAllArtistPage = () => {
    navigate("/all_artist");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArtistDesc = (id) => {
    navigate(`/artist_detail?id=${id}`);
    window.scroll(0, 0);
  };

  const name = (val: {
    artistName: string;
    artistSurname1: string;
    artistSurname2: string;
  }) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  const mapData = (val: string[]) => {
    if (!val || val.length === 0) return "";
    return val.join(" | ");
  };

  return (
    <div className="container mx-auto md:px-6 px-3 ">
      <div className="mt-10">
        <div className="flex max-[450px]:flex-col items-center justify-between">
          <Header
            variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
            className="text-[30px] font-semibold"
          >
            Artist Portfolio
          </Header>

          <ViewButton onClick={redirectToAllArtistPage} />
        </div>
      </div>
      <div className="artist_slider h-auto  ">
        <Slider {...settings}>
          {data?.artists?.map((item, i) => (
            <div
              key={i}
              className="px-2 text-center cursor-pointer   "
              onClick={() => handleArtistDesc(item._id)}
            >
              <div className="mt-14 rounded-lg border border-[#FF536B] flex  flex-col items-center">
                <img
                  src={`${imageUrl}/users/${item?.profile?.mainImage}`}
                  alt="profile"
                  className="-mt-8 w-[10vh] h-[10vh] rounded-full object-cover"
                />
                <h1 className="text-xl line-clamp-1 font-medium">
                  {name(item)}
                </h1>
                <p className="text-sm flex flex-wrap justify-center gap-2 min-h-[20px]">
                  {item?.aboutArtist?.discipline &&
                    mapData(
                      item?.aboutArtist?.discipline?.map(
                        (item) => item?.discipline
                      )
                    )}
                </p>

                <img
                  src={`${imageUrl}/users/${
                    item?.profile?.inProcessImage || item?.profile?.mainImage
                  }`}
                  alt="Artwork"
                  className="p-2 rounded w-full h-[40vh] sm:w-[30vw] sm:h-[30vh] object-cover"
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
