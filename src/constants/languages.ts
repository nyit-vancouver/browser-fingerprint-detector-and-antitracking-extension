export interface Language {
  name: string
  value: string
  code: string
  nav: string[]
}

export const DEFAULT_LANGUAGE: Language = {
  name: 'English (US)',
  value: 'en-US,en;q=0.5',
  code: 'en-US',
  nav: ['en-US', 'en']
}

export const LANGUAGES: Language[] = [
  {
    name: 'Acholi',
    value: 'ach,en-GB;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'ach',
    nav: ['ach', 'en-GB', 'en-US', 'en']
  },
  {
    name: 'Afrikaans',
    value: 'af,en-ZA;q=0.8,en-GB;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'af',
    nav: ['af', 'en-ZA', 'en-GB', 'en']
  },
  {
    name: 'Albanian',
    value: 'sq,sq-AL;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'sq',
    nav: ['sq', 'sq-AL', 'en-US', 'en']
  },
  {
    name: 'Arabic',
    value: 'ar,en-US;q=0.7,en;q=0.3',
    code: 'ar',
    nav: ['ar', 'en-US', 'en']
  },
  {
    name: 'Aragonese',
    value: 'an,es-ES;q=0.8,es;q=0.7,ca;q=0.5,en-US;q=0.3,en;q=0.2',
    code: 'an',
    nav: ['an', 'es-ES', 'es', 'ca', 'en-US', 'en']
  },
  {
    name: 'Armenian',
    value: 'hy-AM,hy;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'hy-AM',
    nav: ['hy-AM', 'hy', 'en-US', 'en']
  },
  {
    name: 'Assamese',
    value: 'as,en-US;q=0.7,en;q=0.3',
    code: 'as',
    nav: ['as', 'en-US', 'en']
  },
  {
    name: 'Asturian',
    value: 'ast,es-ES;q=0.8,es;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'ast',
    nav: ['ast', 'es-ES', 'es', 'en-US', 'en']
  },
  {
    name: 'Azerbaijani',
    value: 'az-AZ,az;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'az-AZ',
    nav: ['az-AZ', 'az', 'en-US', 'en']
  },
  {
    name: 'Basque',
    value: 'eu,en-US;q=0.7,en;q=0.3',
    code: 'eu',
    nav: ['eu', 'en-US', 'en']
  },
  {
    name: 'Belarusian',
    value: 'be,en-US;q=0.7,en;q=0.3',
    code: 'be',
    nav: ['be', 'en-US', 'en']
  },
  {
    name: 'Bengali (Bangladesh)',
    value: 'bn-BD,bn;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'bn-BD',
    nav: ['bn-BD', 'bn', 'en-US', 'en']
  },
  {
    name: 'Bengali (India)',
    value: 'bn-IN,bn;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'bn-IN',
    nav: ['bn-IN', 'bn', 'en-US', 'en']
  },
  {
    name: 'Bosnian',
    value: 'bs-BA,bs;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'bs-BA',
    nav: ['bs-BA', 'bs', 'en-US', 'en']
  },
  {
    name: 'Breton',
    value: 'br,fr-FR;q=0.8,fr;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'br',
    nav: ['br', 'fr-FR', 'fr', 'en-US', 'en']
  },
  {
    name: 'Bulgarian',
    value: 'bg,en-US;q=0.7,en;q=0.3',
    code: 'bg',
    nav: ['bg', 'en-US', 'en']
  },
  {
    name: 'Burmese',
    value: 'my,en-GB;q=0.7,en;q=0.3',
    code: 'my',
    nav: ['my', 'en-GB', 'en']
  },
  {
    name: 'Catalan',
    value: 'ca,en-US;q=0.7,en;q=0.3',
    code: 'ca',
    nav: ['ca', 'en-US', 'en']
  },
  {
    name: 'Chinese (Hong Kong)',
    value: 'zh-HK,zh;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'zh-HK',
    nav: ['zh-HK', 'zh', 'en-US', 'en']
  },
  {
    name: 'Chinese (Simplified)',
    value: 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
    code: 'zh-CN',
    nav: ['zh-CN', 'zh', 'zh-TW', 'zh-HK', 'en-US', 'en']
  },
  {
    name: 'Chinese (Traditional)',
    value: 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'zh-TW',
    nav: ['zh-TW', 'zh', 'en-US', 'en']
  },
  {
    name: 'Croatian',
    value: 'hr-HR,hr;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'hr-HR',
    nav: ['hr-HR', 'hr', 'en-US', 'en']
  },
  {
    name: 'Czech',
    value: 'cs,sk;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'cs',
    nav: ['cs', 'sk', 'en-US', 'en']
  },
  {
    name: 'Danish',
    value: 'da,en-US;q=0.7,en;q=0.3',
    code: 'da',
    nav: ['da', 'en-US', 'en']
  },
  {
    name: 'Dutch',
    value: 'nl,en-US;q=0.7,en;q=0.3',
    code: 'nl',
    nav: ['nl', 'en-US', 'en']
  },
  {
    name: 'English (Australian)',
    value: 'en-AU,en;q=0.5',
    code: 'en-AU',
    nav: ['en-AU', 'en']
  },
  {
    name: 'English (British)',
    value: 'en-GB,en;q=0.5',
    code: 'en-GB',
    nav: ['en-GB', 'en']
  },
  {
    name: 'English (Canadian)',
    value: 'en-CA,en-US;q=0.7,en;q=0.3',
    code: 'en-CA',
    nav: ['en-CA', 'en-US', 'en']
  },
  {
    name: 'English (South African)',
    value: 'en-ZA,en-GB;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'en-ZA',
    nav: ['en-ZA', 'en-GB', 'en-US', 'en']
  },
  {
    name: 'English (US)',
    value: 'en-US,en;q=0.5',
    code: 'en-US',
    nav: ['en-US', 'en']
  },
  {
    name: 'Esperanto',
    value: 'eo,en-US;q=0.7,en;q=0.3',
    code: 'eo',
    nav: ['eo', 'en-US', 'en']
  },
  {
    name: 'Estonian',
    value: 'et,et-EE;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'et',
    nav: ['et', 'et-EE', 'en-US', 'en']
  },
  {
    name: 'Finnish',
    value: 'fi-FI,fi;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'fi-FI',
    nav: ['fi-FI', 'fi', 'en-US', 'en']
  },
  {
    name: 'French',
    value: 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'fr',
    nav: ['fr', 'fr-FR', 'en-US', 'en']
  },
  {
    name: 'Frisian',
    value: 'fy-NL,fy;q=0.8,nl;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'fy-NL',
    nav: ['fy-NL', 'fy', 'nl', 'en-US', 'en']
  },
  {
    name: 'Fulah',
    value: 'ff,fr-FR;q=0.8,fr;q=0.7,en-GB;q=0.5,en-US;q=0.3,en;q=0.2',
    code: 'ff',
    nav: ['ff', 'fr-FR', 'fr', 'en-GB', 'en-US', 'en']
  },
  {
    name: 'Gaelic (Scotland)',
    value: 'gd-GB,gd;q=0.8,en-GB;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'gd-GB',
    nav: ['gd-GB', 'gd', 'en-GB', 'en-US', 'en']
  },
  {
    name: 'Galician',
    value: 'gl-GL,gl;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'gl-GL',
    nav: ['gl-GL', 'gl', 'en-US', 'en']
  },
  {
    name: 'Georgian',
    value: 'ka,ka-GE;q=0.7,en;q=0.3',
    code: 'ka',
    nav: ['ka', 'ka-GE', 'en']
  },
  {
    name: 'German',
    value: 'de,en-US;q=0.7,en;q=0.3',
    code: 'de',
    nav: ['de', 'en-US', 'en']
  },
  {
    name: 'German (Switzerland)',
    value: 'de-CH,de;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'de-CH',
    nav: ['de-CH', 'de', 'en-US', 'en']
  },
  {
    name: 'Greek',
    value: 'el-GR,el;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'el-GR',
    nav: ['el-GR', 'el', 'en-US', 'en']
  },
  {
    name: 'Guarani',
    value: 'gn,es;q=0.8,en;q=0.5,en-US;q=0.3',
    code: 'gn',
    nav: ['gn', 'es', 'en', 'en-US']
  },
  {
    name: 'Gujarati (India)',
    value: 'gu-IN,gu;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'gu-IN',
    nav: ['gu-IN', 'gu', 'en-US', 'en']
  },
  {
    name: 'Hebrew',
    value: 'he,he-IL;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'he',
    nav: ['he', 'he-IL', 'en-US', 'en']
  },
  {
    name: 'Hindi (India)',
    value: 'hi-IN,hi;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'hi-IN',
    nav: ['hi-IN', 'hi', 'en-US', 'en']
  },
  {
    name: 'Hungarian',
    value: 'hu-HU,hu;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'hu-HU',
    nav: ['hu-HU', 'hu', 'en-US', 'en']
  },
  {
    name: 'Icelandic',
    value: 'is,en-US;q=0.7,en;q=0.3',
    code: 'is',
    nav: ['is', 'en-US', 'en']
  },
  {
    name: 'Indonesian',
    value: 'id,en-US;q=0.7,en;q=0.3',
    code: 'id',
    nav: ['id', 'en-US', 'en']
  },
  {
    name: 'Interlingua',
    value: 'ia,en-US;q=0.7,en;q=0.3',
    code: 'ia',
    nav: ['ia', 'en-US', 'en']
  },
  {
    name: 'Irish',
    value: 'ga-IE,ga;q=0.8,en-IE;q=0.7,en-GB;q=0.5,en-US;q=0.3,en;q=0.2',
    code: 'ga-IE',
    nav: ['ga-IE', 'ga', 'en-IE', 'en-GB', 'en-US', 'en']
  },
  {
    name: 'Italian',
    value: 'it-IT,it;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'it-IT',
    nav: ['it-IT', 'it', 'en-US', 'en']
  },
  {
    name: 'Japanese',
    value: 'ja,en-US;q=0.7,en;q=0.3',
    code: 'ja',
    nav: ['ja', 'en-US', 'en']
  },
  {
    name: 'Kabyle',
    value: 'kab-DZ,kab;q=0.8,fr-FR;q=0.7,fr;q=0.5,en-US;q=0.3,en;q=0.2',
    code: 'kab-DZ',
    nav: ['kab-DZ', 'kab', 'fr-FR', 'fr', 'en-US', 'en']
  },
  {
    name: 'Kannada',
    value: 'kn-IN,kn;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'kn-IN',
    nav: ['kn-IN', 'kn', 'en-US', 'en']
  },
  {
    name: 'Kaqchikel',
    value: 'cak,kaq;q=0.8,es;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'cak',
    nav: ['cak', 'kaq', 'es', 'en-US', 'en']
  },
  {
    name: 'Kazakh',
    value: 'kk,ru;q=0.8,ru-RU;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'kk',
    nav: ['kk', 'ru', 'ru-RU', 'en-US', 'en']
  },
  {
    name: 'Khmer',
    value: 'km,en-US;q=0.7,en;q=0.3',
    code: 'km',
    nav: ['km', 'en-US', 'en']
  },
  {
    name: 'Korean',
    value: 'ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'ko-KR',
    nav: ['ko-KR', 'ko', 'en-US', 'en']
  },
  {
    name: 'Latvian',
    value: 'lv,en-US;q=0.7,en;q=0.3',
    code: 'lv',
    nav: ['lv', 'en-US', 'en']
  },
  {
    name: 'Ligurian',
    value: 'lij,it;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'lij',
    nav: ['lij', 'it', 'en-US', 'en']
  },
  {
    name: 'Lithuanian',
    value: 'lt,en-US;q=0.8,en;q=0.6,ru;q=0.4,pl;q=0.2',
    code: 'lt',
    nav: ['lt', 'en-US', 'en', 'ru', 'pl']
  },
  {
    name: 'Lower Sorbian',
    value: 'dsb,hsb;q=0.8,de;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'dsb',
    nav: ['dsb', 'hsb', 'de', 'en-US', 'en']
  },
  {
    name: 'Macedonian',
    value: 'mk-MK,mk;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'mk-MK',
    nav: ['mk-MK', 'mk', 'en-US', 'en']
  },
  {
    name: 'Maithili',
    value: 'mai,hi-IN;q=0.7,en;q=0.3',
    code: 'mai',
    nav: ['mai', 'hi-IN', 'en']
  },
  {
    name: 'Malay',
    value: 'ms,en-US;q=0.7,en;q=0.3',
    code: 'ms',
    nav: ['ms', 'en-US', 'en']
  },
  {
    name: 'Malayalam',
    value: 'ml-IN,ml;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'ml-IN',
    nav: ['ml-IN', 'ml', 'en-US', 'en']
  },
  {
    name: 'Marathi',
    value: 'mr-IN,mr;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'mr-IN',
    nav: ['mr-IN', 'mr', 'en-US', 'en']
  },
  {
    name: 'Nepali',
    value: 'ne-NP,ne;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'ne-NP',
    nav: ['ne-NP', 'ne', 'en-US', 'en']
  },
  {
    name: 'Norwegian (Bokmål)',
    value:
      'nb-NO,nb;q=0.9,no-NO;q=0.8,no;q=0.6,nn-NO;q=0.5,nn;q=0.4,en-US;q=0.3,en;q=0.1',
    code: 'nb-NO',
    nav: ['nb-NO', 'nb', 'no-NO', 'no', 'nn-NO', 'nn', 'en-US', 'en']
  },
  {
    name: 'Norwegian (Nynorsk)',
    value:
      'nn-NO,nn;q=0.9,no-NO;q=0.8,no;q=0.6,nb-NO;q=0.5,nb;q=0.4,en-US;q=0.3,en;q=0.1',
    code: 'nn-NO',
    nav: ['nn-NO', 'nn', 'no-NO', 'no', 'nb-NO', 'nb', 'en-US', 'en']
  },
  {
    name: 'Occitan (Lengadocian)',
    value:
      'oc-OC,oc;q=0.9,ca;q=0.8,fr;q=0.6,es;q=0.5,it;q=0.4,en-US;q=0.3,en;q=0.1',
    code: 'oc-OC',
    nav: ['oc-OC', 'oc', 'ca', 'fr', 'es', 'it', 'en-US', 'en']
  },
  {
    name: 'Odia',
    value: 'or,en-US;q=0.7,en;q=0.3',
    code: 'or',
    nav: ['or', 'en-US', 'en']
  },
  {
    name: 'Persian',
    value: 'fa-IR,fa;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'fa-IR',
    nav: ['fa-IR', 'fa', 'en-US', 'en']
  },
  {
    name: 'Polish',
    value: 'pl,en-US;q=0.7,en;q=0.3',
    code: 'pl',
    nav: ['pl', 'en-US', 'en']
  },
  {
    name: 'Portuguese (Brazilian)',
    value: 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'pt-BR',
    nav: ['pt-BR', 'pt', 'en-US', 'en']
  },
  {
    name: 'Portuguese (Portugal)',
    value: 'pt-PT,pt;q=0.8,en;q=0.5,en-US;q=0.3',
    code: 'pt-PT',
    nav: ['pt-PT', 'pt', 'en-US', 'en']
  },
  {
    name: 'Punjabi (India)',
    value: 'pa,pa-IN;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'pa',
    nav: ['pa', 'pa-IN', 'en-US', 'en']
  },
  {
    name: 'Romanian',
    value: 'ro-RO,ro;q=0.8,en-US;q=0.6,en-GB;q=0.4,en;q=0.2',
    code: 'ro-RO',
    nav: ['ro-RO', 'ro', 'en-US', 'en-GB', 'en']
  },
  {
    name: 'Romansh',
    value: 'rm,rm-CH;q=0.8,de-CH;q=0.7,de;q=0.5,en-US;q=0.3,en;q=0.2',
    code: 'rm',
    nav: ['rm', 'rm-CH', 'de-CH', 'de', 'en-US', 'en']
  },
  {
    name: 'Russian',
    value: 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'ru-RU',
    nav: ['ru-RU', 'ru', 'en-US', 'en']
  },
  {
    name: 'Serbian',
    value: 'sr,sr-RS;q=0.8,sr-CS;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'sr',
    nav: ['sr', 'sr-RS', 'sr-CS', 'en-US', 'en']
  },
  {
    name: 'Sinhala',
    value: 'si,si-LK;q=0.8,en-GB;q=0.5,en;q=0.3',
    code: 'si',
    nav: ['si', 'si-LK', 'en-GB', 'en']
  },
  {
    name: 'Slovak',
    value: 'sk,cs;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'sk',
    nav: ['sk', 'cs', 'en-US', 'en']
  },
  {
    name: 'Slovenian',
    value: 'sl,en-GB;q=0.7,en;q=0.3',
    code: 'sl',
    nav: ['sl', 'en-GB', 'en']
  },
  {
    name: 'Songhai',
    value: 'son,son-ML;q=0.8,fr;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'son',
    nav: ['son', 'son-ML', 'fr', 'en-US', 'en']
  },
  {
    name: 'Spanish (Argentina)',
    value: 'es-AR,es;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'es-AR',
    nav: ['es-AR', 'es', 'en-US', 'en']
  },
  {
    name: 'Spanish (Chile)',
    value: 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'es-CL',
    nav: ['es-CL', 'es', 'en-US', 'en']
  },
  {
    name: 'Spanish (Mexico)',
    value: 'es-MX,es;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'es-MX',
    nav: ['es-MX', 'es', 'en-US', 'en']
  },
  {
    name: 'Spanish (Spain)',
    value: 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'es-ES',
    nav: ['es-ES', 'es', 'en-US', 'en']
  },
  {
    name: 'Swedish',
    value: 'sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'sv-SE',
    nav: ['sv-SE', 'sv', 'en-US', 'en']
  },
  {
    name: 'Tamil',
    value: 'ta-IN,ta;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'ta-IN',
    nav: ['ta-IN', 'ta', 'en-US', 'en']
  },
  {
    name: 'Telugu',
    value: 'te-IN,te;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'te-IN',
    nav: ['te-IN', 'te', 'en-US', 'en']
  },
  {
    name: 'Thai',
    value: 'th,en-US;q=0.7,en;q=0.3',
    code: 'th',
    nav: ['th', 'en-US', 'en']
  },
  {
    name: 'Turkish',
    value: 'tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'tr-TR',
    nav: ['tr-TR', 'tr', 'en-US', 'en']
  },
  {
    name: 'Ukranian',
    value: 'uk,ru;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'uk',
    nav: ['uk', 'ru', 'en-US', 'en']
  },
  {
    name: 'Upper Sorbian',
    value: 'hsb,dsb;q=0.8,de;q=0.6,en-US;q=0.4,en;q=0.2',
    code: 'hsb',
    nav: ['hsb', 'dsb', 'de', 'en-US', 'en']
  },
  {
    name: 'Urdu',
    value: 'ur-PK,ur;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'ur-PK',
    nav: ['ur-PK', 'ur', 'en-US', 'en']
  },
  {
    name: 'Uzbek',
    value: 'uz,ru;q=0.8,en;q=0.5,en-US;q=0.3',
    code: 'uz',
    nav: ['uz', 'ru', 'en', 'en-US']
  },
  {
    name: 'Vietnamese',
    value: 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'vi-VN',
    nav: ['vi-VN', 'vi', 'en-US', 'en']
  },
  {
    name: 'Welsh',
    value: 'cy-GB,cy;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'cy-GB',
    nav: ['cy-GB', 'cy', 'en-US', 'en']
  },
  {
    name: 'Xhosa',
    value: 'xh-ZA,xh;q=0.8,en-US;q=0.5,en;q=0.3',
    code: 'xh-ZA',
    nav: ['xh-ZA', 'xh', 'en-US', 'en']
  }
]
