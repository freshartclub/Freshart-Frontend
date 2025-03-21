import React from "react";
import { useTranslation } from "react-i18next";

interface PhoneVerificationProps {
  handleSendOtp: () => void;
  setIsModalOpenPhone: (value: boolean) => void;
  isModalOpenPhone: boolean;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleRevalidatePhone: () => void;
  isOtpVerify: boolean;
  setVerificationCode: (value: string) => void;
  verificationCode: string;
  validatePhone: string;
  requestOtpPending: boolean;
  verifyPhoneOtpPending: boolean;
  validateEmail: string;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  handleSendOtp,
  setIsModalOpenPhone,
  isModalOpenPhone,
  phoneNumber,
  setPhoneNumber,
  handleRevalidatePhone,
  isOtpVerify,
  setVerificationCode,
  verificationCode,
  validatePhone,
  requestOtpPending,
  verifyPhoneOtpPending,
  validateEmail,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <span
        onClick={handleSendOtp}
        className={`${
          isOtpVerify || validateEmail === "Email Verified"
            ? `border-zinc-600 text-black sm:w-[8rem] w-full text-center py-2 px-4 rounded border cursor-pointer ${
                validatePhone === "Verified" ? "pointer-events-none" : ""
              }`
            : "border-zinc-600 text-black sm:w-[11rem] w-full py-2 px-4 rounded border cursor-pointer pointer-events-none  text-center opacity-40"
        }`}
      >
        {requestOtpPending ? t("Sending...") : t(validatePhone)}
      </span>

      {isModalOpenPhone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <div className="mb-4">
              <label htmlFor="verificationCode" className="block text-gray-700">
                {t("Enter the code sent to your phone")}
              </label>
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("Enter verification code")}
              />
            </div>

            <div className="flex justify-between">
              <span
                onClick={handleRevalidatePhone}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
              >
                {verifyPhoneOtpPending ? t("Verifying...") : t(validatePhone)}
              </span>
              <span
                onClick={() => setIsModalOpenPhone(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
              >
                {t("Close")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;
