import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Adicionando o moduleNameMapper para resolver o alias '@'
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeia '@' para a pasta 'src/'
  },
};

export default createJestConfig(config);
