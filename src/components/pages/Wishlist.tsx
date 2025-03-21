import { Link, NavLink, useNavigate } from "react-router-dom";
import arrow_bread from "../../assets/arrow_bread.png";
import home from "../../assets/home.png";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { lowImageUrl } from "../utils/baseUrls";
import { useGetFullList } from "./http/useGetFavoruteList";
import { IoHeartOutline } from "react-icons/io5";

const Wishlist = () => {
  const { data, isLoading } = useGetFullList();
  const navigate = useNavigate();

  const handleRedirectToDescription = (id: string) => {
    // if (isToken) mutate(id);
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

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
              Favorite List
            </P>
          </Link>
        </li>
      </ul>

      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="my-4 mx-auto w-full text-center"
      >
        My Favorite List
      </Header>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6">
          {data && data?.length > 0 ? (
            data.map((item, index: number) => (
              <div key={index} className="">
                <span className="font-semibold p-2 text-center text-[#102030] border border-[#102030] rounded">
                  {item?.title}
                </span>

                {item?.items?.length == 1 && item?.items[0]?.item == null ? (
                  <div className="text-[14px] mt-4 border w-full h-[40px] flex items-center justify-center">
                    No Items Found
                  </div>
                ) : (
                  <div className="flex mt-4 gap-2">
                    {item?.items?.map((i, idx: number) => {
                      const type = i?.type;

                      return (
                        type == "artwork" && (
                          <div
                            key={idx}
                            onClick={() =>
                              handleRedirectToDescription(i?.item?._id)
                            }
                            className="flex relative flex-col max-w-[250px] min-w-[180px] h-[200px] cursor-pointer p-2 border flex-shrink-0 bg-white hover:shadow-[5px_5px_5px_rgba(0,0,0,0.05)] transition-shadow duration-300"
                          >
                            <div className="relative overflow-hidden rounded-md h-[180px] border bg-blue-50 w-full">
                              <img
                                className={`w-full h-full object-contain transition-all duration-300 hover:scale-105`}
                                src={`${lowImageUrl}/${i?.item?.media}`}
                              />
                            </div>
                            <span className="font-medium mt-2 text-sm">
                              {i?.item?.artworkName.length > 20
                                ? i?.item?.artworkName.slice(0, 20) + "..."
                                : i?.item?.artworkName}
                            </span>
                            <div className="absolute bottom-0 right-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // handleFavoriteClick(i?.item?._id, i?.type);
                                }}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Add to favorites"
                              >
                                <IoHeartOutline
                                  size="1.1rem"
                                  className="text-rose-600"
                                />
                              </button>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                )}
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
      )}
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
