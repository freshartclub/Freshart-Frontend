import React from "react";

const InvoicePdf = () => {
  const data = [
    { desc: " Brand consulation", price: "100", qty: "1", total: "$100" },
    { desc: " Brand  consulation", price: "100", qty: "1", total: "$100" },
    { desc: " Brand consulation", price: "100", qty: "1", total: "$100" },
    { desc: " Brand consulation", price: "100", qty: "1", total: "$100" },
  ];
  return (
    <div className="w-2/4 mx-auto py-20 ">
      <div className="border shadow-md rounded-lg">
        <div className="px-10 py-20">
          <h1 className="font-semibold text-3xl text-center mb-20">Invoice</h1>
          <div className="flex justify-between">
            <div className="left flex flex-col space-y-4">
              <div className="flex flex-col text-sm ">
                <h1 className="uppercase font-bold text-sm">Issued To</h1>
                <p className="font-medium">Richard Sanchez</p>
                <p className="font-medium">Thynk Unlimited</p>
                <p className="font-medium">123 Anywhere St. Any City </p>
              </div>
              <div className=" text-sm">
                <h1 className="uppercase font-bold text-sm">Pay To</h1>
                <p className="font-medium">Borcele Bank</p>
                <p className="font-medium">Account Name: Adeline Palmerston</p>
                <p className="font-medium">Account No: 0123 4567 8901 </p>
              </div>
            </div>
            <div className="right flex flex-col text-sm ">
              <h1 className="uppercase font-bold text-sm">Invoice No: 01234</h1>
              <p className="font-medium">Date: 11.02.2025</p>
              <p className="font-medium">Date: 14.03.2025</p>
            </div>
          </div>
          <div className="items-center">
            <div className="flex mt-20 justify-between mb-4 font-bold ">
              <h1 className="uppercase"> Description</h1>
              <h1 className="uppercase"> Unit Price </h1>
              <h1 className="uppercase"> Qty</h1>
              <h1 className="uppercase"> Total</h1>
            </div>
            <hr />

            <div className=" flex flex-col  justify-center mb-4">
              {data.map((item) => (
                <div className="flex justify-between space-y-2 items-center ">
                  <p>{item.desc}</p>
                  <p>{item.price}</p>
                  <p>{item.qty}</p>
                  <p>{item.total}</p>
                </div>
              ))}
            </div>
            <hr />

            <div className="mt-2 flex justify-between">
              <div>
                <h1 className="font-bold uppercase">Subtotal</h1>
              </div>

              <div className="flex flex-col">
                <div className="text-right">
                  <p className="font-semibold">$ 400</p>
                </div>
                <div className="flex flex-col text-right">
                  <div className="flex space-x-14 ">
                    <p>Tax</p>
                    <p>10%</p>
                  </div>

                  <div className="flex space-x-10 ">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">$ 440</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePdf;
