import getSymbolFromCurrency from "currency-symbol-map";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import Header from "../../ui/Header";
import P from "../../ui/P";
import cart from "./assets/cart.png";
import mark from "./assets/offer.png";
import useGetPublishedArtwork from "./http/useGetPublishedArtwork";

const DiscoverContent = ({ data }: any) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useGetPublishedArtwork();

  const handlePublishedArtwork = (id: string) => {
    mutate(id);
  };

  const currency = data?.pricing?.currency;

  const editArtwork = (id: string) => {
    navigate(`/artist-panel/artwork/add?id=${id}`);
  };

  const [searchParams] = useSearchParams();
  const preview = searchParams.get("preview") === "true";

  const description =
    data?.productDescription && data.productDescription.length > 100
      ? `${data.productDescription.slice(0, 100)}...`
      : data?.productDescription;

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
      <section className="flex md:items-center flex-col md:flex-row justify-between border-b pb-2 gap-1">
        <div className="w-full">
          <div className="flex md:flex-row flex-col gap-2 justify-between md:items-center">
            <div className="w-full">
              <Header
                variant={{ size: "xl", theme: "dark", weight: "bold" }}
                className="items-center capitalize"
              >
                {data?.artworkName}
              </Header>
              <div className="flex items-center gap-1">
                <Header
                  variant={{ size: "base", theme: "dark", weight: "medium" }}
                >
                  Author :
                </Header>
                <P
                  className="text-[#999999]"
                  variant={{ size: "small", weight: "medium" }}
                >
                  {name(data?.owner)}
                </P>
              </div>
            </div>

            <div className="flex w-full items-center gap-2">
              {data?.status === "draft" ? (
                <Button
                  onClick={() => handlePublishedArtwork(data?._id)}
                  variant={{
                    rounded: "full",
                    theme: "dark",
                  }}
                  className="flex justify-center border border-[#263238] w-full font-medium text-sm"
                >
                  {isPending ? "Publishing..." : "Publish"}
                </Button>
              ) : null}

              {data?.status === "draft" ? (
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
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-2 lg:mt-2 mt-1">
        <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
          Artwork ID :
        </P>
        <P
          className="text-[#999999]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.artworkId}
        </P>
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
        {`${getSymbolFromCurrency(currency?.slice(0, 3))} ${
          data?.pricing?.basePrice
        }`}
      </Header>

      <div
        className={`${
          preview && "pointer-events-none opacity-50"
        } flex md:flex-row flex-col gap-5 `}
      >
        <Button
          variant={{
            theme: "dark",
            fontWeight: "600",
            rounded: "full",
          }}
          className="text-base flex items-center justify-center w-full"
        >
          <img src={cart} alt="" className="md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "light", weight: "normal" }}>
            Add to Cart
          </P>
        </Button>

        <Button
          variant={{ rounded: "full" }}
          className="text-base flex items-center justify-center w-full"
        >
          <img src={mark} alt="" className="md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Make an Offer
          </P>
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap justify-between">
        <div className="flex gap-2 my-2">
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
      </div>
    </div>
  );
};

export default DiscoverContent;
