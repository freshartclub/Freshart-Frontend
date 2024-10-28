import { Field } from "formik";
import Header from "../../ui/Header";
import Select from "react-select";
import { useState } from "react";

const AdditionalInfo = () => {
  const package_dimension = [
    { name: "weight", label: "Weight", placeholder: "Product weight..." },
    { name: "height", label: "Height", placeholder: "Height (cm)..." },
    { name: "length", label: "Length", placeholder: "Length (cm)..." },
    { name: "width", label: "Width", placeholder: "Width (cm)..." },
  ];

  const Framed_dimension = [
    { name: "height", label: "Height", placeholder: "Height (cm)..." },
    { name: "length", label: "Length", placeholder: "Length (cm)..." },
    { name: "width", label: "Width", placeholder: "Width (cm)..." },
  ];
  const options = [
    { value: "print", label: "print" },
    { value: "art", label: "art" },
  ];
  const options_1 = [
    { value: "Dark", label: "Dark" },
    { value: "highlights", label: "highlights" },
  ];
  const options_2 = [
    { value: "Blue", label: "Blue" },
    { value: "magenta", label: "magenta" },
  ];

  const [value, setValue] = useState(null);

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
        Additional information
      </Header>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <label className="text-[#203F58] text-sm sm:text-base font-semibold">
          Artwork technic
          <Field
            as="select"
            id="artworkTechnic"
            name="artworkTechnic"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full  p-1 sm:p-2.5 "
          >
            <option>Select type </option>
            <option>one</option>
            <option>three</option>
            <option>four</option>
          </Field>
        </label>

        <label className="text-[#203F58] text-sm sm:text-base font-semibold">
          Artwork theme
          <Field
            as="select"
            id="ArtworkTheme"
            name="ArtworkTheme"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
          >
            <option>Select type </option>
            <option>one</option>
            <option>three</option>
            <option>four</option>
          </Field>
        </label>
      </div>

      <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
        Artwork orientation
        <Field
          as="select"
          id="ArtworkOrientaion"
          name="ArtworkOrientaion"
          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
        >
          <option>Square </option>
          <option>Rectengle</option>
          <option>three</option>
          <option>four</option>
        </Field>
      </label>

      <div className="grid md:grid-cols-2 gap-3 mt-4 mb-4">
        <label className="text-[#203F58] font-semibold">
          Material
          <Field
            as="select"
            id="Material"
            name="Material"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
          >
            <option>Paper</option>
            <option>one</option>
            <option>three</option>
            <option>four</option>
          </Field>
        </label>

        <label className="text-[#203F58] text-sm sm:text-base font-semibold">
          Offensive
          <Field
            as="select"
            id="Offensive"
            name="Offensive"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
          >
            <option>Yes </option>
            <option>No</option>
          </Field>
        </label>
      </div>

      <div className="grid grid-cols-4 mb-4 gap-3">
        {package_dimension.map((field) => (
          <span key={field.name}>
            <label className="p-1 text-[14px] text-[#203F58] font-semibold">
              {field.label}
            </label>
            <Field
              type="text"
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              value={field.name}
              className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
            />
          </span>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <label className="text-[#203F58] font-semibold ">
          Hanging available
          <Field
            as="select"
            id="HangingAvailable"
            name="HangingAvailable"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
          >
            <option>Yes </option>
            <option>No</option>
          </Field>
        </label>

        <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
          Short Description for hanging
          <Field
            type="text"
            id="ShortDescription"
            name="ShortDescription"
            placeholder="Type Hanging description here. . .. . ."
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 pb-10 "
          ></Field>
        </label>

        <label className="text-[#203F58] text-sm sm:text-bas  font-semibold ">
          Farmed
          <Field
            as="select"
            id="Farmed"
            name="Farmed"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
          >
            <option>Yes </option>
            <option>No</option>
          </Field>
        </label>

        <label className="text-[#203F58] text-sm sm:text-base  font-semibold ">
          Framed Description
          <Field
            type="text"
            id="FarmedDescription"
            name="FarmedDescription"
            placeholder="Type Framed description here. . ."
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 pb-10 "
          ></Field>
        </label>

        <div className="grid grid-cols-3 mb-4 gap-3 ">
          {Framed_dimension.map((field) => (
            <span key={field.name}>
              <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                {field.label}
              </label>
              <Field
                type="text"
                name={field}
                id={field.name}
                placeholder={field.placeholder}
                value={value}
                className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
              />
            </span>
          ))}
        </div>

        <div className="">
          <Select
            options={options}
            defaultValue={value}
            placeholder="Select Artwork Style"
            isMulti
            styles={{
              dropdownIndicator: () => ({
                color: "black",
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                backgroundColor: "#203F58",
                color: "white",
              }),

              multiValueRemove: (provided) => ({
                ...provided,
                backgroundColor: "#203F58",
                color: "white",
              }),
            }}
          />
        </div>

        <div className="">
          <Select
            options={options_1}
            defaultValue={value}
            placeholder="Emotions"
            isMulti
            styles={{
              dropdownIndicator: () => ({
                color: "black",
              }),

              multiValueLabel: (provided) => ({
                ...provided,
                backgroundColor: "#203F58",
                color: "white",
              }),

              multiValueRemove: (provided) => ({
                ...provided,
                backgroundColor: "#203F58",
                color: "white",
              }),
            }}
          />
        </div>

        <div>
          <Select
            options={options_2}
            defaultValue={value}
            placeholder="Select Color"
            isMulti
            styles={{
              dropdownIndicator: () => ({
                color: "black",
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                backgroundColor: "#203F58",
                color: "white",
              }),

              multiValueRemove: (provided) => ({
                ...provided,
                backgroundColor: "#203F58",
                color: "white",
              }),
            }}
          />
        </div>

        <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
          Artwork Style
          <Field
            as="select"
            id="ArtworkStyle"
            name="ArtworkStyle"
            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
          >
            <option>Yes </option>
            <option>No</option>
          </Field>
        </label>
      </div>
    </div>
  );
};

export default AdditionalInfo;
