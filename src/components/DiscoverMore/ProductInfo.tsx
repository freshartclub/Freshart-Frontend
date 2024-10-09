import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import P from "../ui/P";
import delivery from "./assets/delivery.png";
import secure from "./assets/secure.png";
import print from "./assets/print.png";
import return1 from "./assets/return.png";
import Header from "../ui/Header";
import product from "./assets/single-product.jpg.png";
import profile from "../ArtistPortfolioPage/assets/profile_photo.png";
import circle1 from "../ArtistPortfolioPage/assets/circle1.png";
import circle2 from "../ArtistPortfolioPage/assets/circle2.png";
import account_plus from "../ArtistPortfolioPage/assets/account-plus-outline.png";
import chat from "../ArtistPortfolioPage/assets/chat-outline.png";
import dots from "../ArtistPortfolioPage/assets/dots-horizontal.png";
import whtsap from "../ArtistPortfolioPage/assets/whatsapp.png";
import facebook from "../ArtistPortfolioPage/assets/facebook.png";
import twitter from "../ArtistPortfolioPage/assets/twitter.png";
import linkedin from "../ArtistPortfolioPage/assets/linkedin.png";
import arrow from "../ArtistPortfolioPage/assets/arrow_2.png";
import Button from "../ui/Button";

const ProductInfo = () => {
  const overview_date = [
    {
      head: "Author :",
      name: "Anthony Martiz",
    },
    {
      head: "Paper Size :",
      name: "A5",
    },
    {
      head: "Category :",
      name: "Painting, 3D Abstract",
    },
    {
      head: "Width :",
      name: "16cm",
    },
    {
      head: "Height :",
      name: "36cm",
    },
    {
      head: "Colour :",
      name: "Multicolor",
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
      description: "Dimensions: 304.1 x 212.4 x 15.6 mm",
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

  return (
    <div className="mt-20 hidden">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Additional Information</Tab>
          <Tab>Artist information</Tab>
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
                This print from our famous painters and artists posters series,
                from the mind of Seven Wall Art, with black, and with vertical
                layout. Animal prints let you show your wild side through your
                wall decoration. A modern touch for your home.
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
          <div className="flex gap-10 w-full my-10">
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

            <div className="w-[32%]">
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

            <div className="w-[32%]">
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
          <div className="flex gap-10 my-10">
            <div className="w-[20%]">
              <div className="bg-white shadow-2xl lg:max-w-xs sm:w-[90%] w-full p-5">
                <div className="">
                  <img
                    src={profile}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />

                  {/* Profile Details */}
                  <div className="mt-4 text-center">
                    <Header
                      variant={{ size: "xl", theme: "dark", weight: "bold" }}
                    >
                      Andrews Martin
                    </Header>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="pb-10 mt-1 border-b border-dashed"
                    >
                      PAINTER | SCULPTER | ARTIST
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
                      NY, Chicago 452100
                    </P>
                  </div>
                </div>

                {/* Social and Action Icons */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex ">
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

            <div className="w-[75%]">
              <div className="border mt-8 p-4 ">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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

              <div className="border mt-8 p-4 ">
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
