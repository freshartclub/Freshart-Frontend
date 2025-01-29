import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Commercilization = ({ control, getValues }) => {
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
    <div className="p-4 pb-0 mx-auto border border-custom-gray bg-white rounded-md shadow-custom mb-4 mt-4">
      <h2 className="text-lg font-semibold mb-3 pb-3 text-[#1A1C21]">
        {t("Commercilization")}
      </h2>
      <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
        {commercializationData.map(({ name, label, message }) => (
          <div key={name} className="md:w-[48%] w-full relative">
            <input
              disabled
              type="text"
              value={t(getValues(name))}
              {...control.register(name)}
              className="border pointer-events-none border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
            />
            <label
              htmlFor={name}
              className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
            >
              {t(label)}
            </label>
          </div>
        ))}
      </div>

      {fields.map((account, index) => (
        <div key={account.id} className="mb-6">
          <div className="flex  items-center gap-5 justify-between mb-2 w-full">
            <div className="flex flex-col lg:flex-row w-full gap-4 items-center">
              <div className="w-full">
                <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1">
                  {`${t("Catalog")} ${index + 1}`}
                </label>
                <Controller
                  control={control}
                  name={`publishingCatalog.${index}.catalogName`}
                  render={({ field }) => (
                    <select
                      disabled
                      {...field}
                      className="border border-gray-300 rounded p-3 w-full outline-none "
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
                <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1 ">
                  {t("Artist Fee")}
                </label>
                <Controller
                  control={control}
                  name={`publishingCatalog.${index}.ArtistFees`}
                  render={({ field }) => (
                    <input
                      disabled
                      {...field}
                      type="text"
                      placeholder="0.00"
                      className="border border-gray-300 rounded p-3 w-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <button
              onClick={() => remove(index)}
              className="md:w-fit w-full border text-red-600 border-red-600 p-2 rounded font-semibold translate-y-[-3px] mt-3 md:mt-auto opacity-75 pointer-events-none"
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
