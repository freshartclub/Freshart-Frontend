import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa"; // Importing the icon for three dots
import AdressPop from "./AdressPop";
import { useGetBillingAddress } from "./http/useGetBillingAddress";
import Loader from "../../ui/Loader";
import useDefaultMutation from "./http/useDefaultMutation";
import useRemoveBillingMutation from "./http/useRemoveBillingMutation";

const Billing = () => {
  const [checkBox, setCheckBox] = useState(false);
  const [activeActionPop, setActiveActionPop] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [addAdress, setAddAdress] = useState(false);

  const { data, isLoading } = useGetBillingAddress();

  const { mutateAsync, isPending } = useDefaultMutation();

  const { mutateAsync: removeMutatation, isPending: removeIspending } =
    useRemoveBillingMutation();

  const handleRemove = (id, i) => {
    removeMutatation(id).then(() => {
      setActiveActionPop(activeActionPop === i ? null : i);
    });
  };

  const handleUpdate = (value, i) => {
    setCheckBox(true);
    setAddAdress(false);
    setUpdateData(value);

    setActiveActionPop(activeActionPop === i ? null : i);
  };

  const handleAddress = () => {
    setCheckBox(true);
    setAddAdress(true);
  };

  const handleDefault = (id, i) => {
    mutateAsync(id).then(() => {
      setActiveActionPop(activeActionPop === i ? null : i);
    });
  };

  const toggleActionPop = (addressId) => {
    setActiveActionPop(activeActionPop === addressId ? null : addressId);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 md:p-6 rounded-lg ">
      {/* Left Section for Address Book */}
      <div className="relative">
        <div className="col-span-1 md:col-span-2 space-y-12">
          <div
            className={`rounded-lg shadow-lg p-5 ${checkBox ? "blur-lg" : ""}`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold text-[#000000]">
                Address Book
              </h2>
              <button
                onClick={handleAddress}
                className="text-[#FF536B] text-sm md:text-base font-semibold"
              >
                + Address
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {data &&
                data?.length > 0 &&
                data?.map((address, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 flex justify-between items-start relative"
                  >
                    <div>
                      <p className="font-semibold text-sm md:text-lg text-[#000000]">
                        {address?.billingDetails?.billingFirstName +
                          " " +
                          address?.billingDetails?.billingLastName}{" "}
                        <span className="text-gray-500 text-xs md:text-sm">
                          ({address?.billingDetails?.billingAddressType})
                        </span>
                      </p>
                      <p className="text-xs md:text-sm text-[#637381]">
                        {address?.billingDetails?.billingAddress}
                      </p>
                      <p className="text-xs md:text-sm text-[#637381]">
                        {address?.billingDetails?.billingPhone}
                      </p>
                    </div>
                    <div className="flex items-start">
                      {address?.isDefault && (
                        <span className="font-medium bg-[#00B8D929] text-[#006C9C] px-2 py-1 rounded-lg mr-2 text-xs md:text-sm">
                          Default
                        </span>
                      )}
                      <span className="">
                        <FaEllipsisV
                          onClick={() => toggleActionPop(i)}
                          className="text-gray-500 cursor-pointer text-sm"
                        />
                        {activeActionPop === i && (
                          <div
                            className="absolute right-[3%] top-8 flex flex-col px-5  shadow-xl rounded-md gap-2 justify-start bg-white py-3 z-10 opacity-0 scale-95 transition-all duration-300 ease-out transform"
                            style={{
                              transitionProperty: "transform, opacity",
                              transform: "scale(1)",
                              opacity: "1",
                            }}
                          >
                            <button
                              onClick={() => handleDefault(address?._id, i)}
                              className="text-sm font-medium hover:bg-gray-300 p-2 rounded-md"
                            >
                              {isPending ? "Saving..." : "Set As Default"}
                            </button>
                            <button
                              onClick={() => handleUpdate(address, i)}
                              className="text-sm font-medium hover:bg-gray-300 p-2 rounded-md"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleRemove(address?._id, i)}
                              className="text-sm font-medium hover:bg-gray-300 p-2 rounded-md"
                            >
                              {removeIspending ? "Removing..." : "Remove"}
                            </button>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {checkBox && (
            <AdressPop
              setCheckBox={setCheckBox}
              newData={updateData}
              setUpdateData={setUpdateData}
              addAdress={addAdress}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
