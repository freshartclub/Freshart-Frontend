import { useState } from "react";
import { useTranslation } from "react-i18next";
import { imageUrl } from "../utils/baseUrls";

export default function ReferralPopup({ onClose, user }) {
  const { t } = useTranslation();
  const referralLink = `${imageUrl.replace(
    "/images",
    ""
  )}/become_artist?referralCode=${user?.userId}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
        >
          ✖
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-center">
          {t("Your Referral Link")}
        </h2>

        <div className="mt-4 flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-2 text-sm bg-gray-100"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 sm:px-5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base hover:bg-blue-600"
          >
            {copied ? t("Copied!") : t("Copy")}
          </button>
        </div>
      </div>
    </div>
  );
}
