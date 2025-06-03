import { useState } from "react";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetMakeOfferDetials } from "./http/useGetMakeOfferDetials";
import useMakeAnOfferMutation from "./http/useMakeAnOfferMutation";

const MakeAnOfferPopUp = ({ setIsOpen, offerType, data }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [offerPrice, setOfferPrice] = useState("");

  const { data: offerData, isLoading } = useGetMakeOfferDetials(data?._id);
  const { mutateAsync, isPending } = useMakeAnOfferMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      offer: offerPrice,
      offerType,
      artistId: data?.owner?._id,
      id: data?._id,
      counterAccept: true,
      isAccepted: offerData?.data?.status === "pending" ? true : true,
    };
    mutateAsync(values).then(() => {
      setIsOpen(false);
      setOfferPrice("");
    });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 w-full max-w-md ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Make {offerType === "Upward Offer" ? "an" : "a"} {offerType} </h3>
          <button onClick={() => setIsOpen(false)} className={`${dark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {offerType === "Downward Offer" && (
              <label htmlFor="offer-price" className={`block text-sm font-medium mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                Price : {data?.pricing?.basePrice}
              </label>
            )}

            <label htmlFor="offer-price" className={`block text-sm font-medium mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              Your Offer Price
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className={`${dark ? "text-gray-400" : "text-gray-500"} sm:text-sm`}>€</span>
              </div>
              <input
                type="number"
                id="offer-price"
                required
                className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 py-2 sm:text-sm rounded-md ${
                  dark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
                }`}
                placeholder="0.00"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                min="0"
                step="0.01"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className={`${dark ? "text-gray-400" : "text-gray-500"} sm:text-sm`}>EUR</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md">
              {isPending ? "Loading..." : "Submit Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnOfferPopUp;
