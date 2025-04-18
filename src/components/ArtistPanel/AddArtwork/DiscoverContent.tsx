import getSymbolFromCurrency from "currency-symbol-map";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import Header from "../../ui/Header";
import P from "../../ui/P";
import cart from "./assets/cart.png";
import mark from "./assets/offer.png";
import useGetPublishedArtwork from "./http/useGetPublishedArtwork";
import { useTranslation } from "react-i18next";

const DiscoverContent = ({ data }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { mutate, isPending } = useGetPublishedArtwork();

  const handlePublishedArtwork = (id: string) => {
    mutate(id);
  };

  const editArtwork = (id: string) => {
    navigate(`/artist-panel/artwork/add?id=${id}`);
  };

  const [searchParams] = useSearchParams();
  const preview = searchParams.get("preview") === "true";

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
    <>
      <section className="border-b border-gray-300 pb-2 flex flex-col gap-2 justify-between w-full md:items-center">
        <div className="w-full">
          <Header
            variant={{ size: "xl", theme: "dark", weight: "bold" }}
            className="items-center flex scrollbar whitespace-nowrap capitalize !w-full !max-w-full overflow-x-auto"
          >
            {data?.artworkName}
          </Header>
          <div className="flex items-center gap-1">
            <Header
              className="!text-[13px]"
              variant={{ size: "base", theme: "dark", weight: "medium" }}
            >
              {t("Author")} :
            </Header>
            <P
              className="text-[#999999] !text-[13px]"
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
              {isPending ? t("Publishing...") : t("Publish")}
            </Button>
          ) : null}

          {data?.status === "draft" ? (
            <Button
              onClick={() => editArtwork(data?._id)}
              variant={{
                rounded: "full",
                theme: "light",
              }}
              className="text-sm border border-[#263238] w-full text-nowrap font-medium"
            >
              {t("Continue Edit")}
            </Button>
          ) : null}
        </div>
      </section>

      <div className="flex gap-2 lg:mt-2 mt-1">
        <P
          className="!text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {t("Year of Creation")} :
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
          {t("Series")} :
        </P>
        <P
          className="text-[#999999] !text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {data?.artworkSeries}
        </P>
      </div>
      <div className="flex gap-3">
        <P
          className="!text-[13px]"
          variant={{ size: "small", theme: "dark", weight: "medium" }}
        >
          {t("Size")} :
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
          {data?.pricing?.currency ? (
            <>{`${getSymbolFromCurrency(
              data?.pricing?.currency?.slice(0, 3)
            )} ${data?.pricing?.basePrice}`}</>
          ) : (
            <>{`${getSymbolFromCurrency("EUR")} ${data?.pricing?.basePrice}`}</>
          )}
        </Header>
      ) : null}

      <div
        className={`${
          preview && "pointer-events-none opacity-50"
        } flex flex-col gap-2 mt-5`}
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
            {t("Add to Cart")}
          </P>
        </Button>

        <Button
          variant={{ rounded: "full" }}
          className="text-base border border-[#263238] flex items-center justify-center w-full"
        >
          <img src={mark} alt="" className="md:mx-2 mx-1" />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            {t("Make an Offer")}
          </P>
        </Button>
      </div>
    </>
  );
};

export default DiscoverContent;
