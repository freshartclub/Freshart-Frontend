import React from "react";
import Header from "../../ui/Header";
import { Field } from "formik";

const Commercialization = () => {
  return (
    <div className="bg-white p-4 rounded-md mt-6 border border-[#E0E2E7] shadow-md ">
      <Header
        variant={{
          size: "md",
          theme: "dark",
          weight: "semiBold",
        }}
        className="mb-4"
      >
        Commercialization
      </Header>
      <div className="space-y-2">
        <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
          Subscription Catalog
          <Field
            as="select"
            id="textclass"
            name="text"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
          >
            <option value="" disabled selected>
              Select Catalog
            </option>
            <option>Catalog02 </option>
            <option>Catalog03</option>
          </Field>
        </label>
      </div>

      <div className="mt-4">
        <label className="text-[#203F58] sm:text-base font-semibold ">
          Artist Fees
          <Field
            type="text"
            id="Description"
            name="Description"
            placeholder="20%"
            className="bg-[#E0E2E7] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
          ></Field>
        </label>
      </div>

      <div className="mt-4">
        <label className="text-[#203F58] sm:text-base font-semibold ">
          Downward Offer
          <Field
            as="select"
            id="textclass"
            name="text"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
          >
            <option value="" disabled selected>
              Select Offer
            </option>
            <option>Yes</option>
            <option>No</option>
          </Field>
        </label>
      </div>
    </div>
  );
};

export default Commercialization;
