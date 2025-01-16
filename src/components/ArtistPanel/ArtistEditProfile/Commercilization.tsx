import { useFieldArray, Controller } from "react-hook-form";
import { ARTIST_SOCIAL_LINKS } from "../../utils/mockData";

const Commercilization = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "publishingCatalog",
  });

  const handleAddAccount = () => {
    append({ name: "", link: "" });
  };

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
    <div className="p-4 mx-auto border border-custom-gray bg-white rounded-md shadow-custom mb-4 mt-4">
      <h2 className="pb-3 font-medium text-lg leading-7 tracking-wider text-[#1A1C21]">
        Commercilization
      </h2>
      <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
        {commercializationData.map(({ name, label, message }) => (
          <div key={name} className="md:w-[48%] w-full relative">
            <input
              disabled
              type="text"
              {...control.register(name)}
              className="border pointer-events-none border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
            />
            <label
              htmlFor={name}
              className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
            >
              {label}
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
                  {`Catalog ${index + 1}`}
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
                      {/* <option value="">Select</option> */}
                      {fields?.map((item, index) => (
                        <option key={index} value={item.catalogName}>
                          {item.catalogName}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1 ">
                  Artist Fee
                </label>
                <Controller
                  control={control}
                  name={`publishingCatalog.${index}.ArtistFees`}
                  render={({ field }) => (
                    <input
                      disabled
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
              className={`hover:bg-red-300 px-4 py-3 mt-5 rounded-lg gap-1 bg-[#FCDAD7] text-[#F04438] pointer-events-none`}
              title="Remove account "
            >
              X
            </button>
          </div>
        </div>
      ))}
      {/* <span
        variant={{ size: "base", weight: "500", rounded: "lg" }}
        onClick={handleAddAccount}
        className={`bg-[#DEDEFA] font-semibold py-3 px-2 rounded`}
      >
        + Add social media account
      </span> */}
    </div>
  );
};

export default Commercilization;
