module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-nested-ternary': 0,
    'import/prefer-default-export': 'off',
    'linebreak-style': 0, // 운영체제마다 개행차이로 생기는 오류
    'arrow-body-style': 'off', // array function 규칙 오프
    'react/self-closing-comp': 'off', // 셀프 클로징 오프
    'prettier/prettier': ['error', { endOfLine: 'auto', useTabs: false }], // eslint-config-prettier에서 제공하는 설정을 활성화해서, Prettier와 충돌하는 몇가지 ESlint 규칙을 무시
    'prefer-arrow-callback': 'off', // eslint-plugin-prettier과 충돌이 일어나는 ESLint core 의 규칙을 비활성화한다.
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수형 컴포넌트의 리턴 타입에 대한 규칙 추가
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/require-default-props': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
