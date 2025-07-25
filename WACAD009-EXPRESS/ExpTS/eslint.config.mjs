import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },
  { 
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.node } 
  },
  tseslint.configs.recommended,
  { rules: { '@typescript-eslint/no-unused-vars': 'off', '@typescript-eslint/no-require-imports':'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }},
]);
