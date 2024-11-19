import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const Logistics = ({ control }) => {
  //   const { register, errors } = useForm();
  const {} = useFieldArray({
    control,
    name: "logistics",
  });

  const logisticsData = [
    {
      name: "logAddress",
      label: "Logistic Address",
      message: "Logistic Addressis required",
    },
    {
      name: "logCity",
      label: "Logistic City",
      message: "Logistic City is required",
    },
    {
      name: "logCountry",
      label: "Logistic Country",
      message: "Logistic Country is required",
    },
    {
      name: "logEmail",
      label: "Logistic Email",
      message: "Logistic Email required",
    },

    {
      name: "logName",
      label: "Logistic Name",
      message: "Logistic Name is required",
    },
    {
      name: "logNotes",
      label: "Logistic Notes",
      message: "Logistic Notes is required",
    },
    {
      name: "logPhone",
      label: "Logistic Phone",
      message: "Logistic Phone is required",
    },
    {
      name: "logProvince",
      label: "Logistic Province",
      message: "Logistic Province is required",
    },
    {
      name: "logZipCode",
      label: "Logistic ZipCode",
      message: "Logistic ZipCodeis required",
    },
  ];

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-xl font-semibold mb-3 text-[#1A1C21]">Logistic</h2>
      <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
        {logisticsData.map(({ name, label, message }) => (
          <div key={name} className="md:w-[48%] w-full relative">
            <input
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

export default Logistics;
