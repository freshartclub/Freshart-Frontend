const ReturnInstructionsPopup = ({ setShowReturnInstruction, dark }) => {
  const returnInstructions = [
    "1. Package the artwork securely in its original packaging if available.",
    "2. Include all certificates of authenticity and documentation.",
    "3. Use a reputable courier service with tracking and insurance.",
    "4. The return must be initiated by the specified return date.",
    "5. Notify us with the tracking number once shipped.",
    "6. Artwork must be received in the same condition as when delivered.",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl relative">
        <button
          onClick={() => setShowReturnInstruction(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Artwork Return Instructions</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            {returnInstructions.map((instruction, index) => (
              <div key={index} className="flex items-start">
                <span className="text-indigo-600 font-medium mr-2">{instruction.split(" ")[0]}</span>
                <span>{instruction.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Failure to follow these instructions may result in additional fees or rejection of the return.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            // onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnInstructionsPopup;
