import { Link } from "react-router-dom";
import Button from "../ui/Button";
import processing from "../../assets/processing.png";
import export_icon from "../../assets/export.png";
import invoice from "../../assets/invoice.png";
import P from "../ui/P";
import order2 from "../../assets/order1.png";
import order1 from "../../assets/order2.png";
import Header from "../ui/Header";
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";

const order_Data = [
  {
    image: order1,
    title: "Art back on the air",
    para: "34x72cm",
    price: "$100",
    order_place: "Order Placed on",
    date: "3 October 2020",
    ship: "Ship To",
    name: "Anna Kathy",
    order_btn: "Order again",
    cancel: "Cancel",
    order_number: "Order Number",
    number: "#124-5660-9008",
    view: "View Order Details",
  },
  {
    image: order2,
    title: "Art back on the air",
    para: "34x72cm",
    price: "$100",
    order_place: "Order Placed on",
    date: "3 October 2020",
    ship: "Ship To",
    name: "Anna Kathy",
    order_btn: "Order again",
    cancel: "Cancel",
    order_number: "Order Number",
    number: "#124-5660-9008",
    view: "View Order Details",
  },
];

const OrderPage = () => {
  return (
    <div className="bg-[#EFEFF7] pb-10">
      <div className="container mx-auto md:px-6 px-3 pt-10">
        <ul className="flex p-2 gap-6 text-xl text-[#2E4053] items-center">
          <li>
            <Link to="/" className="rounded-md transition-all flex">
              <img
                src={home}
                alt="Home icon"
                className="w-[14px] h-[14px] mr-2"
              />
              <P
                variant={{ size: "small", theme: "dark", weight: "normal" }}
                className="text-[#FF536B]"
              >
                {" "}
                Home
              </P>
            </Link>
          </li>
          <img src={arrow} alt="Home icon" className="w-[4px] h-[6px] mr-2" />
          <li>
            <Link
              to="/"
              className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
            >
              <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
                Order
              </P>
            </Link>
          </li>
        </ul>

        <div className="flex sm:flex-row flex-col justify-end gap-5 mb-8">
          <Button
            variant={{ fontSize: "md", fontWeight: "bold" }}
            className="flex"
          >
            <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
              {" "}
              Processing{" "}
            </P>
            <img
              src={processing}
              alt=""
              className="w-[12px] h-[8px] mt-2 ml-2"
            />
          </Button>
          <Button
            variant={{ fontSize: "sm", fontWeight: "bold" }}
            className="flex bg-[#DEDEFA]"
          >
            <img src={export_icon} alt="" className="w-[18px] h-[17px] mr-2" />
            <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
              Export
            </P>
          </Button>
          <Button
            variant={{ fontSize: "lg", fontWeight: "bold", theme: "dark" }}
            className="flex"
          >
            <img src={invoice} alt="" className="w-[18px] h-[16px] mr-2" />
            <P variant={{ size: "small", theme: "light", weight: "normal" }}>
              Invoice
            </P>
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {order_Data.map((item, index) => (
            <>
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between lg:gap-10 gap-5 bg-white p-4 rounded-md"
              >
                <div className="">
                  <img src={item.image} alt="order image" className="w-full" />
                </div>

                <div className="sm:w-[80%] w-full">
                  <div className="flex lg:flex-row flex-col justify-between">
                    <Header
                      variant={{
                        size: "xl",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      {item.title}
                    </Header>
                    <div className="flex xl:gap-4">
                      <P
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "normal",
                        }}
                      >
                        {item.order_number}:
                      </P>
                      <P
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "normal",
                        }}
                      >
                        {item.number}
                      </P>
                    </div>
                  </div>
                  <P
                    variant={{ size: "small", theme: "dark", weight: "normal" }}
                    className="text-[#848484] my-1"
                  >
                    {item.para}
                  </P>

                  <P
                    variant={{ size: "base", theme: "dark", weight: "medium" }}
                    className="mb-2"
                  >
                    {item.price}
                  </P>

                  <div className="flex gap-1 my-2">
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                    >
                      {item.order_place}
                    </P>
                    :
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="text-[#848484]"
                    >
                      {item.date}
                    </P>
                  </div>

                  <div className="flex">
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                    >
                      {item.ship}
                    </P>
                    :
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="text-[#848484] ml-2"
                    >
                      {item.name}
                    </P>
                  </div>

                  <div className="flex sm:flex-row flex-col justify-between  w-full mt-6 ">
                    <div className="flex items-center sm:justify-center justify-between md:gap-5 ">
                      <Button
                        variant={{
                          fontWeight: "500",
                          thickness: "thick",
                        }}
                        className="border border-black rounded-md text-sm sm:px-6 sm:py-3 !p-2"
                      >
                        {item.order_btn}
                      </Button>

                      <Button
                        variant={{ fontWeight: "500" }}
                        className="text-sm sm:px-6 sm:py-3 !p-2 "
                      >
                        {item.cancel}
                      </Button>
                    </div>
                    <div className="flex md:justify-end mt-2 sm:mt-0">
                      <Button
                        variant={{
                          theme: "light",
                          fontWeight: "600",
                        }}
                        className="text-[16px] text-[#FF536B] border border-gray-400 text-sm  sm:px-6 sm:py-3 !p-2 "
                      >
                        {item.view}
                      </Button>
                    </div>
                  </div>
                  {/* <div className="flex sm:justify-end justify-center mt-2 sm:mt-0">
                    <Button
                      variant={{
                        fontSize: "base",
                        theme: "light",
                        fontWeight: "600",
                      }}
                      className="text-[16px] text-[#FF536B] border border-gray-400"
                    >
                      {item.view}
                    </Button>
                  </div> */}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
