import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import { useGetStyle } from "../pages/http/useGetStyle";
import useCustomOrderMutation from "./http/useCustomOrderMutation";

const CustomOrderForm = ({ id, dark }) => {
  const [formData, setFormData] = useState({
    projectDetails: "",
    numberOfArtworks: 1,
    budget: 0,
    discipline: "",
    style: "",
    expectedDeliveryDate: null,
    artistId: id,
  });

  const { data, isLoading: isLoadingDiscipline } = useGetDiscipline();
  const { data: styleData, isLoading: isLoadingStyle } = useGetStyle();

  const disciplineOptions = data?.data?.map((item) => item.disciplineName) || [];
  const newStyle = styleData?.data?.filter((item) => item.discipline?.some((newItem) => newItem.disciplineName.includes(formData.discipline)));

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 10);
    setFormData((prev) => ({ ...prev, numberOfArtworks: value }));
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, budget: value }));
  };

  const handleSelectChange = (name) => (e) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, expectedDeliveryDate: date }));
  };

  const { mutate, isPending } = useCustomOrderMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { id, formData };
    mutate(newData);
  };

  const resetForm = () => {
    setFormData({
      projectDetails: "",
      numberOfArtworks: 1,
      budget: 0,
      discipline: "",
      style: "",
      expectedDeliveryDate: null,
      artistId: id,
    });
  };

  const sliderPercentage = (formData.budget / 50000) * 100;

  return (
    <div
      className={`max-w-2xl mx-auto p-3 rounded-xl shadow-lg transition-all duration-300 ${
        dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-2xl text-center mb-4 font-bold">Custom Art Order</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="projectDetails" className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Project Details
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            required
            value={formData.projectDetails}
            onChange={handleTextChange}
            placeholder="Describe your vision: size, format, colors, emotions, inspiration..."
            rows={5}
            className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] resize-none transition-all ${
              dark ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100" : "bg-white border-gray-300 placeholder-gray-500 text-gray-800"
            }`}
          />
        </div>

        <div>
          <label htmlFor="numberOfArtworks" className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Number of Artworks
            <span className="ml-1 text-xs text-gray-500">(1-10)</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              id="numberOfArtworks"
              required
              name="numberOfArtworks"
              min={1}
              max={10}
              value={formData.numberOfArtworks}
              onChange={handleNumberChange}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${dark ? "bg-gray-600" : "bg-gray-200"}`}
              style={{
                background: `linear-gradient(to right, ${dark ? "#818cf8" : "#4f46e5"} ${(formData.numberOfArtworks - 1) * (100 / 9)}%, ${
                  dark ? "#4b5563" : "#e5e7eb"
                } ${(formData.numberOfArtworks - 1) * (100 / 9)}%)`,
              }}
            />
            <span className={`text-lg font-medium min-w-[2rem] text-center ${dark ? "text-[#ff547f]" : "text-[#EE1D52]"}`}>
              {formData.numberOfArtworks}
            </span>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Budget
            <span className="ml-1 text-xs text-gray-500">(0 - 50,000)</span>
          </label>
          <div className="space-y-2">
            <input
              type="range"
              id="budget"
              required
              name="budget"
              min={0}
              max={50000}
              step={500}
              value={formData.budget}
              onChange={handleBudgetChange}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${dark ? "bg-gray-600" : "bg-gray-200"}`}
              style={{
                background: `linear-gradient(to right, ${dark ? "#818cf8" : "#4f46e5"} ${sliderPercentage}%, ${
                  dark ? "#4b5563" : "#e5e7eb"
                } ${sliderPercentage}%)`,
              }}
            />
            <div className="flex justify-between items-center">
              <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>$0</span>
              <span className={`text-lg font-medium ${dark ? "text-[#ff547f]" : "text-[#EE1D52]"}`}>${formData.budget.toLocaleString()}</span>
              <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>$50,000</span>
            </div>
          </div>
        </div>

        {/* Discipline */}
        <div>
          <label htmlFor="discipline" className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Discipline
          </label>
          <select
            id="discipline"
            name="discipline"
            required
            value={formData.discipline}
            onChange={handleSelectChange("discipline")}
            className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
              dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-800"
            }`}
            disabled={isLoadingDiscipline}
          >
            <option value="">{isLoadingDiscipline ? "Loading..." : "Select Discipline"}</option>
            {disciplineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Style */}
        <div>
          <label htmlFor="style" className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Style
          </label>
          <select
            id="style"
            name="style"
            required
            value={formData.style}
            onChange={handleSelectChange("style")}
            className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
              dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-800"
            }`}
            disabled={isLoadingStyle || !formData.discipline}
          >
            <option value="">{isLoadingStyle ? "Loading..." : !formData.discipline ? "Select a discipline first" : "Select Style"}</option>
            {newStyle?.map((option) => (
              <option key={option?.styleName} value={option?.styleName}>
                {option?.styleName}
              </option>
            ))}
          </select>
        </div>

        {/* Expected Delivery Date */}
        <div>
          <label htmlFor="expectedDeliveryDate" className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Expected Delivery Date
          </label>
          <input
            type="date"
            required
            id="expectedDeliveryDate"
            name="expectedDeliveryDate"
            value={formData.expectedDeliveryDate || ""}
            onChange={(e) => handleDateChange(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
              dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-800"
            }`}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={resetForm}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
              dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`px-5 py-2.5 rounded-lg font-medium text-white bg-[#EE1D52] hover:bg-[#EE1D52]/80 transition-colors ${
              isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Order"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomOrderForm;
