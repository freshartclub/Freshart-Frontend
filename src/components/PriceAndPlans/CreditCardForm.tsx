import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CryptoJS from "crypto-js";
import { useGetKey } from "./http/useGetKey";
import toast from "react-hot-toast";

const CreditCardForm = ({
  onClose,
  planId,
  onSubmit,
  isPending,
  billingCycle,
}) => {
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");

  const { refetch } = useGetKey();

  useEffect(() => {
    const num = cardNumber.replace(/\s+/g, "");

    if (/^4/.test(num)) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(num) || /^2[2-7][2-9][0-9]/.test(num)) {
      setCardType("mastercard");
    } else if (/^3[47]/.test(num)) {
      setCardType("amex");
    } else if (
      /^6(011|22[1-9][0-9]{3}|22[0-9][0-9]{2}|4[4-9][0-9]{2}|5)/.test(num)
    ) {
      setCardType("discover");
    } else {
      setCardType("");
    }
  }, [cardNumber]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, "");
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = await refetch();
    if (!cardType) {
      return toast.error(
        "Card Type not detceted. Only Visa, Mastercard, Amex and Discover card are supported"
      );
    }

    const newKey = CryptoJS.enc.Hex.parse(data1.data);

    const encryptData = (data) => {
      const iv = CryptoJS.lib.WordArray.random(16);

      const encrypted = CryptoJS.AES.encrypt(data, newKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const hmac = CryptoJS.HmacSHA256(encrypted.toString(), newKey);

      return [
        iv.toString(CryptoJS.enc.Base64),
        encrypted.toString(),
        hmac.toString(CryptoJS.enc.Base64),
      ].join(":");
    };

    const encryptCardData = (cardDetails) => {
      const dataString = JSON.stringify(cardDetails);
      return encryptData(dataString);
    };

    const data = {
      cardNumber: cardNumber.replace(/\s+/g, ""),
      cardHolder,
      expiry: expiry.replace(/\s+/g, ""),
      cvv,
      cardType,
      planId,
      type: billingCycle == "yearly" ? "yearly" : "monthly",
    };

    const secData = encryptCardData(data);
    onSubmit(secData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-y-auto scrollbar mx-4">
        <div className="p-4 pt-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {t("Enter Payment Details")}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              className={`mb-6 p-4 rounded-lg transition-all duration-300 ${
                cardType === "visa"
                  ? "bg-gradient-to-r from-blue-600 to-blue-800"
                  : cardType === "mastercard"
                  ? "bg-gradient-to-r from-red-600 to-yellow-500"
                  : cardType === "amex"
                  ? "bg-gradient-to-r from-blue-400 to-blue-600"
                  : cardType === "discover"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-800"
                  : "bg-gray-800"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  {cardType && (
                    <div className="w-max px-2 h-8 mb-4 bg-white rounded flex items-center justify-center">
                      {cardType === "visa" && (
                        <span className="text-blue-800 font-bold text-sm">
                          VISA
                        </span>
                      )}
                      {cardType === "mastercard" && (
                        <div className="flex">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        </div>
                      )}
                      {cardType === "amex" && (
                        <span className="text-blue-600 font-bold text-xs">
                          AMEX
                        </span>
                      )}
                      {cardType === "discover" && (
                        <span className="text-purple-800 w-max font-bold text-xs">
                          DISCOVER
                        </span>
                      )}
                    </div>
                  )}
                  <div className="text-white text-lg font-medium tracking-wider mb-2">
                    {cardNumber || "•••• •••• •••• ••••"}
                  </div>
                </div>
                <div className="text-white text-right">
                  <div className="text-xs opacity-70">Card Holder</div>
                  <div className="text-sm font-medium">
                    {cardHolder || "YOUR NAME"}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <div className="text-xs opacity-70">Expires</div>
                  <div className="text-sm font-medium">{expiry || "••/••"}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">CVV</div>
                  <div className="text-sm font-medium">
                    {cvv ? "•••" : "•••"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("Card Number")}
              </label>
              <input
                type="text"
                value={formatCardNumber(cardNumber)}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={19}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("Card Holder Name")}
              </label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                placeholder="JOHN DOE"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("Expiry Date")}
                </label>
                <input
                  type="text"
                  value={formatExpiry(expiry)}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("CVV")}
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="•••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center min-w-[180px]"
                disabled={isPending}
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
                    {t("Processing...")}
                  </>
                ) : (
                  t("Confirm Payment")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
