/* eslint-env node */
module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint"
	],
	ignorePatterns: [
		"node_modules/**/.js",
		"node_modules/**/.ts",
		"tests/**/*.ts",
		"jest.config.js",
	],
	root: true,
}