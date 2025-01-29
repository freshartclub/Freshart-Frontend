import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formateCurrency } from "../../utils/FormatCurrency";
import { imageUrl } from "../../utils/baseUrls";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";

const Allorders = ({ orderDetail }: any) => {
  const [expandedOrderID, setExpandedOrderID] = useState<string | null>(null);
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;

  const nPages = orderDetail
    ? Math.ceil(orderDetail.length / recordPerPage)
    : 0;

  const numbers = [...Array(nPages + 1).keys()]?.slice(1);

  const columns = [
    { key: "orderId", label: "Order ID", colSpan: 2 },
    { key: "product", label: "Artwork", colSpan: 2 },
    { key: "customer", label: "Customer", colSpan: 2 },
    { key: "date", label: "Date", colSpan: 1 },
    { key: "total", label: "Total", colSpan: 1 },
    { key: "payment", label: "Payment", colSpan: 1 },
    { key: "status", label: "Status", colSpan: 1 },
    { key: "action", label: "Action", colSpan: 1 },
  ];

  const navigate = useNavigate();

  const handelClickData = (_id: string) => {
    navigate(`/artist-panel/order/approve-order?id=${_id}`);
  };

  const toggleDropdown = (orderID: string) => {
    setExpandedOrderID(expandedOrderID === orderID ? null : orderID);
  };

  const groupedData = orderDetail?.reduce((acc: any, curr: any) => {
    acc[curr.orderID] = acc[curr.orderID] || [];
    acc[curr.orderID].push(curr);
    return acc;
  }, {});

  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <div className="rounded-md border border-1 my-3 w-full scrollbar overflow-x-auto">
      <div className="bg-white min-w-[1000px]">
        <div className="grid grid-cols-11 bg-gray-200 items-center my-auto h-10 p-2 border-b">
          {columns?.map((column) => (
            <p
              key={column.key}
              className={`col-span-${column.colSpan} px-1 font-semibold text-sm xl:text-base text-black`}
            >
              {t(column.label)}
            </p>
          ))}
        </div>

        {orderDetail?.length > 0 ? (
          <>
            {Object.keys(groupedData).map((orderID) => {
              const items = groupedData[orderID];
              return (
                <div className="bg-white p-2" key={orderID}>
                  <div className="grid grid-cols-11 items-center h-auto pb-3 pt-3">
                    <div className="col-span-2 px-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {items[0]?.orderID}
                      </p>
                    </div>
                    <div
                      className="col-span-2 px-1 flex gap-2 cursor-pointer"
                      onClick={() => handelClickData(items[0]?._id)}
                    >
                      <img
                        src={`${imageUrl}/users/${items[0]?.image}`}
                        alt="product image"
                        className="w-10 h-10 rounded object-cover"
                      />

                      <div>
                        <p className="text-black font-bold text-xs xl:text-sm">
                          {items[0]?.artWorkName}
                        </p>
                        <p className="text-xs">
                          {`${items[0]?.length} x ${items[0]?.width} x ${items[0]?.height} cm`}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 px-1">
                      <p className="text-black font-semibold text-xs xl:text-sm">
                        {name(items[0])}
                      </p>
                      <p className="text-xs">{items[0]?.email}</p>
                    </div>

                    <div className="col-span-1 px-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {dayjs(items[0]?.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>

                    <div className="col-span-1 px-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {formateCurrency(items[0]?.subTotal, "$")}
                      </p>
                    </div>

                    <div className="col-span-1 px-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {items[0]?.type || "N/A"}
                      </p>
                    </div>
                    <div className="col-span-1 px-1">
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

                    <div className="col-span-1 px-1">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handelClickData(items[0]?._id)}
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
                          <div className="col-span-2">
                            <p className="text-xs xl:text-sm font-bold">
                              {item.orderID}
                            </p>
                          </div>
                          <div
                            className="col-span-2 flex gap-2 cursor-pointer"
                            onClick={() => handelClickData(item?._id)}
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
            <PaginationTabs
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              nPages={nPages}
              numbers={numbers}
            />
          </>
        ) : (
          <div className="bg-white p-2 h-[30vh] font-semibold flex items-center justify-center">
            {t("You don't have any Order yet.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Allorders;
