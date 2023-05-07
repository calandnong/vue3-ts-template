module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '@fastcoder/eslint-config-vue',
  ],
  // cjs文件环境设置为node,一般都是作为配置文件
  overrides: [
    {
      files: ['*.cjs'],
      env: {
        node: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'filename-rules',
  ],
  rules: {
    // vue用大驼峰 ts用烧烤串
    'filename-rules/match': [2, { '.ts': 'kebabcase' }],
    // 临时关闭，可以手动增加判断环境变量，防止log带到线上环境
    'no-console': 'off',
    // 统一 kebabcase
    'vue/multi-word-component-names': ['error', {
      ignores: ['index'],
    }],
    // 关闭if else换行规则
    '@typescript-eslint/brace-style': [2, '1tbs'],
    // 静止静态行内css
    'vue/no-static-inline-styles': ['error', {
      allowBinding: false,
    }],
  },
};
