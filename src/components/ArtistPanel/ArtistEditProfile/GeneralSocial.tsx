import { useFieldArray, Controller } from "react-hook-form";
import { ARTIST_SOCIAL_LINKS } from "../../utils/mockData";

const SocialMediaLinks = ({ control, isActiveStatus }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accounts",
  });

  const handleAddAccount = () => {
    append({ name: "", link: "" });
  };

  return (
    <div className="p-4 mx-auto border border-custom-gray bg-white rounded-md shadow-custom mb-4 mt-4">
      <h2 className="pb-3 font-medium text-lg leading-7 tracking-wider text-[#1A1C21]">
        Add Social Media
      </h2>
      {fields.map((account, index) => (
        <div key={account.id} className="mb-6">
          <div className="flex  items-center gap-5 justify-between mb-2 w-full">
            <div className="flex flex-col lg:flex-row w-full gap-4 items-center">
              <div className="w-full">
                <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1">
                  Select Social Media
                </label>
                <Controller
                  control={control}
                  name={`accounts.${index}.name`}
                  render={({ field }) => (
                    <select
                      disabled={isActiveStatus !== "active"}
                      {...field}
                      className={`border border-gray-300 rounded p-3 w-full outline-none ${
                        isActiveStatus !== "active" ? "bg-zinc-100" : ""
                      }`}
                    >
                      <option value="">Select</option>
                      {ARTIST_SOCIAL_LINKS.map((item, index) => (
                        <option value={item.value}>{item.value}</option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1 ">
                  Social Link
                </label>
                <Controller
                  control={control}
                  name={`accounts.${index}.link`}
                  render={({ field }) => (
                    <input
                      disabled={isActiveStatus !== "active"}
                      {...field}
                      type="text"
                      placeholder="www.instagram.com/bgsdd845?"
                      className="border border-gray-300 rounded p-3 w-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <button
              onClick={() => remove(index)}
              className={`hover:bg-red-300 px-4 py-3 mt-5 rounded-lg gap-1 bg-[#FCDAD7] text-[#F04438] ${
                isActiveStatus !== "active" ? "pointer-events-none" : ""
              }`}
              title="Remove account "
            >
              X
            </button>
          </div>
        </div>
      ))}
      <span
        variant={{ size: "base", weight: "500", rounded: "lg" }}
        onClick={handleAddAccount}
        className={`bg-[#DEDEFA] font-semibold py-3 px-2 rounded cursor-pointer ${
          isActiveStatus !== "active" ? "pointer-events-none" : ""
        }`}
      >
        + Add social media account
      </span>
    </div>
  );
};

export default SocialMediaLinks;
