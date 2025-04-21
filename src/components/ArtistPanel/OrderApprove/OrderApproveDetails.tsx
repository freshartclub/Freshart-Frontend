import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { imageUrl, lowImageUrl } from "../../utils/baseUrls";
import { formateCurrency } from "../../utils/FormatCurrency";
import usePostCancelItem from "./https/usePostCancelItem";
import usePostEvidenceMutation from "./https/usePostEvidenceMutation";
import ProductPopup from "./ProductPopup";

const OrderApproveDetails = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProductPop, setSelectedProductPop] = useState(null);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const { t } = useTranslation();
  const [id, setId] = useState("");
  const [orderType, setOrderType] = useState("");
  const [artworkId, setArtworkId] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { mutateAsync, isPending } = usePostEvidenceMutation();
  const { mutateAsync: cancelItemMutation, isPending: cancelItemPending } = usePostCancelItem();

  const delivery = {
    shipping: "DHL",
    speedy: "standard",
    tracking_no: "SPX037739199373",
  };

  const openModal = (product) => {
    setArtworkId(product?.artwork?._id);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setOrderModal(false);
    setSelectedProduct(null);
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setValue("evidenceImg", fileArray);
      const previewURLs = fileArray.map((file) => URL.createObjectURL(file));
      setSelectedImage(previewURLs);
    }
  };

  const handleCancelItem = (data) => {
    data.artworkId = id;
    cancelItemMutation(data)
      .then(() => {
        setOrderModal(false);
      })
      .catch(console.error);
  };

  const onSubmit = (value) => {
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

  useEffect(() => {
    if (data?.items?.length > 0) {
      let calculatedSubTotal = 0;
      let calculatedDiscount = 0;
      let calculatedTotal = 0;

      data.items.forEach((item) => {
        if (item.other) {
          calculatedSubTotal += item.other.subTotal || 0;
          calculatedDiscount += item.other.totalDiscount || 0;
          calculatedTotal += item.other.subTotal - item.other.totalDiscount || 0;
        }
      });

      setSubTotal(calculatedSubTotal);
      setDiscount(calculatedDiscount);
      setTotal(calculatedTotal);
    }
  }, [data?.items]);

  const reviewArtWork = (id) => {
    navigate(`/artist-panel/artwork/preview?id=${id}&preview=true&type=order`);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{t("Order Details")}</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {[t("Artwork Name"), t("Type"), t("Price"), t("Total"), t("Discount"), t("Evidence"), t("Actions")].map((header, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data?.items?.map((product, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td onClick={() => reviewArtWork(product?.artwork?._id)} className="px-4 py-4 cursor-pointer">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img
                          src={`${lowImageUrl}/${product?.artwork?.media}`}
                          alt="product"
                          className="rounded-full border-2 w-11 h-11 object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{product?.artwork?.artworkName}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t("Product Code")}: {product?.artwork?.inventoryShipping?.pCode || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
                        {data?.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300 font-medium">{formateCurrency(product?.other?.subTotal, "$")}</td>
                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                      {formateCurrency(product?.other?.subTotal - product?.other?.totalDiscount, "$")}
                    </td>
                    <td className="px-4 py-4 text-red-500 font-medium">{(product?.artwork?.pricing?.dpersentage || "0") + "%"}</td>

                    <td className="px-4 py-4">
                      {product?.other?.isCancelled ? (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{t("Not Available")}</span>
                      ) : product?.other?.evidenceImg?.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            {product.other.evidenceImg.slice(0, 1).map((img, i) => (
                              <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative">
                                <img
                                  src={`${imageUrl}/users/${img}`}
                                  alt={`Evidence ${i + 1}`}
                                  className="w-12 h-12 rounded-md object-cover cursor-pointer"
                                  onClick={() => {
                                    setIsPopupOpen(true);
                                    setSelectedProductPop(product);
                                  }}
                                />
                              </motion.div>
                            ))}
                            <button
                              onClick={() => {
                                setOrderType(data?.type);
                                setId(data?._id);
                                openModal(product);
                              }}
                              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <BiSolidImageAdd className="text-gray-600 dark:text-gray-300" size={20} />
                            </button>
                          </div>
                          <button
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            onClick={() => {
                              setIsPopupOpen(true);
                              setSelectedProductPop(product);
                            }}
                          >
                            {t("View All")}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setOrderType(data?.type);
                            setId(data?._id);
                            openModal(product);
                          }}
                          className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <BiSolidImageAdd className="text-gray-600 dark:text-gray-300" size={20} />
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-4 text-right">
                      {!product?.other?.isCancelled ? (
                        <button
                          onClick={() => {
                            setId(product?.artwork?._id);
                            setSelectedProduct(product);
                            setOrderModal(true);
                          }}
                          className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                          title={t("Cancel Item")}
                        >
                          <MdDelete size={20} />
                        </button>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          {t("Cancelled")}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg max-w-md ml-auto">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t("Order Summary")}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t("Subtotal")}:</span>
                <span className="font-medium text-gray-800 dark:text-white">{formateCurrency(subTotal, "$")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t("Discount")}:</span>
                <span className="text-red-500 dark:text-red-400">-{formateCurrency(discount, "$")}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800 dark:text-white">{t("Total")}:</span>
                <span className="text-blue-600 dark:text-blue-400">{formateCurrency(total, "$")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 xl:w-96">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t("Customer Info")}</h2>
          </div>

          <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <img
              className="rounded-full w-14 h-14 object-cover border-2 border-gray-200 dark:border-gray-600"
              src={`${imageUrl}/users/${data?.user?.mainImage}`}
              alt="Customer"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {`${data?.user?.artistName} ${data?.user?.artistSurname1} ${data?.user?.artistSurname2}`}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{data?.user?.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t("Delivery Info")}</h2>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t("Ship by")}:</span>
                <span className="text-gray-800 dark:text-white">{delivery.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t("Speedy")}:</span>
                <span className="text-gray-800 dark:text-white">{delivery.speedy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t("Tracking No.")}:</span>
                <span className="text-gray-800 dark:text-white">{delivery.tracking_no}</span>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-2.5 bg-black dark:bg-gray-900 text-white dark:text-gray-100 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors font-medium">
              {t("Track Order")}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {orderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t("Reason For Cancel")}</h2>
              </div>

              <form onSubmit={handleSubmit(handleCancelItem)} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Artwork Name")}</label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.artwork?.artworkName}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Reason")} *</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                      {...register("reason", { required: true })}
                    >
                      <option value="">{t("Select a reason")}</option>
                      <option value="damaged">{t("Product Damaged")}</option>
                      <option value="wrong item">{t("Wrong Item Received")}</option>
                      <option value="quality issues">{t("Quality Issues")}</option>
                      <option value="shipping delay">{t("Shipping Delay")}</option>
                      <option value="customer request">{t("Customer Request")}</option>
                      <option value="out of stock">{t("Out of Stock")}</option>
                      <option value="other">{t("Other")}</option>
                    </select>
                    {errors.reason && <p className="mt-1 text-sm text-red-600">{t("Please select a reason")}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Description")} *</label>
                    <textarea
                      {...register("description", { required: true })}
                      placeholder={t("Describe the reason...")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                      rows={4}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{t("Please provide a description")}</p>}
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={cancelItemPending}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
                  >
                    {cancelItemPending ? t("Cancelling...") : t("Confirm Cancel")}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Evidence Upload Modal */}
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t("Upload Evidence")}</h2>
              </div>

              <form onSubmit={handleSubmit((data) => onSubmit(data))} className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("Upload Images")}</label>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      {...register("evidenceImg", {
                        onChange: (e) => handleFileSelect(e),
                      })}
                    />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClick}
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-blue-500 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t("Click to upload")} <span className="text-blue-500">{t("or drag and drop")}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t("PNG, JPG, GIF up to 10MB")}</p>
                    </motion.div>
                  </div>

                  {selectedImage?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("Selected Images")}</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedImage.map((image, index) => (
                          <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-20 h-20 rounded-md object-cover border border-gray-200 dark:border-gray-600"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...selectedImage];
                                newImages.splice(index, 1);
                                setSelectedImage(newImages);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedImage(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={isPending || !selectedImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isPending ? t("Uploading...") : t("Upload Evidence")}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductPopup product={selectedProductPop} imageUrl={imageUrl} setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} />
    </div>
  );
};

export default OrderApproveDetails;
