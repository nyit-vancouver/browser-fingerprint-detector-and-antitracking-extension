import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'state', // for vuex state
            'acc', // for reduce accumulators
            'e' // for e.returnvalue
          ]
        }
      ]
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
