module.exports = {
    displayName: {
        name: 'CLIENT',
        color: 'blue',
    },
    rootDir: './',
    cacheDirectory: '<rootDir>/test/.cache',
    // 模块查找后缀，相当于 webpack.resolve.extensions
    moduleFileExtensions: ['js', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.jsx?$': require.resolve('babel-jest'),
    },
    // js 运行时的环境， node || jsdom
    testEnvironment: 'node', // default: node
    // 待执行的 Unit Test 文件匹配方式
    testMatch: ['**/test/**/*.spec.[jt]s?(x)'], // default: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
    // 收集覆盖率
    collectCoverageFrom: ['src/**/*.js'],
    // 覆盖率产出文件夹
    coverageDirectory: '<rootDir>/coverage',
    // 覆盖率产出形式，控制台 html
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    // 覆盖率是否达标
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
