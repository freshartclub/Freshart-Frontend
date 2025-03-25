import React, { useState } from 'react';
import useCustomOrderMutation from './http/useCustomOrderMutation';

const CustomOrderForm = ({id}) => {
  const [formData, setFormData] = useState({
    projectDetails: '',
    numberOfArtworks: 1,
    budget: 0,
    discipline: '',
    style: '',
    expectedDeliveryDate: null,
  });

  const disciplineOptions = [
    'Painting',
    'Sculpture',
    'Photography',
    'Digital Art',
    'Mixed Media'
  ];

  const styleOptions = [
    'Abstract',
    'Realism',
    'Impressionism',
    'Modern',
    'Traditional'
  ];

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 10);
    setFormData(prev => ({
      ...prev,
      numberOfArtworks: value
    }));
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      budget: value
    }));
  };

  const handleSelectChange = (name) => (e) => {
    setFormData(prev => ({
      ...prev,
      [name]: e.target.value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      expectedDeliveryDate: date
    }));
  };


  const {mutate , isPending } = useCustomOrderMutation()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const newData = {
       id,
      formData
    }
    mutate(newData);
  };

  const resetForm = () => {
    setFormData({
      projectDetails: '',
      numberOfArtworks: 1,
      budget: 0,
      discipline: '',
      style: '',
      expectedDeliveryDate: null,
    });
  };

  // Calculate the percentage for the slider background
  const sliderPercentage = (formData.budget / 50000) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md max-h-[65vh] overflow-y-scroll">
      <h1 className="text-2xl font-bold text-center text-[#111827] mb-6">Custom Art Order</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="projectDetails" className="block text-sm font-medium text-[#111827] mb-1">
            Project Details
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleTextChange}
            placeholder="Enter project details, size, format, color, emotion, location, preferred artists..."
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#111827] focus:border-[#111827] resize-y text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="numberOfArtworks" className="block text-sm font-medium text-[#111827] mb-1">
            Number of Artworks (1-10)
          </label>
          <input
            type="number"
            id="numberOfArtworks"
            name="numberOfArtworks"
            min={1}
            max={10}
            value={formData.numberOfArtworks}
            onChange={handleNumberChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#111827] focus:border-[#111827] text-gray-700"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-[#111827] mb-1">
            Budget (0 - 50,000)
          </label>
          <input
            type="range"
            id="budget"
            name="budget"
            min={0}
            max={50000}
            step={500}
            value={formData.budget}
            onChange={handleBudgetChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #111827 ${sliderPercentage}%, #e5e7eb ${sliderPercentage}%)`
            }}
          />
          <span className="block text-center text-[#111827] mt-2">
            {formData.budget.toLocaleString()}
          </span>
        </div>

        <div>
          <label htmlFor="discipline" className="block text-sm font-medium text-[#111827] mb-1">
            Discipline
          </label>
          <select
            id="discipline"
            name="discipline"
            value={formData.discipline}
            onChange={handleSelectChange('discipline')}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#111827] focus:border-[#111827] text-gray-700"
          >
            <option value="">Select Discipline</option>
            {disciplineOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-[#111827] mb-1">
            Style
          </label>
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleSelectChange('style')}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#111827] focus:border-[#111827] text-gray-700"
          >
            <option value="">Select Style</option>
            {styleOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-[#111827] mb-1">
            Expected Delivery Date
          </label>
          <input
            type="date"
            id="expectedDeliveryDate"
            name="expectedDeliveryDate"
            value={formData.expectedDeliveryDate || ''}
            onChange={(e) => handleDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#111827] focus:border-[#111827] text-gray-700"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#111827] text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-2 transition-colors"
          >
            {isPending ? "Submiting..." :  "Submit Order"}
          </button>
          {/* <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default CustomOrderForm;