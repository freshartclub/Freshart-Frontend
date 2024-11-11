import Header from "../../ui/Header";
import P from "../../ui/P";
import cart from "./assets/cart.png";
import mark from "./assets/offer.png";
import wishlist from "./assets/wishlist.png";
import like from "./assets/like.png";
import question from "./assets/question.png";
import { RiH1 } from "react-icons/ri";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetPublishedArtwork from "./http/useGetPublishedArtwork";

const DiscoverContent = ({ data }: any) => {
  console.log("this is from dicover", data);

  const navigate = useNavigate();

  const { mutate, isPending } = useGetPublishedArtwork();

  const handlePublishedArtwork = (id) => {
    mutate(id);
  };

  const editArtwork = (id) => {
    navigate(`/artist-panel/artwork/add?id=${id}`);
  };

  const [searchParams] = useSearchParams();

  const preview = searchParams.get("preview") === "true";
  console.log(preview);

  const maxLength = 100;
  const description =
    data?.productDescription && data.productDescription.length > maxLength
      ? `${data.productDescription.slice(0, maxLength)}...`
      : data?.productDescription;
  return (
    <div>
      <section className="flex md:items-center flex-col md:flex-row justify-between border-b pb-2 gap-1">
        <div className="w-full">
          <div className="flex md:flex-row flex-col gap-2 md:items-center ">
            <Header
              variant={{ size: "2xl", theme: "dark", weight: "bold" }}
              className="w-[50%] items-center"
            >
              {data?.artworkName}
            </Header>

            <div className="flex items-center gap-2 w-[50%]">
              <Button
                onClick={() => handlePublishedArtwork(data?._id)}
                variant={{
                  rounded: "full",
                  theme: "dark",
                }}
                className="flex justify-center border border-[#263238] w-full font-medium text-sm"
              >
                Publish
              </Button>
              <Button
                onClick={() => editArtwork(data?._id)}
                variant={{
                  rounded: "full",
                  theme: "light",
                }}
                className="text-sm border border-[#263238] w-full font-medium"
              >
                Continue Edit
              </Button>
            </div>
            {/* <P variant={{ size: 'md', theme: 'dark', weight: 'normal' }} className="mt-5 ">
          (2021)
        </P> */}
          </div>

          <div className="flex lg:pb-2 pb-2 lg:mt-1 gap-1">
            <Header
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="text-[14px]"
            >
              Author :
            </Header>
            <P
              variant={{ size: "base", weight: "normal" }}
              className="text-[14px] "
            >
              {data?.owner?.artistName + " " + data?.owner?.artistSurname1}
            </P>
          </div>
        </div>
        {/* <div className="flex gap-2">
          <Button
            variant={{
              fontSize: "md",
              rounded: "full",
              theme: "dark",
              fontWeight: "600",
            }}
            className="flex justify-center border border-[#263238] w-full md:w-fit"
          >
            Publish
          </Button>
          <Button
            variant={{
              rounded: "full",
              theme: "light",
              fontWeight: "600",
            }}
            className="2xl:text-md text-base border border-[#263238] w-full "
          >
            Continue Edit
          </Button>
        </div> */}
      </section>
      {/* <div className="flex gap-2">
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
      </div> */}

      {/* <div className="flex lg:pb-5 pb-2 border-b lg:mt-2 gap-1">
        <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
          Author :
        </P>
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          {data?.owner?.artistName + " " + data?.owner?.artistSurname1}
        </P>
      </div> */}

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

      <div
        className={`${
          preview && "pointer-events-none opacity-50"
        } flex md:flex-row flex-col xl:gap-10 gap-2 `}
      >
        <Button
          variant={{
            theme: "dark",
            fontWeight: "600",
            rounded: "full",
          }}
          className="text-base flex items-center justify-center xl:!px-12 lg:px-4 lg:!py-4 !py-2 w-full"
        >
          <img src={cart} alt="" className="md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "light", weight: "normal" }}>
            Add to cart
          </P>
        </Button>

        <Button
          variant={{
            theme: "",
            rounded: "full",
          }}
          className=" text-base flex items-center justify-center border xl:!px-12 lg:px-4 lg:!py-4 !py-2 w-full"
        >
          <img src={mark} alt="" className="md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Make an offer
          </P>
        </Button>
      </div>

      <div className="flex lg:flex-row flex-col w-full xl:justify-end lg:justify-between lg:items-center gap-2 lg:my-6 my-3">
        <div className="flex items-center lg:justify-center gap-2 xl:w-[30%]">
          <img src={wishlist} alt="whishlist icon" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999] uppercase"
          >
            Add to Wishlist
          </P>
        </div>

        <div className="flex items-center lg:justify-center gap-2 xl:w-[30%]">
          <img src={like} alt="like btn" />
          <P
            variant={{ size: "small", weight: "semiBold" }}
            className="text-[#999999] uppercase"
          >
            LIKE
          </P>
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
              data?.discipline?.artworkTags.map((iw, i) => (
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
