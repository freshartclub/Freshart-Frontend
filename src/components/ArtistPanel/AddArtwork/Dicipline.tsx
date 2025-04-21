import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Dicipline = ({ query, setArtDicipline, artDicipline, control, errors, getOutDiscipline, setValue, dark }) => {
  const { t } = useTranslation();

  const fields = [
    {
      id: "artworkdiscipline",
      name: "artworkDiscipline",
      label: "Artwork discipline",
      options: getOutDiscipline,
    },
  ];

  return (
    <div>
      {fields.map(({ id, name, label, options }) => (
        <div key={id} className="mb-4">
          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(label)} *</label>

          <Controller
            control={control}
            name={name}
            defaultValue={artDicipline}
            render={({ field }) => (
              <select
                {...field}
                id={id}
                disabled={query}
                onChange={(val) => {
                  field.onChange(val);
                  setArtDicipline(val.target.value);
                  setValue("artworkStyleType", "");
                }}
                value={artDicipline}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">{t("Select Discipline")}</option>
                {options?.map((option, index: number) => (
                  <option key={index} value={option}>
                    {t(option)}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      ))}

      {errors.artworkDiscipline ? <div className="error text-red-500 mt-1 text-sm">{errors.artworkDiscipline.message}</div> : null}
    </div>
  );
};

export default Dicipline;
