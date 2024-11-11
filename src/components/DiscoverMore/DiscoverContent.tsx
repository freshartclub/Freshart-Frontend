import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import cart from "./assets/cart.png";
import mark from "./assets/offer.png";
import wishlist from "./assets/wishlist.png";
import wishlist_like from "../../assets/whishlist_like.png";
import like from "./assets/like.png";
import question from "./assets/question.png";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import useAddToCartMutation from "./http/useAddToCartMutation";
import { useState } from "react";
import { useGetCartItems } from "./http/useGetCartItems";
import useAddToWhislistMutation from "./http/useAddToWhislistMutation";
import { useGetWishList } from "./http/useGetWishList";

const DiscoverContent = ({ data }: any) => {
  console.log("this is from dicover", data);
  const [addtoCart, setAddToCart] = useState("Add To Cart");

  const { mutate, isPending } = useAddToCartMutation();
  const { data: cartItem, isLoading } = useGetCartItems();
  const { mutate: wishListMutation, isPending: wishlistPending } =
    useAddToWhislistMutation();

  const { data: wislistItem } = useGetWishList();

  const maxLength = 100;
  const description =
    data?.productDescription && data.productDescription.length > maxLength
      ? `${data.productDescription.slice(0, maxLength)}...`
      : data?.productDescription;

  const addToCart = (id: string) => {
    mutate(id);
  };

  const checkCartItem = cartItem?.data?.cart?.filter((item) => {
    return item._id === data._id;
  });

  const addToWishList = (id) => {
    wishListMutation(id);
  };

  const checkWishlist = wislistItem?.data?.wishlist?.filter((item) => {
    return item._id === data._id;
  });

  console.log(checkWishlist);

  // console.log(checkCartItem.length ? "hello" : "hey");
  return (
    <div>
      <P
        variant={{ size: "small", weight: "semiBold" }}
        className="lg:mb-10 mb-3 text-[#999999]"
      >
        {data?.discipline?.artworkDiscipline}
      </P>
      <div className="flex gap-2">
        <Header
          variant={{ theme: "dark", weight: "bold" }}
          className="xl:text-3xl text-xl"
        >
          {data?.artworkName}
        </Header>
        <P
          variant={{ size: "md", theme: "dark", weight: "normal" }}
          className="mt-5 "
        >
          ({data?.artworkCreationYear})
        </P>
      </div>

      <div className="flex lg:pb-5 pb-2 border-b lg:mt-2 gap-1">
        <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
          Author :
        </P>
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          {data?.owner?.artistName + " " + data?.owner?.artistSurname1}
        </P>
      </div>

      <div className="flex gap-2 lg:mt-2 mt-1">
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          Years of creation :
        </P>
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          {data?.artworkCreationYear}
        </P>
      </div>

      <P
        variant={{ size: "base", theme: "dark", weight: "normal" }}
        className="lg:mt-2 mt-1"
      >
        Newyork, USA
      </P>

      <P
        variant={{ size: "base", theme: "dark", weight: "normal" }}
        className="lg:my-6 my-2"
      >
        {description}
      </P>

      <div className="flex">
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          Size :{" "}
        </P>
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          {` ${data?.additionalInfo?.height} x ${
            data?.additionalInfo?.weight
          } x ${data?.additionalInfo?.length || null}`}
        </P>
      </div>

      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="lg:my-4 my-2"
      >
        {`$ ${data?.pricing?.basePrice}`}
      </Header>

      <div className="flex md:flex-row flex-col xl:gap-10 gap-2">
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

      <div className="flex lg:flex-row flex-col w-full xl:justify-between lg:justify-between lg:items-center gap-2 lg:my-6 my-3">
        {/* <div className="flex items-center lg:justify-center gap-2 xl:w-[30%]">
          <img src={wishlist} alt="whishlist icon" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999] uppercase"
          >
            Add to Wishlist
          </P>
        </div> */}

        <div className="flex  items-center lg:justify-center gap-2 xl:w-[30%] cursor-pointer">
          <button
            onClick={() => addToWishList(data?._id)}
            className="text-[#999999] uppercase flex gap-2 items-centers"
          >
            {checkWishlist?.length ? (
              <>
                <AiFillLike size="1.6em" color="red" />
                <span>Liked</span>
              </>
            ) : (
              <>
                <AiOutlineLike size="1.6em" />
                <span>Like</span>
              </>
            )}
          </button>
        </div>

        <div className="flex gap-2 items-center lg:justify-center xl:w-[30%]">
          <img src={question} alt="question" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999] uppercase"
          >
            Ask Questions
          </P>
        </div>
      </div>

      <div>
        <div className="flex gap-2 my-2">
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="uppercase"
          >
            SKU :
          </P>
          <P
            variant={{ size: "small", weight: "medium" }}
            className=" text-[#999999]"
          >
            {data?.inventoryShipping?.sku}
          </P>
        </div>
        <div className="flex gap-2 my-2">
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
        <div className="flex gap-2 my-2">
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="uppercase"
          >
            tags:
          </P>
          <P
            variant={{ size: "small", weight: "medium" }}
            className="capitalize text-[#999999] flex gap-2"
          >
            {Array.isArray(data?.discipline?.artworkTags) &&
              data?.discipline?.artworkTags?.map((iw, i) => (
                <span key={i}>
                  {iw}
                  {" |"}
                </span>
              ))}
            {/* {data?.additionalInfo?.artworkStyle?.map((item, i) => (
              <h1>{item}</h1>
            ))} */}
          </P>
        </div>
      </div>
    </div>
  );
};

export default DiscoverContent;
