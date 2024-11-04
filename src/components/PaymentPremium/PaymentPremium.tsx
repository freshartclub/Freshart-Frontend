import Header from "../ui/Header";
import card1 from "./assets/color icon.png";
import card2 from "./assets/color icon (1).png";
import card3 from "./assets/color icon (2).png";
import card4 from "./assets/color icon (3).png";
import P from "../ui/P";
import card from "./assets/Card.png";
import { useState } from "react";
import slider from "./assets/Slider.png";
import credit1 from "./assets/Credit card.png";
import credit2 from "./assets/Credit_card2.png";
import credit3 from "./assets/Credit_card3.png";
import credit4 from "./assets/Credit_card4.png";
import card_icon from "./assets/Basic.png";
import paypal from "./assets/paypal_svgrepo.com.png";
import upi from "./assets/pay_svgrepo.com.png";
import banking from "./assets/banking-business-and-finance_svgrepo.com.png";
import dots from "./assets/dotss.png";
import Button from "../ui/Button";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import DiscountCode from "../ui/DiscountCode";

const cards_Data = [
  {
    card: card1,
    title: "Montes nascetur ridiculus",
    text: "Maecenas euismod neque sit amet velit faucibus, eu dictum.",
  },
  {
    card: card2,
    title: "Scelerisque litora blandit",
    text: "Nam tincidunt neque at est efficitur, quis eleifend bibendum.",
  },
  {
    card: card3,
    title: "Felis ligula scelerisque",
    text: "Maecenas lacinia diam sit amet urna finibus, non malesuada.",
  },
  {
    card: card4,
    title: "Quis enim lobortis",
    text: "Aenean fermentum turpis id turpis venenatis efficitur.",
  },
];

const dummyCountries = [
  { label: "Hong Kong SR China" },
  { label: "United States" },
  { label: "Canada" },
  { label: "United Kingdom" },
  { label: "Australia" },
  { label: "India" },
];
const PaymentPremium = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedCountry, setSelectedCountry] = useState(dummyCountries[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    navigate("/payment_successful");
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "currentColor",
      backgroundColor: "white",
    }),
  };

  return (
    <div className="my-10">
      <div className="container m-auto sm:px-6 px-3">
        <div className="flex lg:flex-row flex-col justify-between items-center gap-8">
          <div className="">
            <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
              Premium Exclusive Plan
            </Header>

            <div className="mt-14">
              {cards_Data.map((item, index) => (
                <div key={index} className="flex justift-between mt-12">
                  <img src={item.card} alt="card image" />
                  <div>
                    <Header
                      variant={{
                        size: "lg",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      {item.title}
                    </Header>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "normal",
                      }}
                    >
                      {item.text}
                    </P>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F7F8FC] sm:p-20 p-4 lg:w-[50%] w-full ">
            <div>
              <img src={card} alt="card" className="w-full" />

              <div className="mt-5">
                <DiscountCode />
              </div>

              <div>
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 grid-cols-5 mb-5 mt-5 bg-white">
                  <button
                    className={`xl:pl-4 xl:pr-8 lg:pl-3 lg:pr-6 pl-4 pr-8  py-5 border-r border-gray-100 ${
                      activeTab === "tab1"
                        ? " border-t-4 border-t-[#FF536B] text-[#FF536B]"
                        : "  border-t-4 border-t-[#ffffff] "
                    } transition duration-300     `}
                    onClick={() => handleTabClick("tab1")}
                  >
                    <img src={card_icon} alt="card_icon" />
                    <P
                      variant={{
                        size: "base",
                        weight: "semiBold",
                      }}
                      className="text-[11px] md:text-[16px] text-left"
                    >
                      Card
                    </P>
                  </button>

                  <button
                    className={`xl:pl-4 xl:pr-8 lg:pl-3 lg:pr-6 pl-4 pr-8  py-5 border-r border-gray-100 ${
                      activeTab === "tab2"
                        ? "border-t-4 border-t-[#FF536B] text-[#FF536B]"
                        : " border-t-4 border-t-[#ffffff] "
                    } transition duration-300     `}
                    onClick={() => handleTabClick("tab2")}
                  >
                    <img src={paypal} alt="paypal" />
                    <P
                      variant={{
                        size: "base",
                        weight: "semiBold",
                      }}
                      className="text-[11px] md:text-[16px] text-left"
                    >
                      Paypal
                    </P>{" "}
                  </button>

                  <button
                    className={`xl:pl-4 xl:pr-8 lg:pl-3 lg:pr-6 pl-4 pr-8 py-5 border-r border-gray-100 ${
                      activeTab === "tab3"
                        ? "border-t-4 border-t-[#FF536B] text-[#FF536B]"
                        : " border-t-4 border-t-[#ffffff] "
                    } transition duration-300     `}
                    onClick={() => handleTabClick("tab3")}
                  >
                    <img src={upi} alt="upi" />
                    <P
                      variant={{
                        size: "base",
                        weight: "semiBold",
                      }}
                      className="text-[11px] md:text-[16px] text-left"
                    >
                      UPI
                    </P>{" "}
                  </button>

                  <button
                    className={`xl:pl-4 xl:pr-8 lg:pl-3 lg:pr-6 pl-4 pr-8  py-5 border-r border-gray-100 ${
                      activeTab === "tab4"
                        ? "border-t-4 border-t-[#FF536B] text-[#FF536B]"
                        : " border-t-4 border-t-[#ffffff] "
                    } transition duration-300     `}
                    onClick={() => handleTabClick("tab4")}
                  >
                    <img src={banking} alt="banking" />
                    <P
                      variant={{
                        size: "base",
                        weight: "semiBold",
                      }}
                      className="text-[11px] md:text-[16px] text-left"
                    >
                      E banking
                    </P>{" "}
                  </button>

                  <button
                    className={`xl:pl-4 xl:pr-8 lg:pl-3 lg:pr-6 pl-4 pr-8  py-5 border-r border-gray-100 xl:block lg:hidden block ${
                      activeTab === "tab5"
                        ? "border-t-4 border-t-[#FF536B] text-[#FF536B]"
                        : " border-t-4 border-t-[#ffffff] "
                    } transition duration-300     `}
                    onClick={() => handleTabClick("tab5")}
                  >
                    <img src={dots} alt="banking" />
                  </button>
                </div>

                <div className="">
                  {activeTab === "tab1" && (
                    <div className="bg-white pt-10 pb-5">
                      <div className="flex justify-between mb-5 px-5">
                        <div>
                          <Header
                            variant={{
                              size: "md",
                              theme: "dark",
                              weight: "semiBold",
                            }}
                          >
                            Card Number
                          </Header>
                          <P
                            variant={{ size: "base", weight: "normal" }}
                            className="text-[#808080] mt-1"
                          >
                            1234 1234 1234 1234
                          </P>
                        </div>

                        <div className="flex gap-1">
                          <img
                            src={credit1}
                            alt="credit card1"
                            className="w-[24px] h-[17px]"
                          />
                          <img
                            src={credit2}
                            alt="credit card2"
                            className="w-[24px] h-[17px]"
                          />
                          <img
                            src={credit3}
                            alt="credit card3"
                            className="w-[24px] h-[17px]"
                          />
                          <img
                            src={credit4}
                            alt="credit card4"
                            className="w-[24px] h-[17px]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between w-full px-5 border-y border-gray-100 ">
                        <div className="border-r border-gray-100 w-[50%] py-3">
                          <Header
                            variant={{
                              size: "md",
                              theme: "dark",
                              weight: "semiBold",
                            }}
                          >
                            Expiration
                          </Header>
                          <P
                            variant={{ size: "base", weight: "normal" }}
                            className="text-[#808080] mt-1"
                          >
                            MM/YY
                          </P>
                        </div>

                        <div className="flex w-[50%] justify-between pl-3 py-3">
                          <div>
                            <Header
                              variant={{
                                size: "md",
                                theme: "dark",
                                weight: "semiBold",
                              }}
                            >
                              CVC
                            </Header>
                            <P
                              variant={{ size: "base", weight: "normal" }}
                              className="text-[#808080]"
                            >
                              CVC
                            </P>
                          </div>
                          <div>
                            <img src={slider} alt="image" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Select
                          styles={customStyles}
                          options={dummyCountries.map((country) => ({
                            label: `${country.label}`,
                          }))}
                          value={selectedCountry}
                          onChange={({ selectedOption }: any) =>
                            setSelectedCountry(selectedOption)
                          }
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div className="bg-white p-5">Paypal</div>
                  )}
                  {activeTab === "tab3" && (
                    <div className="bg-white p-5">Upi</div>
                  )}
                  {activeTab === "tab4" && (
                    <div className="bg-white p-5">E Banking</div>
                  )}
                  {activeTab === "tab5" && (
                    <div className="bg-white p-5">Dots</div>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant={{
                fontSize: "base",
                theme: "dark",
                fontWeight: "600",
                rounded: "full",
              }}
              className="w-full mt-8"
              onClick={handlePaymentSuccess}
            >
              Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPremium;
