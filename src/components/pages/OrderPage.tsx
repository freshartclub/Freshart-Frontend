import dayjs from "dayjs";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import export_icon from "../../assets/export.png";
import invoice from "../../assets/invoice.png";
import processing from "../../assets/processing.png";
import Button from "../ui/Button";  
import Loader from "../ui/Loader";
import Header from "../ui/Header";
import P from "../ui/P";
import { lowImageUrl } from "../utils/baseUrls";
import { useGetOrder } from "./http/useGetOrder";
import { useAppSelector } from "../../store/typedReduxHooks";

const OrderPage = () => {
  const [state, setState] = useState("purchase");
  const { data, isLoading } = useGetOrder();
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);

  const handleDetailPage = (item) => {
    navigate(`/order_tracking?id=${item?._id}&art=${item?.artwork?._id}`);
  };

  return (
    <div className={`${dark  ? "bg-[#111827]" : "bg-[#EFEFF7]"} pb-10`}>
      <div className="container mx-auto md:px-6 px-3">
        <nav className={`flex pt-5 gap-2 text-sm ${dark  ? "text-gray-300" : "text-[#2E4053]"} items-center`}>
          <Link to="/" className="flex text-[#FF536B]">
            Home
          </Link>
          <MdOutlineKeyboardArrowRight />
          <Link to="/order" className="text-[#FF536B]">
            Order
          </Link>
        </nav>

        <div className="flex sm:flex-row flex-col justify-between gap-5 mb-8">
          <div className="flex gap-5 mt-8">
            <span
              onClick={() => setState("purchase")}
              className={`
                ${state === "purchase" ? "bg-[#FF536B] text-white" : ""}
                ${dark && state !== "purchase" ? "border-gray-400 text-gray-300" : "border-zinc-800"}
                font-bold text-md border px-5 py-2 cursor-pointer rounded-md
              `}
            >
              Purchase
            </span>
            <span
              onClick={() => setState("subscription")}
              className={`
                ${state !== "purchase" ? "bg-[#FF536B] text-white" : ""}
                ${dark  && state === "purchase" ? "border-gray-400 text-gray-300" : "border-zinc-800"}
                font-bold text-md border px-5 py-2 cursor-pointer rounded-md
              `}
            >
              Subscription
            </span>
          </div>
          <div className="flex flex-row flex-wrap gap-5 items-center">
            <Button
              variant={{ fontSize: "md", fontWeight: "bold" }}
              className="flex"
            >
              <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
                Processing
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

        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-8">
            {data && data.length > 0 ? (
              data.map((item, index: number) => (
                <div
                  key={index}
                  className={`${dark  ? "bg-[#2B2B2B]" : "bg-white"} flex flex-col sm:flex-row justify-between gap-5 p-2 rounded-md`}
                >
                  <div className="flex flex-col gap-2 items-center">
                    <img
                      src={`${lowImageUrl}/${item?.artwork?.media}`}
                      alt="order image"
                      className="sm:w-[20vw] sm:h-[10vw] md:w-[15vw] md:h-[8vw] w-[10rem] h-[8rem] object-cover"
                    />
                    <Button
                      onClick={() => handleDetailPage(item)}
                      variant={{
                        theme: "light",
                        fontWeight: "600",
                      }}
                      className="text-[16px] w-full text-[#FF536B] border border-gray-400 text-sm sm:px-6 sm:py-3 !p-2"
                    >
                      View Order
                    </Button>
                  </div>

                  <div className="w-full">
                    <div className="flex lg:flex-row flex-col justify-between">
                      <Header
                        variant={{
                          size: "lg",
                          theme: dark  ? "light" : "dark",
                          weight: "semiBold",
                        }}
                        className="flex items-baseline gap-2"
                      >
                        {item?.artwork?.artworkName}
                        <P
                          variant={{
                            size: "small",
                            theme: dark  ? "light" : "dark",
                            weight: "medium",
                          }}
                          className="text-[#848484]"
                        >
                          ({dayjs(item?.createdAt).format("MMMM D, YYYY")})
                        </P>
                      </Header>

                      <P
                        variant={{
                          size: "small",
                          theme: dark  ? "light" : "dark",
                          weight: "semiBold",
                        }}
                      >
                        OrderId - #{item?.orderId}
                      </P>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className={`text-xs font-semibold ${dark  ? "text-white" : ""}`}>
                        € {item?.total}
                      </span>
                      <span className="capitalize text-[#71717199] text-xs">
                        Type : {item?.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`${dark ? "border-gray-600 text-gray-300" : "border-[#c6c6c9]"} px-6 py-4 text-center border`}>
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
        )}
      </div>
    </div>
  );
};

export default OrderPage;
