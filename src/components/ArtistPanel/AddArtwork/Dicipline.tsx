import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Header from "../../ui/Header";

const Dicipline = ({
  query,
  setArtDicipline,
  artDicipline,
  control,
  errors,
  getOutDiscipline,
  setValue,
}) => {
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
    <div className="bg-white w-full rounded-md">
      <div>
        {fields.map(({ id, name, label, options }) => (
          <div key={id} className="mb-4">
            <label
              htmlFor={id}
              className="block text-sm sm:text-base font-semibold text-[#203F58] mb-2"
            >
              {t(label)} *
            </label>

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
                  className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    {t("Select Discipline")}
                  </option>
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

        {errors.artworkDiscipline ? (
          <div className="error text-red-500 mt-1 text-sm">
            {errors.artworkDiscipline.message}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dicipline;
