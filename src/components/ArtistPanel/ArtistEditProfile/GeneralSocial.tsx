import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SocialMediaLinks = ({ control, isActiveStatus, socialMedia }) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accounts",
  });

  const handleAddAccount = () => {
    append({ name: "", link: "" });
  };

  return (
    <div className="p-4 mx-auto border border-custom-gray bg-white rounded-lg shadow-md mb-4 mt-4">
      <h2 className="pb-3 font-semibold text-lg leading-7 tracking-wider text-[#1A1C21]">
        {t("Add Social Media")}
      </h2>
      {fields.map((account, index) => (
        <div key={account.id} className="mb-6">
          <div className="flex flex-col md:flex-row items-center gap-5 justify-between mb-2 w-full">
            <div className="flex flex-col md:flex-row w-full gap-4 items-center">
              <div className="w-full">
                <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1">
                  {t("Select Social Media")}
                </label>
                <Controller
                  control={control}
                  name={`accounts.${index}.name`}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`border border-gray-300 rounded p-3 w-full outline-none cursor-pointer ${
                        isActiveStatus !== "active" ? "" : ""
                      }`}
                    >
                      <option value="">Select</option>
                      {socialMedia?.map((item, i: number) => (
                        <option key={i} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1 ">
                  {t("Social Link")}
                </label>
                <Controller
                  control={control}
                  name={`accounts.${index}.link`}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="https://www.example.com"
                      className="border border-gray-300 rounded p-3 w-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <button
              onClick={() => remove(index)}
              className={`hover:bg-red-100 px-4 py-3 mt-0 md:mt-5 md:w-fit w-full rounded-lg gap-1 bg-[#FCDAD7] text-[#F04438] ${
                isActiveStatus !== "active" ? "" : ""
              }`}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <span
        onClick={handleAddAccount}
        className="bg-[#DEDEFA] md:inline block text-center font-semibold py-3 px-2 rounded cursor-pointer"
      >
        + {t("Add social media account")}
      </span>
    </div>
  );
};

export default SocialMediaLinks;
