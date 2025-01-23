import getSymbolFromCurrency from "currency-symbol-map";
import { Link, NavLink } from "react-router-dom";
import arrow_bread from "../../assets/arrow_bread.png";
import home from "../../assets/home.png";
import wishlist_like from "../../assets/whishlist_like.png";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import { useGetLikedItems } from "./http/useGetLikedItems";

const Wishlist = () => {
  const { data, isLoading } = useGetLikedItems();
  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto md:px-6 px-3 my-10 ">
      <ul className="flex p-2 gap-3 text-xl text-[#2E4053] items-center">
        <li>
          <Link to="/" className="rounded-md transition-all flex">
            <img
              src={home}
              alt="Home icon"
              className="w-[14px] h-[14px] mr-2"
            />
            <P
              variant={{ size: "small", theme: "dark", weight: "normal" }}
              className="text-[#FF536B]"
            >
              Home
            </P>
          </Link>
        </li>
        <img
          src={arrow_bread}
          alt="Home icon"
          className="w-[4px] h-[6px] mr-2"
        />
        <li>
          <Link
            to="/products"
            className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
          >
            <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
              Liked Artworks
            </P>
          </Link>
        </li>
      </ul>

      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="my-4"
      >
        My Liked Artworks
      </Header>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between gap-8 mt-4 ">
        {data?.likedArtworks && data?.likedArtworks?.length > 0 ? (
          data?.likedArtworks?.map((item: Artwork, index: number) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none mb-10 w-[20vw] h-[50vh] relative"
            >
              <img
                src={`${imageUrl}/users/${item?.media}`}
                alt="image"
                className="w-full h-full shadow-md object-cover"
              />
              <button className="absolute top-2 right-[28px]  cursor-pointer">
                <img src={wishlist_like} alt="like" className="" />
              </button>
              <div className="mt-3">
                <P
                  variant={{ size: "base", weight: "normal" }}
                  className="text-[#696868]"
                >
                  {item.title}
                </P>
                <div className="flex justify-between items-center">
                  <Header
                    variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
                    className="text-[#333333] xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2"
                  >
                    {item?.artworkName}
                  </Header>

                  <P
                    variant={{ size: "base", weight: "normal" }}
                    className="text-[#696868]"
                  >
                    {item.size
                      ? `${item.size.width} x ${item.size.height} x ${item.size.length}`
                      : "Size not available"}
                  </P>
                </div>
                <P
                  variant={{ size: "base", weight: "normal" }}
                  className="text-[#696868]"
                >
                  {item.para}
                </P>

                <P variant={{ size: "base", weight: "medium" }}>
                  {getSymbolFromCurrency(item?.pricing?.currency?.slice(0, 3))}{" "}
                  {item?.pricing?.basePrice}
                </P>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 rounded py-4 text-center col-span-4 border border-[#c6c6c9]">
            <p className="text-lg text-center font-medium mb-4">
              You haven't liked any artworks.
            </p>
            <NavLink to="/all-artworks?type=subscription">
              <button className="px-6 py-2 bg-zinc-800 text-white rounded-lg">
                Explore Artworks
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

interface Artwork {
  media: string;
  title: string;
  price: number;
  currency: string;
  artworkName: string;
  size: {
    height: string;
    width: string;
    length: string;
  };
  para: string;
  _id: string;
  pricing: {
    basePrice: number;
    currency: string;
  };
}

export default Wishlist;
