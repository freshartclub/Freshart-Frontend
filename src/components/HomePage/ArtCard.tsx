import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { imageUrl } from "../utils/baseUrls";
import postRecentArtworkMutation from "./http/postRecentView";
import useLikeUnlikeArtworkMutation from "./http/useLikeUnLike";
import { AiFillLike } from "react-icons/ai";

const ArtCard = ({ data, tittle, artistData }) => {
  const [likedItems, setLikedItems] = useState([]);

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

  const { mutate } = postRecentArtworkMutation();
  const { mutateAsync: LikeUnlikeMutate } = useLikeUnlikeArtworkMutation();

  const isToken = localStorage.getItem("auth_token");

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    if (isToken) {
      mutate(id);
    }
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

  return (
    <div className="container mx-auto md:px-6 px-3 mt-10">
      <h1 className="text-[25px] md:text-[30px] font-semibold mb-5 w-1/2 sm:w-full">
        {tittle}
      </h1>
      <div>
        <Slider {...settings}>
          {data?.map((item, index) => (
            <div key={index} className="relative cursor-pointer px-3 ">
              <div className="overflow-hidden">
                <img
                  onClick={() => handleRedirectToDescription(item?._id)}
                  src={`${imageUrl}/users/${item?.media}`}
                  alt="image"
                  className={`w-full h-[40vh] border sm:h-[45vh] md:h-[50vh] object-cover shadow-lg ${
                    item?.additionalInfo?.offensive == "Yes" ? "blur-3xl" : ""
                  }`}
                />
                <button
                  onClick={() => handleLike(item?._id)}
                  className="absolute top-2 z-[99] right-7 border shadow rounded-full p-2 bg-white cursor-pointer"
                >
                  {likedItems?.includes(item?._id) ? (
                    <AiFillLike size="1.5rem" color="red" />
                  ) : (
                    <AiFillLike size="1.5rem" />
                  )}
                </button>
              </div>
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
    </div>
  );
};

export default ArtCard;
