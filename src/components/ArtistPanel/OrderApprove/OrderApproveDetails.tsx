import React, { useState } from "react";
import view from "../assets/view.png";
import edit from "../assets/icon.png";
import Approve_1 from "../assets/orderApprove(1).png";
import add from "../assets/add.png";
import evidence3 from "../assets/evidence3.png";
import select_file from "../assets/select_file.png";
import select_img from "../assets/select_img.jpg";

const OrderApproveDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const details = [
    {
      name: "Urban Explorer Sneakers",
      sku: "SKU: 10-HOURG",
      price: "$87.99",
      discount: "$44.39",
    },
    {
      name: "Classic Leather Loafers",
      sku: "SKU: 10-HOURG",
      price: "$118.22",
      discount: "$44.39",
    },
    {
      name: "Mountain Trekking Boots",
      sku: "SKU: 10-HOURG",
      price: "$26.95",
      discount: "$44.34",
    },
  ];

  const summary = {
    subtotal: "$327.96",
    shipping: "-$10.00",
    discount: "-$10.00",
    taxes: "$10.00",
    total: "$349.77",
  };

  const evidence = [
    evidence3,
    evidence3,
    evidence3,
    evidence3,
    evidence3,
    evidence3,
    evidence3,
  ];

  const customer_info = {
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    ipaddress: "192.168.1.1",
  };

  const delivery = {
    shipping: "DHL",
    speedy: "standard",
    tracking_no: "SPX037739199373",
  };

  const openModal = (product: React.SetStateAction<null>) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileSelect = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between w-full gap-5">
        <div className="left flex flex-col w-full xl:w-4/5">
          <div className="bg-white p-6 shadow-md border rounded-lg  mt-4">
            <h2 className="text-lg font-bold mb-4">Details</h2>
            <div className="space-y-4">
              {details.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between md:items-center p-4 border-b-2  border-dashed  space-y-4"
                               >
                  <div className="flex  flex-col  sm:flex-row items-center space-x-4">
                    <div className=" bg-gray-300 rounded-lg flex  items-center justify-center">
                      <img
                        src={Approve_1}
                        alt="product"
                        className="rounded-md  w-40 h-40 sm:w-12 sm:h-12"
                      />
                    </div>
                    <div className="flex flex-col  items-center md:items-start">
                      <h3 className="font-semibold text-gray-800 text-md md:text-base ">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.sku}</p>
                    </div>
                  </div>
                  <div className="items-center justify-center  flex flex-row  gap-2 lg:gap-20 ">
                    <p className="text-gray-400 font-semibold">
                      {product.price}
                    </p>
                    <p className=" font-semibold">{product.discount}</p>
                  </div>
                  <div className="flex justify-center sm:flex-row items-center gap-4 ">
                    <img className="cursor-pointer" src={view}></img>

                    <img className="cursor-pointer" onClick={() => openModal(product)}
   src={edit}></img>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4  rounded-lg  lg:ml-[70%]">
              <div className="flex justify-between  text-gray-400 mb-1 font-bold">
                <span>Subtotal</span>
                <span className="font-semibold text-black">
                  {summary.subtotal}
                </span>
              </div>
              <div className="flex justify-between text-gray-400 mb-1 font-semibold">
                <span>Shipping</span>
                <span className="text-red-400">{summary.shipping}</span>
              </div>
              <div className="flex justify-between text-gray-400 mb-1 font-semibold">
                <span>Discount</span>
                <span className="text-red-400">{summary.discount}</span>
              </div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>Taxes</span>
                <span className="text-black font-semibold">
                  {summary.taxes}
                </span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-md mt-4">
                <span>Total</span>
                <span>{summary.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right border border-gray-100 shadow-lg mt-4 h-auto rounded-lg w-full lg:w-2/5 p-6 ">
          <div className="flex  justify-between items-center ">
            <h1 className="font-bold ">Customer Info</h1>

            <img className="cursor-pointer" src={edit}></img>
          </div>

          <div className=" flex  flex-col sm:flex-row mt-8 gap-4 sm:gap-10 border-b-2 border-dashed ">
            <div className="w-20 md:w-14">
              <img className="rounded-full  w-20" src={Approve_1} alt="" />
            </div>
            <div>
              <p className="font-bold text-gray-600">{customer_info.name} </p>
              <p className="text-gray-400 text-sm">{customer_info.email}</p>
              <p className="text-gray-400">
                {" "}
                <span className="font-bold text-gray-400">
                  IP Address:
                </span>{" "}
                {customer_info.ipaddress}{" "}
              </p>

              <div className="flex items-center mt-4 gap-2 mb-8">
                <img src={add} alt="" />
                <button className="text-[#FF5630] font-bold text-sm">
                  {" "}
                  Add to blacklist
                </button>
              </div>
            </div>
          </div>

          <div className="flex  justify-between items-center mt-6">
            <h1 className="font-bold "> Delivery</h1>

            <img className="cursor-pointer" src={edit}></img>
          </div>

          <div className="w-full mt-6">
            <div className="flex justify-between  text-gray-400 mb-1 ">
              <span>Ship by</span>
              <span className=" text-black w-1/2">{delivery.shipping}</span>
            </div>

            <div className="flex justify-between text-gray-400 mb-1 ">
              <span>Speedy</span>
              <span className=" text-black w-1/2">{delivery.speedy}</span>
            </div>

            <div className="flex justify-between text-gray-400 mb-1 ">
              <span>Tracking No.</span>
              <span className=" text-black w-1/2">{delivery.tracking_no} </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border shadow-lg mt-6 rounded-lg p-6 w-full ">
        <h1 className="font-bold text-lg mb-4">Evidence Collection</h1>

        <div className="flex flex-col sm:flex-row items-center space-x-2 ">
          {evidence.map((src, index) => (
            <div key={index} className="">
              <img
                className="w-40 h-40 sm:w-24 sm:h-20 rounded-lg shadow-md  object-cover mb-4 sm:mb-0 "
                src={src}
              ></img>
            </div>
          ))}
        </div>
        <button className=" text-sm font-bold  text-[#FF536B] ">
          {" "}
          + Add More
        </button>
      </div>

      {/*modal section */}

      {isModalOpen && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 ">
              <h2 className="text-lg font-bold"> Details</h2>
              <p className="text-sm text-gray-400 font-semibold pb-4 border-b-2 mb-4 ">
                Title, short description, image...
              </p>

              <h2 className="text-sm font-semibold mb-2"> Short Description</h2>
              <input
                type="text"
                placeholder="Ex: Adventure Seekers Expedition..."
                className="h-12 w-full border rounded-lg p-2"
              ></input>

              <h2 className="text-sm font-semibold mb-2 mt-4">
                {" "}
                upload your Shipment images{" "}
              </h2>

              <div className="flex flex-col items-center justify-center gap-x-4 bg-[#919EAB33] rounded-lg">
                <div className="mt-20 flex flex-col items-center justify-center ">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  ></input>
                  <img src={select_file}></img>
                  <h1 className="font-bold text-base mb-4">
                    {" "}
                    Drop or select file
                  </h1>
                  <p
                    className="text-sm mb-10 text-gray-600 cursor-pointer"
                    onClick={handleClick}
                  >
                    Drop files here or click to{" "}
                    <span className="text-[#00A76F]">browse</span> through your
                    machine.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mt-6">
                {selectedImage && (
                  <div className="-">
                    <img
                      src={selectedImage}
                      className="w-16 h-14 rounded-md"
                    ></img>
                  </div>
                )}
              </div>

              <div className=" flex  justify-end gap-4 px-2 py-2 rounded">
                <button
                  onClick={closeModal}
                  className=" bg-white-500 text-black text-md px-2 py-2 rounded-lg border-2 font-bold"
                >
                  Remove all
                </button>
                <button className="px-2 py-2 rounded-lg bg-black text-white text-md font-bold">
                  {" "}
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderApproveDetails;