module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    testEnvironment: "jsdom", // This is necessary for React testing
};