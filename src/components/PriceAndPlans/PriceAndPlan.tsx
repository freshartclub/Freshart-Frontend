import { useState } from "react";
import Header from "../ui/Header";
import P from "../ui/P";
import checkmark from "./assets/checkmark.png";
import exclamation from "../../assets/exclamation-thick.png";
import Button from "../ui/Button";
import exploration from "./assets/exploratio-icon.png";
import aisthete from "./assets/aisthete.png";
import eruditus from "./assets/eruditus.png";
import expertus from "./assets/expertus-icon.png";
import { useNavigate } from "react-router-dom";
import DiscountCode from "../ui/DiscountCode";

const artwork_1_plans = [
  {
    icon: exploration,
    title: "Plan Exploratio",
    price: 30,
    heading: "What you get:",
    features: [
      "Fermentum Venenatis T",
      "Parturient Lorem",
      "Lorem Ornare",
      "Fermentum Venenatis ",
      "Inceptos",
    ],
    isPopular: false,
  },
  {
    icon: aisthete,
    title: "Plan Aisthetes",
    price: 60,
    heading: "All free features, plus:",
    features: [
      "Parturient Venenatis Etiam",
      "Tortor Nullam Fringilla",
      "Malesuada Fermentum ",
      "Quam",
      "Magna Malesuada",
    ],
    isPopular: true,
  },
  {
    icon: eruditus,
    title: "Plan Eruditus",
    price: 90,
    heading: "All starter features, plus:",
    features: [
      "Fringilla Fusce Elit",
      "Ullamcorper",
      "Fringilla Fusce Elit",
      "Vestibulum",
      "Malesuada Ipsum",
    ],
    isPopular: false,
  },
  {
    icon: expertus,
    title: "Plan Expertus",
    price: 120,
    heading: "All business features, plus:",
    features: [
      "Parturient Malesuada Sem",
      "Fringilla Nullam",
      "Ridiculus",
      "Bibendum",
      "Venenatis Mollis",
    ],
    isPopular: false,
  },
];

const artwork_2_plans = [
  {
    icon: aisthete,
    title: "Plan Aisthetes",
    price: 60,
    heading: "All free features, plus:",
    features: [
      "Parturient Venenatis Etiam",
      "Tortor Nullam Fringilla",
      "Malesuada Fermentum ",
      "Quam",
      "Magna Malesuada",
    ],
    isPopular: true,
  },
];

const artwork_3_plans = [
  {
    icon: eruditus,
    title: "Plan Eruditus",
    price: 90,
    heading: "All starter features, plus:",
    features: [
      "Fringilla Fusce Elit",
      "Ullamcorper",
      "Fringilla Fusce Elit",
      "Vestibulum",
      "Malesuada Ipsum",
    ],
    isPopular: false,
  },
  {
    icon: expertus,
    title: "Plan Expertus",
    price: 120,
    heading: "All business features, plus:",
    features: [
      "Parturient Malesuada Sem",
      "Fringilla Nullam",
      "Ridiculus",
      "Bibendum",
      "Venenatis Mollis",
    ],
    isPopular: false,
  },
];

const PriceAndPlan = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const redirectToPaymentPage = () => {
    navigate("/premium_payment");
  };

  const handleCompleteForm = () => {
    navigate("/registration_process");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#F5F2EB] pt-10 pb-10">
      <div className="container mx-auto md:px-6 px-3 ">
        <div className="md:w-[60%] w-full m-auto text-center">
          <Header
            variant={{ size: "3xl", theme: "dark", weight: "bold" }}
            className="md:text-3xl sm:text-2xl text-xl"
          >
            Become a certified Art lover, Subscribe plan and explore fresh art
            club.
          </Header>
          <P
            variant={{ size: "md", theme: "dark", weight: "medium" }}
            className="mt-3"
          >
            Choose the perfect plan for your business needs
          </P>
        </div>

        <div className="my-8 ">
          <div className="flex lg:flex-row flex-col items-center justify-between w-full">
            <div>
              <DiscountCode />
            </div>

            <div className="2xl:w-[35%] xl:w-[39%] lg:w-[53%] md:w-[73%] sm:w-[55%] w-full border border-[#FF536B] bg-white rounded-full flex justify-center md:gap-7 gap-2 lg:mt-0 mt-4">
              <button
                className={`py-2 md:px-6 px-4 rounded-full  md:text-lg text-sm font-medium my-1 ${
                  activeTab === 1
                    ? " text-white bg-[#102030]"
                    : "bg-white text-black "
                }`}
                onClick={() => setActiveTab(1)}
              >
                1 Artwork
              </button>
              <button
                className={`py-2 md:px-6 px-4 rounded-full md:text-lg text-sm font-medium my-1 ${
                  activeTab === 2
                    ? " text-white bg-[#102030]"
                    : "bg-white text-black "
                }`}
                onClick={() => setActiveTab(2)}
              >
                2 Artworks
              </button>
              <button
                className={`py-2 md:px-6 px-4 rounded-full  md:text-lg text-sm font-medium my-1 ${
                  activeTab === 3
                    ? " text-white bg-[#102030]"
                    : "bg-white text-black "
                }`}
                onClick={() => setActiveTab(3)}
              >
                3 Artworks
              </button>
            </div>

            <div className="lg:w-[19%] w-full justify-center flex gap-2 lg:mt-6 mt-4">
              <img
                src={exclamation}
                alt="exclaimentry sign"
                className="w-[26px] h-[26px]"
              />
              <P variant={{ size: "md", theme: "dark", weight: "normal" }}>
                Compare plans
              </P>
            </div>
          </div>

          {/* Tab Content */}
          <div className="text-center w-full">
            {activeTab === 1 && (
              // <div className="flex flex-wrap justify-center items-center xl:gap-8 md:gap-3 gap-3 mt-10 w-full">
              <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-8 md:gap-3 gap-3 mt-10 w-full">
                {artwork_1_plans.map((plan1, index) => (
                  <div
                    key={index}
                    className="border rounded-lg shadow-md p-6 bg-white w-full md:w-auto"
                  >
                    <img src={plan1.icon} alt="image" />
                    <Header
                      variant={{
                        size: "xl",
                        theme: "dark",
                        weight: "bold",
                      }}
                      className="text-left my-4"
                    >
                      {plan1.title}
                    </Header>
                    <div className="text-center mb-4 flex">
                      <Header
                        variant={{ size: "2xl", theme: "dark", weight: "bold" }}
                      >
                        ${plan1.price}
                      </Header>
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="mt-3 ml-1"
                      >
                        /month
                      </P>
                    </div>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="text-left mb-4"
                    >
                      {plan1.heading}
                    </P>
                    <ul className="space-y-2 md:min-h-auto min-h-[150px]">
                      {plan1.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <img
                            src={checkmark}
                            alt="tick"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="text-left ">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={{
                        fontSize: "md",
                        theme: "dark",
                        fontWeight: "500",
                        rounded: "full",
                      }}
                      className="flex items-center mt-6 w-full justify-center"
                      onClick={redirectToPaymentPage}
                    >
                      Get started
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 2 && (
              <div className="flex flex-wrap justify-center items-center xl:gap-8 md:gap-3 gap-3 mt-10 w-full">
                {artwork_2_plans.map((plan2, index) => (
                  <div
                    key={index}
                    className="border rounded-lg shadow-md p-6 bg-white w-full md:w-auto "
                  >
                    <img src={plan2.icon} alt="image" />
                    <Header
                      variant={{
                        size: "xl",
                        theme: "dark",
                        weight: "bold",
                      }}
                      className="text-left my-4"
                    >
                      {plan2.title}
                    </Header>
                    <div className="text-center mb-4 flex">
                      <Header
                        variant={{ size: "2xl", theme: "dark", weight: "bold" }}
                      >
                        ${plan2.price}
                      </Header>
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="mt-3 ml-1"
                      >
                        /month
                      </P>
                    </div>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="text-left mb-4"
                    >
                      {plan2.heading}
                    </P>
                    <ul className="space-y-2">
                      {plan2.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <img
                            src={checkmark}
                            alt="tick"
                            className="w-5 h-5 mr-2"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={{
                        fontSize: "md",
                        theme: "dark",
                        fontWeight: "500",
                        rounded: "full",
                      }}
                      className="flex items-center mt-6 w-full justify-center"
                    >
                      Get started
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 3 && (
              <div className="flex flex-wrap justify-center items-center xl:gap-8 md:gap-3 gap-3 mt-10 w-full">
                {artwork_3_plans.map((plan3, index) => (
                  <div
                    key={index}
                    className="border rounded-lg shadow-md p-6 bg-white w-full md:w-auto "
                  >
                    <img src={plan3.icon} alt="image" />
                    <Header
                      variant={{
                        size: "xl",
                        theme: "dark",
                        weight: "bold",
                      }}
                      className="text-left my-4"
                    >
                      {plan3.title}
                    </Header>
                    <div className="text-center mb-4 flex">
                      <Header
                        variant={{ size: "2xl", theme: "dark", weight: "bold" }}
                      >
                        ${plan3.price}
                      </Header>
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="mt-3 ml-1"
                      >
                        /month
                      </P>
                    </div>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="text-left mb-4"
                    >
                      {plan3.heading}
                    </P>
                    <ul className="space-y-2">
                      {plan3.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <img
                            src={checkmark}
                            alt="tick"
                            className="w-5 h-5 mr-2"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={{
                        fontSize: "md",
                        theme: "dark",
                        fontWeight: "500",
                        rounded: "full",
                      }}
                      className="flex items-center mt-6 w-full justify-center"
                    >
                      Get started
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Button
            variant={{
              fontSize: "md",
              theme: "dark",
              fontWeight: "bold",
              rounded: "full",
            }}
            onClick={handleCompleteForm}
          >
            I am not sure yet. Let me take a look, I will choose later on!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceAndPlan;
