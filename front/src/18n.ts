import i18n, { InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export type I18n = typeof i18n;

const i18nOptions: InitOptions = {
  //  fallbackLng: 'ru',
  //  debug: true,
    detection: {
        order: ['queryString', 'cookie'],
        caches: ['cookie'],
    },
    interpolation: {
        escapeValue: true,
    },
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nOptions);

export default i18n as I18n;