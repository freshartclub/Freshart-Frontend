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

  const aboutText = data?.artist?.aboutArtist?.about.replace(
    /^<p>|<\/p>$/g,
    ""
  );
  return (
    <div>
      <div className="flex gap-5 sm:justify-end justify-center items-center my-4">
        <img src={profile} alt="profile image" className="cursor-pointer" />
        <Button
          variant={{
            fontSize: "base",
            theme: "light",
            fontWeight: "500",
            rounded: "full",
          }}
          className="border border-black uppercase !py-1"
        >
          follow
        </Button>
        <img src={share} alt="share icon" className="cursor-pointer" />
      </div>

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 flex sm:flex-row flex-col-reverse items-center">
        <ul
          className="flex -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="md:me-2 me-1" role="presentation">
            <button
              className={`inline-block md:p-4 p-2 rounded-t-lg ${
                activeTab === "highlight"
                  ? "border-b-4 border-[#EE1D52] bg-gray-100"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="highlight-tab"
              onClick={() => setActiveTab("highlight")}
              data-tabs-target="#highlight"
              type="button"
              role="tab"
              aria-controls="highlight"
              aria-selected={activeTab === "highlight"}
            >
              Highlight
            </button>
          </li>

          <li className="md:me-2 me-1" role="presentation">
            <button
              className={`inline-block md:p-4 sm:p-2 p-2 rounded-t-lg ${
                activeTab === "about"
                  ? "border-b-4 border-[#EE1D52] bg-gray-100"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="about-tab"
              onClick={() => setActiveTab("about")}
              data-tabs-target="#about"
              type="button"
              role="tab"
              aria-controls="about"
              aria-selected={activeTab === "about"}
            >
              About
            </button>
          </li>

          <li className="md:me-2 me-1" role="presentation">
            <button
              className={`inline-block md:p-4 sm:p-2 p-2 rounded-t-lg ${
                activeTab === "curriculum"
                  ? "border-b-4 border-[#EE1D52] bg-gray-100"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="curriculum-tab"
              onClick={() => setActiveTab("curriculum")}
              data-tabs-target="#curriculum"
              type="button"
              role="tab"
              aria-controls="curriculum"
              aria-selected={activeTab === "curriculum"}
            >
              Curriculum vitae
            </button>
          </li>
        </ul>

        <div className="md:ml-auto flex 2xl:space-x-4 lg:space-x-6 md:space-x-2 space-x-4 my:my-2 sm:my-0 my-4">
          <Button
            variant={{
              fontSize: "base",
              theme: "dark",
              fontWeight: "500",
              rounded: "full",
            }}
            className="!py-2"
            onClick={redirectToCircle}
          >
            Circle
          </Button>
          <Button
            variant={{
              fontSize: "base",
              theme: "dark",
              fontWeight: "500",
              rounded: "full",
            }}
            className="!py-2"
          >
            Custom order
          </Button>
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
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classNameical Latin literature from 45
              BC, making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classNameical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance.{" "}
            </P>

            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="border-b pb-7"
            >
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy.
            </P>

            <div>
              <P
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="py-8"
              >
                Credentials and Insignias Area
              </P>
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-8 items-center shadow-2xl rounded-md xl:px-7 px-5 xl:py-4 sm:py-3 py-5">
                {credential.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col gap-3 w-56 xl:px-6 px-4 justify-center items-center ${
                      index !== credential.length - 1
                        ? "sm:border-r-2 border-gray-300 border-r-none"
                        : ""
                    }`}
                  >
                    <img src={item.icon} alt="" />
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="text-center"
                    >
                      {item.title}
                    </P>
                  </div>
                ))}
              </div>
            </div>
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

            {/* <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="border-b pb-7"
            >
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy.
            </P> */}

            <div>
              <P
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="py-8"
              >
                Credentials and Insignias Area
              </P>
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-8 items-center shadow-2xl rounded-md xl:px-7 px-5 xl:py-4 sm:py-3 py-5">
                {credential.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col gap-3 w-56 xl:px-6 px-4 justify-center items-center ${
                      index !== credential.length - 1
                        ? "sm:border-r-2 border-gray-300 border-r-none"
                        : ""
                    }`}
                  >
                    <img src={item.icon} alt="" />
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="text-center"
                    >
                      {item.title}
                    </P>
                  </div>
                ))}
              </div>
            </div>
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

              <div>
                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className="py-8"
                >
                  Credentials and Insignias Area
                </P>

                <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-4 grid-cols-2 xl:gap-2 gap-5 items-center shadow-2xl rounded-md xl:py-10 py-5">
                  {credential.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col gap-3 justify-center items-center ${
                        index !== credential.length - 1
                          ? " border-gray-300 border-r-none"
                          : ""
                      }`}
                    >
                      <img src={item.icon} alt="" />
                      <P
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="text-center"
                      >
                        {item.title}
                      </P>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDescription;
