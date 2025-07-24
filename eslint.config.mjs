// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginSecurity from "eslint-plugin-security";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // apply to all JS/JSX/MJS/CJS files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    // register your plugins
    plugins: {
      js: pluginJs,
      react: pluginReact,
      security: pluginSecurity,
    },

    // pull in each plugin’s "recommended" config
    // note: pluginJs.configs.recommended is the same as "eslint:recommended"
    extends: [
      pluginJs.configs.recommended,
      pluginReact.configs.recommended,
      pluginSecurity.configs.recommended,
    ],

    // any extra rule tweaks
    rules: {
      // catch dangerous eval-like patterns
      "security/detect-eval-with-expression": "error",
      // your other overrides…
    },
  },
];
