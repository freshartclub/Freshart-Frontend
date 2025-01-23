import getSymbolFromCurrency from "currency-symbol-map";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import useLikeUnlikeArtworkMutation from "../HomePage/http/useLikeUnLike";
import { useGetLikedItems } from "../pages/http/useGetLikedItems";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import cart from "./assets/cart.png";
import mark from "./assets/offer.png";
import question from "./assets/question.png";
import useAddToCartMutation from "./http/useAddToCartMutation";
import { useGetCartItems } from "./http/useGetCartItems";
import { AiOutlineHeart } from "react-icons/ai";

const DiscoverContent = ({ data }: any) => {
  const { mutate, isPending } = useAddToCartMutation();
  const { data: cartItem } = useGetCartItems();
  const { mutate: likeMutation, isPending: likePending } =
    useLikeUnlikeArtworkMutation();

  const { data: likedItems } = useGetLikedItems();

  const maxLength = 100;
  const description =
    data?.productDescription && data.productDescription.length > maxLength
      ? `${data.productDescription.slice(0, maxLength)}...`
      : data?.productDescription;

  const addToCart = (id: string) => {
    mutate(id);
  };

  const checkCartItem = cartItem?.data?.cart?.filter((item) => {
    return item?.item?._id === data?._id;
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
      <div className="border-b pb-2">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="items-center capitalize"
        >
          {data?.artworkName}
        </Header>
        <div className="flex items-center gap-2">
          <Header variant={{ size: "base", theme: "dark", weight: "medium" }}>
            Author :
          </Header>
          <P
            className="text-[#999999] translate-y-[2px]"
            variant={{ size: "small", weight: "medium" }}
          >
            {name(data?.owner)}
          </P>
        </div>
      </div>

      <div className="flex gap-2 lg:mt-2 mt-1">
        <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
          Year of Creation :
        </P>
        <P
          className="text-[#999999]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.artworkCreationYear}
        </P>
      </div>

      <div className="flex gap-2 lg:mt-2 mt-1 ">
        <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
          Artwork Series :
        </P>
        <P
          className="text-[#999999]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.artworkSeries}
        </P>
      </div>

      <P
        variant={{ size: "small", theme: "dark", weight: "medium" }}
        className="lg:my-4 my-2 text-[#999999]"
      >
        {description}
      </P>

      <div className="flex gap-3 ">
        <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
          Size :
        </P>
        <P
          className="text-[#999999]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.additionalInfo?.length} x {data?.additionalInfo?.width} x{" "}
          {data?.additionalInfo?.height} cm
        </P>
      </div>

      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="lg:my-4 my-2"
      >
        {`${getSymbolFromCurrency(data?.pricing?.currency?.slice(0, 3))} ${
          data?.pricing?.basePrice
        }`}
      </Header>

      <div className="flex lg:flex-row flex-col gap-5">
        <Button
          onClick={() => addToCart(data?._id)}
          variant={{
            theme: "dark",
            fontWeight: "600",
            rounded: "full",
          }}
          className={`${
            checkCartItem?.length
              ? "text-base flex items-center justify-center xl:!px-12 lg:px-4 lg:!py-4 !py-2 w-full pointer-events-none opacity-50"
              : "text-base flex items-center justify-center xl:!px-12 lg:px-4 lg:!py-4 !py-2 w-full"
          } `}
        >
          <img src={cart} alt="" className="md:mx-2 mx-1" />
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
          className="text-base flex items-center justify-center border xl:!px-12 lg:px-4 lg:!py-4 !py-2 w-full"
        >
          <img src={mark} alt="" className="md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Make an offer
          </P>
        </Button>
      </div>

      <div className="flex flex-wrap justify-between w-full items-center gap-2 my-4">
        <div className="flex items-center gap-2">
          <AiOutlineHeart size="1.5rem" color="#999999" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999] uppercase"
          >
            Add to Wishlist
          </P>
        </div>

        <div className="flex items-center gap-2">
          {checkWishlist?.length ? (
            <button
              onClick={() =>
                likeMutation({
                  id: data?._id,
                  action: "unlike",
                })
              }
              className="text-[#999999] font-bold uppercase flex gap-2 items-center w-full justify-center"
            >
              <AiFillLike size="1.5rem" color="red" />
              <P
                variant={{ size: "small", weight: "semiBold" }}
                className="text-[#999999] uppercase translate-y-[3px]"
              >
                {likePending ? "Dislike..." : "Dislike"}
              </P>
            </button>
          ) : (
            <button
              onClick={() =>
                likeMutation({
                  id: data?._id,
                  action: "like",
                })
              }
              className="text-[#999999] font-bold uppercase flex gap-2 items-center w-full justify-center"
            >
              <AiOutlineLike size="1.5rem" />
              <P
                variant={{ size: "small", weight: "semiBold" }}
                className="text-[#999999] uppercase translate-y-[3px]"
              >
                {likePending ? "Like..." : "Like"}
              </P>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <img src={question} alt="question" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999] uppercase"
          >
            Ask Questions
          </P>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap justify-between">
        <div className="flex gap-2">
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="uppercase"
          >
            Product Code :
          </P>
          <P
            variant={{ size: "small", weight: "medium" }}
            className=" text-[#999999]"
          >
            {data?.inventoryShipping?.pCode || "N/A"}
          </P>
        </div>
        <div className="flex gap-2">
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="uppercase"
          >
            Discipline :
          </P>
          <P
            variant={{ size: "small", weight: "medium" }}
            className="capitalize text-[#999999]"
          >
            {data?.discipline?.artworkDiscipline}
          </P>
        </div>
      </div>
    </div>
  );
};

export default DiscoverContent;
