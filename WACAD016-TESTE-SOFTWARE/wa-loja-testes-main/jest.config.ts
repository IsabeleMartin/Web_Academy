import type { Config } from "jest";
import nextJest from "next/jest";

// Cria a configuração personalizada para o Next.js
const createJestConfig = nextJest({
  dir: "./", // Diretório raiz do projeto
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom", // Define o ambiente de testes como jsdom (simulando um navegador)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Configurações que devem ser aplicadas após o ambiente de teste ser configurado
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Resolve o alias '@' para o diretório 'src'
  },
};

export default createJestConfig(config); // Exportando a configuração final
