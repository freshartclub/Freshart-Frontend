import React, { useState } from 'react';
import useArtworkExchnageMutation from './http/useArtworkExchnageMutation';

const ArtworkExchangePopup = ({ setOnExchange, setShowReturnInstruction , availableArtworkIds ,dark }) => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    artworkDetails: '',
    specialInstructions: '',
    termsAgreement: false
  });

  


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const { mutateAsync, isPending } = useArtworkExchnageMutation()

  const handleSubmit = (e) => {
    e.preventDefault();

  const values = {
      subscribeIds: availableArtworkIds,
      exchangeIds: [], 
      returnDate: formData.returnDate, 
      pickupDate: formData.pickupDate,
      instructions: formData.specialInstructions
    }
    mutateAsync(values).then(()=>{
      setOnExchange(false)
      setShowReturnInstruction(true)
      console.log('Form submitted:', formData);
    })
   
  };

  return (
    <div className={`fixed inset-0 ${dark ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'} flex items-center justify-center z-50`}>
      <div className={`max-w-md mx-auto ${dark ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 relative`}>
        <button
          onClick={() => setOnExchange(false)}
          className={`absolute top-4 right-4 ${dark ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className={`text-2xl font-bold mb-6 ${dark ? 'text-white' : 'text-gray-800'}`}>
          Artwork Exchange Confirmation
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pickup-date" className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Collection Date
              </label>
              <input
                type="date"
                id="pickup-date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${dark ? 'bg-gray-800 text-white border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>

            <div>
              <label htmlFor="return-date" className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300 ' : 'text-gray-700'}`}>
                Return Date
              </label>
              <input
                type="date"
                id="return-date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${dark ? 'bg-gray-800 text-white border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="special-instructions" className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              Special Instructions (Optional)
            </label>
            <textarea
              id="special-instructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows="2"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${dark ? 'bg-gray-800 text-white border-gray-600' : 'border-gray-300'}`}
              placeholder="Any special handling requirements"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms-agreement"
              name="termsAgreement"
              type="checkbox"
              checked={formData.termsAgreement}
              onChange={handleChange}
              className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded ${dark ? 'border-gray-600 bg-gray-800' : 'border-gray-300'}`}
              required
            />
            <label htmlFor="terms-agreement" className={`ml-2 block text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              I agree to the terms and conditions of the artwork exchange
            </label>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${dark ? 'bg-[#102030] ' : 'bg-[#102030] '} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${dark ? 'dark:focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
            >
              {isPending ? "Loading..." : "Confirm Exchange"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtworkExchangePopup;
