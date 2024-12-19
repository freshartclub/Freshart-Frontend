import { Controller } from "react-hook-form";
import Header from "../../ui/Header";
import { useGetDiscipline } from "../../pages/http/useGetDiscipline";
import Loader from "../../ui/Loader";

const Dicipline = ({
  query,
  setArtDicipline,
  artDicipline,
  control,
  errors,
}) => {
  const { data, isLoading } = useGetDiscipline();

  const diciplineOption = data?.data.map((item) => {
    return item.disciplineName;
  });

  const fields = [
    {
      id: "artworkdiscipline",
      name: "artworkDiscipline",
      label: "Artwork discipline",
      options: diciplineOption,
    },
  ];

  return (
    <div className="bg-white w-full rounded-md">
      <Header
        variant={{ size: "md", theme: "dark", weight: "semiBold" }}
        className="mb-3"
      >
        Discipline
      </Header>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {fields.map(({ id, name, label, options }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-sm sm:text-base font-semibold text-[#203F58] mb-2"
              >
                {label}
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
                    }}
                    value={artDicipline}
                    className="block w-full p-1 sm:px-4 sm:py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select Discipline
                    </option>
                    {options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
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
      )}
    </div>
  );
};

export default Dicipline;
