import React from "react";

export const EmailPop = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-[#203F58] mb-4">
          Email Verification
        </h2>
        <p className="text-gray-600 mb-4">
          Please enter the verification code sent to your email.
        </p>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#203F58]"
        />
        <div className="flex justify-center">
          <button
            onClick={handleVerification}
            className="bg-[#203F58] text-white px-4 py-2 rounded-md hover:bg-[#1a2c3a] transition"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};
