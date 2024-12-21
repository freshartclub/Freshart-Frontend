import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../../ui/Header";
import P from "../../ui/P";
import delivery from "./assets/delivery.png";
import print from "./assets/print.png";
import return1 from "./assets/return.png";
import secure from "./assets/secure.png";
import product from "./assets/single-product.jpg.png";

const ProductInfo = ({ data }: any) => {
  const currency = data?.data?.pricing?.currency;

  const internalTags = Array.isArray(data?.data?.tags?.intTags)
    ? data.data.tags.intTags.map((tag, i) => (
        <span key={tag}>
          {tag} {i < tag.length - 1 && " | "}
        </span>
      ))
    : null;

  const externlaTags = Array.isArray(data?.data?.tags?.intTags)
    ? data.data.tags.extTags.map((tag, i) => (
        <span key={tag}>
          {tag} {i < tag.length - 1 && " | "}
        </span>
      ))
    : null;

  const artworkStyles = Array.isArray(data?.data?.additionalInfo?.artworkStyle)
    ? data.data.additionalInfo.artworkStyle.map((iw, i) => (
        <span key={i}>
          {iw}
          {i < iw?.length - 1 && " | "}
        </span>
      ))
    : null;

  const artworkColors = Array.isArray(data?.data?.additionalInfo?.colors)
    ? data.data.additionalInfo.colors.map((iw, i) => (
        <span key={i}>
          {iw}
          {i < iw?.length - 1 && " | "}
        </span>
      ))
    : null;

  const artworkEmotion = Array.isArray(data?.data?.additionalInfo?.emotions)
    ? data.data.additionalInfo.emotions.map((iw, i) => (
        <span key={i}>
          {iw}
          {i < iw?.length - 1 && " | "}
        </span>
      ))
    : null;

  const overview_date = [
    {
      head: "Art Provider :",
      name: data?.data?.isArtProvider,
    },

    {
      head: "Art Provider Name :",
      name: data?.data?.provideArtistName || "N/A",
    },

    {
      head: "Artwork Technic:",
      name: data?.data?.additionalInfo?.artworkTechnic,
    },
    {
      head: "Artwork Theme:",
      name: data?.data?.additionalInfo?.artworkTheme,
    },
    {
      head: "Artwork Oriantaion:",
      name: data?.data?.additionalInfo?.artworkOrientation,
    },
    {
      head: "Material:",
      name: data?.data?.additionalInfo?.material,
    },
    {
      head: "Artwork Width :",
      name: data?.data?.additionalInfo?.width,
    },

    {
      head: "Artwork Height :",
      name: data?.data?.additionalInfo?.height,
    },
    {
      head: "Artwork Length :",
      name: data?.data?.additionalInfo?.length,
    },
  ];

  const artwork_detail = [
    {
      heading: "Hanging Available: ",
      description: data?.data?.additionalInfo?.hangingAvailable,
    },
    {
      heading: "Framed: ",
      description: data?.data?.additionalInfo?.framed,
    },
    {
      heading: "Framed height: ",
      description: data?.data?.additionalInfo?.frameHeight,
    },
    {
      heading: "Frame Length: ",
      description: data?.data?.additionalInfo?.frameLength,
    },
    {
      heading: "Frame Width: ",
      description: data?.data?.additionalInfo?.frameWidth,
    },
  ];

  const highlight_data = [
    {
      heading: "Artwork Style: ",
      description: artworkStyles,
    },

    {
      heading: "Artwork Emotion: ",
      description: artworkEmotion,
    },
    {
      heading: "Artwork Colors: ",
      description: artworkColors,
    },
  ];

  const purchaseData = [
    {
      heading: "Selected Method: ",
      description: data?.data?.commercialization?.activeTab,
    },
    {
      heading: "Purchase Catalog: ",
      description:
        data?.data?.commercialization?.publishingCatalog?.catalogName,
    },
    {
      heading: "Purchase Type: ",
      description: data?.data?.commercialization?.purchaseType,
    },
  ];

  const subscriptionData = [
    {
      heading: "Selected Method: ",
      description: data?.data?.commercialization?.activeTab,
    },
    {
      heading: "Subscription Catalog: ",
      description:
        data?.data?.commercialization?.publishingCatalog?.catalogName,
    },

    {
      heading: "Purchase Option ",
      description: ` ${data?.data?.commercialization?.purchaseOption}` || "N/A",
    },
  ];

  const Pricing_data = [
    {
      heading: "Base Price: ",
      description: data?.data?.pricing?.basePrice,
    },

    {
      heading: "Artist Fees: ",
      description: `${currency} ${data?.data?.pricing?.artistFees}` || "N/A",
    },

    {
      heading: "Accept Minimum Offer: ",
      description:
        `${currency} ${data?.data?.pricing?.acceptOfferPrice}` || "N/A",
    },

    {
      heading: "Discount Percentage: ",
      description: `${data?.data?.pricing?.dpersentage}%` || "N/A",
    },
    {
      heading: "Vat Amount: ",
      description: `${currency} ${data?.data?.pricing?.vatAmount}`,
    },
  ];

  const moreInfo_data = [
    {
      heading: "Available To: ",
      description: `${data?.data?.restriction?.availableTo}` || "N/A",
    },
    {
      heading: "Discount Acceptation: ",
      description: data?.data?.restriction?.discountAcceptation || "N/A",
    },

    {
      heading: "External Tags: ",
      description: externlaTags && externlaTags.length ? externlaTags : "N/A",
    },
    {
      heading: "Internal Tags: ",
      description: internalTags && internalTags.length ? internalTags : "N/A",
    },
  ];

  const shipping_data = [
    {
      heading: "Location: ",
      description: `${data?.data?.inventoryShipping?.location}`,
    },
    {
      heading: "Product Code: ",
      description: `${data?.data?.inventoryShipping?.pCode}`,
    },

    {
      heading: "Package Material: ",
      description: `${data?.data?.inventoryShipping?.packageMaterial}` || "N/A",
    },
    {
      heading: "Package Depth: ",
      description: data?.data?.inventoryShipping?.packageLength || "N/A",
    },
    {
      heading: "Package Height: ",
      description: data?.data?.inventoryShipping?.packageHeight || "N/A",
    },
    {
      heading: "Package Width: ",
      description: data?.data?.inventoryShipping?.packageWidth || "N/A",
    },
    {
      heading: "Package Weight: ",
      description: data?.data?.inventoryShipping?.packageWeight || "N/A",
    },
    {
      heading: "Coming Soon: ",
      description: data?.data?.inventoryShipping?.commingSoon || "N/A",
    },
  ];

  const navigate = useNavigate();
  const aboutText = data?.data?.owner?.aboutArtist?.about.replace(
    /^<p>|<\/p>$/g,
    ""
  );

  const handleShowmore = (id) => {
    navigate(`/artist_detail?id=${id}`);
  };

  if (!product) return <div>Loading...</div>;
  return (
    <div className="mt-20">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Additional Information</Tab>
          <Tab>Commercialization</Tab>
          <Tab>Pricing</Tab>
          <Tab>Inventry & Shipping</Tab>

          <Tab>More Details</Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col lg:flex-row gap-8 justify-between my-10">
            <div className="lg:w-[65%] w-full">
              <P
                variant={{ size: "xl", theme: "dark", weight: "medium" }}
                className=""
              >
                Product information
              </P>
              <Header
                variant={{ size: "small", theme: "dark", weight: "semibold" }}
                className="my-5 text-[#999999]"
              >
                {data?.data?.productDescription}
              </Header>
            </div>

            <div className="lg:w-[25%] w-full">
              {/* Delivery Information */}
              <div className="flex items-start gap-5 my-5">
                <img src={delivery} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    Delivery 2-5 days
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    Get free shipping over $65.
                  </P>
                </div>
              </div>

              {/* Secure Payment Information */}
              <div className="flex items-start gap-5 my-5">
                <img src={secure} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    100% secure payment
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    Your payment information is safe.
                  </P>
                </div>
              </div>

              {/* Premium Paper Information */}
              <div className="flex items-start gap-5 my-5">
                <img src={print} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    Premium paper printed
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    Printed on premium paper (250 g/m²).
                  </P>
                </div>
              </div>

              {/* Return Information */}
              <div className="flex items-start gap-5 my-5">
                <img src={return1} alt="" className="w-8 h-8" />
                <div>
                  <P
                    variant={{ size: "base", weight: "medium", theme: "dark" }}
                  >
                    Easy Returns
                  </P>
                  <P
                    variant={{ size: "base", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    Risk-free 30-day returns.
                  </P>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          {/* Flex container for the three columns */}
          <div className="flex flex-col lg:flex-row gap-10 justify-between w-full my-10">
            {/* Overview Data Column */}
            <div className="lg:w-[32%] w-full">
              {overview_date.map((item, index) => (
                <div key={index} className="flex ">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {item.head}
                  </P>
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="text-[#999999] "
                  >
                    {item.name}
                  </P>
                </div>
              ))}
            </div>

            {/* Artwork Details Column */}
            <div className="lg:w-[32%] w-full">
              {artwork_detail.map((item, index) => (
                <div key={index} className="flex  items-center">
                  <Header
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {item.heading}
                  </Header>
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="text-[#999999]"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>

            {/* Highlight Data Column */}
            <div className="lg:w-[32%] w-full">
              {highlight_data.map((item, index) => (
                <div key={index} className="flex  items-center">
                  <Header
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {item.heading}
                  </Header>
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
            <h1
              variant={{ size: "small", theme: "dark" }}
              className="font-semibold"
            >
              Hanging Description:
            </h1>
            <h1>{data?.data?.additionalInfo?.hangingDescription}</h1>
          </div>

          {/* Framed Description Section */}
          <div className="flex flex-col my-5">
            <h1
              variant={{ size: "small", theme: "dark" }}
              className="font-semibold"
            >
              Framed Description:
            </h1>
            <h1>{data?.data?.additionalInfo?.framedDescription}</h1>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col lg:flex-row gap-10 justify-between w-full mb-10">
            <div className="lg:w-[32%] w-full mt-8">
              {/* Conditional rendering based on activeTab */}
              {data?.data?.commercialization?.activeTab === "purchase"
                ? purchaseData.map((item, index) => (
                    <div key={index} className="flex items-center ">
                      <Header
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="w-48 my-1"
                      >
                        {item.heading}
                      </Header>
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
                    <div key={index} className="flex items-center mb-5">
                      <Header
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="w-48 my-1"
                      >
                        {item.heading}
                      </Header>
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
            <div className="lg:w-[32%] w-full mt-8">
              {/* Iterate through Pricing_data */}
              {Pricing_data.map((item, index) => (
                <div key={index} className="flex items-center gap-2 ">
                  <Header
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="lg:w-48 my-1"
                  >
                    {item.heading}
                  </Header>
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
            <div className="lg:w-[32%] w-full mt-8">
              {/* Iterate through shipping_data */}
              {shipping_data.map((item, index) => (
                <div key={index} className="flex items-center  gap-3">
                  <Header
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="lg:w-48 my-1"
                  >
                    {item.heading}
                  </Header>
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
            <div className="mt-8 w-full sm:w-1/2 lg:w-1/3">
              {moreInfo_data.map((item, index) => (
                <div key={index} className="flex items-start ">
                  <Header
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {item.heading}
                  </Header>
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

      {/* <div>
        <img src={product} alt="only image" className="w-full" />
      </div> */}
    </div>
  );
};

export default ProductInfo;
