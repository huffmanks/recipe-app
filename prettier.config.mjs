/** @type {import("prettier").Config}*/
const config = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  bracketSameLine: true,
  singleAttributePerLine: true,
  trailingComma: "es5",
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  tailwindAttributes: ["clsx"],
};

export default config;
