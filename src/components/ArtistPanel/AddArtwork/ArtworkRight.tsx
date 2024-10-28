import { Field } from "formik";
import Header from "../../ui/Header";

const ArtworkRight = () => {
  const fields = [
    {
      id: "artworkdiscipline",
      name: "artworkdiscipline",
      label: "Artwork discipline",
      options: [
        "Select a Discipline",
        "Painting",
        "Architecture",
        "Literature",
      ],
    },
    {
      id: "artworktags",
      name: "artworktags",
      label: "Artwork Tags",
      options: ["Select Tags", "Cards", "Business Cards"],
    },
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
      name: "promotionscore",
      label: "Promotion Score",
      options: ["10 out of 10", "9 out of 10", "8 out of 10"],
    },
  ];

  return (
    <div>
      <div className=" rounded-md">
        <div className="bg-white rounded-md p-4 border border-[#E0E2E7]">
          <Header
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
            className="mb-3"
          >
            Discipline
          </Header>
          <>
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
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </div>
            ))}
          </>
        </div>

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
