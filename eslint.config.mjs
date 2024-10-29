import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tseslint,
    },
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "prettier/prettier": "error", // Ensures Prettier rules are enforced
    },
    globals: {
      process: "readonly",
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig, // Disables conflicting ESLint rules with Prettier
];
