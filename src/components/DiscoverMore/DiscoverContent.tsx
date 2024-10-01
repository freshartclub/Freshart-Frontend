import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import cart from "./assets/cart.png";
import mark from "./assets/offer.png";
import wishlist from "./assets/wishlist.png";
import like from "./assets/like.png";
import question from "./assets/question.png";

const DiscoverContent = () => {
  return (
    <div className="">
      <P
        variant={{ size: "small", weight: "semiBold" }}
        className="mb-10 text-[#999999]"
      >
        Black & White Fashion
      </P>
      <div className="flex gap-2">
        <Header variant={{ size: "3xl", theme: "dark", weight: "bold" }}>
          Ornamental Goblet Poster
        </Header>
        <P
          variant={{ size: "md", theme: "dark", weight: "normal" }}
          className="mt-5 "
        >
          (2021)
        </P>
      </div>

      <div className="flex pb-5 border-b mt-2 gap-1">
        <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
          Author :
        </P>
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          Alfred Frost,Melany Rodriguez
        </P>
      </div>

      <div className="flex gap-2 mt-2">
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          Years of creation :
        </P>
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>2022</P>
      </div>

      <P
        variant={{ size: "base", theme: "dark", weight: "normal" }}
        className="mt-2"
      >
        Newyork, USA
      </P>

      <P
        variant={{ size: "base", theme: "dark", weight: "normal" }}
        className="my-6
        "
      >
        Quia in harum exercitationem sit sequi omnis. Tenetur id facere illo
        dolor. Nulla molestiae voluptatem mollitia ullam necessitatibus sit
        quibusdam.
      </P>

      <div className="flex">
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          Size :{" "}
        </P>
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          17 x 54 x 55
        </P>
      </div>

      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="my-4"
      >
        $120.00
      </Header>

      <div className="flex gap-10">
        <Button
          variant={{
            fontSize: "lg",
            theme: "dark",
            fontWeight: "600",
            rounded: "full",
          }}
          className="flex !px-12 !py-4"
        >
          <img src={cart} alt="" className="mx-2" />
          <P variant={{ size: "base", theme: "light", weight: "normal" }}>
            Add to cart
          </P>
        </Button>

        <Button
          variant={{
            fontSize: "lg",
            theme: "",
            rounded: "full",
          }}
          className="flex border !px-12 !py-4"
        >
          <img src={mark} alt="" className="mx-2" />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Make an offer
          </P>
        </Button>
      </div>

      <div className="flex w-[70%] justify-end items-center my-6">
        <div className="flex items-center justify-center gap-2 w-[30%]">
          <img src={wishlist} alt="whishlist icon" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999]"
          >
            Add to Wishlist
          </P>
        </div>

        <div className="flex items-center justify-center gap-2 w-[30%]">
          <img src={like} alt="like btn" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999]"
          >
            LIKE
          </P>
        </div>

        <div className="flex gap-2 items-center justify-center w-[30%]">
          <img src={question} alt="question" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999]"
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
            2489
          </P>
        </div>
        <div className="flex gap-2 my-2">
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="uppercase"
          >
            CATEGories :
          </P>
          <P
            variant={{ size: "small", weight: "medium" }}
            className="capitalize text-[#999999]"
          >
            All Art pribts posters
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
            className="capitalize text-[#999999]"
          >
            {" "}
            Art design graphic art illustration photography
          </P>
        </div>
      </div>
    </div>
  );
};

export default DiscoverContent;
