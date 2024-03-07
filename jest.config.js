// jest.config.js
/** @type {import('jest').Config} */

const config = {
  preset: "jest-expo",
  transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
  coveragePathIgnorePatterns: ['node_modules'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/src/_tests_/mocks/',
    '<rootDir>/src/_tests_/customs/',
    '<rootDir>/src/_tests_/config/',
    '<rootDir>/src/_tests_/coverage/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
}

module.exports = config
