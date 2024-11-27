import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { ARTTIST_ENDPOINTS } from "../../http/apiEndPoints/Artist";
import axiosInstance from "./axios";

i18n
  .use(Backend) // Use i18next-http-backend
  .use(initReactI18next)
  .init({
    fallbackLng: "eng", // Fallback language if a translation is missing
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: `https://dev.freshartclub.com/images/lang/{{lng}}.json`,
    },
  });

console.log(i18n.language);
export default i18n;
