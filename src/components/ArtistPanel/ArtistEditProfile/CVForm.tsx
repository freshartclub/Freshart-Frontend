import React from "react";
import { useFieldArray, Control, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import { options } from "./Language";

interface CVEntry {
  year: string;
  type: string;
  description: string;
  location: string;
  scope: string;
}

interface CVFormProps {
  control: Control<any>;
}

const CVForm: React.FC<CVFormProps> = ({
  control,
  isActiveStatus,
  eventScope,
  eventType,
}) => {
  const {
    fields: cvEntries,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "cvEntries",
  });

  console.log(eventType);
  console.log(eventScope);

  const addMoreCv = () => {
    append({ year: "", Type: "", Description: "", Location: "", Scope: "" });
  };

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full border  mb-4">
      <h2 className="text-xl font-semibold mb-3 pb-3 text-[#1A1C21]">
        CV & Highlight
      </h2>
      <div className="w-full relative">
        <Controller
          name="highlights"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="relative">
              <ReactQuill
                {...field}
                className="border border-[#E6E6E6] p-3 w-full rounded-md"
                theme="snow"
                placeholder="Write about yourself..."
                readOnly={isActiveStatus !== "active"}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    [{ align: [] }],
                    ["link"],
                  ],
                }}
              />
              <label
                htmlFor="Hightlight"
                className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
              >
                Highlight
              </label>
            </div>
          )}
        />
      </div>

      {cvEntries.map((cv, index) => (
        <div key={cv.id} className="flex flex-wrap space-x-2 mb-3 mt-4">
          {/* Year Input - Changed to Select */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Year</label>
            <select
              disabled={isActiveStatus !== "active"}
              className="border border-gray-300 rounded-md px-1 py-1 w-20 outline-none"
              {...control.register(`cvEntries.${index}.year`)} // Register the select input
              defaultValue={cv.year} // Use default value
            >
              <option value="">Year</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Type</label>
            <select
              disabled={isActiveStatus !== "active"}
              className="border border-gray-300 rounded-md px-1 py-1 w-24 outline-none"
              {...control.register(`cvEntries.${index}.Type`)} // Use control to register the input
              defaultValue={cv.Type} // Set the default value from cv.Type
            >
              <option value="">Select</option>
              {eventType &&
                eventType?.map((item, i) => (
                  <option key={i} value={item.value}>
                    {" "}
                    {item?.value}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col flex-grow w-28">
            <label className="text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-1 py-1  outline-none "
              placeholder="Description"
              disabled={isActiveStatus !== "active"}
              {...control.register(`cvEntries.${index}.Description`)} // Register the input
              defaultValue={cv.Description} // Use default value
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              disabled={isActiveStatus !== "active"}
              className="border border-gray-300 rounded-md px-1 py-1 w-24 outline-none"
              placeholder="Location"
              {...control.register(`cvEntries.${index}.Location`)} // Register the input
              defaultValue={cv.Location} // Use default value
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-sm font-medium mb-1">Scope</label>
            <select
              disabled={isActiveStatus !== "active"}
              className="border border-gray-300 rounded-md px-1 py-1 w-20 outline-none"
              {...control.register(`cvEntries.${index}.Scope`)} // Register the select input
              defaultValue={cv.Scope} // Use default value
            >
              <option value="">Select</option>
              {eventScope &&
                eventScope?.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item?.value}
                  </option>
                ))}
            </select>
          </div>

          {/* Remove Button */}
          <button
            disabled={isActiveStatus !== "active"}
            type="button"
            className="text-red-600 font-semibold mt-5 "
            onClick={() => remove(index)} // Function to remove a CV entry
          >
            ✕
          </button>
        </div>
      ))}

      <div className="mt-3">
        <button
          type="button"
          disabled={isActiveStatus !== "active"}
          onClick={addMoreCv}
          className="bg-[#102030] text-white px-3 py-2 rounded font-semibold"
        >
          Add More CV
        </button>
      </div>
    </div>
  );
};

export default CVForm;
