import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { formateCurrency } from "../../utils/FormatCurrency";
import { imageUrl, lowImageUrl } from "../../utils/baseUrls";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";

const AllOrders = ({ orderDetail }) => {
  const [expandedOrderID, setExpandedOrderID] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;

  const nPages = orderDetail
    ? Math.ceil(orderDetail.length / recordPerPage)
    : 0;
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const columns = [
    { key: "orderId", label: "Order ID", colSpan: 2 },
    { key: "product", label: "Artwork", colSpan: 2 },
    { key: "customer", label: "Customer", colSpan: 2 },
    { key: "date", label: "Date", colSpan: 1 },
    { key: "total", label: "Total", colSpan: 1 },
    { key: "type", label: "Type", colSpan: 1 },
    { key: "status", label: "Status", colSpan: 1 },
    { key: "action", label: "Action", colSpan: 1 },
  ];

  const handleClick = (orderID: string) => {
    navigate(`/artist-panel/order/approve-order?id=${orderID}`);
  };

  const toggleDropdown = (orderID: string) => {
    setExpandedOrderID(expandedOrderID === orderID ? null : orderID);
  };

  return (
    <div className="rounded-md border my-3 w-full overflow-x-auto">
      <div className="bg-white min-w-[1000px]">
        <div className="grid grid-cols-11 bg-gray-200 items-center h-10 p-2 border-b">
          {columns.map((column) => (
            <p
              key={column.key}
              className={`col-span-${column.colSpan} px-1 font-semibold text-sm xl:text-base`}
            >
              {t(column.label)}
            </p>
          ))}
        </div>

        {orderDetail.length > 0 ? (
          orderDetail.map((order) => (
            <div key={order._id} className="bg-white p-2">
              <div className="grid grid-cols-11 items-center pb-3 pt-3">
                <div className="col-span-2 px-1">
                  <p className="text-xs xl:text-sm font-bold">
                    #{order.orderId}
                  </p>
                </div>
                <div
                  className="col-span-2 px-1 flex gap-2 cursor-pointer"
                  onClick={() => handleClick(order._id)}
                >
                  <img
                    src={`${lowImageUrl}/${order.items[0]?.artworkDetails.media}`}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="text-black font-bold text-xs xl:text-sm">
                      {order.items[0]?.artworkDetails.artworkName}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 px-1">
                  <p className="text-black font-semibold text-xs xl:text-sm">
                    {order.user?.artistName}
                  </p>
                  <p className="text-xs">{order.user?.email}</p>
                </div>
                <div className="col-span-1 px-1">
                  <p className="text-xs xl:text-sm font-bold">
                    {dayjs(order.createdAt).format("MMM D, YYYY")}
                  </p>
                </div>
                <div className="col-span-1 px-1">
                  <p className="text-xs xl:text-sm font-bold">
                    {formateCurrency(
                      order.items[0].other.subTotal -
                        order.items[0].other.totalDiscount,
                      "$"
                    )}
                  </p>
                </div>
                <div className="col-span-1 px-1">
                  <p className="text-xs capitalize text-[#35353599]">
                    {order.type}
                  </p>
                </div>
                <div className="col-span-1 px-1">
                  <div
                    className={`w-fit rounded-lg py-1 px-2 text-xs xl:text-sm capitalize ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "successfull"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <p>{order.status}</p>
                  </div>
                </div>
                <div className="col-span-1 px-2 flex gap-2">
                  <LuEye
                    onClick={() => handleClick(order._id)}
                    className="p-1 hover:bg-gray-100 rounded-full text-2xl"
                  />
                </div>
              </div>
              {order.items.length > 1 && (
                <button
                  onClick={() => toggleDropdown(order._id)}
                  className="text-sm text-blue-500"
                >
                  {expandedOrderID === order._id ? "Hide" : "Show More Orders"}
                </button>
              )}
              {expandedOrderID === order._id &&
                order.items.slice(1).map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-11 h-auto pb-3 pt-3"
                  >
                    <div className="col-span-2 px-1"></div>
                    <div
                      className="col-span-2 px-1 flex gap-2 cursor-pointer"
                      onClick={() => handleClick(order._id)}
                    >
                      <img
                        src={`${imageUrl}/users/${item.artworkDetails.media}`}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="text-black font-bold text-xs xl:text-sm">
                          {item.artworkDetails.artworkName}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 px-1">
                      <p className="text-black font-semibold text-xs xl:text-sm">
                        {order.user?.artistName}
                      </p>
                      <p className="text-xs">{order.user?.email}</p>
                    </div>
                    <div className="col-span-1 px-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {dayjs(order.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <div className="col-span-1 px-1">
                      <p className="text-xs xl:text-sm font-bold">
                        {formateCurrency(
                          item.other.subTotal - item.other.totalDiscount,
                          "$"
                        )}
                      </p>
                    </div>
                    <div className="col-span-1 px-1">
                      <p className="text-xs capitalize text-[#35353599]">
                        {order.type}
                      </p>
                    </div>
                  </div>
                ))}
              <hr />
            </div>
          ))
        ) : (
          <div className="bg-white p-2 h-[30vh] flex items-center justify-center font-semibold">
            {t("You don't have any Order yet.")}
          </div>
        )}

        <PaginationTabs
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          nPages={nPages}
          numbers={numbers}
        />
      </div>
    </div>
  );
};

export default AllOrders;
