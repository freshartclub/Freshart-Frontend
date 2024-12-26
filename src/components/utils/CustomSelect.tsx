import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const CustomSelect = ({
  options,
  placeholder = "Select an option",
  setSelectedOption,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-[12rem] text-sm">
      {/* Selected Option */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`border border-[#f78494] rounded-full  flex justify-between items-center py-2 px-4 text-center cursor-pointer bg-white hover:border-[#f78494] ${
          isOpen ? "ring-2 ring-[#f78494]" : ""
        }`}
      >
        {selectedOption ? selectedOption.label : placeholder}{" "}
        <RiArrowDropDownLine size="2em" />
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-[#f78494] rounded-lg shadow-lg">
          <li
            onClick={clearSelection}
            className="p-2 text-center hover:bg-[#f78494] hover:text-white cursor-pointer"
          >
            Select
          </li>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="p-2 text-center hover:bg-[#f78494] hover:text-white cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
