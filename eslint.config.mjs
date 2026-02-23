import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const extendedConfigs = compat.config({
  extends: ["next/core-web-vitals", "next/typescript"],
});

const eslintConfig = [
  ...extendedConfigs,
  {
    plugins: { tailwindcss },
    rules: {
      "tailwindcss/classnames-order": "warn", // 클래스명 순서 경고
      "tailwindcss/enforces-shorthand": "warn", // 축약형 사용 권장
      "tailwindcss/no-contradicting-classname": "error", // 상충되는 클래스명 사용 금지
    },
  },
];

export default eslintConfig;
