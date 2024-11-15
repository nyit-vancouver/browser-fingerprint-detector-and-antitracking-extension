import { BROWSER_VERSION } from '@/constants/browserVersions'

export const getName = (os: string, browser: string) => {
  let osId: 'ios1' | 'ios2' | 'ios3'

  if (browser === 'edg') {
    switch (os) {
      case 'Win 7':
      case 'Win 8':
      case 'Win 8.1':
        return `${os} - Edge ${BROWSER_VERSION.edg.deprecated.split('.')[0]}`
      default:
        return `${os} - Edge ${BROWSER_VERSION.edg.desktop.split('.')[0]}`
    }
  } else if (browser === 'edgm') {
    return `${os} - Edge ${BROWSER_VERSION.edg.android.split('.')[0]} (Phone)`
  } else if (browser === 'esr') {
    return `${os} - Firefox ${BROWSER_VERSION.esr.desktop} ESR`
  } else if (browser === 'esr2') {
    return `${os} - Firefox ${BROWSER_VERSION.esr2.desktop} ESR`
  } else if (browser === 'ff') {
    return `${os} - Firefox ${BROWSER_VERSION.ff.desktop}`
  } else if (browser === 'ffm') {
    return `${os} - Firefox ${BROWSER_VERSION.ff.mobile} (Phone)`
  } else if (browser === 'fft') {
    return `${os} - Firefox ${BROWSER_VERSION.ff.mobile} (Tablet)`
  } else if (browser === 'gcr') {
    switch (os) {
      case 'Win 7':
      case 'Win 8':
      case 'Win 8.1':
        return `${os} - Chrome ${BROWSER_VERSION.gcr.deprecated.split('.')[0]}`
      default:
        return `${os} - Chrome ${BROWSER_VERSION.gcr.desktop.split('.')[0]}`
    }
  } else if (browser === 'gcrm') {
    const key = os.charAt(0) === 'i' ? 'ios' : 'android'
    return `${os} - Chrome ${BROWSER_VERSION.gcr[key].split('.')[0]} (Phone)`
  } else if (browser === 'gcrt') {
    const key = os.charAt(0) === 'i' ? 'ios' : 'android'
    return `${os} - Chrome ${BROWSER_VERSION.gcr[key].split('.')[0]} (Tablet)`
  } else if (browser === 'ie') {
    return `${os} - Internet Explorer 11`
  } else if (browser === 'sf') {
    return `${os} - Safari ${BROWSER_VERSION.sf.desktop.split('.')[0]}`
  } else if (browser === 'sfm') {
    switch (os) {
      case 'iOS 16':
        osId = 'ios1'
        break
      case 'iOS 17':
        osId = 'ios2'
        break
      case 'iOS 18':
        osId = 'ios3'
        break
      default:
        osId = 'ios1'
        break
    }
    return `${os} - Safari ${BROWSER_VERSION.sf[osId].split('.')[0]} (iPhone)`
  } else if (browser === 'sft') {
    switch (os) {
      case 'iOS 16':
        osId = 'ios1'
        break
      case 'iOS 17':
        osId = 'ios2'
        break
      case 'iOS 18':
        osId = 'ios3'
        break
      default:
        osId = 'ios1'
        break
    }
    return `${os} - Safari ${BROWSER_VERSION.sf[osId].split('.')[0]} (iPad)`
  }
}
