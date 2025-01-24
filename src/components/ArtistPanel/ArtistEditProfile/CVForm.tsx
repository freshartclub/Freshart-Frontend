import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import ReactQuill from "react-quill";

const CVForm: React.FC<CVFormProps> = ({
  control,
  eventScope,
  eventType,
  t,
}) => {
  const {
    fields: cvEntries,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "cvEntries",
  });

  const addMoreCv = () => {
    append({ year: "", Type: "", Description: "", Location: "", Scope: "" });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "align",
  ];

  const defaultSizeStyle = `
  .ql-editor {
    font-size: 20px; 
      min-height: calc(1em * 9); 
    line-height: 1.5; /*
  }
`;

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full border  mb-4">
      <h2 className="text-xl font-semibold mb-3 pb-3 text-[#1A1C21]">
        {t("CV & Highlight")}
      </h2>
      <div className="w-full relative">
        <Controller
          name="highlights"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="relative">
              <style>{defaultSizeStyle}</style>
              <ReactQuill
                {...field}
                className="border border-[#E6E6E6] p-3 w-full rounded-md"
                theme="snow"
                placeholder={t("Write about yourself...")}
                modules={modules}
                formats={formats}
              />
              <label
                htmlFor="Hightlight"
                className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
              >
                {t("Highlight")}
              </label>
            </div>
          )}
        />
      </div>

      {cvEntries.map((cv, index: number) => (
        <div key={cv.id} className="flex flex-wrap space-x-2 mb-3 mt-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">{t("Year")}</label>
            <select
              className="border border-gray-300 rounded-md px-1 py-1 w-20 outline-none cursor-pointer"
              {...control.register(`cvEntries.${index}.year`)}
              defaultValue={cv.year}
            >
              <option value="">{t("Year")}</option>
              {Array.from({ length: 40 }, (_, i) => {
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
            <label className="text-sm font-medium mb-1">{t("Type")}</label>
            <select
              className="border border-gray-300 rounded-md px-1 py-1 w-24 outline-none cursor-pointer"
              {...control.register(`cvEntries.${index}.Type`)}
              defaultValue={cv.Type}
            >
              <option value="">{t("Select")}</option>
              {eventType &&
                eventType?.map((item, i) => (
                  <option key={i} value={item.value}>
                    {t(item?.value)}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col flex-grow w-28">
            <label className="text-sm font-medium mb-1">
              {t("Description")}
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-1 py-1  outline-none "
              placeholder="Description"
              {...control.register(`cvEntries.${index}.Description`)}
              defaultValue={cv.Description}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">{t("Location")}</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-1 py-1 w-24 outline-none"
              placeholder="Location"
              {...control.register(`cvEntries.${index}.Location`)}
              defaultValue={cv.Location}
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-sm font-medium mb-1">{t("Scope")}</label>
            <select
              className="border border-gray-300 rounded-md px-1 py-1 w-20 outline-none cursor-pointer"
              {...control.register(`cvEntries.${index}.Scope`)}
              defaultValue={cv.Scope}
            >
              <option value="">{t("Select")}</option>
              {eventScope &&
                eventScope?.map((item, i) => (
                  <option key={i} value={item.value}>
                    {t(item?.value)}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="button"
            className="text-red-600 font-semibold mt-5 "
            onClick={() => remove(index)}
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
          {t("Add More CV")}
        </button>
      </div>
    </div>
  );
};

interface CVFormProps {
  control: Control<any>;
  eventScope: string;
  eventType: string;
  t: any;
}

export default CVForm;
