module.exports = {
  roots: ["<rootDir>/src"],
  preset: "@shelf/jest-mongodb",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist", "node_modules"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/.*/index.ts",
    "/src/.*/index.js",
  ],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};
