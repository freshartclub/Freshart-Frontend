import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import ReactQuill from "react-quill";

const CVForm: React.FC<CVFormProps> = ({ control, eventScope, eventType, t, dark }) => {
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
    toolbar: [[{ header: [1, 2, 3, 4, 5, false] }], [{ list: "ordered" }, { list: "bullet" }], ["bold", "italic", "underline"], [{ align: [] }]],
  };

  const formats = ["header", "font", "size", "list", "bullet", "bold", "italic", "underline", "align"];

  const defaultSizeStyle = `
  .ql-editor {
    font-size: 20px; 
      min-height: calc(1em * 9); 
    line-height: 1.5; /*
  }
`;

  return (
    <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("CV & Highlight")}</h2>
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      <div className="w-full relative">
        <Controller
          name="highlights"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={`relative ${dark ? "quill-dark" : ""}`}>
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Highlight")}</label>
              <style>{defaultSizeStyle}</style>
              <style>
                {`
          .quill-dark .ql-editor {
            background-color: #374151;
            color: #F9FAFB;
          }

          .quill-dark .ql-toolbar {
            background-color: #1F2937;
            border-color: #4B5563;
          }

          .quill-dark .ql-container {
            border-color: #4B5563;
          }

          .quill-dark .ql-picker-label,
          .quill-dark .ql-picker-item {
            color: #F9FAFB;
          }

          .quill-dark .ql-stroke {
            stroke: #F9FAFB;
          }

          .quill-dark .ql-fill {
            fill: #F9FAFB;
          }
        `}
              </style>
              <ReactQuill {...field} placeholder={t("Write about yourself...")} modules={modules} formats={formats} />
            </div>
          )}
        />
      </div>

      <div className="flex flex-col mt-4">
        {cvEntries.map((cv, index: number) => (
          <div key={index} className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
            <div className="flex flex-col w-full md:w-[10%]">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Year")}</label>
              <select
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
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

            <div className="flex flex-col w-full md:w-[15%]">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Type")}</label>
              <select
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
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
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Description")}</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="Description"
                {...control.register(`cvEntries.${index}.Description`)}
                defaultValue={cv.Description}
              />
            </div>

            {/* Location Field */}
            <div className="flex flex-col w-full md:w-[15%]">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Location")}</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="Location"
                {...control.register(`cvEntries.${index}.Location`)}
                defaultValue={cv.Location}
              />
            </div>

            {/* Scope Field */}
            <div className="flex flex-col w-full md:w-[15%]">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Scope")}</label>
              <select
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
                {...control.register(`cvEntries.${index}.Scope`)}
                defaultValue={cv.Scope}
              >
                <option value="">{t("Select")}</option>
                {eventScope &&
                  eventScope.map((item, i: number) => (
                    <option key={i} value={item.value}>
                      {t(item?.value)}
                    </option>
                  ))}
              </select>
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
        ))}
      </div>

      <button
        type="button"
        onClick={addMoreCv}
        className={`w-full md:w-fit px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-white bg-[#EE1D52] hover:bg-[#EE1D52]/80 shadow hover:shadow-md`}
      >
        {t("Add More CV")}
      </button>
    </div>
  );
};

interface CvEntry {
  Type: string;
  Description: string;
  Location: string;
  Scope: string;
  year: string | number;
}
interface CVFormProps {
  control: Control<any>;
  eventScope: string;
  eventType: string;
  t: any;
  dark: boolean;
}

export default CVForm;
