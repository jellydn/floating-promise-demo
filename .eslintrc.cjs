/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
};
