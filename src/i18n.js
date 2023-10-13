// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import bnTranslations from './locales/bn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      bn: {
        translation: bnTranslations,
      },
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language in case the requested language is not available
    interpolation: {
      escapeValue: false, // React already escapes the content, so we don't need additional escaping
    },
  });

export default i18n;
