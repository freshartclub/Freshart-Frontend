import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../App.css";
import like from "../../assets/like.png";
import wishlist_like from "../../assets/whishlist_like.png";
import { imageUrl } from "../utils/baseUrls";
import postRecentArtworkMutation from "./http/postRecentView";
import useLikeUnlikeArtworkMutation from "./http/useLikeUnLike";

const ArtCard = ({ data, tittle, artistData }) => {
  const [likedItems, setLikedItems] = useState([]);
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

  const { mutate } = postRecentArtworkMutation();

  const { mutateAsync: LikeUnlikeMutate, isPending: likePending } =
    useLikeUnlikeArtworkMutation();

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    mutate(id);
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (artistData) {
      setLikedItems(artistData?.likedArtworks);
    }
  }, []);

  const handleLike = (id) => {
    const action = likedItems.includes(id) ? "unlike" : "like";

    const data = {
      id,
      action,
    };
    try {
      LikeUnlikeMutate(data).then(() => {
        setLikedItems((prev) =>
          prev.includes(id)
            ? prev.filter((itemId) => itemId !== id)
            : [...prev, id]
        );
      });
    } catch (error) {
      console.error(`Error in LikeUnlikeMutate for id: ${id}`, error);
    }
  };

  // console.log(data);

  return (
    <div className="container mx-auto md:px-6 px-3 mt-10">
      <h1 className=" text-[25px]  md:text-[30px] font-semibold mb-5 w-1/2 sm:w-full">
        {tittle}
      </h1>
      <div>
        {data?.length < 4 ? (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 px-4 sm:px-0">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer min-w-[75%] sm:min-w-[48%] md:min-w-[32%] lg:min-w-[24%] xl:min-w-[19vw]"
                >
                  <img
                    onClick={() => handleRedirectToDescription(item?._id)}
                    src={`${imageUrl}/users/${item?.media}`}
                    alt="image"
                    className="xl:w-[19vw] w-full sm:w-[40vw] md:w-[60vw] lg:w-[19vw] h-auto aspect-[4/5] object-cover shadow-lg "
                  />
                  <button className="absolute top-2 right-3 sm:right-4 border border-[#FFD9DE] rounded-full p-2 bg-white cursor-pointer">
                    <img
                      onClick={() => handleLike(item?._id)}
                      src={
                        likedItems?.includes(item?._id) ? wishlist_like : like
                      }
                      alt="like"
                      className={`w-5 h-5 ${
                        likePending ? "pointer-events-none opacity-15" : ""
                      }`}
                    />
                  </button>
                  <div className="mt-3">
                    <h1 className="font-bold text-lg text-gray-800 line-clamp-2">
                      {item?.artworkName}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      {item?.owner?.artistName}
                    </p>
                    <p className="text-sm flex items-center justify-between text-gray-500">
                      <span>{item?.discipline?.artworkDiscipline}</span>
                      <span>{item?.additionalInfo?.artworkTechnic}</span>
                    </p>
                    <p className="text-sm text-gray-500">{item?.size}</p>
                    <p className="text-sm text-gray-500">{`${item?.additionalInfo?.length} x ${item?.additionalInfo?.width} cm`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Slider {...settings}>
            {data?.map((item, index) => (
              <div key={index} className="relative cursor-pointer px-3 ">
                <img
                  onClick={() => handleRedirectToDescription(item?._id)}
                  src={`${imageUrl}/users/${item?.media}`}
                  alt="image"
                  className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover shadow-lg "
                />
                <button className="absolute top-2 z-[99] right-7 border border-[#FFD9DE] rounded-full p-2 bg-white cursor-pointer">
                  <img
                    onClick={() => handleLike(item?._id)}
                    src={likedItems?.includes(item?._id) ? wishlist_like : like}
                    alt="like"
                    className={`w-5 h-5 ${
                      likePending ? "pointer-events-none opacity-15" : ""
                    }`}
                  />
                </button>
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
        )}
      </div>
    </div>
  );
};

export default ArtCard;
