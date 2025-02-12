import "../../App.css";
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

const CardSection = ({ data }) => {
  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  const { mutate } = postRecentArtworkMutation();
  const navigate = useNavigate();

  const handleRedirectToDescription = (id: string) => {
    mutate(id);
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  return (
    <div className="grid max-[440px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1450px]:grid-cols-5 gap-x-5 gap-y-10 mx-auto">
      {data?.data && data?.data?.length > 0
        ? data?.data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col outline-none cursor-pointer"
              onClick={() => handleRedirectToDescription(item?._id)}
            >
              <div className="relative overflow-hidden w-full">
                <img
                  src={`${imageUrl}/users/${item?.media}`}
                  alt="Artwork"
                  className={`w-full h-[250px] md:h-[300px] lg:h-[350px] min-[1450px]:h-[400px] object-cover shadow-lg ${
                    item?.additionalInfo?.offensive == "Yes" ? "blur-3xl" : ""
                  }`}
                />
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
  );
};

export default CardSection;
