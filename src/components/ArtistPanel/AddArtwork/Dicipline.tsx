import { Field, useFormikContext } from "formik";
import Select from "react-select";

import Header from "../../ui/Header";
import { useEffect } from "react";
import { useGetDiscipline } from "../../pages/http/useGetDiscipline";

const Dicipline = ({ query, setArtDicipline, artDicipline }) => {
  const { setFieldValue, values } = useFormikContext();
  const { data, isLoading } = useGetDiscipline();

  const diciplineOption = data?.data.map((item) => {
    return item.disciplineName;
  });

  const fields = [
    {
      id: "artworkdiscipline",
      name: "artworkDiscipline",
      label: "Artwork discipline",
      options: diciplineOption,
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
    <div className="bg-white w-full rounded-md  ">
      <Header
        variant={{ size: "md", theme: "dark", weight: "semiBold" }}
        className="mb-3"
      >
        Discipline
      </Header>
      <div>
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
              disabled={query}
              onChange={(val) => setArtDicipline(val.target.value)}
              value={artDicipline}
              className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select Discipline
              </option>
              {options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Field>
          </div>
        ))}

        {/* <div className="mb-4">
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
            isDisabled={query ? true : false}
            value={
              values.artworkTags && values.artworkTags.length > 0
                ? values.artworkTags.map((item) => ({
                    value: item,
                    label: item,
                  }))
                : []
            }
            onChange={(selectedOptions) =>
              setFieldValue(
                "artworkTags",
                selectedOptions.map((option) => option.value) // Store just the values (not the full objects)
              )
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
        </div> */}
      </div>
    </div>
  );
};

export default Dicipline;
