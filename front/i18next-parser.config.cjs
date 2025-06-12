// eslint-disable-next-line no-undef
module.exports = {
	defaultNamespace: 'translation',
	createOldCatalogs: false,
	keepRemoved: true,
	indentation: 2,
	lexers: {
		js: ['JsxLexer'], // we're writing jsx inside .js files
		tsx: ['JsxLexer'],
		default: ['JavascriptLexer'],
	},
	lineEnding: 'lf',
	locales: ['en', 'de', 'it', 'es', 'fr'],
	output: 'public/locales/$LOCALE/translation.json',
	input: ['src/**/*.tsx'],
	sort: true,
};
