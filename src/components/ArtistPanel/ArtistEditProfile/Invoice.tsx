import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppSelector } from "../../../store/typedReduxHooks";

const Invoice = ({ control }) => {
  const { register, errors } = useForm();
  const {} = useFieldArray({
    control,
    name: "invoice",
  });

  const invoiceData = [
    {
      name: "taxNumber",
      label: "Tax Number/NIF",
      message: "Tax Number is required",
    },
    {
      name: "taxLegalName",
      label: "Tax Legal Name",
      message: "Tax Legal Name is required",
    },

    {
      name: "taxAddress",
      label: "Tax Address",
      message: "Tax Address is required",
    },

    {
      name: "taxCountry",
      label: "Tax Country",
      message: "Tax Country is required",
    },
    {
      name: "taxCity",
      label: "Tax City",
      message: "Tax City is required",
    },
    {
      name: "taxZipCode",
      label: "Tax Zip Code",
      message: "Tax Zip Code is required",
    },
    {
      name: "taxProvince",
      label: "Tax Province",
      message: "Tax Province is required",
    },

    {
      name: "taxEmail",
      label: "Tax Email",
      message: "Tax Email is required",
    },

    {
      name: "taxPhone",
      label: "Tax Phone",
      message: "Tax Phone is required",
    },
    {
      name: "vatAmount",
      label: "Tax Vat",
      message: "Tax Vat is required",
    },
    {
      name: "taxBankIBAN",
      label: "Tax Bank IBAN",
      message: "Tax Bank IBAN is required",
    },
    {
      name: "taxBankName",
      label: "Tax Bank Name",
      message: "Tax Bank Name is required",
    },
  ];

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full border">
      <h2 className="text-xl font-semibold mb-3 text-[#1A1C21]">
        Invoicing & Commercialization
      </h2>
      <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
        {invoiceData.map(({ name, label, message }) => (
          <div key={name} className="md:w-[48%] w-full relative">
            <input
              disabled
              type="text"
              {...control.register(name, { required: message })}
              className="border pointer-events-none border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
            />
            <label
              htmlFor={name}
              className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
            >
              {label}
            </label>
            {/* {errors.name && (
              <div className="text-red-500 text-sm mt-1">
                <div>{errors.name?.message}</div>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoice;
