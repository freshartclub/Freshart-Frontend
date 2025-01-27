import getSymbolFromCurrency from "currency-symbol-map";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import P from "../../ui/P";
import delivery from "./assets/delivery.png";
import print from "./assets/print.png";
import return1 from "./assets/return.png";
import secure from "./assets/secure.png";
import product from "./assets/single-product.jpg.png";
import { useTranslation } from "react-i18next";

const ProductInfo = ({ data }) => {
  const { t } = useTranslation();
  const currency = data?.data?.pricing?.currency;

  const mapData = (val: string[]) => {
    if (!val || val.length === 0) return "";
    return val.join(" | ");
  };

  const overview_date = [
    {
      head: "Art Provider",
      name: data?.data?.isArtProvider,
    },

    {
      head: "Art Provider Name",
      name: data?.data?.provideArtistName || "N/A",
    },

    {
      head: "Artwork Technic",
      name: data?.data?.additionalInfo?.artworkTechnic,
    },
    {
      head: "Artwork Theme",
      name: data?.data?.additionalInfo?.artworkTheme,
    },
    {
      head: "Artwork Oriantaion",
      name: data?.data?.additionalInfo?.artworkOrientation,
    },
    {
      head: "Material",
      name: data?.data?.additionalInfo?.material,
    },
    {
      head: "Artwork Width",
      name: data?.data?.additionalInfo?.width + " " + "cm",
    },

    {
      head: "Artwork Height",
      name: data?.data?.additionalInfo?.height + " " + "cm",
    },
    {
      head: "Artwork Length",
      name: data?.data?.additionalInfo?.length + " " + "cm",
    },
  ];

  const artwork_detail = [
    {
      heading: "Hanging Available",
      description: data?.data?.additionalInfo?.hangingAvailable,
    },
    {
      heading: "Framed",
      description: data?.data?.additionalInfo?.framed,
    },
    {
      heading: "Framed height",
      description: data?.data?.additionalInfo?.frameHeight
        ? data?.data?.additionalInfo?.frameHeight + " " + "cm"
        : "N/A",
    },
    {
      heading: "Frame Length",
      description: data?.data?.additionalInfo?.frameLength
        ? data?.data?.additionalInfo?.frameLength + " " + "cm"
        : "N/A",
    },
    {
      heading: "Frame Width",
      description: data?.data?.additionalInfo?.frameWidth
        ? data?.data?.additionalInfo?.frameWidth + " " + "cm"
        : "N/A",
    },
  ];

  const highlight_data = [
    {
      heading: "Artwork Style",
      description: mapData(data?.data?.additionalInfo?.artworkStyle),
    },
    {
      heading: "Artwork Emotion",
      description: mapData(data?.data?.additionalInfo?.emotions),
    },
    {
      heading: "Artwork Colors",
      description: mapData(data?.data?.additionalInfo?.colors),
    },
  ];

  const purchaseData = [
    {
      heading: "Selected Method",
      description: data?.data?.commercialization?.activeTab,
    },
    {
      heading: "Purchase Catalog",
      description:
        data?.data?.commercialization?.publishingCatalog?.catalogName,
    },
    {
      heading: "Purchase Type",
      description: data?.data?.commercialization?.purchaseType,
    },
  ];

  const subscriptionData = [
    {
      heading: "Selected Method",
      description: data?.data?.commercialization?.activeTab,
    },
    {
      heading: "Subscription Catalog",
      description:
        data?.data?.commercialization?.publishingCatalog?.catalogName,
    },

    {
      heading: "Purchase Option",
      description: `${data?.data?.commercialization?.purchaseOption}` || "N/A",
    },
  ];

  const Pricing_data = [
    {
      heading: "Base Price",
      description: data?.data?.pricing?.basePrice,
    },

    {
      heading: "Artist Fees",
      description:
        `${getSymbolFromCurrency(currency.slice(0, 3))} ${
          data?.data?.pricing?.artistFees
        }` || "N/A",
    },

    {
      heading: "Accept Minimum Offer",
      description: data?.data?.pricing?.acceptOfferPrice
        ? `${getSymbolFromCurrency(currency)} ${
            data?.data?.pricing?.acceptOfferPrice
          }`
        : "N/A",
    },

    {
      heading: "Discount Percentage",
      description: `${data?.data?.pricing?.dpersentage}%` || "N/A",
    },
    {
      heading: "Vat Amount",
      description: ` ${data?.data?.pricing?.vatAmount}%`,
    },
  ];

  const moreInfo_data = [
    {
      heading: "Available To",
      description: `${data?.data?.restriction?.availableTo}` || "N/A",
    },
    {
      heading: "Discount Acceptation",
      description: data?.data?.restriction?.discountAcceptation || "N/A",
    },
    {
      heading: "External Tags",
      description: mapData(data?.data?.tags?.extTags) || "N/A",
    },
  ];

  const shipping_data = [
    {
      heading: "Location",
      description: `${data?.data?.inventoryShipping?.location || "N/A"}`,
    },
    {
      heading: "Product Code",
      description: `${data?.data?.inventoryShipping?.pCode || "N/A"}`,
    },

    {
      heading: "Package Material",
      description:
        `${data?.data?.inventoryShipping?.packageMaterial} ` || "N/A",
    },
    {
      heading: "Package Depth",
      description:
        data?.data?.inventoryShipping?.packageLength + " " + "cm" || "N/A",
    },
    {
      heading: "Package Height",
      description:
        data?.data?.inventoryShipping?.packageHeight + " " + "cm" || "N/A",
    },
    {
      heading: "Package Width",
      description:
        data?.data?.inventoryShipping?.packageWidth + " " + "cm" || "N/A",
    },
    {
      heading: "Package Weight",
      description:
        data?.data?.inventoryShipping?.packageWeight + " " + "kg" || "N/A",
    },
    {
      heading: "Coming Soon",
      description: data?.data?.inventoryShipping?.commingSoon || "N/A",
    },
  ];

  if (!product) return <Loader />;

  return (
    <div className="mt-20">
      <Tabs>
        <TabList>
          <Tab>{t("Description")}</Tab>
          <Tab>{t("Additional Information")}</Tab>
          <Tab>{t("Commercialization")}</Tab>
          <Tab>{t("Pricing")}</Tab>
          <Tab>{t("Inventory & Shipping")}</Tab>
          <Tab>{t("More Details")}</Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col lg:flex-row gap-8 justify-between my-10">
            <div className="lg:w-[65%] w-full">
              <Header
                variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              >
                {t("Product Information")}
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="my-5 text-[#999999]"
              >
                {data?.data?.productDescription}
              </P>
            </div>

            <div className="lg:w-[25%] w-full">
              <div className="flex items-start gap-5 my-5">
                <img src={delivery} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    {t("Delivery 2-5 days")}
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    {t("Get free shipping over $65.")}
                  </P>
                </div>
              </div>

              <div className="flex items-start gap-5 my-5">
                <img src={secure} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    {t("100% secure payment")}
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    {t("Your payment information is safe.")}
                  </P>
                </div>
              </div>

              <div className="flex items-start gap-5 my-5">
                <img src={print} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    {t("Premium paper printed")}
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    {t("Printed on premium paper (250 g/m²).")}
                  </P>
                </div>
              </div>

              <div className="flex items-start gap-5 my-5">
                <img src={return1} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    {t("Easy Returns")}
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    {t("Risk-free 30-day returns.")}
                  </P>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col lg:flex-row gap-10 justify-between w-full my-10">
            <div className="w-full">
              {overview_date.map((item, index) => (
                <div key={index} className="flex ">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {t(item.head)} :
                  </P>
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    {item.name}
                  </P>
                </div>
              ))}
            </div>

            <div className="w-full">
              {artwork_detail.map((item, index) => (
                <div key={index} className="flex items-center">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {t(item.heading)} :
                  </P>
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>

            <div className="w-full">
              {highlight_data.map((item, index) => (
                <div key={index} className="flex  items-center">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {t(item.heading)} :
                  </P>
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="text-[#999999] capitalize"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col my-5">
            <h1 className="font-semibold">{t("Hanging Description")}:</h1>
            <span className="text-[#999999] text-[14px] mt-2">
              {data?.data?.additionalInfo?.hangingDescription || "N/A"}
            </span>
          </div>

          <div className="flex flex-col my-5">
            <h1 className="font-semibold">{t("Framed Description")}:</h1>
            <span className="text-[#999999] text-[14px] mt-2">
              {data?.data?.additionalInfo?.framedDescription || "N/A"}
            </span>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col lg:flex-row gap-10 justify-between w-full mb-10">
            <div className="w-full mt-8">
              {data?.data?.commercialization?.activeTab === "purchase"
                ? purchaseData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="w-48 my-1"
                      >
                        {t(item.heading)} :
                      </P>
                      <P
                        variant={{
                          size: "small",
                          weight: "medium",
                        }}
                        className="text-[#999999] capitalize"
                      >
                        {item.description}
                      </P>
                    </div>
                  ))
                : subscriptionData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="w-48 my-1"
                      >
                        {t(item.heading)} :
                      </P>
                      <P
                        variant={{
                          size: "small",
                          weight: "medium",
                        }}
                        className="text-[#999999]"
                      >
                        {item.description}
                      </P>
                    </div>
                  ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex gap-10 justify-between w-full mb-10">
            <div className="w-full mt-8">
              {Pricing_data.map((item, index) => (
                <div key={index} className="flex items-center gap-2 ">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="lg:w-48 my-1"
                  >
                    {t(item.heading)} :
                  </P>
                  <P
                    variant={{
                      size: "small",
                      weight: "medium",
                    }}
                    className="text-[#999999]"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-wrap gap-10 justify-between w-full mb-10">
            <div className="w-full mt-8">
              {shipping_data.map((item, index) => (
                <div key={index} className="flex items-center  gap-3">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="lg:w-48 my-1"
                  >
                    {t(item.heading)} :
                  </P>
                  <P
                    variant={{
                      size: "small",
                      weight: "medium",
                    }}
                    className="text-[#999999]"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-wrap gap-10 justify-between w-full mb-10">
            <div className="mt-8 w-full">
              {moreInfo_data.map((item, index) => (
                <div key={index} className="flex items-start ">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {t(item.heading)} :
                  </P>
                  <P
                    variant={{
                      size: "small",
                      weight: "medium",
                    }}
                    className="text-[#999999] flex-1"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProductInfo;
