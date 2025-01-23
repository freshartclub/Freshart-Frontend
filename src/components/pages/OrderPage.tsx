import dayjs from "dayjs";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import export_icon from "../../assets/export.png";
import home from "../../assets/home.png";
import invoice from "../../assets/invoice.png";
import processing from "../../assets/processing.png";
import arrow from "../../assets/Vector.png";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { useGetOrder } from "./http/useGetOrder";
import { imageUrl } from "../utils/baseUrls";

const OrderPage = () => {
  const [state, setState] = useState("purchase");
  const { data, isLoading } = useGetOrder();
  const navigate = useNavigate();

  const handleDetailPage = (item) => {
    navigate(`/order_tracking?id=${item?._id}&art=${item?.artwork?._id}`);
  };

  // const dataToRender =
  //   state === "purchase" ? data?.purchase : data?.subscription;

  if (isLoading) return <Loader />;

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

        <div className="flex sm:flex-row flex-col justify-between gap-5 mb-8">
          <div className=" flex gap-5 mt-8">
            <span
              onClick={() => setState("purchase")}
              className={`${
                state === "purchase" && "bg-[#FF536B] text-white"
              } font-bold text-md border border-zinc-800 px-5 py-2 cursor-pointer rounded-md`}
            >
              Purchase
            </span>
            <span
              onClick={() => setState("subscription")}
              className={`${
                state !== "purchase" && "bg-[#FF536B] text-white"
              } font-bold text-md border border-zinc-800 px-5 py-2 cursor-pointer  rounded-md`}
            >
              Subscription
            </span>
          </div>
          <div className="flex sm:flex-row flex-col gap-5 items-center ">
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
              <img
                src={export_icon}
                alt=""
                className="w-[18px] h-[17px] mr-2"
              />
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
        </div>

        <div className="flex flex-col gap-8">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between lg:gap-10 gap-5 bg-white p-4 rounded-md"
              >
                <img
                  src={`${imageUrl}/users/${item?.artwork?.media}`}
                  alt="order image"
                  className="w-[20vw] h-[10vw] object-cover"
                />

                <div className="sm:w-[80%] w-full">
                  <div className="flex lg:flex-row flex-col justify-between">
                    <Header
                      variant={{
                        size: "xl",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="flex items-baseline gap-2 "
                    >
                      {item?.artwork?.artworkName}
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="text-[#848484]"
                      >
                        ({dayjs(item?.createdAt).format("MMMM D, YYYY")})
                      </P>
                    </Header>

                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "normal",
                      }}
                    >
                      OrderID - #{item?.orderID}
                    </P>
                  </div>

                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "medium",
                    }}
                    className="mb-2"
                  >
                    € {item?.subTotal}
                  </P>

                  <P
                    variant={{
                      size: "small",
                      theme: "dark",
                      weight: "medium",
                    }}
                  >
                    {item.order_place}
                  </P>

                  <div className="flex">
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                    >
                      Quantity : {item?.artwork?.quantity}
                    </P>

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

                  <P
                    variant={{
                      size: "small",
                      theme: "dark",
                      weight: "medium",
                    }}
                    className="mt-2"
                  >
                    Type : {item?.artwork?.type.toUpperCase()}
                  </P>

                  <div className="flex sm:flex-row flex-col justify-start gap-2 w-full mt-6 ">
                    <Button
                      variant={{
                        fontWeight: "500",
                        thickness: "thick",
                      }}
                      className="border border-black rounded-md text-sm sm:px-6 sm:py-3 !p-2"
                    >
                      Order Again
                    </Button>

                    <Button
                      onClick={() => handleDetailPage(item)}
                      variant={{
                        theme: "light",
                        fontWeight: "600",
                      }}
                      className="text-[16px] text-[#FF536B] border border-gray-400 text-sm  sm:px-6 sm:py-3 !p-2 "
                    >
                      View Order
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center border border-[#c6c6c9]">
              <p className="text-lg text-center font-medium mb-4">
                You haven't placed any orders.
              </p>
              <NavLink to="/all-artworks?type=subscription">
                <button className="px-6 py-2 bg-zinc-800 text-white rounded-lg">
                  Continue Shopping
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
