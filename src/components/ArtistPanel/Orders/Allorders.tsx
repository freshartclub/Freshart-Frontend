import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";
import { useNavigate } from "react-router-dom";
import { useGetArtistOrder } from "./http/useGetArtistOrder";
import dayjs from "dayjs";
import Loader from "../../ui/Loader";
import { formateCurrency } from "../../utils/FormatCurrency";
import { imageUrl } from "../../utils/baseUrls";

const Allorders = ({ orderDetail }: any) => {
  const [expandedOrderID, setExpandedOrderID] = useState<string | null>(null);
  const { data, isLoading } = useGetArtistOrder();

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = orderDetail?.slice(firstIndex, lastIndex);
  const nPages = orderDetail
    ? Math.ceil(orderDetail.length / recordPerPage)
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

  const toggleDropdown = (orderID: string) => {
    setExpandedOrderID(expandedOrderID === orderID ? null : orderID);
  };

  // Group items by orderID
  const groupedData = orderDetail?.reduce((acc: any, curr: any) => {
    acc[curr.orderID] = acc[curr.orderID] || [];
    acc[curr.orderID].push(curr);
    return acc;
  }, {});

  console.log(orderDetail);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="rounded-md border border-1 mt-3 w-full overflow-x-auto">
        {/* <div className="block lg:hidden bg-white">
          {orderDetail && orderDetail?.length > 0 ? (
            orderDetail?.map((value: any, index: any) => (
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
                    src={`${imageUrl}/users/${value?.image}`}
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
        </div> */}

        <div className="  min-w-[1000px]">
          <div className="grid grid-cols-11 bg-[#F9F9FC] items-center my-auto h-10 p-2 border-b">
            {columns?.map((column) => (
              <div key={column.key} className={`col-span-${column.colSpan}`}>
                <p className="font-semibold text-sm xl:text-base text-black">
                  {column.label}
                </p>
              </div>
            ))}
          </div>

          <div>
            {Object.keys(groupedData).map((orderID) => {
              const items = groupedData[orderID];
              return (
                <div className="bg-white p-2" key={orderID}>
                  {/* Display the first item in the group */}

                  <div className="grid grid-cols-11 h-auto pb-3 pt-3">
                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {items[0]?.orderID}
                      </p>
                    </div>
                    <div
                      className="col-span-2 flex gap-2 cursor-pointer"
                      onClick={() => handelClickData(items[0])}
                    >
                      <div>
                        <img
                          src={`${imageUrl}/users/${items[0]?.image}`}
                          alt="product image"
                          className="w-10 h-12 rounded-xl object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-black font-bold text-xs xl:text-sm">
                          {items[0]?.artWorkName}
                        </p>
                        <p className="text-xs">
                          {`${items[0]?.length} x ${items[0]?.width} x ${items[0]?.height} cm`}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {dayjs(items[0]?.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-black font-semibold text-xs xl:text-sm">
                        {`${items[0]?.artistName}${items[0]?.artistSurname1}${items[0]?.artistSurname2}`}
                      </p>
                      <p className="text-xs">{items[0]?.email}</p>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold capitalize">
                        {items[0]?.items[0]?.type}
                      </p>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {formateCurrency(items[0]?.subTotal, "$")}
                      </p>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {items[0]?.paymenttype}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <div
                        className={`w-fit rounded-lg py-1 px-2 capitalize text-xs xl:text-sm ${
                          items[0]?.status === "pending"
                            ? "bg-[#FDF1E8] text-[#E46A11]"
                            : items[0]?.status === "success"
                            ? "bg-[#E8F8FD] text-[#13B2E4]"
                            : items[0]?.status === "cancelled"
                            ? "bg-[#FEEDEC] text-[#F04438]"
                            : "bg-[#E7F4EE] text-[#0D894F]"
                        }`}
                      >
                        <p className="flex items-center justify-center">
                          {items[0]?.status}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handelClickData(items[0])}
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

                  {items.length >= 2 ? (
                    <button
                      onClick={() => toggleDropdown(orderID)}
                      className="text-sm text-blue-500"
                    >
                      {expandedOrderID === orderID
                        ? "Hide Details"
                        : "Show More"}
                    </button>
                  ) : null}

                  {expandedOrderID === orderID && (
                    <>
                      {items.slice(1).map((item: any, index: number) => (
                        <div
                          key={index}
                          className="grid grid-cols-11 h-auto pb-3 pt-3"
                        >
                          {/* Same layout as the first item */}
                          <div className="col-span-1">
                            <p className="text-xs xl:text-sm font-bold">
                              {item.orderID}
                            </p>
                          </div>
                          <div
                            className="col-span-2 flex gap-2 cursor-pointer"
                            onClick={() => handelClickData(item)}
                          >
                            <div>
                              <img
                                src={`${imageUrl}/users/${item?.image}`}
                                alt="product image"
                                className="w-10 h-12 rounded-xl object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-black font-bold text-xs xl:text-sm">
                                {item?.artWorkName}
                              </p>
                              <p className="text-xs">
                                {`${item?.length} x ${item?.width} x ${item?.height} cm`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <hr />
                </div>
              );
            })}
          </div>

          <div className="bg-white p-2">
            {/* {orderDetail && orderDetail?.length > 0 ? (
              orderDetail?.map((value: any, index: any) => (
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
                          src={`${imageUrl}/users/${value?.image}`}
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
            )} */}
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
