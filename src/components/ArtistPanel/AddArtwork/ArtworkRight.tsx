import { Controller } from "react-hook-form";
import Header from "../../ui/Header";

const ArtworkRight = ({ query, control, discountAcceptation, availableTo }) => {
  const availableToOptions = availableTo?.map((item) => item.value) || [];
  const discountAcceptationOptions =
    discountAcceptation?.map((item) => item.value) || [];

  const restrictions = [
    {
      id: "restrictions",
      name: "availableTo",
      label: "Available To",
      options: availableToOptions.length > 0 ? availableToOptions : [],
    },
    {
      id: "discountAcceptation",
      name: "discountAcceptation",
      label: "Discount Acceptation",
      options:
        discountAcceptationOptions.length > 0 ? discountAcceptationOptions : [],
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

  return (
    <div>
      <div className="rounded-md">
        {/* Restrictions Section */}
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
                className="block text-sm sm:text-base font-semibold text-[#203F58] mb-2"
              >
                {label}
              </label>
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <select
                    {...field}
                    id={id}
                    disabled={query}
                    className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
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
                className="block text-sm sm:text-base font-semibold text-[#203F58] mb-2"
              >
                {label}
              </label>
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <select
                    {...field}
                    id={id}
                    disabled
                    className="block  w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Not Assigned">Not Assigned</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkRight;
