import { useState } from "react";
import useOtpVerifyMutationBecomeAnArtist from "../../http/artist/useOtpVerifyBecomeAnArtist";

const EmailVerificationModal = ({ email, isOpen }) => {
  const [otp, setOtp] = useState("");

  const { mutateAsync: verifyOtp, isPending: verifyOtpPending } =
    useOtpVerifyMutationBecomeAnArtist();

  const validateOtp = () => {
    const data = {
      otp: inputRef.current.value,
      email,
      isArtistRequest: true,
    };
    console.log(data);
    verifyOtp(data).then(() => {
      setIsOpen(false);
      setButton(false);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Email Verification</h2>
        <p className="mb-4">
          Please enter the verification code sent to your email.
        </p>
        <input
          type="text"
          className="border rounded w-full py-2 px-3 mb-4"
          placeholder="Verification Code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="flex justify-between">
          <span
            className={`bg-blue-500  text-white px-2 py-3 rounded-md text-sm text-center cursor-pointer`}
            onClick={validateOtp}
          >
            {verifyOtpPending ? "Validating.." : " Validate"}
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
