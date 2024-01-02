module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // If you are using a monorepo or have multiple roots, set this accordingly
  roots: ["<rootDir>/src"],
  // Transform settings are not needed when using the 'ts-jest' preset
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // If you're using modules in your library, you may need to add moduleNameMapper settings
  moduleNameMapper: {
    // Add mappings if necessary (e.g., to handle CSS module imports)
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
  },
  // If you have Jest tests that are not written in TypeScript, you can add them here
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
