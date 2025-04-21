import { Controller } from "react-hook-form";
import Header from "../../ui/Header";
import { useTranslation } from "react-i18next";

const ArtworkRight = ({ query, control, discountAcceptation, availableTo, getValue, setValue, dark }) => {
  const availableToOptions = availableTo?.map((item) => item.value) || [];
  const discountAcceptationOptions = discountAcceptation?.map((item) => item.value) || [];

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
      firstValue: getValue("discountAcceptation") || firstValueDiscountAcceptance,
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
      <div className={`p-6 border rounded-xl mb-6 shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Restrictions")}</h2>
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
        <div className="flex flex-col gap-4">
          {restrictions.map(({ id, name, label, options, firstValue }) => (
            <div key={id}>
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(label)}</label>
              <Controller
                control={control}
                name={name}
                defaultValue={setValue(name, firstValue)}
                render={({ field }) => (
                  <select
                    {...field}
                    id={id}
                    disabled={query}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                      dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
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
      </div>

      <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Collection")}</h2>
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
        {collection.map(({ id, name, label, options }) => (
          <div key={id}>
            <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(label)}</label>
            <Controller
              control={control}
              name={name}
              defaultValue={getValue(name)}
              render={({ field }) => (
                <select
                  {...field.value}
                  id={id}
                  disabled
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    dark
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
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
