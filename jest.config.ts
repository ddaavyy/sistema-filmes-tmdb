import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        diagnostics: { ignoreCodes: [1343, 2339] },
        tsconfig: {
          target: "ES2020",
          module: "CommonJS",
          moduleResolution: "node",
          lib: ["ES2020", "DOM"],
          jsx: "react-jsx",
          esModuleInterop: true,
          allowJs: true,
          resolveJsonModule: true,
          skipLibCheck: true,
          strict: true,
          types: ["jest", "@testing-library/jest-dom", "node"],
          baseUrl: ".",
          paths: {
            "@src/*": ["src/*"],
            "@modules/*": ["src/modules/*"],
            "@shared/*": ["src/shared/*"],
          },
        },
      },
    ],
  },
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/__tests__/**",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
    "!coverage/**",
  ],
  coveragePathIgnorePatterns: ["routes.ts"],
};

export default config;
