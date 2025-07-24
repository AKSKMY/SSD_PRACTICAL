// eslint.config.mjs

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginSecurity from "eslint-plugin-security";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    // apply to all JavaScript variants
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    // register plugins
    plugins: {
      js: pluginJs,
      security: pluginSecurity,
    },

    // pull in each plugin’s recommended rules
    extends: [
      pluginJs.configs.recommended,        // eslint:recommended
      pluginSecurity.configs.recommended,  // eslint-plugin-security/recommended
    ],

    // your custom rule tweaks
    rules: {
      // flag eval-like patterns
      "security/detect-eval-with-expression": "error",

      // example: turn off console.logs in production
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
];
