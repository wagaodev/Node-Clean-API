module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist", "node_modules"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
