import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const CustomDropdown = ({ options, control , countryValue }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (countryValue) {
      const prefilledOption = options.data.find(item => item.label.toLowerCase() === countryValue.toLowerCase());
      setSelectedValue(prefilledOption); 
    }
  }, [countryValue, options]);


  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    setSelectedValue(item);
    setSearchTerm('');
    setIsOpen(false);
  };

  const filteredOptions = options.data.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block w-full">
     
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <>
           
            <button
              onClick={toggleDropdown}
              type="button"
              className="flex items-center w-full px-4 py-2  text-gray-700 rounded-md border hover:bg-gray-300 focus:outline-none"
              {...field} 
            >
              {selectedValue ? (
                <>
                
                  <img
                    src={`https://flagcdn.com/w320/${selectedValue.value.toLowerCase()}.png`}
                    alt={selectedValue.label}
                    className="w-5 h-3.5 mr-2"
                  />
            
                  <span>{selectedValue.label}</span>
                </>
              ) : (
                <span>Select Country</span>
              )}
            </button>

           
            {isOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 w-full">
                <input
                  type="text"
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
                  placeholder="Search country"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              
                {filteredOptions.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      handleSelect(item);
                      field.onChange(item.label); 
                    }}
                  >
               
                    <img
                      src={`https://flagcdn.com/w320/${item.value.toLowerCase()}.png`}
                      alt={item.label}
                      className="w-5 h-3.5 mr-2"
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CustomDropdown;
