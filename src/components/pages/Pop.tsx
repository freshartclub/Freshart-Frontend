import React from "react";
import { useTranslation } from "react-i18next";

interface EmailVerificationProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  validateEmailOtp: () => void;
  verifyOtpPending: boolean;
  handleRevalidateEmail: () => void;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  sendMailPending: boolean;
  validateEmail: string;
  handleCloseModel: () => void;
  watchEmail: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  verificationCode,
  setVerificationCode,
  validateEmailOtp,
  verifyOtpPending,
  handleRevalidateEmail,
  isModalOpen,
  sendMailPending,
  validateEmail,
  handleCloseModel,
}) => {
  const { t } = useTranslation();

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <div className="flex flex-col items-center ">
      <span
        onClick={handleRevalidateEmail}
        className={`text-black border border-zinc-600 py-2 w-[11rem]  text-center pr-0 rounded cursor-pointer ${
          validateEmail === "Email Verified" ? "pointer-events-none" : ""
        }`}
      >
        {sendMailPending ? t("Sending...") : t(validateEmail)}
      </span>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">
              {t("Email Verification")}
            </h3>

            <div className="mb-4">
              <label htmlFor="verificationCode" className="block text-gray-700">
                {t("Enter the code we sent to your email")}:
              </label>
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={handleCodeChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`${t("Enter verification code")}`}
              />
            </div>

            <div className="flex justify-between">
              <span
                onClick={validateEmailOtp}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
              >
                {verifyOtpPending ? t("Verifying...") : t("Verify Code")}
              </span>
              <span
                onClick={() => handleCloseModel()}
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

export default EmailVerification;
