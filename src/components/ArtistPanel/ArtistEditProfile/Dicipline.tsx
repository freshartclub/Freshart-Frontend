import { useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { useGetDiscipline } from "../../pages/http/useGetDiscipline";
import { useGetStyle } from "../../pages/http/useGetStyle";
import { useTranslation } from "react-i18next";

const Dicipline = ({ control, isActiveStatus, prefillValues, watch }) => {
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
      (item) =>
        item.discipline &&
        item.discipline.some((newItem) =>
          newItem.disciplineName.includes(selectedDisciplines)
        )
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
    <div className="p-4 mx-auto border border-custom-gray bg-white rounded-md shadow-custom mb-4 mt-4">
      <h2 className="pb-3 font-semibold text-lg leading-7 tracking-wider text-[#1A1C21]">
        {t("Discipline")}
      </h2>
      {fields.map((account, index) => {
        const selectedDiscipline = disciplineValues?.[index]?.discipline;
        const prefilledStyles = getPrefilledStyles(index);

        return (
          <div key={index} className="mb-6">
            <div className="flex flex-col md:flex-row items-center gap-5 justify-between mb-2 w-full">
              <div className="flex flex-col md:flex-row w-full gap-4 items-center">
                <div className="w-full">
                  <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1">
                    {`${t("Discipline")} ${index + 1}`}
                  </label>
                  <Controller
                    control={control}
                    name={`discipline.${index}.discipline`}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`border border-gray-300 rounded p-3 w-full outline-none cursor-pointer ${
                          isActiveStatus !== "active" ? "" : ""
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
                  <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1">
                    {t("Style")}
                  </label>
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
                              ? getStylesForDiscipline(selectedDiscipline)?.map(
                                  (styl) => ({
                                    value: styl?.styleName,
                                    label: t(styl?.styleName),
                                  })
                                )
                              : [{ value: "", label: "" }]
                          }
                          value={selectedStyles}
                          onChange={(selected) => {
                            field.onChange(
                              selected
                                ? selected.map((option) => option.value)
                                : []
                            );
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => remove(index)}
                className="md:w-fit w-full border text-red-600 border-red-600 p-2 rounded font-semibold translate-y-[-3px] mt-3 md:mt-auto"
              >
                {t("Remove")}
              </button>
            </div>
          </div>
        );
      })}
      <span
        onClick={handleAddAccount}
        className="bg-[#DEDEFA] block md:inline text-center font-semibold py-3 px-2 rounded cursor-pointer"
      >
        + {t("Add Discipline")}
      </span>
    </div>
  );
};

export default Dicipline;
