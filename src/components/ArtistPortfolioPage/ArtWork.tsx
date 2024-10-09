import Header from "../ui/Header";
import P from "../ui/P";
import artwrk1 from "./assets/oiloncanvasofalittlegirl_1.jpg.png";
import artwrk2 from "./assets/oiloncanvasofalittlegirl_2.jpg.png";
import artwrk3 from "./assets/oiloncanvasofalittlegirl_3.jpg.png";
import artwrk4 from "./assets/oiloncanvasofalittlegirl_4.jpg.png";
import artwrk5 from "./assets/oiloncanvasofalittlegirl_5.jpg.png";
import artwrk6 from "./assets/oiloncanvasofalittlegirl_6.jpg.png";
import artwrk7 from "./assets/oiloncanvasofalittlegirl7.jpg.png";
import artwrk8 from "./assets/oiloncanvasofalittlegirl8.jpg.png";
import { useState } from "react";
import like from "./assets/like_btn.png";
import heart from "./assets/heart.png";
import green from "./assets/green.svg";
import pink from "./assets/pink.svg";
import orange from "./assets/orange.svg";
import gray from "./assets/gray.svg";
import parrotgreen from "./assets/parrotgreen.svg";
import Button from "../ui/Button";
import product1 from "./assets/product_11.jpg.png";
import product2 from "./assets/product_12.jpg.png";
import product3 from "./assets/product_21.jpg.png";
import product4 from "./assets/product_22.jpg.png";
import product5 from "./assets/product_31.jpg.png";
import product6 from "./assets/product_323.jpg.png";
import show from "./assets/show_all.png";

const artwork_Data = [
  {
    img: artwrk1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: true,
    isnotavailable: false,
    insubscription: false,
    purchased: false,
    darft: false,
  },
  {
    img: artwrk2,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: false,
    isnotavailable: true,
    insubscription: false,
    purchased: false,
    darft: false,
  },
  {
    img: artwrk3,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: false,
    isnotavailable: true,
    insubscription: false,
    purchased: false,
    darft: false,
  },
  {
    img: artwrk4,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: false,
    isnotavailable: false,
    insubscription: true,
    purchased: false,
    darft: false,
  },
  {
    img: artwrk5,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: false,
    isnotavailable: false,
    insubscription: false,
    purchased: false,
    darft: true,
  },
  {
    img: artwrk6,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: true,
    isnotavailable: false,
    insubscription: false,
    purchased: false,
    darft: false,
  },
  {
    img: artwrk7,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: false,
    isnotavailable: false,
    insubscription: false,
    purchased: true,
    darft: false,
  },
  {
    img: artwrk8,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    isPublished: false,
    isnotavailable: false,
    insubscription: false,
    purchased: false,
    darft: true,
  },
];

const series_artwork = [
  {
    img1: product1,
    img2: product2,
    img3: show,
  },
  {
    img1: product3,
    img2: product4,
    img3: show,
  },
  {
    img1: product5,
    img2: product6,
    img3: show,
  },
  {
    img1: product3,
    img2: product4,
    img3: show,
  },
];

const getStatusImage = (artwork: any) => {
  if (artwork.isPublished) {
    return green;
  } else if (artwork.isnotavailable) {
    return pink;
  } else if (artwork.insubscription) {
    return orange;
  } else if (artwork.purchased) {
    return gray;
  } else if (artwork.darft) {
    return parrotgreen;
  } else {
    return "";
  }
};

const ArtWork = () => {
  const [likes, setLikes] = useState(Array(artwork_Data.length).fill(false));

  const handleLikeToggle = (index: any) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
  };

  return (
    <div className="mb-10">
      <Header
        variant={{ size: "3xl", theme: "dark", weight: "semiBold" }}
        className="mt-28 mb-10"
      >
        Artwork
      </Header>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 2xl:gap-20 xl:gap-14 lg:gap-6 md:gap-4 gap-5 w-full">
        {artwork_Data.map((artwork, index) => (
          <div
            key={index}
            className={`shadow-xl 2xl:py-8 xl:py-6 xl:px-6 md:px-4 px-6 py-6 flex flex-col gap-4 items-center relative my-4 md:my-0 ${
              artwork.isPublished
                ? "border-b-4 border-[#00DE00] $"
                : artwork.isnotavailable
                ? "border-b-4 border-[#EE1D52]"
                : artwork.insubscription
                ? "border-b-4 border-[#FFA600]"
                : artwork.purchased
                ? "border-b-4 border-[#696868]"
                : artwork.darft
                ? "border-b-4 border-[#D8F002]"
                : "border-b-4 border-transparent"
            }`}
          >
            <img src={artwork.img} alt="artwork" className="" />

            <img src={getStatusImage(artwork)} alt="Status" />

            <div className="absolute right-12">
              <button
                onClick={() => handleLikeToggle(index)}
                className={`mt-2 rounded-full p-2 bg-[#E3D0A9] ${
                  likes[index] ? " text-white" : " text-black"
                }`}
              >
                {likes[index] ? (
                  <img src={heart} alt="fill heart" />
                ) : (
                  <div>
                    <img src={like} alt="like icon" />
                  </div>
                )}
              </button>
            </div>
            <div className="2xl:w-[80%] xl:w-full text-center">
              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="text-[]"
              >
                {artwork.title}
              </P>
              <Header
                variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                className=" "
              >
                {artwork.heading}
              </Header>
            </div>
            {/* Like Button */}
          </div>
        ))}
      </div>

      <div className="flex sm:flex-row flex-col gap-4 lg:justify-end md:justify-center my-10 md:gap-10 sm:gap-4 item-center">
        <div className="flex">
          <img
            src={green}
            alt="circle"
            className="w-[15px] h-[15px] mt-[3px] mr-[4px]"
          />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Published
          </P>
        </div>

        <div className="flex">
          <img
            src={pink}
            alt="circle"
            className="w-[15px] h-[15px] mt-[3px] mr-[4px]"
          />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Not Available
          </P>
        </div>

        <div className="flex">
          <img
            src={orange}
            alt="circle"
            className="w-[15px] h-[15px] mt-[3px] mr-[4px]"
          />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            In subscription
          </P>
        </div>

        <div className="flex">
          <img
            src={gray}
            alt="circle"
            className="w-[15px] h-[15px] mt-[3px] mr-[4px]"
          />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Purchased
          </P>
        </div>

        <div className="flex">
          <img
            src={parrotgreen}
            alt="circle"
            className="w-[15px] h-[15px] mt-[3px] mr-[4px]"
          />
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Darft
          </P>
        </div>
      </div>

      <div className="mb-10 text-center">
        <Button
          variant={{
            fontSize: "base",
            theme: "dark",
            fontWeight: "600",
            rounded: "md",
          }}
          className="uppercase"
        >
          add more artworks
        </Button>
      </div>

      <div>
        <Header variant={{ size: "3xl", theme: "dark", weight: "semiBold" }}>
          Series of Artwork
        </Header>

        <div className="flex md:flex-row flex-col gap-10 mt-5">
          {series_artwork.map((art, index) => (
            <div
              key={index}
              className="flex gap-2 border border-pink-600 rounded-md p-3"
            >
              <img
                src={art.img1}
                alt="art image"
                className="w-[160px] h-[197px]"
              />
              <div className="flex flex-col gap-2">
                <img
                  src={art.img2}
                  alt="art image"
                  className="w-[161px] h-[94px]"
                />
                <img
                  src={art.img3}
                  alt="art image"
                  className="w-[161px] h-[94px]"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="my-10 text-center">
          <Button
            variant={{
              fontSize: "base",
              theme: "dark",
              fontWeight: "600",
              rounded: "md",
            }}
            className="uppercase"
          >
            add more series
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtWork;
