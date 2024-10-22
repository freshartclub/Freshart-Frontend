import React from "react";
import { useFieldArray, Control } from "react-hook-form";

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

const CVForm: React.FC<CVFormProps> = ({ control }) => {
  const {
    fields: cvEntries,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "cvEntries",
  });

  const addMoreCv = () => {
    append({ year: "", type: "", description: "", location: "", scope: "" });
  };

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-xl font-semibold mb-3 text-[#1A1C21]">Add CV</h2>
      {cvEntries.map((cv, index) => (
        <div key={cv.id} className="flex space-x-2 mb-3">
          {/* Year Input - Changed to Select */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Year</label>
            <select
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
            <input
              type="text"
              className="border border-gray-300 rounded-md px-1 py-1 w-24 outline-none"
              placeholder="Type"
              {...control.register(`cvEntries.${index}.type`)} // Register the input
              defaultValue={cv.Type} // Use default value
            />
          </div>

          <div className="flex flex-col flex-grow">
            <label className="text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-1 py-1 outline-none"
              placeholder="Description"
              {...control.register(`cvEntries.${index}.description`)} // Register the input
              defaultValue={cv.Description} // Use default value
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-1 py-1 w-24 outline-none"
              placeholder="Location"
              {...control.register(`cvEntries.${index}.location`)} // Register the input
              defaultValue={cv.Location} // Use default value
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Scope</label>
            <select
              className="border border-gray-300 rounded-md px-1 py-1 w-20 outline-none"
              {...control.register(`cvEntries.${index}.scope`)} // Register the select input
              defaultValue={cv.Scope} // Use default value
            >
              <option value="">Scope</option>
              <option value="Local">Local</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            className="text-red-600"
            onClick={() => remove(index)} // Function to remove a CV entry
          >
            ✕
          </button>
        </div>
      ))}

      <div className="mt-3">
        <button
          type="button"
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
