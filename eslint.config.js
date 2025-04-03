import antfu from "@antfu/eslint-config"

export default antfu({
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  vue: true,
  typescript: true,
}, {
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
})
