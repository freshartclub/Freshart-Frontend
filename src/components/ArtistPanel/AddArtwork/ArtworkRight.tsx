import { Field, useFormikContext } from "formik";
import Header from "../../ui/Header";
import Select from "react-select";

const ArtworkRight = ({ query }) => {
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
      options: ["Not Assigned"],
    },
  ];

  const handleRangeValue = (values: number) => {
    if (values.target.value) {
      setFieldValue("promotionScore", values.target.value);
    }
  };

  return (
    <div>
      <div className=" rounded-md">
        <div className="bg-white rounded-lg shadow-md p-6 mt-4 border border-[#E0E2E7]">
          <Header
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
            className="mb-3"
          >
            Promotion
          </Header>

          <div className="mb-4">
            <label
              htmlFor="promotion"
              className="block text-sm  sm:text-base font-semibold text-[#203F58] mb-2"
            >
              Promotion
            </label>
            <Field
              as="select"
              id="promotion"
              name="promotion"
              disabled={query}
              className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled selected>
                Select Tags
              </option>

              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
          </div>

          <div className="mb-4">
            <label
              htmlFor="promotionscore"
              className="block text-sm  sm:text-base font-semibold text-[#203F58] mb-2"
            >
              Promotion Score
            </label>
            <input
              disabled={query}
              type="range"
              min="1"
              max="100"
              onChange={(e) => {
                handleRangeValue(e);
                setFieldValue("promotionscore", e.target.value);
              }}
              className="slider w-full"
              id="myRange"
            />
            <span className="ml-2">{values.promotionScore}</span>
          </div>
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
                disabled={query}
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
                disabled={query}
                id={id}
                name={name}
                value="Not Assigned"
                className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {/* <option value="" disabled selected>
                  Select Tags
                </option> */}
                {/* {options.map((option, index) => (
                  <option key={index} disabled value={option}>
                    {option}
                  </option> */}
                {/* ))} */}
              </Field>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkRight;
