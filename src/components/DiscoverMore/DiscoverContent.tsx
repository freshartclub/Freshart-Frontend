import getSymbolFromCurrency from "currency-symbol-map";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaShareFromSquare } from "react-icons/fa6";
import useLikeUnlikeArtworkMutation from "../HomePage/http/useLikeUnLike";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import { useGetLikedItems } from "../pages/http/useGetLikedItems";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import cart from "./assets/cart.png";
import mark from "./assets/offer.png";
import useAddToCartMutation from "./http/useAddToCartMutation";

const DiscoverContent = ({ data }: any) => {
  const { mutate, isPending } = useAddToCartMutation();
  const { data: cartItem } = useGetCartItems();
  const { mutate: likeMutation } = useLikeUnlikeArtworkMutation();
  const { data: likedItems } = useGetLikedItems();

  const token = localStorage.getItem("auth_token");

  const addToCart = (id: string) => {
    if (!token) {
      const items: string[] = JSON.parse(
        localStorage.getItem("_my_cart") || "[]"
      );
      if (!items.includes(id)) {
        items.push(id);
        localStorage.setItem("_my_cart", JSON.stringify(items));
        return toast.success("Item Temporarily added to cart");
      }

      return toast.error("Item already in cart");
    }

    mutate(id);
    return toast.success("Item added to cart successfully");
  };

  const checkCartItem = cartItem?.data?.cart?.filter((item) => {
    return item._id == data._id;
  });

  const checkWishlist = likedItems?.likedArtworks?.filter((item) => {
    return item._id === data._id;
  });

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

  return (
    <div>
      <div className="border-b pb-0.5">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="items-center flex scrollbar whitespace-nowrap capitalize !w-full !max-w-full overflow-x-auto"
        >
          {data?.artworkName}
        </Header>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Header
            className="!text-[13px]"
            variant={{ size: "base", theme: "dark", weight: "medium" }}
          >
            Author :
          </Header>
          <P
            className="text-[#999999] !text-[13px] items-center flex scrollbar whitespace-nowrap capitalize !w-full !max-w-full overflow-x-auto"
            variant={{ size: "small", weight: "medium" }}
          >
            {name(data?.owner)}
          </P>
        </div>
      </div>

      <div className="flex gap-2 mt-1">
        <P
          className="!text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          Year of Creation :
        </P>
        <P
          className="text-[#999999] !text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.artworkCreationYear}
        </P>
      </div>

      <div className="flex gap-2">
        <P
          className="!text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          Series :
        </P>
        <P
          className="text-[#999999] !text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.artworkSeries}
        </P>
      </div>

      <div className="flex gap-2">
        <P
          className="!text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          Discipline :
        </P>
        <P
          className="text-[#999999] !text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.discipline}
        </P>
      </div>

      <div className="flex gap-3">
        <P
          className="!text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          Size :
        </P>
        <P
          className="text-[#999999] !text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.additionalInfo?.length} x {data?.additionalInfo?.width} x{" "}
          {data?.additionalInfo?.height} cm
        </P>
      </div>

      {data?.pricing?.basePrice ? (
        <Header
          variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
          className="my-2"
        >
          {`${getSymbolFromCurrency(data?.pricing?.currency?.slice(0, 3))} ${
            data?.pricing?.basePrice
          }`}
        </Header>
      ) : null}

      <div
        className={`${
          data?.commingSoon == true
            ? "pointer-events-none cursor-not-allowed opacity-50"
            : ""
        } ${data?.pricing?.basePrice ? "" : "mt-10"} flex flex-col gap-2`}
      >
        <Button
          onClick={() => addToCart(data?._id)}
          variant={{
            theme: "dark",
            fontWeight: "600",
            rounded: "full",
          }}
          className={`text-base flex items-center justify-center w-full ${
            checkCartItem?.length ? "pointer-events-none opacity-50" : ""
          } `}
        >
          <img src={cart} alt="" className="w-5 h-5 md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "light", weight: "normal" }}>
            {checkCartItem?.length
              ? "Already Added"
              : isPending
              ? "Adding..."
              : "Add to cart"}
          </P>
        </Button>

        <Button
          variant={{
            theme: "",
            rounded: "full",
          }}
          className="text-base flex border-zinc-300 items-center justify-center border w-full"
        >
          <img src={mark} alt="" className="w-4 h-4 md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Make an offer
          </P>
        </Button>
      </div>

      <div className="flex flex-wrap w-full items-center justify-between mt-5 px-1">
        <AiOutlineHeart
          className="cursor-pointer"
          size="1.5rem"
          color="#999999"
        />

        {checkWishlist?.length ? (
          <AiFillLike
            className="cursor-pointer"
            onClick={() =>
              likeMutation({
                id: data?._id,
                action: "unlike",
              })
            }
            size="1.5rem"
            color="red"
          />
        ) : (
          <AiOutlineLike
            className="cursor-pointer"
            onClick={() =>
              likeMutation({
                id: data?._id,
                action: "like",
              })
            }
            size="1.5rem"
          />
        )}

        <BsFillQuestionCircleFill className="cursor-pointer" size="1.5rem" />
        <FaShareFromSquare className="cursor-pointer" size="1.5rem" />
      </div>
    </div>
  );
};

export default DiscoverContent;
