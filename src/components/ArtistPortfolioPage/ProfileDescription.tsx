import { useState } from "react";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import arrow from "./assets/arrow_2.png";

const ProfileDescription = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };
  return (
    <div className="xl:w-[70%] lg:w-[65%] sm:w-[60%] w-full ">
      <div className="w-full mt-10">
        {/* Tabs */}
        <div className="flex bg-[#FFEFF1] lg:w-[50%] w-full p-2">
          <button
            onClick={() => handleTabClick("profile")}
            className={`w-1/2 py-2 text-center ${
              activeTab === "profile"
                ? "text-black bg-white"
                : " bg-transparent"
            } font-semibold rounded-md`}
          >
            Profile
          </button>

          <button
            onClick={() => handleTabClick("posts")}
            className={`w-1/2 py-2 text-center ${
              activeTab === "posts" ? "text-black bg-white " : " bg-transparent"
            } font-semibold rounded-md`}
          >
            Posts
          </button>

          <button
            onClick={() => handleTabClick("action")}
            className={`w-1/2 py-2 text-center ${
              activeTab === "action" ? "text-black bg-white" : "bg-transparent"
            } font-semibold rounded-md`}
          >
            Action
          </button>
        </div>

        {/* Tab Content */}
        <div className=" bg-white rounded-b-lg">
          {activeTab === "profile" && (
            <>
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
            </>
          )}
          {activeTab === "posts" && (
            <div className="border mt-8 p-4 ">
              <Header
                variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
                className="mb-3 uppercase"
              >
                Posts
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="w-[90%]"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
          )}

          {activeTab === "action" && (
            <div className="border mt-8 p-4 ">
              <Header
                variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
                className="mb-3 uppercase"
              >
                Action
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="w-[90%]"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDescription;
