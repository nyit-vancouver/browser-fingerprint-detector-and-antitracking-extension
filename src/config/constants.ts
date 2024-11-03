export const MODIFIED_REQ_HEADERS = [
  'user-agent',
  'accept-language',
  'referer',
  'dnt',
  'x-forwarded-for',
  'etag',
  'if-none-match'
]

export const MODIFIED_ATTRS = []

export const ALL_MODIFIED_FINGERPRINTS = [
  ...MODIFIED_REQ_HEADERS,
  ...MODIFIED_ATTRS
]

// TODO: 映射关系？
// const MODIFIED_RES_HEADER_MAP = {
//   "user-agent": ,
//   "accept-language",
//   "referer",
//   "dnt",
//   "x-forwarded-for"

// }
