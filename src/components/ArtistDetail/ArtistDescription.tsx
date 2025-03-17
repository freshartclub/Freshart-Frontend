import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import share from "./assets/Vector (4).png";
import DOMPurify from "dompurify";

const ArtistDescription = ({ data }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("highlight");

  const redirectToCircle = () => navigate("/circleblog");

  const aboutText = data?.aboutArtist?.about?.replace(
    /<\/?(h2|p|div|li|strong|blockquote)>| |«|»/g,
    ""
  );

  console.log(data);

  const highlightText = data?.highlights?.addHighlights?.replace(
    /<\/?(h2|p|div|li|strong|blockquote)>| |«|»/g,
    ""
  );

  return (
    <div>
      <div className="flex gap-5 sm:justify-end justify-center items-center my-4">
        <img
          src={`${imageUrl}/users/${data?.profile?.mainImage}`}
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
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.highlights?.addHighlights),
              }}
            />
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
          <div className="my-8">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-4"
            >
              Curriculum Vitae
            </Header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data?.highlights?.cv?.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {item.Description}
                    </P>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.year}
                    </span>
                  </div>
                  <P
                    variant={{ size: "sm", theme: "dark", weight: "normal" }}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <strong>Location:</strong> {item.Location}
                  </P>
                  <P
                    variant={{ size: "sm", theme: "dark", weight: "normal" }}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <strong>Type:</strong> {item.Type}
                  </P>
                  <P
                    variant={{ size: "sm", theme: "dark", weight: "normal" }}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <strong>Scope:</strong> {item.Scope}
                  </P>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.insignia.length > 0 && (
          <div>
            <P
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
              className="py-8"
            >
              Credentials and Insignias Area
            </P>
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-8 items-center rounded-md xl:px-7 px-5 xl:py-4 sm:py-3 py-5">
              {data?.insignia?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-3 w-56 xl:px-6 px-4 justify-center items-center ${
                    index !== data.insignia.length - 1
                      ? "sm:border-r-2 border-gray-300"
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
        )}
      </div>
    </div>
  );
};

export default ArtistDescription;
