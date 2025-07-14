import { DEFAULT_LANGUAGE, LANGUAGES } from '@/constants/languages'

export function getLanguage(value: string) {
  return LANGUAGES.find((item) => item.value === value) || DEFAULT_LANGUAGE
}
