import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import profile from "./assets/profile.png";
import share from "./assets/Vector (4).png";
import star from "./assets/Star.png";
import like from "./assets/Insignia.png";
import new_icon from "./assets/New.png";
import award from "./assets/Nomination.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { imageUrl } from "../utils/baseUrls";

const credential = [
  {
    icon: star,
    title: "Top Seller",
  },
  {
    icon: like,
    title: "Most Liked",
  },
  {
    icon: new_icon,
    title: "New Added",
  },
  {
    icon: award,
    title: "International Awards",
  },
];

const ArtistDescription = ({ data }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("highlight");
  const redirectToCircle = () => {
    navigate("/circleblog");
  };

  const aboutText = data?.artist?.aboutArtist?.about?.replace(
    /<\/?(h2|p|div|li|strong|blockquote)>|&nbsp;|«|»/g,
    ""
  );

  const highlightText = data?.artist?.highlights?.addHighlights?.replace(
    /<\/?(h2|p|div|li|strong|blockquote)>|&nbsp;|«|»/g,
    ""
  );

  return (
    <div>
      <div className="flex gap-5 sm:justify-end justify-center items-center my-4">
        <img
          src={`${imageUrl}/users/${data?.artist?.profile?.mainImage}`}
          alt="profile image"
          className="cursor-pointer w-10 h-10 rounded-full object-cover"
        />
        <Button
          variant={{
            fontSize: "base",
            theme: "light",
            fontWeight: "500",
            rounded: "full",
          }}
          className="border border-black uppercase !py-1"
        >
          Follow
        </Button>
        <img src={share} alt="share icon" className="cursor-pointer" />
      </div>

      <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 items-center">
        <div className="flex gap-1 text-sm font-medium">
          <span
            className={`cursor-pointer px-3 p-2 rounded-t-lg ${
              activeTab === "highlight"
                ? "border-b-2 border-[#EE1D52] bg-gray-100"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            id="highlight-tab"
            onClick={() => setActiveTab("highlight")}
          >
            Highlight
          </span>

          <span
            className={`cursor-pointer px-3 p-2 rounded-t-lg ${
              activeTab === "about"
                ? "border-b-2 border-[#EE1D52] bg-gray-100"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            id="about-tab"
            onClick={() => setActiveTab("about")}
          >
            About
          </span>

          <span
            className={`cursor-pointer px-3 p-2 rounded-t-lg ${
              activeTab === "curriculum"
                ? "border-b-2 border-[#EE1D52] bg-gray-100"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            id="curriculum-tab"
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum vitae
          </span>
        </div>

        <div className="flex gap-2">
          <span
            className="bg-[#102031] text-white py-1 px-2 cursor-pointer rounded-full font-medium"
            onClick={redirectToCircle}
          >
            Circle
          </span>
          <span className="bg-[#102031] text-white py-1 px-2 cursor-pointer rounded-full font-medium">
            Custom order
          </span>
        </div>
      </div>
      <div id="default-tab-content">
        {activeTab === "highlight" && (
          <div className="my-8">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-4"
            >
              Highlight
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="leading-7 mb-7"
            >
              {highlightText}
            </P>
          </div>
        )}

        {activeTab === "about" && (
          <div className="my-8">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-4"
            >
              About
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="leading-7 mb-7"
            >
              {aboutText}
            </P>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div
            className=" "
            id="curriculum"
            role="tabpanel"
            aria-labelledby="curriculum-tab"
          >
            <div className="my-8">
              <Header
                variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
                className="pb-4"
              >
                Curriculum vitae
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="leading-7 mb-7"
              >
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classNameical Latin literature
                from 45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classNameical literature, discovered the undoubtable source.
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                Cicero, written in 45 BC. This book is a treatise on the theory
                of ethics, very popular during the Renaissance.{" "}
              </P>

              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="border-b pb-7"
              >
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
              </P>
            </div>
          </div>
        )}

        {data?.artist?.insignia.length > 0 ? (
          <div>
            <P
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
              className="py-8"
            >
              Credentials and Insignias Area
            </P>
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-8 items-center rounded-md xl:px-7 px-5 xl:py-4 sm:py-3 py-5">
              {data?.artist?.insignia?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-3 w-56 xl:px-6 px-4 justify-center items-center ${
                    index !== credential.length - 1
                      ? "sm:border-r-2 border-gray-300 border-r-none"
                      : ""
                  }`}
                >
                  <img src={`${imageUrl}/users/${item.insigniaImage}`} alt="" />
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="text-center"
                  >
                    {item.credentialName}
                  </P>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArtistDescription;
