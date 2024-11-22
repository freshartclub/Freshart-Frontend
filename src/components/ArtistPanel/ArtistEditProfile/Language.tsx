import { useState } from "react";
import { FaAngleDown } from "react-icons/fa"; 

export const options = [
  {
    label: "Change Currency",
    value: "currency",
    choices: [
      { label: "USD", value: "usd", symbol: "$" },
      { label: "EUR", value: "eur", symbol: "€" },
      { label: "GBP", value: "gbp", symbol: "£" },
    ],
    selectedValue: "usd", 
  },
  {
    label: "Change Language",
    value: "language",
    choices: [
      {
        label: "English",
        value: "en",
        url: "https://cdn-icons-png.flaticon.com/128/197/197375.png",
      },
      {
        label: "French",
        value: "fr",
        url: "https://cdn-icons-png.flaticon.com/128/11848/11848223.png",
      },
      {
        label: "Spanish",
        value: "es",
        url: "https://cdn-icons-png.flaticon.com/128/197/197560.png",
      },
    ],
    selectedValue: "es", 
  },
];

const Language = () => {
  const [settings, setSettings] = useState({
    currency: "usd",
    language: "en",
  });

  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleSelectChange = (value: string, key: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setLanguageDropdownOpen(false);
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 border rounded-lg"
        >
         
          <span className="text-black font-semibold">{option.label}</span>

         
          {option.value === "currency" ? (
            <div className="flex items-center">
              <span className="text-lg font-semibold">
                {option.choices.find(
                  (choice) => choice.value === settings.currency
                )?.symbol || ""}
              </span>
              <select
                value={settings.currency}
                onChange={(e) =>
                  handleSelectChange(e.target.value, option.value)
                }
                className="rounded-md p-2 ml-2 focus:outline-none w-20 md:w-32"
              >
                {option.choices.map((choice, idx) => (
                  <option key={idx} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            
            <div className="relative ">
              
              <button
                className="flex items-center justify-between  p-2 "
                onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      option.choices.find(
                        (choice) => choice.value === settings.language
                      )?.url
                    }
                    alt="Flag"
                    className="w-6 h-6"
                  />
                 
                </div>
                <FaAngleDown className="text-gray-600" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute mt-1  bg-white border rounded shadow-md z-10">
                  {option.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      className="flex items-center  p-2 hover:bg-gray-100 focus:outline-none"
                      onClick={() =>
                        handleSelectChange(choice.value, option.value)
                      }
                    >
                      <img
                        src={choice.url}
                        alt={choice.label}
                        className="w-6 h-6"
                      />

                      <span className="ml-2">{choice.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="mt-3 flex justify-end">
        <button className="bg-[#102030] text-white px-4 py-2 rounded font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Language;
