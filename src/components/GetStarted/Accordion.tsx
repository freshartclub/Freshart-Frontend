import { useState, useRef } from "react";

const Accordion = ({ title, content }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white border border-[#D3D3D3] rounded-lg my-2">
      <button
        onClick={toggleAccordion}
        className="w-full p-4 text-left text-gray-700 font-medium focus:outline-none focus:ring focus:ring-gray-200"
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <svg
            className={`w-5 h-5 transition-transform bg-black text-white rounded-full transform ${
              isOpen ? "rotate-0" : "rotate-90"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12M6 12h12"
              />
            )}
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 border-t border-gray-200">
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
