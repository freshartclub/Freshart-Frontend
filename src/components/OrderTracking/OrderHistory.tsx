import React from "react";

const OrderHistory = () => {
  const historyItems = [
    { status: "Delivery successful", time: "2 hours ago", active: true },
    { status: "Transporting to [2]", time: "2 hours ago", active: false },
    { status: "Transporting to [1]", time: "12 Jan 2022", active: false },
    {
      status: "The shipping unit has picked up the goods",
      time: "11 Feb 2022",
      active: false,
    },
    { status: "Order has been created", time: "10 Sep 2022", active: false },
  ];

  const orderDetails = [
    { label: "Order time", value: "12 Aug 2022 10:00 PM" },
    { label: "Payment time", value: "11 Aug 2022 9:00 PM" },
    { label: "Delivery time for the carrier", value: "10 Aug 2022 8:00 PM" },
    { label: "Completion time", value: "09 Aug 2022 7:00 PM" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow mb-6 ">
      {/* Left Section - History */}
      <div className="w-full md:w-2/3">
        <h2 className="text-lg font-semibold mb-6">History</h2>
        <ul className="space-y-6">
          {historyItems.map((item, index) => (
            <li key={index} className="flex items-start  ">
              <div
                className={`w-3 h-3 mt-1.5 rounded-full ${
                  item.active ? "bg-green-500" : "bg-gray-400 "
                }`}
              ></div>
              <div className="ml-4">
                <p
                  className={`text-sm font-bold ${
                    item.active
                      ? "font-semibold text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {item.status}
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
        <button className="font-bold text-sm mt-4 hover:underline">
          Show more
        </button>
      </div>

      {/* Right Section - Details */}
      <div className="w-full md:w-2/3 border-l pl-6">
        {orderDetails.map((detail, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm text-gray-500">{detail.label}</p>
            <p className="text-sm ">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
