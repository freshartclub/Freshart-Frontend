import { useTranslation } from "react-i18next";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import Header from "../../ui/Header";
import P from "../../ui/P";

const ProductInfo = ({ data, dark }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const currency = data?.data?.pricing?.currency;

  const mapData = (val: string[]) => {
    if (!val || val.length === 0) return "";
    return val.map((item) => t(item)).join(" | ");
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
      heading: "Frame Height",
      description: data?.data?.additionalInfo?.frameHeight ? data?.data?.additionalInfo?.frameHeight + " " + "cm" : "N/A",
    },
    {
      heading: "Frame Depth",
      description: data?.data?.additionalInfo?.frameLength ? data?.data?.additionalInfo?.frameLength + " " + "cm" : "N/A",
    },
    {
      heading: "Frame Width",
      description: data?.data?.additionalInfo?.frameWidth ? data?.data?.additionalInfo?.frameWidth + " " + "cm" : "N/A",
    },
  ];

  const highlight_data = [
    {
      heading: "Artwork Style",
      description: mapData(data?.data?.additionalInfo?.artworkStyle),
    },
    {
      heading: "Artwork Emotions",
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
      description: data?.data?.commercialization?.publishingCatalog?.catalogName,
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
      description: data?.data?.commercialization?.publishingCatalog?.catalogName,
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
      heading: "Artist Fee",
      description:
        // `${getSymbolFromCurrency(currency.slice(0, 3))} ${
        data?.data?.pricing?.artistFees || "N/A",
      // }` || "N/A",
    },
    {
      heading: "Discount Percentage",
      description: `${data?.data?.pricing?.dpersentage}%` || "N/A",
    },
    {
      heading: "VAT Amount (%)",
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
      description: `${data?.data?.inventoryShipping?.packageMaterial} ` || "N/A",
    },
    {
      heading: "Package Depth",
      description: data?.data?.inventoryShipping?.packageLength + " " + "cm" || "N/A",
    },
    {
      heading: "Package Height",
      description: data?.data?.inventoryShipping?.packageHeight + " " + "cm" || "N/A",
    },
    {
      heading: "Package Width",
      description: data?.data?.inventoryShipping?.packageWidth + " " + "cm" || "N/A",
    },
    {
      heading: "Package Weight",
      description: data?.data?.inventoryShipping?.packageWeight + " " + "kg" || "N/A",
    },
    {
      heading: "Coming Soon",
      description: data?.data?.inventoryShipping?.commingSoon ? "Yes" : "No",
    },
  ];

  return (
    <div className={`mt-6 mx-6 ${dark ? "text-gray-100" : "text-gray-800"}`}>
      <Tabs onSelect={(index: number) => setActiveTab(index)}>
        <TabList
          className={`flex gap-5 p-2 scrollbar1 rounded-lg overflow-x-auto scrollbar1 whitespace-nowrap ${dark ? "bg-gray-800" : "bg-gray-200"}`}
        >
          {["Description", "Additional Information", "Commercialization", "Pricing", "Inventory & Shipping", "More Details"].map((tab, index) => (
            <Tab
              key={index}
              className={`cursor-pointer px-4 py-2 rounded-md transition-colors shrink-0 ${
                activeTab === index ? (dark ? "text-[#EE1D52] font-semibold" : "text-[#EE1D52] bg-transparent font-semibold") : ""
              }`}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <P
            variant={{ size: "small", theme: dark ? "light" : "dark", weight: "normal" }}
            className={`${dark ? "text-gray-300" : "text-[#999999]"} my-5 italic`}
          >
            {data?.data?.productDescription}
          </P>
        </TabPanel>

        <TabPanel>
          <div
            className={`flex border ${
              dark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
            } rounded flex-col lg:flex-row gap-10 justify-between w-full p-2 mb-2 mt-3`}
          >
            <div className="w-full">
              {overview_date.map((item, index) => (
                <div key={index} className="flex ">
                  <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-60 my-1">
                    {t(item.head)} :
                  </P>
                  <P variant={{ size: "small", weight: "medium" }} className="text-[#999999]">
                    {t(item.name)}
                  </P>
                </div>
              ))}
            </div>

            <div className="w-full">
              {artwork_detail.map((item, index) => (
                <div key={index} className="flex items-center">
                  <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-60 my-1">
                    {t(item.heading)} :
                  </P>
                  <P variant={{ size: "small", weight: "medium" }} className="text-[#999999]">
                    {item.description}
                  </P>
                </div>
              ))}
              {highlight_data.map((item, index) => (
                <div key={index} className="flex  items-center">
                  <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-60 my-1">
                    {t(item.heading)} :
                  </P>
                  <P variant={{ size: "small", weight: "medium" }} className="text-[#999999] capitalize">
                    {item.description}
                  </P>
                </div>
              ))}
            </div>
          </div>

          <div className={`flex border ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} rounded p-2 flex-col mb-2`}>
            <h1 className="font-semibold">{t("Hanging Description")}:</h1>
            <span className="text-[#999999] text-[14px] mt-2">{data?.data?.additionalInfo?.hangingDescription || "N/A"}</span>
          </div>

          <div className={`flex border ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} rounded p-2 flex-col mb-5`}>
            <h1 className="font-semibold">{t("Framed Description")}:</h1>
            <span className="text-[#999999] text-[14px] mt-2">{data?.data?.additionalInfo?.framedDescription || "N/A"}</span>
          </div>
        </TabPanel>

        <TabPanel>
          <div
            className={`flex border ${
              dark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
            } rounded flex-col lg:flex-row gap-10 justify-between w-full p-2 mb-2 mt-3`}
          >
            <div className="w-full">
              {data?.data?.commercialization?.activeTab === "purchase"
                ? purchaseData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <P
                        variant={{
                          size: "small",
                          theme: dark ? "light" : "dark",
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
                          theme: dark ? "light" : "dark",
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
          <div
            className={`flex border ${
              dark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
            } rounded flex-col lg:flex-row gap-10 justify-between w-full p-2 mb-2 mt-3`}
          >
            <div className="w-full">
              {Pricing_data.map((item, index) => (
                <div key={index} className="flex items-center gap-2 ">
                  <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="lg:w-48 my-1">
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
          <div
            className={`flex border ${
              dark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
            } rounded flex-col lg:flex-row gap-10 justify-between w-full p-2 mb-2 mt-3`}
          >
            <div className="w-full">
              {shipping_data.map((item, index) => (
                <div key={index} className="flex items-center  gap-3">
                  <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-60 my-1">
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
          <div
            className={`flex border ${
              dark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
            } rounded flex-col lg:flex-row gap-10 justify-between w-full p-2 mb-2 mt-3`}
          >
            <div className="w-full">
              {moreInfo_data.map((item, index) => (
                <div key={index} className="flex items-start ">
                  <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-48 my-1">
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
