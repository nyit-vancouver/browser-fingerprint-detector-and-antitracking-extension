module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
        2, 'always',
        [
          'build',
          'feat',
          'fix',
          'docs',
          'style',
          'refactor',
          'perf',
          'test',
          'revert',
          'ci',
          'config',
          'chore',
        ],
    ],
    'type-empty': [2, 'never'],
    'type-case': [0, 'always', 'lower-case'],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
    'subject-full-stop': [0, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [0],
    'footer-leading-blank': [0, 'always'],
  }
}