import { useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { useGetDiscipline } from "../../pages/http/useGetDiscipline";
import { useGetStyle } from "../../pages/http/useGetStyle";
import { useTranslation } from "react-i18next";

const Dicipline = ({ control, isActiveStatus, prefillValues, watch, dark }) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "discipline",
  });

  const { data } = useGetDiscipline();
  const { data: styleData } = useGetStyle();

  const disciplineValues = watch("discipline");

  const handleAddAccount = () => {
    append({ discipline: [], style: [] });
  };

  const getStylesForDiscipline = (selectedDisciplines) => {
    const availableStyles = styleData?.data?.filter(
      (item) => item.discipline && item.discipline.some((newItem) => newItem.disciplineName.includes(selectedDisciplines))
    );

    return availableStyles;
  };

  const getPrefilledStyles = (index) => {
    if (prefillValues && prefillValues[index]) {
      return prefillValues[index].style || [];
    }
    return [];
  };

  return (
    <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Discipline")}</h2>
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      {fields.map((account, index) => {
        const selectedDiscipline = disciplineValues?.[index]?.discipline;
        const prefilledStyles = getPrefilledStyles(index);

        return (
          <div key={index} className="mb-6">
            <div className="flex flex-col md:flex-row items-center gap-5 justify-between mb-2 w-full">
              <div className="flex flex-col md:flex-row w-full gap-4 items-center">
                <div className="w-full">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {`${t("Discipline")} ${index + 1}`}
                  </label>
                  <Controller
                    control={control}
                    name={`discipline.${index}.discipline`}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                          dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      >
                        <option value="">{t("Select")}</option>
                        {data?.data?.map((item, index) => (
                          <option key={index} value={item.disciplineName}>
                            {t(item.disciplineName)}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="w-full">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Style")}</label>
                  <Controller
                    control={control}
                    name={`discipline.${index}.style`}
                    defaultValue={prefilledStyles}
                    render={({ field }) => {
                      const selectedStyles =
                        field.value?.map((style) => ({
                          value: style,
                          label: t(style),
                        })) || [];

                      return (
                        <Select
                          isMulti
                          options={
                            selectedDiscipline
                              ? getStylesForDiscipline(selectedDiscipline)?.map((styl) => ({
                                  value: styl?.styleName,
                                  label: t(styl?.styleName),
                                }))
                              : [{ value: "", label: "" }]
                          }
                          value={selectedStyles}
                          onChange={(selected) => {
                            field.onChange(selected ? selected.map((option) => option.value) : []);
                          }}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: dark ? "#374151" : "#f9fafb",
                              borderColor: dark ? "#4b5563" : "#d1d5db",
                              minHeight: "48px",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              backgroundColor: dark ? "#374151" : "#ffffff",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected
                                ? dark
                                  ? "#3b82f6"
                                  : "#3b82f6"
                                : state.isFocused
                                ? dark
                                  ? "#4b5563"
                                  : "#f3f4f6"
                                : dark
                                ? "#374151"
                                : "#ffffff",
                              color: state.isSelected ? "#ffffff" : dark ? "#e5e7eb" : "#111827",
                            }),
                            multiValue: (provided) => ({
                              ...provided,
                              backgroundColor: dark ? "#3b82f6" : "#3b82f6",
                            }),
                            multiValueLabel: (provided) => ({
                              ...provided,
                              color: "#ffffff",
                            }),
                            multiValueRemove: (provided) => ({
                              ...provided,
                              color: "#ffffff",
                              ":hover": {
                                backgroundColor: dark ? "#2563eb" : "#2563eb",
                              },
                            }),
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => remove(index)}
                className={`${
                  dark ? "bg-red-100" : "bg-white"
                } text-red-600 md:w-fit w-full border border-red-600 px-3 rounded-lg font-semibold translate-y-[-3px] md:mt-auto h-[2.8rem]`}
              >
                {t("Remove")}
              </button>
            </div>
          </div>
        );
      })}
      <span
        onClick={handleAddAccount}
        className={`w-full md:w-fit px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-white bg-[#EE1D52] hover:bg-[#EE1D52]/80 shadow hover:shadow-md`}
      >
        + {t("Add Discipline")}
      </span>
    </div>
  );
};

export default Dicipline;
