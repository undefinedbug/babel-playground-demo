module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    // 'prettier/prettier': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unreachable': 0,
    quotes: ['error', 'single'], // 强制使用单引号
    semi: ['error', 'never'], // 强制不使用分号结尾
    // 多行使用拖尾逗号（默认never）
    'comma-dangle': [
      'error',
      {
        arrays: 'ignore',
        objects: 'ignore',
        imports: 'ignore',
        exports: 'ignore',
        functions: 'ignore',
      },
    ],
    'no-prototype-builtins': ['error'],
    'max-len': ['error', { code: 120 }],
    'no-var': 'error',
    'no-eval': 'error',
    'lines-between-class-members': ['error', 'always'],
    // 'block-spacing': 'error',
    // 'vue/html-self-closing': [
    //   'error',
    //   {
    //     html: { normal: 'never', void: 'any' },
    //   },
    // ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/name-property-casing': ['error', 'KebabCase'],
    // 'vue/html-self-closing': [
    //   'error',
    //   {
    //     html: {
    //       void: 'any',
    //     },
    //   },
    // ],
    // 'array-element-newline': ['error', 'always'],
    // 'array-bracket-newline': ['error', 'consistent'],
    // 'array-bracket-spacing': ['error', 'always'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
