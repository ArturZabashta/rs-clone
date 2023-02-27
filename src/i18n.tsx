import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

type ILocalize = {
  fallbackLng: string;
  debug: boolean;
  detection: { order: string[]; cache: string[] };
  interpolation: { escapeValue: boolean };
};

i18n
  // Подключение бэкенда i18next
  .use(Backend)
  // Автоматическое определение языка
  .use(LanguageDetector)
  // модуль инициализации
  .use(initReactI18next)
  .init({
    // Стандартный язык
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    // Распознавание и кэширование языковых кук
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  } as ILocalize);

export default i18n;
