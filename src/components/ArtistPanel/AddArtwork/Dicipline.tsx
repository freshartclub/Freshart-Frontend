import { Field, useFormikContext } from "formik";
import Select from "react-select";

import Header from "../../ui/Header";
import { useEffect } from "react";

const Dicipline = () => {
  const { setFieldValue, values } = useFormikContext();

  console.log("this is value from discipline", values.artworkTags);

  const fields = [
    {
      id: "artworkdiscipline",
      name: "artworkDiscipline",
      label: "Artwork discipline",
      options: [
        { value: "Dicipline 1", label: "Dicipline 1" },
        { value: "Dicipline 2", label: "Dicipline 2" },
        { value: "Dicipline 3", label: "Dicipline 3" },
        { value: "Dicipline 4", label: "Dicipline 4" },
      ],
    },
  ];

  const artworkTagsOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
  ];

  return (
    <div className="bg-white w-full rounded-md p-4 border ">
      <Header
        variant={{ size: "md", theme: "dark", weight: "semiBold" }}
        className="mb-3"
      >
        Discipline
      </Header>
      <>
        <div className="">
          {fields.map(({ id, name, label, options }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-sm sm:text-base font-semibold text-[#203F58] mb-2"
              >
                {label}
              </label>
              <Field
                as="select"
                id={id}
                name={name}
                className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Discipline
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>
          ))}

          <div className="mb-4">
            <label
              htmlFor="artworkTags"
              className="block text-sm sm:text-base font-semibold text-[#203F58] mb-2"
            >
              Artwork Tags
            </label>
            <Select
              options={artworkTagsOptions}
              isMulti
              placeholder="Select Tags"
              name="artworkTags"
              value={
                values.artworkTags &&
                values.artworkTags.length > 0 &&
                values.artworkTags.map((item) => {
                  return {
                    value: item,
                    label: item,
                  };
                })
              }
              onChange={(selectedOptions) =>
                setFieldValue("artworkTags", selectedOptions)
              }
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
        </div>
      </>
    </div>
  );
};

export default Dicipline;
