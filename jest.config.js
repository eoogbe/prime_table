/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'app/javascript'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/javascript/$1',
  },
};
