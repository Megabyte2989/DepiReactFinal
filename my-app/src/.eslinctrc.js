module.exports = {
    parser: 'babel-eslint', // Use babel-eslint for parsing
    parserOptions: {
        ecmaVersion: 2020, // Use the latest ECMAScript features
        sourceType: 'module', // Enable ES modules
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended', // Add React specific rules
        'react-app', // Include react-app settings
        'react-app/jest' // Include jest settings
    ],
    rules: {
        // Your custom rules here, if any
    },
};
