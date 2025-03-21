import DOMPurify from "dompurify";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import share from "./assets/Vector (4).png";

const ArtistDescription = ({ data }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");

  const redirectToCircle = () => navigate("/circleblog");

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="lg:flex hidden gap-3 sm:gap-5 justify-center sm:justify-end items-center my-4">
        <img
          src={`${imageUrl}/users/${data?.artist?.profile?.mainImage}`}
          alt="profile image"
          className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />

        <FaRegHeart size="1.5em" />

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
              activeTab === "curriculum"
                ? "border-b-2 border-[#EE1D52] bg-gray-100"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum vitae
          </span>
        </div>
        <div className="flex gap-2 items-center mt-2 mb-2 sm:mt-0">
          <span
            className="bg-[#102031] text-white py-1 px-2 sm:px-3 text-xs sm:text-sm cursor-pointer rounded-full font-medium"
            onClick={redirectToCircle}
          >
            Circle
          </span>
          <span className="bg-[#102031] text-white py-1 px-2 sm:px-3 text-xs sm:text-sm cursor-pointer rounded-full font-medium">
            Custom order
          </span>
          <div className="lg:hidden flex gap-3 sm:gap-5 justify-center sm:justify-end items-center">
            <img
              src={`${imageUrl}/users/${data?.artist?.profile?.mainImage}`}
              alt="profile image"
              className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />

            <FaRegHeart size="1.6em" />

            <img
              src={share}
              alt="share icon"
              className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>
        </div>
      </div>

      <div id="default-tab-content">
        {activeTab === "highlight" && (
          <div className="my-6 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md h-[64vh] max-h-[64vh] overflow-y-auto">
            <Header
              variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              className="pb-2 text-xl text-gray-800 dark:text-gray-200"
            >
              Highlight
            </Header>

            <HighlightText text={data?.artist?.highlights?.addHighlights} />
          </div>
        )}

        {activeTab === "about" && (
          <div className="my-6 bg-white dark:bg-gray-900 p-4 rounded-lg h-[64vh] max-h-[64vh] overflow-y-auto scrollbar shadow-md">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-2 text-xl text-gray-800 dark:text-gray-200"
            >
              About
            </Header>
            <div className="space-y-4 sm:space-y-6">
              <HighlightText text={data?.artist?.aboutArtist?.about} />

              <div className="flex items-center gap-3">
                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className="text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                  Date of birth :
                </P>

                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className="text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                  N/A
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
                      {disc?.discipline || "N/A"}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className="mb-2 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                  External Tags
                </P>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Illustration",
                    "Cartoonist",
                    "Paris",
                    "Barcelona",
                    "Museum",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-2 sm:px-3 rounded-md text-xs sm:text-sm shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {data?.artist?.insignia.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="text-sm sm:text-base text-gray-800 dark:text-gray-200"
                  >
                    Credentials and Insignias Area
                  </P>
                  <div className="flex mt-4 flex-row gap-6">
                    {data?.artist?.insignia?.map((item, index: number) => (
                      <div
                        key={index}
                        className={`flex flex-col gap-2 items-center`}
                      >
                        <img
                          src={`${imageUrl}/users/${item.insigniaImage}`}
                          alt=""
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                        />
                        <P
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                          className="text-center text-xs text-gray-700 dark:text-gray-300"
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
          <div className="my-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md h-[64vh] max-h-[64vh] overflow-y-auto scrollbar">
            <Header
              variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              className="pb-2 text-xl text-gray-800 dark:text-gray-200"
            >
              Curriculum Vitae
            </Header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {data?.artist?.highlights?.cv?.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col mb-2">
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
                    <span className="text-gray-700 dark:text-gray-300 text-xs">
                      <strong>Year :</strong> {item.year}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-700 dark:text-gray-300 text-xs">
                      <strong>Location :</strong> {item.Location}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-xs">
                      <strong>Type :</strong> {item.Type}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-xs">
                      <strong>Scope :</strong> {item.Scope}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HighlightText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  const sanitizedText = DOMPurify.sanitize(text || "");

  const words = sanitizedText.split(/\s+/);
  const limitedText = words.slice(0, 30).join(" ");
  const isLongText = words.length > 30;

  return (
    <div className="text-gray-800 dark:text-gray-200 text-sm">
      <div
        dangerouslySetInnerHTML={{
          __html: expanded ? sanitizedText : `${limitedText}...`,
        }}
      />
      {isLongText && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 text-xs font-semibold mt-1"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default ArtistDescription;
