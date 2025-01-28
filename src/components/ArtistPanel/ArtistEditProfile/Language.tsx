import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../store/typedReduxHooks";
import { setLanguage } from "../../../store/userSlice/userSlice";
import { useTranslation } from "react-i18next";

const options = [
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

const countries = [
  { code: "GB", flag: "https://flagcdn.com/w320/gb.png", name: "English" },
  { code: "ES", flag: "https://flagcdn.com/w320/es.png", name: "Spanish" },
  { code: "CA", flag: "https://flagcdn.com/w320/cat.png", name: "Catalan" },
];

const Language = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    currency: "usd",
    language: "en",
  });

  const [languageSettings, setLanguageSettings] = useState("");
  const [currencySettings, setCurrencySettings] = useState("");
  const [code, setCode] = useState("");

  const dispatch = useAppDispatch();

  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleSelectChange = (value: string, key: string) => {
    setCode(key.toLocaleLowerCase());
    setLanguageSettings(value);
    setSettings((prev) => ({ ...prev, [key]: value }));
    setLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const getLanguage = localStorage.getItem("language");
    const getCurrency = localStorage.getItem("currency");
    const getLangCode = localStorage.getItem("langCode");
    setLanguageSettings(getLanguage || "es");
    setCurrencySettings(getCurrency || "usd");
    setCode(getLangCode || "en");
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem("language", languageSettings);
    localStorage.setItem("currency", currencySettings);
    localStorage.setItem("langCode", code);
    dispatch(setLanguage(languageSettings));
    toast(t("Settings updated"));
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 border rounded-lg"
        >
          <span className="text-black font-semibold">{t(option.label)}</span>

          {option.value === "currency" ? (
            <div className="flex items-center">
              <span className="text-lg font-semibold">
                {option.choices.find(
                  (choice) => choice.value === settings.currency
                )?.symbol || ""}
              </span>
              <select
                value={currencySettings}
                onChange={(e) => setCurrencySettings(e.target.value)}
                className="rounded-md p-2 ml-2 focus:outline-none w-20 md:w-32"
              >
                {option.choices.map((choice, idx) => (
                  <option key={idx} value={choice.label}>
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
                    src={`https://flagcdn.com/w320/${code}.png`}
                    alt="Flag"
                    className="w-6 h-6"
                  />
                </div>
                <FaAngleDown className="text-gray-600" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute mt-1  bg-white border rounded shadow-md z-10">
                  {countries?.map((choice, idx) => (
                    <button
                      key={idx}
                      className="flex items-center  p-2 hover:bg-gray-100 focus:outline-none"
                      onClick={() =>
                        handleSelectChange(choice.name, choice.code)
                      }
                    >
                      <img
                        src={choice.flag}
                        alt={choice.name}
                        className="w-6 h-6"
                      />

                      <span className="ml-2">{choice.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleSaveChanges}
          className="bg-[#102030] text-white px-4 py-2 rounded font-semibold"
        >
          {t("Save Changes")}
        </button>
      </div>
    </div>
  );
};

export default Language;
