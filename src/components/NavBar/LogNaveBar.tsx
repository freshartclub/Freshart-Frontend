import P from "../ui/P";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/loginlogo.png";
import semicircle from "../../assets/semicircle.png";
import globe from "../../assets/glob.png";
import arrow3 from "../../assets/arrow_3.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { setLanguage } from "../../store/userSlice/userSlice";

const LogNaveBar = () => {
  const [settings, setSettings] = useState({
    currency: "usd",
    language: "en",
  });
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const [languageSettings, setLanguageSettings] = useState("");
  const [currencySettings, setCurrencySettings] = useState("");
  const [flag, setFlag] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRedirectToArtistLogin = () => {
    navigate("/become_artist");
  };

  const { t, i18n } = useTranslation();

  const handleRedirectToBecomeAnArtist = () => {
    navigate("/become_artist");
  };

  const redirectToHomepage = () => {
    navigate("/");
  };

  // const getLanguage = localStorage.getItem("language");
  const getCurrency = localStorage.getItem("currency");
  const getLangCode = localStorage.getItem("langCode");

  useEffect(() => {
    const getLanguage = localStorage.getItem("language");
    const getLangCode = localStorage.getItem("langCode");
    setFlag(getLangCode.toLocaleLowerCase() || "es");
    setLanguageSettings(getLanguage || "en");
    setCurrencySettings(getCurrency || "usd");
  }, []);

  const countries = [
    { code: "GB", flag: "https://flagcdn.com/w320/gb.png", name: "English" },
    {
      code: "US",
      flag: "https://flagcdn.com/w320/us.png",
      name: "English (US)",
    },
    { code: "ES", flag: "https://flagcdn.com/w320/es.png", name: "Spanish" },
    { code: "CAT", flag: "https://flagcdn.com/w320/ct.png", name: "Catalan" },
  ];

  const handleSelectChange = (value: string, key: string, flag) => {
    localStorage.setItem("language", value);
    localStorage.setItem("langCode", key);
    localStorage.setItem("currency", currencySettings);

    dispatch(setLanguage(value));
    setFlag(key.toLocaleLowerCase());
    setLanguageSettings(value);
    setSettings((prev) => ({ ...prev, [key]: value }));
    setLanguageDropdownOpen(false);
  };

  const handeleLanguage = () => {
    setLanguageDropdownOpen((prev) => !prev);
  };

  const location = useLocation();
  const isSignupPage = location.pathname.includes("signup");

  return (
    <div className="bg-[#F9F7F6]">
      <div className="container mx-auto md:px-6 px-3">
        <header className="relative py-4">
          <div className=" flex md:flex-row relative flex-col justify-between items-center">
            <div onClick={redirectToHomepage}>
              <img
                src={logo}
                alt="Fresh Art Club"
                className="h-10 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 mt-6 md:mt-0 relative">
              <div className="">
                <span
                  className=" py-3 flex gap-5 items-center cursor-pointer justify-between text-sm border border-zinc-200 px-5 font-medium text-gray-700 hover:text-gray-800 focus:outline-none"
                  onClick={handeleLanguage}
                >
                  <img
                    className="w-5 h-5 object-cover"
                    src={`https://flagcdn.com/w320/${flag}.png`}
                    alt=""
                  />
                  <h1 className=" font-semibold">{languageSettings}</h1>
                </span>

                {isLanguageDropdownOpen && (
                  <div className="absolute mt-1 top-12 left-0 bg-white border rounded shadow-md z-10">
                    {countries?.map((choice, idx) => (
                      <button
                        key={idx}
                        className="flex items-center  p-2 hover:bg-gray-100 focus:outline-none"
                        onClick={() =>
                          handleSelectChange(
                            choice.name,
                            choice.code,
                            choice.flag
                          )
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

              {/* <Link to="/">
                <img src={globe} alt="" className="mr-5" />
              </Link> */}

              {isSignupPage ? (
                <Link to="/login" className="text-black mr-4 uppercase">
                  {t("Sign in")}
                </Link>
              ) : null
              // <Link to="/signup" className="text-black mr-4 uppercase">
              //   {t("Sign up")}
              // </Link>
              }

              {isSignupPage ? (
                <Button
                  variant={{
                    theme: "dark",
                    rounded: "full",
                    fontWeight: "500",
                    thickness: "thick",
                    fontSize: "base",
                  }}
                  className="flex justify-center items-center"
                  onClick={handleRedirectToBecomeAnArtist}
                >
                  <P
                    variant={{ theme: "light", weight: "normal" }}
                    className="md:text-base text-sm"
                  >
                    {t("Become an artist")}
                  </P>
                  <img src={arrow3} alt="arrow" className="ml-2 mt-1" />
                </Button>
              ) : (
                <Button
                  variant={{
                    theme: "dark",
                    rounded: "full",
                    fontWeight: "500",
                    thickness: "thick",
                    fontSize: "base",
                  }}
                  className="flex justify-center items-center"
                >
                  <P
                    variant={{ size: "base", theme: "light", weight: "normal" }}
                    onClick={handleRedirectToArtistLogin}
                  >
                    {t("Become an artist")}
                  </P>
                  <img src={arrow3} alt="arrow" className="ml-2 mt-1" />
                </Button>
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
    </div>
  );
};

export default LogNaveBar;
