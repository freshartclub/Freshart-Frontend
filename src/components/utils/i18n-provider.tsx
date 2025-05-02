import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

import { initReactI18next, I18nextProvider as Provider } from "react-i18next";



import { i18nOptions, fallbackLng } from "./config-locales";
import { localStorageGetItem } from "./storage-available";


const lng = localStorageGetItem("i18nextLng", fallbackLng);
console.log(lng);

i18next
 
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)
    )
  )
  .init({ ...i18nOptions(lng), detection: { caches: ["localStorage"] } });

type Props = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: Props) {
  return <Provider i18n={i18next}>{children}</Provider>;
}
