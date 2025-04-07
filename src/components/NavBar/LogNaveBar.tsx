import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowOutward } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import semicircle from "../../assets/semicircle.png";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { setLanguage } from "../../store/userSlice/userSlice";
import logo from "/logofarc.svg";

const LogNaveBar = () => {
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const [languageSettings, setLanguageSettings] = useState("");
  const [currencySettings, setCurrencySettings] = useState("");
  const [flag, setFlag] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const getCurrency = localStorage.getItem("currency");

  const countries = [
    {
      code: "ES",
      flag: "https://flagcdn.com/w320/es.png",
      name: "Spanish",
      val: "es",
      nativeName: "Español",
    },
    {
      code: "CAT",
      flag: "https://www.flagcolorcodes.com/data/Flag-of-Catalonia.png",
      name: "Catalan",
      val: "cat",
      nativeName: "Catala",
    },
    {
      code: "GB",
      flag: "https://flagcdn.com/w320/gb.png",
      name: "English",
      val: "gb",
      nativeName: "English",
    },
  ];

  useEffect(() => {
    const getLanguage = localStorage.getItem("language");
    const getLangCode = localStorage.getItem("langCode");
    setFlag(
      countries.find((country) => country.val === getLangCode)?.flag ||
        "https://flagcdn.com/w320/gb.png"
    );
    setLanguageSettings(
      getLanguage === "Spanish"
        ? "Español"
        : getLanguage === "Catalan"
        ? "Català"
        : "English"
    );
    setCurrencySettings(getCurrency || "usd");
  }, []);

  const handleSelectChange = (
    value: string,
    key: string,
    flag: string,
    navtiveName: string
  ) => {
    localStorage.setItem("language", value);
    localStorage.setItem("langCode", flag);
    localStorage.setItem("currency", currencySettings);

    dispatch(setLanguage(value));
    setFlag(
      countries.find((country) => country.val === flag)?.flag ||
        "https://flagcdn.com/w320/gb.png"
    );
    setLanguageSettings(navtiveName);
    setLanguageDropdownOpen(false);
  };

  const userLanguage = navigator.language || navigator.userLanguage;

  useEffect(() => {
    if (userLanguage && !localStorage.getItem("language")) {
      const userLanguageCode = userLanguage.split("-")[0];
      const userLanguageObj = countries.find(
        (country) => country.val === userLanguageCode
      );
      if (userLanguageObj) {
        setFlag(userLanguageObj.val);
        localStorage.setItem("language", userLanguageObj.name);
        localStorage.setItem("langCode", userLanguageObj.val);

        setLanguageSettings(userLanguageObj.name);
        dispatch(setLanguage(userLanguageObj.name));
      }
    }
  }, []);

  const handeleLanguage = () => {
    setLanguageDropdownOpen((prev) => !prev);
  };

  const location = useLocation();
  const isSignupPage = location.pathname.includes("login");

  return (
    <div className="mx-auto shadow-md md:px-6 px-3">
      <header className="relative py-4">
        <div className="flex md:flex-row relative flex-col justify-between items-center">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Fresh Art Club"
            className="h-10 cursor-pointer"
          />

          <div className="flex max-[430px]:flex-col-reverse max-[430px]:w-full items-center gap-3 mt-6 md:mt-0 relative">
            <div>
              <span
                className="flex bg-[#102031] font-semibold md:text-base text-sm text-white gap-2 items-center cursor-pointer justify-between border border-zinc-200 p-2 px-3 rounded-full focus:outline-none"
                onClick={handeleLanguage}
              >
                <img className="w-5 h-5 object-cover" src={flag} alt="" />
                <h1 className="font-semibold">{languageSettings}</h1>
              </span>

              {isLanguageDropdownOpen && (
                <div className="absolute mt-1 top-12 left-0 bg-white border rounded shadow-md z-10">
                  {countries?.map((choice, idx) => (
                    <button
                      key={idx}
                      className="flex items-center p-2 hover:bg-gray-100 focus:outline-none"
                      onClick={() =>
                        handleSelectChange(
                          choice.name,
                          choice.code,
                          choice.val,
                          choice.nativeName
                        )
                      }
                    >
                      <img
                        src={choice.flag}
                        alt={choice.name}
                        className="w-6 h-6"
                      />

                      <span className="ml-2">{choice.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isSignupPage ? (
              <span
                className="cursor-pointer bg-[#102031] font-semibold md:text-base text-sm text-white p-2 rounded-full flex max-[430px]:w-full justify-center  gap-2 items-center"
                onClick={() => navigate("/become_artist")}
              >
                {t("Become an Artist")}
                <MdArrowOutward />
              </span>
            ) : (
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer bg-[#102031] font-semibold md:text-base text-sm text-white p-2 px-2.5 rounded-full flex max-[430px]:w-full justify-center gap-2  items-center"
              >
                {t("Sign In")}
                <MdArrowOutward />
              </span>
            )}
          </div>
        </div>
        <img
          src={semicircle}
          alt="Semicircle"
          className="md:absolute hidden right-[50%] left-[50%] top-0 h-full"
        />
      </header>
    </div>
  );
};

export default LogNaveBar;
