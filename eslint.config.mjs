// eslint.config.mjs

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginSecurity from "eslint-plugin-security";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    // only run on your source files…
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    // register the security plugin (no need to register "js" for core rules)
    plugins: {
      security: pluginSecurity,
    },

    rules: {
      // 1) spread in all the core-recommended rules
      ...pluginJs.configs.recommended.rules,

      // 2) spread in all the security-recommended rules
      ...pluginSecurity.configs.recommended.rules,

      // 3) your custom overrides:
      "security/detect-eval-with-expression": "error",
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
];
