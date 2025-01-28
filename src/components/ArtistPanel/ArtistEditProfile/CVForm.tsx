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
      <h2 className="text-lg font-semibold mb-3 pb-3 text-[#1A1C21]">
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

      <div className="flex flex-col mt-4">
        {cvEntries.map((cv, index: number) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-2 mb-4"
          >
            {/* Year Field */}
            <div className="flex flex-col w-full md:w-[10%]">
              <label className="text-sm font-medium mb-1">{t("Year")}</label>
              <select
                className="border border-gray-300 rounded-md px-2 py-2 w-full outline-none cursor-pointer"
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

            {/* Type Field */}
            <div className="flex flex-col w-full md:w-[15%]">
              <label className="text-sm font-medium mb-1">{t("Type")}</label>
              <select
                className="border border-gray-300 rounded-md px-2 py-2 w-full outline-none cursor-pointer"
                {...control.register(`cvEntries.${index}.Type`)}
                defaultValue={cv.Type}
              >
                <option value="">{t("Select")}</option>
                {eventType &&
                  eventType.map((item, i) => (
                    <option key={i} value={item.value}>
                      {t(item?.value)}
                    </option>
                  ))}
              </select>
            </div>

            {/* Description Field */}
            <div className="flex flex-col w-full md:w-[40%]">
              <label className="text-sm font-medium mb-1">
                {t("Description")}
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-2 py-2 w-full outline-none"
                placeholder="Description"
                {...control.register(`cvEntries.${index}.Description`)}
                defaultValue={cv.Description}
              />
            </div>

            {/* Location Field */}
            <div className="flex flex-col w-full md:w-[15%]">
              <label className="text-sm font-medium mb-1">
                {t("Location")}
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-2 py-2 w-full outline-none"
                placeholder="Location"
                {...control.register(`cvEntries.${index}.Location`)}
                defaultValue={cv.Location}
              />
            </div>

            {/* Scope Field */}
            <div className="flex flex-col w-full md:w-[15%]">
              <label className="text-sm font-medium mb-1">{t("Scope")}</label>
              <select
                className="border border-gray-300 rounded-md px-2 py-2 w-full outline-none cursor-pointer"
                {...control.register(`cvEntries.${index}.Scope`)}
                defaultValue={cv.Scope}
              >
                <option value="">{t("Select")}</option>
                {eventScope &&
                  eventScope.map((item, i) => (
                    <option key={i} value={item.value}>
                      {t(item?.value)}
                    </option>
                  ))}
              </select>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              className="text-red-600 md:w-fit w-full border border-red-600 px-3 rounded font-semibold translate-y-[-3px] mt-3 md:mt-auto h-[2.4rem]"
              onClick={() => remove(index)}
            >
              {t("Remove")}
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addMoreCv}
        className="bg-[#102030] md:w-fit w-full text-center text-white px-3 py-2 rounded font-semibold"
      >
        {t("Add More CV")}
      </button>
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
