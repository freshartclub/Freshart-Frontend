import { Field, useFormikContext } from "formik";
import Header from "../../ui/Header";
import Select from "react-select";

const ArtworkRight = () => {
  const { setFieldValue, values } = useFormikContext();

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

  const promotion = [
    {
      id: "promotion",
      name: "promotion",
      label: "Promotion",
      options: ["Yes", "No"],
    },
    {
      id: "promotionscore",
      name: "promotionScore",
      label: "Promotion Score",
      options: ["10 out of 10", "9 out of 10", "8 out of 10"],
    },
  ];

  const restrictions = [
    {
      id: "restrictions",
      name: "availableTo",
      label: "Restrictions",
      options: [
        "Not Availaible To Guest",
        "Available To All",
        "Availaible Only Guest",
      ],
    },
    {
      id: "dicountAcceptation",
      name: "discountAcceptation",
      label: "Dicount Acceptation",
      options: ["Promotions", "Only Artist"],
    },
  ];

  const collection = [
    {
      id: "collection",
      name: "collectionList",
      label: "Collection",
      options: ["Collection 1", "Collection 2", "Collection 3", "Collection 4"],
    },
  ];

  return (
    <div>
      <div className=" rounded-md">
        {/* <div className="bg-white rounded-md p-4 border border-[#E0E2E7]"> */}
        {/* <Header
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
            className="mb-3"
          >
            Discipline
          </Header> */}
        <>
          {/* {fields.map(({ id, name, label, options }) => (
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
            ))} */}

          {/* Multi-select for Artwork Tags using react-select */}
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
                value={values.artworkTags}
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
            </div> */}
        </>
        {/* </div> */}

        <div className="bg-white rounded-lg shadow-md p-6 mt-4 border border-[#E0E2E7]">
          <Header
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
            className="mb-3"
          >
            Promotion
          </Header>
          {promotion.map(({ id, name, label, options }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-sm  sm:text-base font-semibold text-[#203F58] mb-2"
              >
                {label}
              </label>
              <Field
                as="select"
                id={id}
                name={name}
                className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled selected>
                  Select Tags
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-4 border border-[#E0E2E7]">
          <Header
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
            className="mb-3"
          >
            Restrictions
          </Header>
          {restrictions.map(({ id, name, label, options }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-sm  sm:text-base font-semibold text-[#203F58] mb-2"
              >
                {label}
              </label>
              <Field
                as="select"
                id={id}
                name={name}
                className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled selected>
                  Select Tags
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-4 border border-[#E0E2E7]">
          <Header
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
            className="mb-3"
          >
            Collection
          </Header>
          {collection.map(({ id, name, label, options }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-sm  sm:text-base font-semibold text-[#203F58] mb-2"
              >
                {label}
              </label>
              <Field
                as="select"
                id={id}
                name={name}
                className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled selected>
                  Select Tags
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkRight;
