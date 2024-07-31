module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',  // Ajoutez ceci pour transformer les fichiers .js
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/_mocks_/styleMock.js',
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/_mocks_/fileMock.js',
    },
    transformIgnorePatterns: [
        "/node_modules/(?!react-leaflet).+\\.js$",
      ],
  };
  