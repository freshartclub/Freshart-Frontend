import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import P from "../../ui/P";
import delivery from "./assets/delivery.png";
import secure from "./assets/secure.png";
import print from "./assets/print.png";
import return1 from "./assets/return.png";
import Header from "../../ui/Header";
import product from "./assets/single-product.jpg.png";
import circle1 from "../../ArtistPortfolioPage/assets/circle1.png";
import circle2 from "../../ArtistPortfolioPage/assets/circle2.png";
import account_plus from "../../ArtistPortfolioPage/assets/account-plus-outline.png";
import chat from "../../ArtistPortfolioPage/assets/chat-outline.png";
import dots from "../../ArtistPortfolioPage/assets/dots-horizontal.png";
import whtsap from "../../ArtistPortfolioPage/assets/whatsapp.png";
import facebook from "../../ArtistPortfolioPage/assets/facebook.png";
import twitter from "../../ArtistPortfolioPage/assets/twitter.png";
import linkedin from "../../ArtistPortfolioPage/assets/linkedin.png";
import arrow from "../../ArtistPortfolioPage/assets/arrow_2.png";
import Button from "../../ui/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface DisciplineItem {
  discipline: string;
  id: string;
}

const ProductInfo = ({ data }: any) => {
  console.log(data);

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

    // {
    //   heading: "Dimensions: ",
    //   description:
    //     data?.data?.additionalInfo?.width +
    //     "x" +
    //     data?.data?.additionalInfo?.height +
    //     "x" +
    //     data?.data?.additionalInfo?.length,
    // },
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
      description: `${currency} ${data?.data?.pricing?.artistFees}`,
    },

    {
      heading: "Accept Minimum Offer: ",
      description:
        `${currency} ${data?.data?.pricing?.acceptOfferPrice}` || "NA",
    },

    {
      heading: "Discount Percentage: ",
      description: `${data?.data?.pricing?.dpersentage}%`,
    },
    {
      heading: "Vat Amount: ",
      description: `${currency} ${data?.data?.pricing?.vatAmount}`,
    },
  ];

  const moreInfo_data = [
    {
      heading: "Promotion: ",
      description: `${data?.data?.promotions?.promotion}` || "N/A",
    },
    {
      heading: "Promotion Score: ",
      description: `${data?.data?.promotions?.promotionScore}` || "N/A",
    },

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
      description: `${data?.data?.inventoryShipping?.packageMaterial}`,
    },
    {
      heading: "Package Depth: ",
      description: data?.data?.inventoryShipping?.packageLength,
    },
    {
      heading: "Package Height: ",
      description: data?.data?.inventoryShipping?.packageHeight,
    },
    {
      heading: "Package Width: ",
      description: data?.data?.inventoryShipping?.packageWidth,
    },
    {
      heading: "Package Weight: ",
      description: data?.data?.inventoryShipping?.packageWeight,
    },
    {
      heading: "Coming Soon: ",
      description: data?.data?.inventoryShipping?.commingSoon || false,
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
          <div className="flex gap-8 justify-between my-10">
            <div className="w-[65%] ">
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

            <div className="w-[25%]">
              <div className="flex items-center gap-5 my-5">
                <img src={delivery} alt="" />
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

              <div className="flex items-center gap-5 my-5">
                <img src={secure} alt="" />
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

              <div className="flex items-center gap-5 my-5">
                <img src={print} alt="" />
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

              <div className="flex items-center gap-5 my-5">
                <img src={return1} alt="" />
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
          <div className="flex gap-10 justify-between w-full my-10">
            <div className="w-[32%]">
              {overview_date.map((item, index) => (
                <div key={index} className="flex">
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

            <div className="w-[32%] ">
              {artwork_detail.map((item, index) => (
                <div key={index} className=" flex items-center">
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
                    className=" text-[#999999]"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>

            <div className="w-[32%] ">
              {highlight_data.map((item, index) => (
                <div key={index} className=" flex items-center">
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
                    className=" text-[#999999] capitalize"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col ">
              <h1
                variant={{ size: "small", theme: "dark" }}
                className="w-48 my-1 font-semibold "
              >
                Hanging Description :
              </h1>
              <h1>{data?.data?.additionalInfo?.hangingDescription}</h1>
            </div>
            <div className="flex  mt-3 flex-col">
              <h1
                variant={{ size: "small", theme: "dark" }}
                className="w-48 my-1 font-semibold"
              >
                Framed Description :
              </h1>
              <h1>{data?.data?.additionalInfo?.framedDescription}</h1>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex gap-10 justify-between w-full mb-10">
            <div className="w-[32%] mt-8">
              {data?.data?.commercialization?.activeTab === "purchase"
                ? purchaseData.map((item, index) => (
                    <div key={index} className=" flex items-center">
                      <Header
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="w-48 my-1 "
                      >
                        {item.heading}
                      </Header>
                      <P
                        variant={{
                          size: "small",
                          weight: "medium",
                        }}
                        className=" text-[#999999] capitalize"
                      >
                        {item.description}
                      </P>
                    </div>
                  ))
                : subscriptionData.map((item, index) => (
                    <div key={index} className=" flex items-center">
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
                        className=" text-[#999999]"
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
            <div className="w-[32%] mt-8">
              {Pricing_data.map((item, index) => (
                <div key={index} className=" flex items-center gap-2">
                  <Header
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1 "
                  >
                    {item.heading}
                  </Header>
                  <P
                    variant={{
                      size: "small",
                      weight: "medium",
                    }}
                    className=" text-[#999999]"
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
            <div className="w-[32%] mt-8">
              {shipping_data.map((item, index) => (
                <div key={index} className="flex items-center">
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
                    className=" text-[#999999]"
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
            <div className="w-[32%] mt-8">
              {moreInfo_data.map((item, index) => (
                <div key={index} className=" flex items-center">
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
                    className=" text-[#999999]"
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
