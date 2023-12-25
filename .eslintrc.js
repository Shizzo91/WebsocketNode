module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			},
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"ignorePatterns": [
		"node_modules/**/.js",
		"node_modules/**/.ts",
		"tests/**/*.ts",
		"jest.config.js",
	],
	"rules": {
		"indent": [
			"error", "tab", { "ArrayExpression": 1 },
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"array-bracket-spacing": [
			"error",
			"always"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"space-before-blocks": [
			"error",
			"always"
		],
		"@typescript-eslint/explicit-function-return-type": [ "error" ],
		"@typescript-eslint/typedef": [
			"error",
			{
				"arrowParameter": true,
				"variableDeclaration": true
			}
		]

	}
}
