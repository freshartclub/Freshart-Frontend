import { useFieldArray, Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useGetDiscipline } from "../../pages/http/useGetDiscipline";
import { useGetStyle } from "../../pages/http/useGetStyle";

const Dicipline = ({ control, isActiveStatus, prefillValues, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "discipline", // The name of the field array
  });

  const { data, isLoading } = useGetDiscipline();

  const { data: styleData, isLoading: styleLoading } = useGetStyle();

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
      <h2 className="pb-3 font-medium text-lg leading-7 tracking-wider text-[#1A1C21]">
        Dicipline
      </h2>
      {fields.map((account, index) => {
        const selectedDiscipline = disciplineValues?.[index]?.discipline;
        const prefilledStyles = getPrefilledStyles(index);

        return (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-5 justify-between mb-2 w-full">
              <div className="flex flex-col lg:flex-row w-full gap-4 items-center">
                <div className="w-full">
                  <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1">
                    {`Dicipline ${index + 1}`}
                  </label>
                  <Controller
                    control={control}
                    name={`discipline.${index}.discipline`}
                    render={({ field }) => (
                      <select
                        disabled={isActiveStatus !== "active"}
                        {...field}
                        className={`border border-gray-300 rounded p-3 w-full outline-none ${
                          isActiveStatus !== "active" ? "bg-zinc-100" : ""
                        }`}
                      >
                        <option value="">Select</option>
                        {data?.data?.map((item, index) => (
                          <option key={index} value={item.disciplineName}>
                            {item.disciplineName}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="w-full">
                  <label className="block font-semibold text-sm leading-5 tracking-wide text-[#203F58] mb-1">
                    Style
                  </label>
                  <Controller
                    control={control}
                    name={`discipline.${index}.style`}
                    defaultValue={prefilledStyles}
                    render={({ field }) => {
                      const selectedStyles =
                        field.value?.map((style) => ({
                          value: style,
                          label: style,
                        })) || [];

                      return (
                        <Select
                          isMulti
                          isDisabled={isActiveStatus !== "active"}
                          options={
                            selectedDiscipline
                              ? getStylesForDiscipline(selectedDiscipline)?.map(
                                  (styl) => ({
                                    value: styl?.styleName,
                                    label: styl?.styleName,
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
                          //   {...field} // Spread the other props (onBlur, etc.)
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
                className={`hover:bg-red-300 px-4 py-3 mt-5 rounded-lg gap-1 bg-[#FCDAD7] text-[#F04438] ${
                  isActiveStatus !== "active" ? "pointer-events-none" : ""
                }`}
                title="Remove Discipline"
              >
                X
              </button>
            </div>
          </div>
        );
      })}
      <span
        onClick={handleAddAccount}
        className={`bg-[#DEDEFA] font-semibold py-3 px-2 rounded ${
          isActiveStatus !== "active" ? "pointer-events-none" : ""
        }`}
      >
        + Add Discipline
      </span>
    </div>
  );
};

export default Dicipline;
