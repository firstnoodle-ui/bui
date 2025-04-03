import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  vue: true,
  typescript: true,
}, {
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "vue/custom-event-name-casing": "off",
    "antfu/top-level-function": "off",
    "ts/no-unsafe-function-types": "off",
  },
});
