/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'app/javascript'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/javascript/$1',
  },
  automock: false,
  setupFiles: ['./config/setupJest.js'],
};
