/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const psl = require('psl')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const CIDR = require('cidr-js')

const cidr = new CIDR()
// const REGEX_HTTP = new RegExp('^https?:', 'i');
// let LINK: HTMLAnchorElement | { href: string; hostname: string };

// // 检查运行环境
// const isRunningInBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// if (isRunningInBrowser) {
//   console.log("link")
//   LINK = document.createElement('a');
// } else {
//   // 如果不在浏览器环境，创建一个模拟的 LINK 对象
//   LINK = {
//     href: '',
//     hostname: '',
//   };
// }

const deepMerge = (target: object, source: object) => {
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      deepMerge(
        ((target as Record<string, any>)[key] =
          (target as Record<string, any>)[key] || {}),
        value
      )
      return
    }
    ;(target as Record<string, any>)[key] = value
  })

  return target
}

// const determineRequestType = (source: string, destination: string): string => {
//   if (!source) return 'none';

//   const parseUrl = (url: string) => {
//     if (isRunningInBrowser) {
//       (LINK as HTMLAnchorElement).href = url;
//       return { hostname: (LINK as HTMLAnchorElement).hostname };
//     } else {
//       try {
//         const parsedUrl = new URL(url);
//         return { hostname: parsedUrl.hostname };
//       } catch (e) {
//         return { hostname: '' };
//       }
//     }
//   };

//   const s = psl.parse(parseUrl(source).hostname);
//   const d = psl.parse(parseUrl(destination).hostname);

//   if (s.domain != d.domain) {
//     return 'cross-site';
//   } else {
//     if (s.subdomain === d.subdomain) {
//       return 'same-origin';
//     }
//     return 'same-site';
//   }
// };

const generateByte = (): number => {
  const octet: number = Math.floor(Math.random() * 256)
  return octet === 10 || octet === 172 || octet === 192 ? generateByte() : octet
}

const generateIP = (): string => {
  return `${generateByte()}.${generateByte()}.${generateByte()}.${generateByte()}`
}

const getIPRange = (ipRange: string): string => {
  const range: any = cidr.range(ipRange)

  if (range === null) {
    return ipRange
  }

  return `${range.start}-${range.end}`
}

const ipInRange = (ip: string, range: string): boolean => {
  if (range.length === 1) {
    return ip === range[0]
  } else {
    const ipToCompare: number = ipToInt(ip)
    const ipRangeFrom: number = ipToInt(range[0])
    const ipRangeTo: number = ipToInt(range[1])

    return ipRangeFrom <= ipToCompare && ipToCompare <= ipRangeTo
  }
}

const ipToInt = (ip: string): number => {
  return (
    ip.split('.').reduce(function (ipInt: number, octet: string) {
      return (ipInt << 8) + parseInt(octet, 10)
    }, 0) >>> 0
  )
}

const ipToString = (ip: number): string => {
  return (
    (ip >>> 24) +
    '.' +
    ((ip >> 16) & 255) +
    '.' +
    ((ip >> 8) & 255) +
    '.' +
    (ip & 255)
  )
}

const isInternalIP = (host: string): boolean => {
  return (
    // eslint-disable-next-line no-useless-escape
    /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(host) ||
    /(^192\.168\.([0-9]|[0-9][0-9]|[0-2][0-5][0-5])\.([0-9]|[0-9][0-9]|[0-2][0-5][0-5])$)|(^172\.([1][6-9]|[2][0-9]|[3][0-1])\.([0-9]|[0-9][0-9]|[0-2][0-5][0-5])\.([0-9]|[0-9][0-9]|[0-2][0-5][0-5])$)|(^10\.([0-9]|[0-9][0-9]|[0-2][0-5][0-5])\.([0-9]|[0-9][0-9]|[0-2][0-5][0-5])\.([0-9]|[0-9][0-9]|[0-2][0-5][0-5])$)/.test(
      host
    )
  )
}

const isValidURL = (url: string): boolean => {
  try {
    if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url
    }
    new URL(url)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false
  }
}

const isValidIP = (ip: string): boolean => {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    ip
  )
}

const parseURL = (url: string): any => {
  let u: URL
  try {
    u = new URL(url)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // 如果 URL 构造失败，返回一个空对象
    return {
      base: '',
      domain: '',
      hostname: '',
      origin: '',
      pathname: ''
    }
  }
  const uParsed = psl.parse(u.hostname)

  return {
    base: u.hostname.split('.').splice(-2).join('.'),
    domain: uParsed.domain,
    hostname: u.hostname,
    origin: u.origin,
    pathname: u.pathname
  }
}

const validateIPRange = (from: string, to: string): boolean => {
  return isValidIP(from) && isValidIP(to) && ipToInt(from) <= ipToInt(to)
}

export default {
  deepMerge,
  // determineRequestType,
  // findWhitelistRule,
  generateIP,
  getIPRange,
  ipInRange,
  ipToInt,
  ipToString,
  isInternalIP,
  isValidIP,
  isValidURL,
  parseURL,
  validateIPRange
}
