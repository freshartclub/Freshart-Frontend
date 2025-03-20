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
import { FaRegHeart } from "react-icons/fa";


const credential = [
  { icon: star, title: "Top Seller" },
  { icon: like, title: "Most Liked" },
  { icon: new_icon, title: "New Added" },
  { icon: award, title: "International Awards" },
];

const ArtistDescription = ({ data }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("highlight");
  const [showMore, setShowMore] = useState(false);

  const redirectToCircle = () => navigate("/circleblog");

  const aboutText = data?.artist?.aboutArtist?.about?.replace(
    /<\/?(h2|p|div|li|strong|blockquote)>/g, 
    ""
  ).trim() || "No about text available.";


const shortAboutText = aboutText.split(/\s+/).slice(0, 50).join(" ") + 
    (aboutText.split(/\s+/).length > 50 ? "..." : "");

const highlightText = data?.artist?.highlights?.addHighlights?.replace(
    /<\/?(h2|p|div|li|strong|blockquote)>/g,
    ""
  ).trim() || "No highlight text available.";

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
     
      <div className="flex gap-3 sm:gap-5 justify-center sm:justify-end items-center my-4">
        <img
          src={`${imageUrl}/users/${data?.artist?.profile?.mainImage}`}
          alt="profile image"
          className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
        <Button
          variant={{
            fontSize: "sm",
            theme: "light",
            fontWeight: "500",
            rounded: "full",
          }}
          className="border border-black uppercase !py-1 px-3 sm:px-4 text-xs sm:text-base hover:bg-gray-100 transition-colors"
        >
          <FaRegHeart size="1.6em"/>
        </Button>
        <img
          src={share}
          alt="share icon"
          className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
        />
      </div>

     
      <div className="flex flex-col sm:flex-row justify-between border-b border-gray-200 dark:border-gray-700 items-start sm:items-center">
        <div className="flex gap-1 text-xs sm:text-sm font-medium flex-wrap">
          <span
            className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-2 rounded-t-lg ${
              activeTab === "highlight"
                ? "border-b-2 border-[#EE1D52] bg-gray-100"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("highlight")}
          >
            Highlight
          </span>
          <span
            className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-2 rounded-t-lg ${
              activeTab === "about"
                ? "border-b-2 border-[#EE1D52] bg-gray-100"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About
          </span>
          <span
            className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-2 rounded-t-lg ${
              activeTab === "curriculum"
                ? "border-b-2 border-[#EE1D52] bg-gray-100"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum vitae
          </span>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <span
            className="bg-[#102031] text-white py-1 px-2 sm:px-3 text-xs sm:text-sm cursor-pointer rounded-full font-medium"
            onClick={redirectToCircle}
          >
            Circle
          </span>
          <span className="bg-[#102031] text-white py-1 px-2 sm:px-3 text-xs sm:text-sm cursor-pointer rounded-full font-medium">
            Custom order
          </span>
        </div>
      </div>


      <div id="default-tab-content" className="mt-4 sm:mt-6">
        {activeTab === "highlight" && (
          <div className="my-6 sm:my-8 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-2 sm:pb-4 text-xl sm:text-2xl text-gray-800 dark:text-gray-200"
            >
              Highlight
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="leading-6 sm:leading-7 text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap"
            >
              {highlightText}
            </P>
          </div>
        )}

        {activeTab === "about" && (
          <div className="my-6 sm:my-8 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-2 sm:pb-4 text-xl sm:text-2xl text-white"
            >
              About {data?.artist?.artistName} {data?.artist?.artistSurname1}
            </Header>
            <div className="space-y-4 sm:space-y-6">
             
              <div>
                <P
                  variant={{ size: "base", theme: "dark", weight: "normal" }}
                  className="leading-6 sm:leading-7 text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap"
                >
                  {showMore ? aboutText : shortAboutText}
                </P>
                {aboutText.split(" ").length > 50 && (
                  <Button
                    variant={{ fontSize: "sm", theme: "light", fontWeight: "500" }}
                    className="mt-2 text-[#EE1D52] hover:underline text-xs sm:text-sm"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Less" : "More"}
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
              <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className=" sm:mb-3 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                  Date of birth : 
                </P>

                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className=" sm:mb-3 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                 null
                </P>
              </div>

           
              <div>
                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                  Disciplines
                </P>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {data?.artist?.aboutArtist?.discipline?.map((disc, index) => (
                    <span
                      key={index}
                      className="bg-[#EE1D52] text-white py-1 px-2 sm:px-3 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                    >
                      {disc?.discipline || "Unnamed Discipline"}
                    </span>
                  ))}
                </div>
              </div>

              
              <div>
                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                  External Tags
                </P>
                <div className="flex flex-wrap gap-2">
                  {["Illustration", "Cartoonist", "Paris", "Barcelona", "Museum"].map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-2 sm:px-3 rounded-md text-xs sm:text-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>


              </div>

              {data?.artist?.insignia.length > 0 && (
          <div className="my-6 sm:my-8 bg-white dark:bg-gray-900  sm:p-6 rounded-lg shadow-md">
            <P
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
              className="py-4 sm:py-6 text-sm sm:text-base text-gray-800 dark:text-gray-200"
            >
              Credentials and Insignias Area
            </P>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-center">
              {data?.artist?.insignia?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-3 w-full sm:w-56 px-4 justify-center items-center ${
                    index !== data.artist.insignia.length - 1
                      ? "sm:border-r-2 border-gray-300"
                      : ""
                  }`}
                >
                  <img
                    src={`${imageUrl}/users/${item.insigniaImage}`}
                    alt=""
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-300"
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
        )}

        {activeTab === "curriculum" && (
          <div className="my-6 sm:my-8 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-2 sm:pb-4 text-xl sm:text-2xl text-gray-800 dark:text-gray-200"
            >
              Curriculum Vitae
            </Header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {data?.artist?.highlights?.cv?.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="text-gray-500 dark:text-gray-400 text-sm sm:text-base"
                    >
                      {item.Description}
                    </P>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                      {item.year}
                    </span>
                  </div>
                  <P
                    variant={{ size: "sm", theme: "dark", weight: "normal" }}
                    className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm"
                  >
                    <strong>Location:</strong> {item.Location}
                  </P>
                  <P
                    variant={{ size: "sm", theme: "dark", weight: "normal" }}
                    className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm"
                  >
                    <strong>Type:</strong> {item.Type}
                  </P>
                  <P
                    variant={{ size: "sm", theme: "dark", weight: "normal" }}
                    className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm"
                  >
                    <strong>Scope:</strong> {item.Scope}
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