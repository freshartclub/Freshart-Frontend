import { useState } from "react";
import { baseUrl, imageUrl } from "../utils/baseUrls";

export default function ReferralPopup({ onClose , user }) {


    console.log("this id",user)




  const referralLink = `http://localhost:5173/become_artist?referralCode=${user?.userId}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold text-center">Your Referral Link</h2>
        <div className="mt-4 flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-2 text-sm bg-gray-100"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
