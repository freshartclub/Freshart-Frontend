import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import account_plus from "../ArtistPortfolioPage/assets/account-plus-outline.png";
import arrow from "../ArtistPortfolioPage/assets/arrow_2.png";
import chat from "../ArtistPortfolioPage/assets/chat-outline.png";
import circle1 from "../ArtistPortfolioPage/assets/circle1.png";
import circle2 from "../ArtistPortfolioPage/assets/circle2.png";
import dots from "../ArtistPortfolioPage/assets/dots-horizontal.png";
import facebook from "../ArtistPortfolioPage/assets/facebook.png";
import linkedin from "../ArtistPortfolioPage/assets/linkedin.png";
import twitter from "../ArtistPortfolioPage/assets/twitter.png";
import whtsap from "../ArtistPortfolioPage/assets/whatsapp.png";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import delivery from "./assets/delivery.png";
import print from "./assets/print.png";
import return1 from "./assets/return.png";
import secure from "./assets/secure.png";
import product from "./assets/single-product.jpg.png";

interface DisciplineItem {
  discipline: string;
  id: string;
}

const ProductInfo = ({ data }: any) => {
  const artworkStyles = Array.isArray(data?.data?.additionalInfo?.artworkStyle)
    ? data.data.additionalInfo.artworkStyle.map((iw, i) => (
        <span key={i}>{iw}</span>
      ))
    : null;

  const overview_date = [
    {
      head: "Author :",
      name:
        data?.data?.owner?.artistName + " " + data?.data?.owner?.artistSurname1,
    },
    {
      head: "Paper Size :",
      name: "A5",
    },
    {
      head: "Category :",
      name: artworkStyles,
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
      head: "Colour :",
      name: data?.data?.additionalInfo?.colors?.map((item, i) => (
        <h1 className="">{item}</h1>
      )),
    },
    {
      head: "Author type :",
      name: "Refugee",
    },
    {
      head: "Painting Info :",
      name: "Most Overview",
    },
  ];

  const artwork_detail = [
    {
      heading: "Artwork Details : ",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolore magna aliqua",
    },
    {
      heading: "Canvas: ",
      description: "Lotus Valley",
    },
    {
      heading: "Dimensions: ",
      description:
        data?.data?.additionalInfo?.width +
        "x" +
        data?.data?.additionalInfo?.height +
        "x" +
        data?.data?.additionalInfo?.length,
    },
  ];

  const highlight_data = [
    {
      list: "Lorem ipsum dolor sit amet",
    },
    {
      list: "Lorem ipsum dolor sit amet",
    },
    {
      list: "Lorem ipsum dolor sit amet",
    },
    {
      list: "Lorem ipsum dolor sit amet",
    },
  ];

  const navigate = useNavigate();
  const aboutText = data?.data?.owner?.aboutArtist?.about.replace(
    /<[^>]*>/g,
    ""
  );

  const handleShowmore = (id) => {
    navigate(`/artist_detail/${id}`);
  };

  if (!product) return <div>Loading...</div>;
  return (
    <div className="mt-20">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Additional Information</Tab>
          <Tab>Artist information</Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col md:flex-row gap-8 justify-between my-10">
            {/* Product Information Section */}
            <div className="w-full md:w-[65%]">
              <Header
                variant={{ size: "xl", theme: "dark", weight: "medium" }}
                className="my-5"
              >
                Product information
              </Header>
              <P
                variant={{ size: "md", theme: "dark", weight: "normal" }}
                className="text-[#999999]"
              >
                {data?.data?.productDescription}
              </P>
            </div>

            {/* Features Section */}
            <div className="w-full md:w-[25%]">
              <div className="flex flex-col gap-5">
                {/* Delivery Info */}
                <div className="flex items-center gap-5">
                  <img src={delivery} alt="Delivery" className="w-8 h-8" />
                  <div>
                    <P
                      variant={{
                        size: "base",
                        weight: "medium",
                        theme: "dark",
                      }}
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

                {/* Secure Payment Info */}
                <div className="flex items-center gap-5">
                  <img src={secure} alt="Secure Payment" className="w-8 h-8" />
                  <div>
                    <P
                      variant={{
                        size: "base",
                        weight: "medium",
                        theme: "dark",
                      }}
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

                {/* Premium Paper Info */}
                <div className="flex items-center gap-5">
                  <img src={print} alt="Premium Paper" className="w-8 h-8" />
                  <div>
                    <P
                      variant={{
                        size: "base",
                        weight: "medium",
                        theme: "dark",
                      }}
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

                {/* Easy Returns Info */}
                <div className="flex items-center gap-5">
                  <img src={return1} alt="Easy Returns" className="w-8 h-8" />
                  <div>
                    <P
                      variant={{
                        size: "base",
                        weight: "medium",
                        theme: "dark",
                      }}
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
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col md:flex-row gap-10 w-full my-10">
            {/* Overview Section */}
            <div className="w-full md:w-[32%]">
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

            {/* Artwork Details Section */}
            <div className="w-full md:w-[32%]">
              {artwork_detail.map((item, index) => (
                <div key={index} className="my-5">
                  <Header
                    variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                  >
                    {item.heading}
                  </Header>
                  <P
                    variant={{
                      size: "small",
                      weight: "medium",
                    }}
                    className="mt-2 text-[#999999]"
                  >
                    {item.description}
                  </P>
                </div>
              ))}
            </div>

            {/* Highlights Section */}
            <div className="w-full md:w-[32%]">
              <Header
                variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              >
                Highlights:
              </Header>
              {highlight_data.map((item, index) => (
                <div key={index}>
                  <ul className="list-disc">
                    <li className="text-[#999999] text-sm font-medium my-4">
                      {item.list}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col md:flex-row gap-10 my-10">
            {/* Profile Section */}
            <div className="w-full md:w-[20%]">
              <div className="bg-white shadow-2xl lg:max-w-xs sm:w-[90%] w-full p-5">
                <div>
                  <img
                    src={`${data?.url}/users/${data?.data?.owner?.profile?.mainImage}`}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                  {/* Profile Details */}
                  <div className="mt-4 text-center">
                    <Header
                      variant={{ size: "xl", theme: "dark", weight: "bold" }}
                    >
                      {data?.data?.owner?.artistName +
                        " " +
                        data?.data?.owner?.artistSurname1}
                    </Header>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="pb-10 mt-1 border-b border-dashed"
                    >
                      {data?.data?.owner?.aboutArtist?.discipline?.map(
                        (item: DisciplineItem, i) => (
                          <h1 key={i}>{item.discipline}</h1>
                        )
                      )}
                    </P>
                  </div>
                </div>

                {/* Categories and Location */}
                <div className="mt-2">
                  <div className="border-b border-dashed py-2">
                    <Header
                      variant={{
                        size: "lg",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      Category
                    </Header>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "normal",
                      }}
                      className="my-1"
                    >
                      Painting, abstract, illustration, nudity
                    </P>
                  </div>
                  <div className="border-b border-dashed py-2">
                    <Header
                      variant={{
                        size: "lg",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      Location
                    </Header>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "normal",
                      }}
                      className="my-1"
                    >
                      {`${data?.data?.owner?.address?.country}, ${data?.data?.owner?.address?.city}`}
                    </P>
                  </div>
                </div>

                {/* Social and Action Icons */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex">
                    <div className="relative w-12 h-12 border-4 border-white rounded-full overflow-hidden">
                      <img
                        src={circle1}
                        alt="Follower 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative w-12 h-12 border-4 border-white rounded-full overflow-hidden -ml-5">
                      <img
                        src={circle2}
                        alt="Follower 2"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Follower Count */}
                    <div className="relative w-12 h-12 border-4 border-white rounded-full bg-gray-100 flex items-center justify-center -ml-5">
                      <span className="font-bold text-black">+256</span>
                    </div>
                  </div>

                  <div className="flex justify-between gap-3">
                    <img
                      src={account_plus}
                      alt="icons"
                      className="w-[20px] h-[20px]"
                    />
                    <img src={chat} alt="icons" className="w-[20px] h-[20px]" />
                    <img src={dots} alt="icons" className="w-[20px] h-[20px]" />
                  </div>
                </div>
              </div>

              <div className="my-6">
                <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                  Follow Us On -
                </P>
                <div className="flex gap-3 mt-3">
                  <img src={whtsap} alt="whtsap" />
                  <img src={facebook} alt="facebook" />
                  <img src={twitter} alt="twitter" />
                  <img src={linkedin} alt="linkedin" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-[75%]">
              <div className="border mt-8 p-4">
                <Header
                  variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
                  className="mb-3 uppercase"
                >
                  About
                </Header>
                <P
                  variant={{ size: "base", theme: "dark", weight: "normal" }}
                  className="w-[90%]"
                >
                  {aboutText}
                </P>
                <div className="flex justify-end">
                  <Button
                    onClick={() => handleShowmore(data?.data?.owner?._id)}
                    className="!p-0 flex items-center mt-2"
                    variant={{
                      fontSize: "md",
                      theme: "light",
                      fontWeight: "600",
                    }}
                  >
                    <P
                      className="text-[#EE1D52]"
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      Show More
                    </P>
                    <img src={arrow} alt="arrow" className="ml-2" />
                  </Button>
                </div>
              </div>

              <div className="border mt-8 p-4">
                <Header
                  variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
                  className="mb-4 uppercase"
                >
                  Portfolio
                </Header>

                <Header
                  variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                  className="mb-4"
                >
                  2022 -
                </Header>
                <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci incidunt corporis distinctio non quod eum beatae
                  blanditiis doloribus voluptatum sunt.
                </P>

                <Header
                  variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                  className="mb-3 mt-4"
                >
                  2021 -
                </Header>
                <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci incidunt corporis distinctio non quod eum beatae
                  blanditiis doloribus voluptatum sunt.
                </P>

                <div className="flex justify-end">
                  <Button
                    className="!p-0 flex items-center mt-2"
                    variant={{
                      fontSize: "md",
                      theme: "light",
                      fontWeight: "600",
                    }}
                  >
                    <P
                      className="text-[#EE1D52]"
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      Show More
                    </P>
                    <img src={arrow} alt="arrow" className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      <div>
        <img src={product} alt="only image" className="w-full" />
      </div>
    </div>
  );
};

export default ProductInfo;
