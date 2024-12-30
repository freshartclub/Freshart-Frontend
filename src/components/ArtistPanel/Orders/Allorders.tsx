import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";
import { useNavigate } from "react-router-dom";
import { useGetArtistOrder } from "./http/useGetArtistOrder";
import dayjs from "dayjs";
import Loader from "../../ui/Loader";
import { formateCurrency } from "../../utils/FormatCurrency";

const Allorders = ({ orderDelail }: any) => {
  const { data, isLoading } = useGetArtistOrder();

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = orderDelail?.slice(firstIndex, lastIndex);
  const nPages = orderDelail
    ? Math.ceil(orderDelail.length / recordPerPage)
    : 0;

  const numbers = [...Array(nPages + 1).keys()]?.slice(1);

  const columns = [
    { key: "orderId", label: "Order ID", colSpan: 1 },
    { key: "product", label: "Product", colSpan: 2 },
    { key: "date", label: "Date", colSpan: 1 },
    { key: "customer", label: "Customer", colSpan: 2 },
    { key: "orderType", label: "Order Type", colSpan: 1 },
    { key: "total", label: "Total", colSpan: 1 },
    { key: "payment", label: "Payment", colSpan: 1 },
    { key: "status", label: "Status", colSpan: 1 },
    { key: "action", label: "Action", colSpan: 1 },
  ];

  const navigate = useNavigate();
  const url = "https://dev.freshartclub.com/images";

  const handelClickData = (value) => {
    navigate(
      `/artist-panel/order/approve-order?id=${value?._id}&orderType=${value?.orderType}`
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="rounded-md border border-1 mt-3 w-full overflow-x-auto">
        <div className="block lg:hidden bg-white">
          {data && data?.length > 0 ? (
            data?.map((value: any, index: any) => (
              <div key={index} className="p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-sm">Order #{value.orderID}</p>
                  <div
                    className={`rounded-lg py-1 px-2 text-xs capitalize ${
                      value?.status === "pending"
                        ? "bg-[#FDF1E8] text-[#E46A11]"
                        : value.status === "success"
                        ? "bg-[#E8F8FD] text-[#13B2E4]"
                        : value.status === "cancelled"
                        ? "bg-[#FEEDEC] text-[#F04438]"
                        : "bg-[#E7F4EE] text-[#0D894F]"
                    }`}
                  >
                    {value?.status}
                  </div>
                </div>

                <div className="flex gap-3 mb-3">
                  <img
                    src={`${url}/users/${value?.image}`}
                    alt="product"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm">{value?.artWorkName}</p>
                    <p className="text-xs text-gray-600">{`${value?.length} x ${value?.width} x ${value?.height} cm`}</p>
                    <p className="text-sm mt-1">
                      {formateCurrency(value?.subTotal, "$")}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <p className="text-sm">
                    <span className="font-semibold">Customer:</span>{" "}
                    {`${value?.artistName}${value?.artistSurname1}${value?.artistSurname2}`}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Date:</span>{" "}
                    {dayjs(value?.createdAt).format("MMM D, YYYY")}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Order Type:</span>{" "}
                    {value?.orderType}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Payment:</span>{" "}
                    {value?.paymenttype}
                  </p>
                </div>

                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => handelClickData(value)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <LuEye className="text-xl" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <RiDeleteBin6Line className="text-xl" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-white h-[300px] border border-zinc-300">
              <p className="text-lg text-center font-medium mb-4">
                You don't have any Order yet.
              </p>
            </div>
          )}
        </div>

        <div className="hidden lg:block min-w-[1000px]">
          <div className="grid grid-cols-11 bg-[#F9F9FC] items-center my-auto h-10 p-2 border-b">
            {columns?.map((column) => (
              <div key={column.key} className={`col-span-${column.colSpan}`}>
                <p className="font-semibold text-sm xl:text-base text-black">
                  {column.label}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-2">
            {data && data?.length > 0 ? (
              data?.map((value: any, index: any) => (
                <div key={index}>
                  <div className="grid grid-cols-11 h-auto pb-3 pt-3">
                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {value.orderID}
                      </p>
                    </div>
                    <div
                      className="col-span-2 flex gap-2 cursor-pointer"
                      onClick={() => handelClickData(value)}
                    >
                      <div>
                        <img
                          src={`${url}/users/${value?.image}`}
                          alt="product image"
                          className="w-10 h-12 rounded-xl object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-black font-bold text-xs xl:text-sm">
                          {value?.artWorkName}
                        </p>
                        <p className="text-xs">
                          {`${value?.length} x ${value?.width} x ${value?.height} cm`}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {dayjs(value?.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-black font-semibold text-xs xl:text-sm">
                        {`${value?.artistName}${value?.artistSurname1}${value?.artistSurname2}`}
                      </p>
                      <p className="text-xs">{value?.email}</p>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold capitalize">
                        {value?.orderType}
                      </p>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {formateCurrency(value?.subTotal, "$")}
                      </p>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {value.paymenttype}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <div
                        className={`w-fit rounded-lg py-1 px-2 capitalize text-xs xl:text-sm ${
                          value?.status === "pending"
                            ? "bg-[#FDF1E8] text-[#E46A11]"
                            : value.status === "success"
                            ? "bg-[#E8F8FD] text-[#13B2E4]"
                            : value.status === "cancelled"
                            ? "bg-[#FEEDEC] text-[#F04438]"
                            : "bg-[#E7F4EE] text-[#0D894F]"
                        }`}
                      >
                        <p className="flex items-center justify-center">
                          {value.status}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handelClickData(value)}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <LuEye className="text-xl" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <RiDeleteBin6Line className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center bg-white h-[300px] border border-zinc-300">
                <p className="text-lg text-center font-medium mb-4">
                  You don't have any Order yet.
                </p>
              </div>
            )}
            <div>
              <PaginationTabs
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                nPages={nPages}
                numbers={numbers}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allorders;
