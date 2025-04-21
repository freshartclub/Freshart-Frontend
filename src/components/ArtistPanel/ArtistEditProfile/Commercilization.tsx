import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Commercilization = ({ control, getValues, dark }) => {
  const { t } = useTranslation();
  const { fields, remove } = useFieldArray({
    control,
    name: "publishingCatalog",
  });

  const commercializationData = [
    {
      name: "artProvider",
      label: "Art Provider",
      message: "Art Provider is required",
    },

    {
      name: "artistLevel",
      label: "Artist Level",
      message: "Artist Level is required",
    },
    {
      name: "artistPlus",
      label: "Artist Plus",
      message: "Tax Vat is required",
    },
    {
      name: "customOrder",
      label: "Custom Order",
      message: "Custom Order is required",
    },
    {
      name: "maxNumberOfArtwork",
      label: "Max Number Of Artwork",
      message: "Max Number Of Artwork",
    },
    {
      name: "minNumberOfArtwork",
      label: "Min Number Of Artwork",
      message: "Min Number Of Artwork is required",
    },
    {
      name: "scorePlatform",
      label: "Score Platform",
      message: "Custom Order is required",
    },
    {
      name: "scoreProfessional",
      label: "Score Professional",
      message: "Score Professional Of Artwork",
    },
  ];

  return (
    <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Commercilization")}</h2>
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
        {commercializationData.map(({ name, label }) => (
          <div key={name} className="md:w-[48%] w-full relative">
            <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(label)}</label>
            <input
              disabled
              type="text"
              value={t(getValues(name))}
              {...control.register(name)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </div>
        ))}
      </div>

      {fields.map((account, index) => (
        <div key={account.id} className="mb-6">
          <div className="flex flex-col md:flex-row items-center gap-5 justify-between mb-2 w-full">
            <div className="flex flex-col md:flex-row w-full gap-4 items-center">
              <div className="w-full">
                <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{`${t("Catalog")} ${
                  index + 1
                }`}</label>
                <Controller
                  control={control}
                  name={`publishingCatalog.${index}.catalogName`}
                  render={({ field }) => (
                    <select
                      disabled
                      {...field}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                        dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    >
                      {fields?.map((item, index) => (
                        <option key={index} value={item.catalogName}>
                          {t(item.catalogName)}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div className="w-full">
                <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artist Fee")}</label>
                <Controller
                  control={control}
                  name={`publishingCatalog.${index}.ArtistFees`}
                  render={({ field }) => (
                    <input
                      disabled
                      {...field}
                      type="text"
                      placeholder="0.00"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                        dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                  )}
                />
              </div>
            </div>
            <button
              className={`${
                dark ? "bg-red-100" : "bg-white"
              } text-red-600 md:w-fit w-full border border-red-600 px-3 rounded-lg font-semibold translate-y-[-3px] md:mt-auto h-[2.8rem]`}
              onClick={() => remove(index)}
            >
              {t("Remove")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Commercilization;
