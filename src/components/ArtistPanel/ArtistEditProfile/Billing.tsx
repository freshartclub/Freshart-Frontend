import React from "react";
import { FaEllipsisV } from "react-icons/fa"; // Importing the icon for three dots
// import visa_logo from "./assets/visa icon.png";
// import circle from "./assets/circle icon.png";

const Billing = () => {
  const cards = [
    { type: "Mastercard", number: "**** **** **** 5678", icon: "" },
    {
      type: "Visa",
      number: "**** **** **** 1234",
      default: true,
      //   icon: visa_logo,
    },
    // { type: "Visa", number: "**** **** **** 7892", icon: visa_logo },
    // { type: "Visa", number: "**** **** **** 4433", icon: visa_logo },
  ];

  const addresses = [
    {
      name: "Deja Brady",
      type: "Home",
      address: "18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337",
      phone: "399-757-9909",
      default: true,
    },
    {
      name: "Lucian Obrien",
      type: "Office",
      address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
      phone: "904-966-2836",
      default: false,
    },
    {
      name: "Lucian Obrien",
      type: "Office",
      address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
      phone: "904-966-2836",
      default: false,
    },
  ];

  const invoices = [
    { id: "INV-1990", date: "14 Mar 2022", amount: "$35.54", pdf: "#" },
    { id: "INV-1991", date: "08 Apr 2022", amount: "$12.45", pdf: "#" },
    { id: "INV-1992", date: "19 Jan 2022", amount: "$43.83", pdf: "#" },
    { id: "INV-1993", date: "04 Jul 2022", amount: "$83.08", pdf: "#" },
    { id: "INV-1994", date: "02 Feb 2022", amount: "$16.19", pdf: "#" },
    { id: "INV-1995", date: "08 Apr 2022", amount: "$63.61", pdf: "#" },
    { id: "INV-1996", date: "14 Mar 2022", amount: "$26.96", pdf: "#" },
    { id: "INV-1997", date: "30 Mar 2022", amount: "$78.22", pdf: "#" },
  ];

  return (
    <div className="p-4 md:p-6 rounded-lg shadow-lg">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section for Payment Method and Address Book */}
        <div className="col-span-1 md:col-span-2 space-y-12">
          {/* Payment Method Section */}
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold text-[#000000]">
                Payment method
              </h2>
              <button className="text-[#FF536B] text-sm md:text-base font-semibold">
                + New card
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={card.icon}
                      alt="Card icon"
                      className="w-10 h-10"
                    />
                    <p className="mt-2 text-sm md:text-lg">{card.number}</p>
                  </div>
                  <div className="flex items-center">
                    {card.default && (
                      <span className="font-medium bg-[#00B8D929] text-[#006C9C] px-2 py-1 rounded-lg mr-2 text-xs md:text-sm">
                        Default
                      </span>
                    )}
                    <FaEllipsisV className="text-gray-500 cursor-pointer text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address Book Section */}
          <div className="rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold text-[#000000]">
                Address book
              </h2>
              <button className="text-[#FF536B] text-sm md:text-base font-semibold">
                + Address
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold text-sm md:text-lg text-[#000000]">
                      {address.name}{" "}
                      <span className="text-gray-500 text-xs md:text-sm">
                        ({address.type})
                      </span>
                    </p>
                    <p className="text-xs md:text-sm text-[#637381]">
                      {address.address}
                    </p>
                    <p className="text-xs md:text-sm text-[#637381]">
                      {address.phone}
                    </p>
                  </div>
                  <div className="flex items-start">
                    {address.default && (
                      <span className="font-medium bg-[#00B8D929] text-[#006C9C] px-2 py-1 rounded-lg mr-2 text-xs md:text-sm">
                        Default
                      </span>
                    )}
                    <FaEllipsisV className="text-gray-500 cursor-pointer text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invoice History Section on the Right */}
        <div className="col-span-1 rounded-lg shadow-lg p-5">
          <h2 className="text-lg md:text-xl font-bold text-[#000000] mb-4">
            Invoice History
          </h2>
          <div className="space-y-4">
            {invoices.map((invoice, index) => (
              <div key={index} className="flex justify-between items-center">
                {/* Left Section: Invoice ID and Date */}
                <div>
                  <p className="font-bold text-xs md:text-sm text-[#000000]">
                    {invoice.id}
                  </p>
                  <p className="text-xs md:text-sm text-[#919EAB]">
                    {invoice.date}
                  </p>
                </div>
                {/* Middle Section: Invoice Amount */}
                <p className="font-semibold text-sm md:text-base text-[#000000]">
                  {invoice.amount}
                </p>
                {/* Right Section: PDF Link */}
                <a
                  href={invoice.pdf}
                  className="text-xs md:text-sm text-[#000000] font-medium underline"
                >
                  PDF
                </a>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t-2 border-dotted border-[#919EAB33]">
            <button className="text-sm md:text-base text-[#000000] font-bold flex items-center gap-2 mt-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
              <span className="mr-1 font-bold">Show more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
