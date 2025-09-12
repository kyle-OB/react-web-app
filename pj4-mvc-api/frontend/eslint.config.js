import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];

{ ignores: ['dist','eslint.config.js','vite.config.js'] }

{
     
  {
    js.configs.recommended.rules,
    react.configs.recommended.rules,
    react.configs['jsx-runtime'].rules,
    reactHooks.configs.recommended.rules,
    'react/jsx-no-target-blank'; 'off',
    'react-refresh/only-export-components'; [
      'warn',
      { allowConstantExport: true },
    ],
    "semi"; ["error", "always"]
  }
}

