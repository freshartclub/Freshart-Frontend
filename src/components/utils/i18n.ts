import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { imageUrl } from "./baseUrls";


i18n

  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "english",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      // loadPath: `${imageUrl}/lang/{{lng}}.json`,
      // loadPath: `http://localhost:5000/uploads/lang/{{lng}}.json`,
    },
  });

export default i18n;
