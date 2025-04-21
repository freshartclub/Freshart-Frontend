import { useState } from "react";
import usePostSeriesMutation from "./http/usePostSeries";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/typedReduxHooks";

export const SeriesPop = ({ isOpen, onClose }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const { t } = useTranslation();
  const [series, setSeries] = useState("");
  const { mutateAsync, isPending } = usePostSeriesMutation();

  const handleSeriesValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSeries(value);
  };

  const handleSaveSeries = () => {
    if (!series.trim()) {
      alert(t("Series name cannot be empty."));
      return;
    }

    const data = {
      seriesName: series.trim(),
    };

    try {
      mutateAsync(data).then(() => {
        onClose();
      });
    } catch (error) {
      console.error("Error while saving series:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[100] inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className={`p-6 rounded-lg shadow-lg w-[90%] sm:w-1/3 max-w-[500px] relative ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h1 className={`font-bold mb-4 text-center text-lg sm:text-left ${dark ? "text-white" : "text-black"}`}>{t("Enter New Series Name")}</h1>
        <input
          type="text"
          value={series}
          onChange={handleSeriesValue}
          placeholder={t("Enter New Series Name")}
          className={`py-2 px-3 border mb-5 w-full rounded-md outline-none ${
            dark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-zinc-800"
          }`}
        />
        <div className="flex flex-col w-full min-[450px]:flex-row justify-center sm:justify-end gap-4">
          <button
            className={`px-4 py-2 w-full rounded-md text-white ${isPending ? "bg-green-600" : "bg-green-500 hover:bg-green-600"}`}
            onClick={handleSaveSeries}
            disabled={isPending}
          >
            {isPending ? t("Saving...") : t("Save")}
          </button>
          <button className="px-4 py-2 w-full bg-red-500 hover:bg-red-600 text-white rounded-md" onClick={onClose}>
            {t("Cancel")}
          </button>
        </div>
        <button
          className={`absolute top-2 right-5 text-2xl ${dark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};
