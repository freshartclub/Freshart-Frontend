import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaEye, FaToggleOn } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { lowImageUrl } from "../utils/baseUrls";
import postRecentArtworkMutation from "./http/postRecentView";
import useLikeUnlikeArtworkMutation from "./http/useLikeUnLike";

const ArtCard = ({ data, tittle, artistData, viewType }) => {
  const [viewedImages, setViewedImages] = useState({});
  const [likedItems, setLikedItems] = useState([]);
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

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
  const handleRedirectToDescription = (id: string) => {
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

  const handleLike = (id: string) => {
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

  const handleViewClick = (id: string) => {
    const newViewedImages = { ...viewedImages, [id]: Date.now() }; // Store timestamp
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setViewedImages(newViewedImages);
  };

  const handleHideClick = (id: string) => {
    const newViewedImages = { ...viewedImages };
    delete newViewedImages[id];
    localStorage.setItem("viewedImages", JSON.stringify(newViewedImages));
    setViewedImages(newViewedImages);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("viewedImages") || "{}");
    const currentTime = Date.now();
    const filteredData: Record<string, number> = {};

    Object.keys(storedData).forEach((key) => {
      if (currentTime - storedData[key] < TEN_DAYS_MS) {
        filteredData[key] = storedData[key];
      }
    });

    localStorage.setItem("viewedImages", JSON.stringify(filteredData));
    setViewedImages(filteredData);
  }, []);

  return (
    <div className="container mx-auto md:px-6 px-3 mt-10">
      <h1 className="text-[25px] md:text-[30px] font-semibold mb-5 w-1/2 sm:w-full">
        {tittle}
      </h1>
      <div>
        <Slider {...settings}>
          {data && data?.length > 0
            ? data.map((item, index: string) => {
                const isOffensive = item?.additionalInfo?.offensive === "Yes";
                const isViewed = viewedImages[item?._id];

                return (
                  <div
                    key={index}
                    className="relative cursor-pointer px-3 group"
                  >
                    <div className="relative overflow-hidden w-full">
                      <img
                        onClick={() => handleRedirectToDescription(item?._id)}
                        src={`${lowImageUrl}/${item?.media}`}
                        alt="Artwork"
                        className={`w-full h-[250px] md:h-[300px] lg:h-[350px] min-[1450px]:h-[400px] object-cover shadow-lg transition-all duration-300 
                                  ${
                                    isOffensive && !isViewed
                                      ? "blur-lg brightness-75 group-hover:blur-md group-hover:brightness-50"
                                      : ""
                                  }
                                `}
                      />

                      {isOffensive && !isViewed ? (
                        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            className="bg-blue-500 flex items-center gap-3 font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={() => handleViewClick(item?._id)}
                          >
                            <FaEye /> View Image
                          </button>
                          <button
                            onClick={() =>
                              handleRedirectToDescription(item?._id)
                            }
                            className="bg-red-500 flex items-center gap-3 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            <MdOutlineOpenInNew /> View Details
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleLike(item?._id)}
                          className="absolute top-2 right-2 border shadow rounded-full p-2 bg-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        >
                          {likedItems?.includes(item?._id) ? (
                            <AiFillLike size="1.5rem" color="red" />
                          ) : (
                            <AiFillLike size="1.5rem" />
                          )}
                        </button>
                      )}

                      {isOffensive && isViewed ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHideClick(item?._id);
                          }}
                          className="absolute bg-white px-2 py-1 rounded top-2 right-2 flex items-center gap-2"
                        >
                          <p className="text-[12px] ">Offensive View</p>
                          <FaToggleOn size={20} className="text-green-500" />
                        </div>
                      ) : null}
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
                );
              })
            : null}
        </Slider>
      </div>
    </div>
  );
};

export default ArtCard;
