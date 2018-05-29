module.exports = {
  'env': {
      'node': true,
      'es6': true
   },
 "parser": "babel-eslint",
      'parserOptions': {
         "sourceType": "module",
         "ecmaVersion": 6,
         'ecmaFeatures': {
           'jsx': true       }
   },

    "plugins": [
        "react"
  ],
    'rules': {
        'indent': [2, 4],
        'brace-style': [2, '1tbs'],
        'no-unused-vars': [1],
        'no-console': [0],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
};
