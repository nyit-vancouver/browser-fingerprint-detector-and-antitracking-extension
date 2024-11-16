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
      'max-lines': [
        'error',
        { max: 300, skipBlankLines: true, skipComments: true }
      ],
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
    files: ['constants/language.ts'],
    rules: {
      'max-lines': 'off'
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
