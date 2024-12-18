import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { ARTTIST_ENDPOINTS } from "../../http/apiEndPoints/Artist";
import axiosInstance from "./axios";
import { useAppSelector } from "../../store/typedReduxHooks";

i18n

  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "eng",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: `https://dev.freshartclub.com/images/lang/{{lng}}.json`,
      // loadPath: `http://localhost:5000/uploads/lang/{{lng}}.json`,
    },
  });

export default i18n;
