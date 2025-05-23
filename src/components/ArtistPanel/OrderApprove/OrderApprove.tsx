import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Loader from "../../ui/Loader";
import OrderApproveDetails from "./OrderApproveDetails";
import { useGetOrderDetails } from "./https/useGetOrderDetails";
import usePostAcceptMutation from "./https/usePostAcceptMutation";
import { useAppSelector } from "../../../store/typedReduxHooks";
import { useState } from "react";


const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  const dark = useAppSelector((state) => state.theme.mode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mt-24 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className={`${dark ? "bg-gray-800" : "bg-white"} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className={`text-lg leading-6 font-medium ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {title}
                </h3>
                <div className="mt-4">{children}</div>
              </div>
            </div>
          </div>
          <div
            className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${
              dark ? "bg-gray-800" : "bg-gray-50"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};


const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  dark,
}: {
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  dark: boolean;
}) => {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-1 ${
          dark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EE1D52] ${
          dark
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "border-gray-300 text-gray-900 placeholder-gray-500"
        }`}
      />
    </div>
  );
};

const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  dark,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  dark: boolean;
  rows?: number;
}) => {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-1 ${
          dark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EE1D52] ${
          dark
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "border-gray-300 text-gray-900 placeholder-gray-500"
        }`}
      />
    </div>
  );
};

const OrderApprove = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userId = useAppSelector((state) => state.user.user._id);

  console.log(userId)
  const { data, isLoading } = useGetOrderDetails(id);
  const dark = useAppSelector((state) => state.theme.mode);
  const { mutate, isPending } = usePostAcceptMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [morningFrom, setMorningFrom] = useState("");
  const [morningTo, setMorningTo] = useState("");
  const [eveningFrom, setEveningFrom] = useState("");
  const [eveningTo, setEveningTo] = useState("");
  const [observe, setObserve] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEveningFrom("")
    setEveningTo("")
  };

  const handleAccept = () => {
    const values = {
      id,
      status: "accepted",
      userId,
      morningFrom,
      morningTo,
      eveningFrom,
      eveningTo,
      observe,
    };

    mutate(values);
    handleCloseModal();
  };

  const handleNavigate = () => {
    navigate("/artist-panel/order");
  };

  if (isLoading) return <Loader />;

  return (
    <div className={`px-4 py-6 max-w-7xl mx-auto ${dark ? "bg-gray-900" : ""}`}>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={t("Set Time Slots")}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
              <h3 className={`font-medium mb-3 ${dark ? "text-white" : "text-gray-800"}`}>
                {t("Morning Time Slot")}
              </h3>
              <div className="space-y-3">
                <Input
                  type="time"
                  label={t("From")}
                  value={morningFrom}
                  onChange={(e) => setMorningFrom(e.target.value)}
                  dark={dark}
                  required
                />
                <Input
                  type="time"
                  label={t("To")}
                  value={morningTo}
                  onChange={(e) => setMorningTo(e.target.value)}
                  dark={dark}
                  required
                />
              </div>
            </div>

            <div className={`p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
              <h3 className={`font-medium mb-3 ${dark ? "text-white" : "text-gray-800"}`}>
                {t("Evening Time Slot")}
              </h3>
              <div className="space-y-3">
                <Input
                  type="time"
                  label={t("From")}
                  value={eveningFrom}
                  onChange={(e) => setEveningFrom(e.target.value)}
                  dark={dark}
                  required
                />
                <Input
                  type="time"
                  label={t("To")}
                  value={eveningTo}
                  onChange={(e) => setEveningTo(e.target.value)}
                  dark={dark}
                  required
                />
              </div>
            </div>
          </div>

          <TextArea
            label={t("Additional Instructions")}
            value={observe}
            onChange={(e) => setObserve(e.target.value)}
            placeholder={t("Any special instructions or notes...")}
            dark={dark}
            rows={4}
          />

          <div className="flex justify-end gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCloseModal}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              } ${dark ? "text-white" : "text-gray-800"} transition-colors`}
            >
              {t("Cancel")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAccept}
              disabled={isPending || !morningFrom || !morningTo || !eveningFrom || !eveningTo}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                isPending || !morningFrom || !morningTo || !eveningFrom || !eveningTo
                  ? "bg-green-400 dark:bg-green-600 cursor-not-allowed"
                  : "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800"
              } text-white transition-colors`}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("Accepting...")}
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("Confirm Acceptance")}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </Modal>

      <div
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        <div className={`flex items-center gap-4 ${dark ? "text-white" : ""}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigate}
            className={`p-2 rounded-full bg-gray-100 ${
              dark ? "dark:bg-gray-700" : "bg-gray-700"
            } text-gray-600 ${
              dark ? "dark:text-gray-300" : "text-gray-600"
            } hover:bg-gray-200 ${
              dark ? "dark:hover:bg-gray-600" : "hover:bg-gray-200"
            } transition-colors`}
            aria-label={t("Go back")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>

          <div>
            <h1 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-800"}`}>
              {t("Order")} <span className={`text-[#EE1D52]`}>#{data?.orderId}</span>
            </h1>
            <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"} mt-1`}>
              {dayjs(data?.createdAt).format("MMMM D, YYYY [at] h:mm A")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg bg-gray-100 ${
              dark ? "dark:bg-gray-700" : "bg-gray-700"
            } text-gray-700 ${
              dark ? "dark:text-gray-300" : "text-gray-700"
            } hover:bg-gray-200 ${
              dark ? "dark:hover:bg-gray-600" : "hover:bg-gray-200"
            } transition-colors flex items-center gap-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline text-sm font-medium">{t("Print")}</span>
          </motion.button>

          {data?.status !== "accepted" && (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenModal}
                disabled={isPending}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 ${
                  isPending
                    ? "bg-green-400 dark:bg-green-600 cursor-not-allowed"
                    : "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800"
                } text-white transition-colors`}
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("Accepting...")}
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("Accept")}
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("Reject")}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <OrderApproveDetails data={data} />
    </div>
  );
};

export default OrderApprove;