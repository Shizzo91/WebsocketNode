const ignorePatterns = [
    "dist/.*",
    "node_modules/.*",
    "tests/__helpers__/.*",
    "tests/__mocks__/.*",
]

module.exports = {
    roots: [
        ""
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testPathIgnorePatterns: [
        ...ignorePatterns,
    ],
    coveragePathIgnorePatterns: [
        ...ignorePatterns,
    ],
    testTimeout: 30000,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: [
        'text',
        'html'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
}