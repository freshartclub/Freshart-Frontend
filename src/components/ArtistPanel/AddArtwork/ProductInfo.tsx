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
      head: "Author :",
      name:
        data?.data?.owner?.artistName + " " + data?.data?.owner?.artistSurname1,
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
      head: "Width :",
      name: data?.data?.additionalInfo?.width,
    },

    {
      head: "Height :",
      name: data?.data?.additionalInfo?.height,
    },
    {
      head: "Length :",
      name: data?.data?.additionalInfo?.length,
    },
    // {
    //   head: "Colour :",
    //   name: data?.data?.additionalInfo?.colors?.map((item, i) => (
    //     <h1 className="">{item}</h1>
    //   )),
    // },
    // {
    //   head: "Author type :",
    //   name: "Refugee",
    // },
    // {
    //   head: "Painting Info :",
    //   name: "Most Overview",
    // },
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

  const commercialization_data = [
    {
      heading: "Purchase Catalog: ",
      description: data?.data?.commercialization?.purchaseCatalog,
    },

    {
      heading: "Artist Fees: ",
      description: `$ ${data?.data?.commercialization?.artistbaseFees}`,
    },
    {
      heading: "Downward Offer: ",
      description: data?.data?.commercialization?.downwardOffer,
    },
    {
      heading: "Upwork Offer: ",
      description: data?.data?.commercialization?.upworkOffer,
    },
    {
      heading: "Accept Offer Min. Price: ",
      description: `$ ${data?.data?.commercialization?.acceptOfferPrice}`,
    },
    {
      heading: "Price By Request: ",
      description: data?.data?.commercialization?.priceRequest,
    },
  ];

  const Pricing_data = [
    {
      heading: "Artist Fees: ",
      description: `$ ${data?.data?.pricing?.artistFees}`,
    },
    {
      heading: "Base Price: ",
      description: data?.data?.pricing?.basePrice,
    },
    {
      heading: "Discount Percentage: ",
      description: `${data?.data?.pricing?.dpersentage}%`,
    },
    {
      heading: "Vat Amount: ",
      description: `$ ${data?.data?.pricing?.vatAmount}`,
    },
    {
      heading: "Location: ",
      description: data?.data?.inventoryShipping?.location,
    },
    {
      heading: "Pin Code: ",
      description: data?.data?.inventoryShipping?.pCode,
    },
    {
      heading: "Sku: ",
      description: data?.data?.inventoryShipping?.sku,
    },
  ];

  const moreInfo_data = [
    {
      heading: "Artwork Discipline: ",
      description: `${data?.data?.discipline?.artworkDiscipline}`,
    },
    {
      heading: "Artwork Tags: ",
      description: `${data?.data?.discipline?.artworkTags}`,
    },

    {
      heading: "Vat Amount: ",
      description: `${data?.data?.promotions?.promotion}`,
    },
    {
      heading: "Promotion Score: ",
      description: data?.data?.promotions?.promotionScore,
    },
    {
      heading: "Available To: ",
      description: data?.data?.restriction?.availableTo,
    },
    {
      heading: "Discount Acceptation: ",
      description: data?.data?.restriction?.discountAcceptation,
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
          <Tab>Pricing & Shipping</Tab>
          <Tab>More Details</Tab>
        </TabList>

        <TabPanel>
          <div className="flex gap-8 justify-between my-10">
            <div className="w-[65%] ">
              <P
                variant={{ size: "small", weight: "semiBold" }}
                className="text-[#999999]"
              >
                Product information
              </P>
              <Header
                variant={{ size: "xl", theme: "dark", weight: "medium" }}
                className="my-5"
              >
                {data?.data?.productDescription}
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="text-[#999999]"
              >
                If you relate, it’s clear you do need a change – but what’s an
                easy and cost effective way of adding the magic back into your
                home? The surprisingly simple yet overlooked way to reimagine
                any space begins with your walls. Think about it – the empty
                wall space you’ve been sitting opposite for weeks or even years
                is the perfect blank canvas to begin expressing your unique
                style and creativity.
              </P>
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
              <Header
                variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                className="mb-4"
              >
                Overview
              </Header>
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

            <div className="w-[32%] mt-8">
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

            <div className="w-[32%] mt-8">
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
                    className=" text-[#999999]"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-center">
              <h1
                variant={{ size: "small", theme: "dark" }}
                className="w-48 my-1 font-semibold"
              >
                Hanging Description :
              </h1>
              <h1>{data?.data?.additionalInfo?.hangingDescription}</h1>
            </div>
            <div className="flex gap-2 items-center">
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
              {commercialization_data.map((item, index) => (
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

        <TabPanel>
          <div className="flex gap-10 justify-between w-full mb-10">
            <div className="w-[32%] mt-8">
              {Pricing_data.map((item, index) => (
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
