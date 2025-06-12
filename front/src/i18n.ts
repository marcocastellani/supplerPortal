import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const availableLanguages = ['en', 'de', 'it'];

i18n
	.use(LanguageDetector)
	.use(Backend)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		supportedLngs: availableLanguages,
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		react: {
			useSuspense: false,
		},
	});

export default i18n;
