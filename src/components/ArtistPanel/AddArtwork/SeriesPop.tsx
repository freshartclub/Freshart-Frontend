import React, { useState } from "react";
import usePostSeriesMutation from "./http/usePostSeries";

export const SeriesPop = ({ isOpen, onClose, onAction }) => {
  if (!isOpen) return null;
  const [series, setSeries] = useState("");
  const { mutateAsync, isPending } = usePostSeriesMutation();

  const handleSeriesValue = (e) => {
    const { value } = e.target;
    setSeries(value);
  };

  const handleSaveSeries = () => {
    if (!series.trim()) {
      alert("Series name cannot be empty.");
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

  const handlePreview = () => {
    onAction("preview");
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-1/3 max-w-[500px] relative">
        <h2 className="text-sm sm:text-md font-bold mb-4 text-center sm:text-left">
          Enter New Series Name
        </h2>
        <input
          type="text"
          value={series}
          onChange={handleSeriesValue}
          placeholder="Enter new series name"
          className="py-2 px-3 border border-zinc-800 mb-5 w-full rounded-md outline-none"
        />
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
          <span
            className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded-md text-center sm:text-left"
            onClick={handleSaveSeries}
            // disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </span>
          <span
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer text-center sm:text-left"
            onClick={handlePreview}
          >
            Cancel
          </span>
        </div>
        <span
          className="absolute top-2 right-2 text-gray-600 cursor-pointer text-xl"
          onClick={onClose}
        >
          X
        </span>
      </div>
    </div>
  );
};
