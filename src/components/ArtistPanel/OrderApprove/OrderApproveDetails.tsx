import React, { useState } from "react";

import edit from "../assets/icon.png";

import add from "../assets/add.png";

import select_file from "../assets/select_file.png";

import Loader from "../../ui/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formateCurrency } from "../../utils/FormatCurrency";
import { useForm } from "react-hook-form";
import usePostEvidenceMutation from "./https/usePostEvidenceMutation";

import usePostCancelItem from "./https/usePostCancelItem";

import { useGetOrderDetails } from "./https/useGetOrderDetails";
import { MdCancel } from "react-icons/md";

const OrderApproveDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [id, setId] = useState("");
  const [orderType, setOrderType] = useState("");
  const [artworkId, setArtworkId] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const apiId = searchParams.get("id");
  const apiOrderType = searchParams.get("orderType");

  const { data,  isRefetching } = useGetOrderDetails(apiId, apiOrderType);


  const discountAmounts = data?.data?.items?.map((item) => {
    const basePrice = parseFloat(
      item?.artWork?.pricing?.basePrice?.replace("$", "")
    );

    const discountPercentage = item?.artWork?.pricing?.dpersentage || 0;
    const discountAmount = (basePrice * discountPercentage) / 100;

    const quantity = item?.quantity || 1;
    const totalDiscountAmount = discountAmount * quantity;

    return totalDiscountAmount;
  });

  const subTotalAmount = data?.data?.items?.map((item) => {
    const basePrice = parseFloat(
      item?.artWork?.pricing?.basePrice?.replace("$", "")
    );

    const quantity = item?.quantity || 1;
    const totalAmount = basePrice * quantity;

    return totalAmount;
  });

  const totalAmount = subTotalAmount - discountAmounts;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { mutateAsync, isPending } = usePostEvidenceMutation();
  const { mutateAsync: cancelItemMutation, isPending: cancelItemPending } =
    usePostCancelItem();

  

  const delivery = {
    shipping: "DHL",
    speedy: "standard",
    tracking_no: "SPX037739199373",
  };

  const openModal = (product: React.SetStateAction<null>) => {
    console.log(product);

    setArtworkId(product?.artWork?._id);

    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setOrderModal(false);
    setSelectedProduct(null);
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileSelect = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    if (file) {
      setValue("evidenceImg", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCancelItem = (data) => {
    data.artworkId = id;

    try {
      cancelItemMutation(data).then(() => {
        setOrderModal(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (value, reset) => {
    console.log(value);
    const data = {
      id,
      artworkId,
      orderType,
      value,
    };

    mutateAsync(data).then(() => {
      setIsModalOpen(false);
      reset();
      setValue("evidenceImg", null);
      setSelectedImage(null);
    });
  };

  const reviewArtWork = (id) => {
    // Call your review artwork API here
    navigate(
      `/artist-panel/artwork/preview?id=${id}&preview=true&type=orderReview=true`
    );
  };

  if (isRefetching) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between w-full gap-5">
        <div className="left flex flex-col w-full lg:w-4/5">
          <div className="bg-white p-4 md:p-6 shadow-md border rounded-lg mt-4">
            <h2 className="text-base md:text-lg font-bold mb-4">Details</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Artwork Details
                    </th>
                    <th
                      scope="col"
                      className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Evidence
                    </th>
                    <th
                      scope="col"
                      className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.data?.items &&
                    data?.data?.items?.length > 0 &&
                    data?.data?.items?.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td
                          onClick={() => reviewArtWork(product?.artWork?._id)}
                          className="px-3 md:px-6 py-2 md:py-4 cursor-pointer"
                        >
                          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                            <div className="bg-gray-300 rounded-lg flex items-center justify-center">
                              <img
                                src={`${data?.url}/users/${product?.artWork?.media}`}
                                alt="product"
                                className="rounded-md w-16 md:w-20 h-16 md:h-20 object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm md:text-base text-gray-800">
                                {product?.artWork?.artworkName}
                              </h3>
                              <p className="text-xs md:text-sm text-gray-500">
                                Product Code:{" "}
                                {product?.artWork?.inventoryShipping?.pCode}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4">
                          <p className="text-sm md:text-base text-gray-600 font-semibold">
                            {formateCurrency(
                              product?.artWork?.pricing?.basePrice,
                              "$"
                            )}
                          </p>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4">
                          <p className="text-sm md:text-base font-semibold">
                            {(product?.artWork?.pricing?.dpersentage || "0") +
                              "%"}
                          </p>
                        </td>

                        <td className="px-3 md:px-6 py-2 md:py-4">
                          {product?.evidenceImg ? (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {product?.evidenceImg?.map((img, i) => {
                                return (
                                  <img
                                    key={i}
                                    src={`${data?.url}/users/${img}`}
                                    alt={`Evidence ${i + 1}`}
                                    className="w-12 h-12 rounded-md object-cover"
                                  />
                                );
                              })}
                            </div>
                          ) : (
                            <span
                              className="cursor-pointer w-full sm:w-[8rem] bg-black text-white font-medium text-xs sm:text-sm p-1.5 sm:p-2 rounded-md inline-block text-center mb-2"
                              onClick={() => {
                                setOrderType(data?.data?.orderType);
                                setId(data?.data?._id);
                                openModal(product);
                              }}
                            >
                              + Evidence
                            </span>
                          )}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4">
                          <div className="flex justify-end space-x-4 pr-2 md:pr-5">
                            {!product?.isCancelled ? (
                              <span
                                className="cursor-pointer w-full sm:w-[5rem]  font-medium text-xs sm:text-sm p-1.5 sm:p-2 rounded-md inline-block text-center"
                                onClick={() => {
                                  setId(product?.artWork?._id);
                                  setSelectedProduct(product);
                                  setOrderModal(true);
                                }}
                              >
                               <MdCancel size="1.5em" />
                              </span>
                            ) : (
                              <span className="cursor-pointer w-full sm:w-[5.5rem] bg-red-300 text-black pointer-events-none font-medium text-xs sm:text-sm p-1.5 sm:p-2 rounded-md inline-block text-center">
                                Cancelled
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="mt-6 p-4 rounded-lg w-full lg:w-2/5 lg:ml-auto">
              <div className="flex justify-between text-sm md:text-base text-gray-400 mb-1 font-bold">
                <span>Subtotal :</span>
                <span className="font-semibold text-black">
                  {formateCurrency(subTotalAmount, "$")}
                </span>
              </div>
              <div className="flex justify-between text-sm md:text-base text-gray-400 mb-1 font-semibold">
                <span>Shipping :</span>
                <span className="text-red-400">
                  {formateCurrency(data?.data?.shipping, "$")}
                </span>
              </div>
              <div className="flex justify-between text-sm md:text-base text-gray-400 mb-1 font-semibold">
                <span>Discount :</span>
                <span className="text-red-400">
                  {formateCurrency(discountAmounts, "$")}
                </span>
              </div>
              <div className="flex justify-between text-sm md:text-base text-gray-400 mb-1">
                <span>Taxes:</span>
                <span className="text-black font-semibold">
                  {formateCurrency(data?.data?.tax, "$")}
                </span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-sm md:text-md mt-4">
                <span>Total</span>
                {formateCurrency(totalAmount, "$")}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff] right border border-gray-100 shadow-lg mt-4 h-auto rounded-lg w-full lg:w-2/5 p-4 md:p-6">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-base md:text-lg">Customer Info</h1>
          </div>

          <div className="flex flex-col sm:flex-row mt-6 md:mt-8 gap-4 sm:gap-10 border-b-2 border-dashed">
            <div className="w-16 md:w-20">
              <img
                className="rounded-full w-16 md:w-20"
                src={`${data?.url}/users/${data?.data?.user?.profile?.mainImage}`}
                alt=""
              />
            </div>
            <div>
              <p className="font-bold text-sm md:text-base text-gray-600">
                {`${data?.data?.user?.artistName} 
                ${data?.data?.user?.artistSurname1} ${data?.data?.user?.artistSurname2}`}
              </p>
              <p className="text-gray-400 text-xs md:text-sm">
                {data?.data?.user?.email}
              </p>

              <div className="flex items-center mt-3 md:mt-4 gap-2 mb-6 md:mb-8">
                <img src={add} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                <button className="text-[#FF5630] font-bold text-xs md:text-sm">
                  Add to blacklist
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 md:mt-6">
            <h1 className="font-bold text-base md:text-lg">Delivery</h1>
            <img
              className="cursor-pointer w-4 h-4 md:w-5 md:h-5"
              src={edit}
              alt="edit"
            />
          </div>

          <div className="w-full mt-4 md:mt-6">
            <div className="flex justify-between text-sm md:text-base text-gray-400 mb-1">
              <span>Ship by</span>
              <span className="text-black w-1/2">{delivery.shipping}</span>
            </div>

            <div className="flex justify-between text-sm md:text-base text-gray-400 mb-1">
              <span>Speedy</span>
              <span className="text-black w-1/2">{delivery.speedy}</span>
            </div>

            <div className="flex justify-between text-sm md:text-base text-gray-400 mb-1">
              <span>Tracking No.</span>
              <span className="text-black w-1/2">{delivery.tracking_no}</span>
            </div>
          </div>

          <button className="w-full md:w-auto px-4 py-2 border border-zinc-800 rounded-md bg-black text-white text-sm md:text-base mt-4 md:mt-5">
            Track Order
          </button>
        </div>
      </div>
      <div className=" bg-[#fff] border shadow-lg mt-6 rounded-lg p-6 w-full">
        <h1 className="font-bold text-lg mb-4">Evidence Collection</h1>

        {/* this is old evidence */}
        {/* <div className="flex flex-col sm:flex-row items-left space-x-2 ">
          {evidence.map((src, index) => (
            <div key={index} className="">
              <img
                className="w-40 h-40 sm:w-24 sm:h-20 rounded-lg shadow-md  object-cover mb-4 sm:mb-0 "
                src={src}
              />
            </div>
          ))}
        </div> */}

        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className=" text-sm font-bold  text-[#FF536B] "
        >
          {" "}
          + Add More
        </button>
      </div>

      {/*modal section */}

      {orderModal && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 ">
              <h2 className="text-lg font-bold mb-4 pb-4 border-b-2">
                Reason For Cancel
              </h2>

              <form onSubmit={handleSubmit(handleCancelItem)}>
                <h2 className="text- font-semibold mb-2">Product Title</h2>

                <input
                  type="text"
                  placeholder="Ex: Adventure Seekers Expedition..."
                  defaultValue={selectedProduct?.artWork?.artworkName}
                  readOnly
                  className="h-12 w-full border rounded-lg p-2 mb-3 outline-none"
                  {...register("title")}
                />

                <h2 className="text- font-semibold mb-2">Topic</h2>

                <select
                  className="h-12 w-full border rounded-lg p-2 mb-3 outline-none"
                  {...register("reason", { required: true })}
                >
                  <option value="">Select a reason for cancellation</option>
                  <option value="damaged">Product Damaged</option>
                  <option value="wrong item">Wrong Item Received</option>
                  <option value="quality issues">Quality Issues</option>
                  <option value="shipping delay">Shipping Delay</option>
                  <option value="customer request">Customer Request</option>
                  <option value="out of stock">Out of Stock</option>
                  <option value="other">Other</option>
                </select>
                {errors.reason && (
                  <p className="text-red-500 text-sm mb-3">
                    Please select a reason
                  </p>
                )}

                <h2 className="text- font-semibold mb-2">
                  Describe the reason
                </h2>
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Please describe the reason for cancellation..."
                  className="h-20 w-full border rounded-lg p-2 resize-none"
                />

                <div className="flex justify-end gap-4 px-2 py-2 rounded">
                  <span
                    onClick={closeModal}
                    className="bg-white-500 text-black text-md px-2 py-2 rounded-lg border-2 font-bold"
                  >
                    Cancel
                  </span>
                  <button
                    type="submit"
                    disabled={cancelItemPending}
                    className="px-2 py-2 rounded-lg bg-black text-white text-md font-bold"
                  >
                    {cancelItemPending ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 ">
              <form onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
                <h2 className="text-lg font-bold mb-3 border-b-2 pb-4">
                  Upload Evidence
                </h2>
                {/* <h2 className="text-sm font-semibold mb-2"> Title</h2>
                <input
                  type="text"
                  placeholder="Ex: Adventure Seekers Expedition..."
                  defaultValue={selectedProduct?.artWork?.artworkName}
                  readOnly
                  className="h-12 w-full border rounded-lg p-2 mb-3 outline-none"
                  {...register("title")}
                /> */}
                {/* 
                <h2 className="text-sm font-semibold mb-2">
                  {" "}
                  Short Description
                </h2>
                <input
                  type="text"
                  placeholder="Ex: Adventure Seekers Expedition..."
                  className="h-12 w-full border rounded-lg p-2"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-red-500">This field is required</span>
                )} */}

                <h2 className="text-sm font-semibold mb-2 mt-4">
                  {" "}
                  upload your images{" "}
                </h2>

                <div className="flex flex-col items-center justify-center gap-x-4 bg-[#919EAB33] rounded-lg">
                  <div className="mt-20 flex flex-col items-center justify-center ">
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      {...register("evidenceImg")}
                      onChange={(e) => handleFileSelect(e)}
                    />
                    <img src={select_file} alt="Select file" />
                    <h1 className="font-bold text-base mb-4">
                      {" "}
                      Drop or select file
                    </h1>
                    <p
                      className="text-sm mb-10 text-gray-600 cursor-pointer"
                      onClick={handleClick}
                    >
                      Drop files here or click to{" "}
                      <span className="text-[#00A76F]">browse</span> through
                      your machine.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mt-6">
                  {selectedImage && (
                    <div>
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-16 h-14 rounded-md"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4 px-2 py-2 rounded">
                  <span
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white-500 text-black text-md px-2 py-2 rounded-lg border-2 font-bold"
                  >
                    Cancel
                  </span>
                  <button
                    type="submit"
                    className="px-2 py-2 rounded-lg bg-black text-white text-md font-bold"
                  >
                    {" "}
                    {isPending ? "Submiting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderApproveDetails;
