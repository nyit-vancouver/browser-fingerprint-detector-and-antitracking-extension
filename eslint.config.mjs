import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'prefer-const': 'off',  // 禁用强制使用 const 的规则
      'no-var': 'off' , // 允许使用 var
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'state', // for vuex state
            'acc', // for reduce accumulators
            'e', // for e.returnvalue
          ],
        },
      ],
    }
  },
  {
    languageOptions: { globals: globals.browser }
  },
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
