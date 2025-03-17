import getSymbolFromCurrency from "currency-symbol-map";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../App.css";
import { lowImageUrl } from "../utils/baseUrls";
// import { AiFillLike } from "react-icons/ai";

const CommonCardData = ({
  heading,
  highlightData,
}: {
  heading: string;
  highlightData: HighlightItem[];
}) => {
  const settings = {
    dots: true,
    infinite: highlightData?.length > 1,
    speed: 500,
    slidesToShow: highlightData?.length === 1 ? 1 : 4,
    slidesToScroll: 1,
    autoplay: highlightData?.length > 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: highlightData?.length === 1 ? 1 : 3,
          slidesToScroll: 1,
          infinite: highlightData?.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: highlightData?.length === 1 ? 2 : 2,
          slidesToScroll: 1,
          infinite: highlightData?.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightData?.length > 1,
          dots: true,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleRedirectToDescription = (id: string) => {
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  const renderContent =
    highlightData?.length == 0 ? (
      <div className="p-2 border w-full bg-white mx-auto text-center font-semibold">
        No Artwork Found
      </div>
    ) : highlightData?.length === 1 ? (
      <div
        key={0}
        className="sm:px-3 px-0 border-none outline-none relative lg:w-[30vw] xl:w-[20vw] md:w-[30vw] sm:w-[50vw]"
      >
        <div className="p-3 h-[40vh] flex items-center justify-center bg-blue-100">
          <img
            src={`${lowImageUrl}/${highlightData[0]?.mainImage}`}
            alt="image"
            className="lg:w-[35vw] md:w-[35vw] object-contain h-[40vh]"
            onClick={() => handleRedirectToDescription(highlightData[0]?._id)}
          />
        </div>

        <div className="pt-3">
          <div className="flex flex-col">
            <h1 className="font-bold text-[16px] sm:text-[20px] text-[#333333]">
              {highlightData[0]?.artworkName}
            </h1>
            <p className="text-[12px] sm:text-[14px] text-[#696868] sm:w-auto w-full">
              {highlightData[0]?.discipline} |{" "}
              {highlightData[0]?.additionalInfo?.technic || "N/A"}
            </p>
            <p className="text-[12px] sm:text-[14px] text-[#696868] sm:w-auto w-full">
              {`${highlightData[0]?.additionalInfo?.length || "--"} x ${
                highlightData[0]?.additionalInfo?.width || "--"
              } x ${highlightData[0]?.additionalInfo?.height || "--"}`}{" "}
              cm
            </p>
          </div>

          {highlightData[0]?.pricing?.basePrice ? (
            <p className="text-[14px] font-bold">
              {getSymbolFromCurrency(
                highlightData[0]?.pricing?.currency.split(" ")[0]
              ) +
                " " +
                highlightData[0]?.pricing?.basePrice}
            </p>
          ) : null}
        </div>
      </div>
    ) : (
      <Slider {...settings}>
        {highlightData?.map((item, index: number) => (
          <div
            key={index}
            className="sm:px-3 px-0 border-none outline-none relative"
          >
            <div className="p-3 h-[40vh] flex items-center justify-center bg-blue-100">
              <img
                src={`${lowImageUrl}/${item?.mainImage}`}
                alt="image"
                className="max-h-[35vh] object-contain cursor-pointer"
                onClick={() => handleRedirectToDescription(item?._id)}
              />
            </div>

            <div className="mt-3">
              <div className="flex flex-col">
                <h1 className="font-bold text-[16px] sm:text-[20px] text-[#333333]">
                  {item?.artworkName}
                </h1>
                <p className="text-[12px] sm:text-[14px] text-[#696868] sm:w-auto w-full">
                  {item?.discipline} | {item?.additionalInfo?.technic || "N/A"}
                </p>
                <p className="text-[12px] sm:text-[14px] text-[#696868] sm:w-auto w-full">
                  {`${item?.additionalInfo?.length || "--"} x ${
                    item?.additionalInfo?.width || "--"
                  } x ${item?.additionalInfo?.height || "--"}`}{" "}
                  cm
                </p>
              </div>

              {item?.pricing?.basePrice ? (
                <p className="text-[14px] font-bold">
                  {getSymbolFromCurrency(
                    item?.pricing?.currency.split(" ")[0]
                  ) +
                    " " +
                    item?.pricing?.basePrice}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </Slider>
    );

  return (
    <div className="my-10">
      <h2 className="sm:text-[25px] text-[20px] font-semibold mb-5 w-52 sm:w-full">
        {heading}
      </h2>

      {renderContent}
    </div>
  );
};

interface HighlightItem {
  mainImage: string;
  discipline: string;
  additionalInfo: {
    length: string;
    width: string;
    height: string;
    technic: string;
  };
  pricing: {
    currency: string;
    basePrice: string;
  };
  artworkName: string;
  _id: string;
  title: string;
  heading: string;
  size: string;
  para: string;
  price: string;
}

export default CommonCardData;
