import { Controller } from "react-hook-form";
import Header from "../../ui/Header";
import { useTranslation } from "react-i18next";

const ArtworkRight = ({
  query,
  control,
  discountAcceptation,
  availableTo,
  getValue,
  setValue,
}) => {
  const availableToOptions = availableTo?.map((item) => item.value) || [];
  const discountAcceptationOptions =
    discountAcceptation?.map((item) => item.value) || [];

  const firstValueAvaliableTo = availableTo?.[0]?.value || null;
  const firstValueDiscountAcceptance = discountAcceptation?.[0]?.value || null;

  const { t } = useTranslation();

  const restrictions = [
    {
      id: "restrictions",
      name: "availableTo",
      label: "Available To",
      options: availableToOptions,
      firstValue: getValue("availableTo") || firstValueAvaliableTo,
    },
    {
      id: "discountAcceptation",
      name: "discountAcceptation",
      label: "Discount Acceptation",
      options: discountAcceptationOptions,
      firstValue:
        getValue("discountAcceptation") || firstValueDiscountAcceptance,
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
    <div className="rounded-md">
      <div className="bg-white rounded-lg shadow-md p-6 border border-[#E0E2E7]">
        <Header
          variant={{ size: "md", theme: "dark", weight: "semiBold" }}
          className="mb-3"
        >
          {t("Restrictions")}
        </Header>
        {restrictions.map(({ id, name, label, options, firstValue }) => (
          <div key={id} className="mb-4">
            <label
              htmlFor={id}
              className="block text-sm font-semibold text-[#203F58] mb-2"
            >
              {t(label)}
            </label>
            <Controller
              control={control}
              name={name}
              defaultValue={setValue(name, firstValue)}
              render={({ field }) => (
                <select
                  {...field}
                  id={id}
                  disabled={query}
                  className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">{t("Select")}</option>
                  {options.map((option, index: number) => (
                    <option key={index} value={option}>
                      {t(option)}
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
          {t("Collection")}
        </Header>
        {collection.map(({ id, name, label, options }) => (
          <div key={id} className="mb-4">
            <label
              htmlFor={id}
              className="block text-sm font-semibold text-[#203F58] mb-2"
            >
              {t(label)}
            </label>
            <Controller
              control={control}
              name={name}
              defaultValue={getValue(name)}
              render={({ field }) => (
                <select
                  {...field.value}
                  id={id}
                  disabled
                  className="block  w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">{t("Select")}</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {t(option)}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkRight;
