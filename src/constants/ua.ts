export class UA {
  private static BrowserVersions = {
    edg: {
      desktop: '129.0.0.0',
      desktopChrome: '129.0.0.0',
      deprecated: '109.0.1518.55',
      deprecatedChrome: '109.0.0.0',
      android: '129.0.0.0',
      androidChrome: '129.0.0.0'
    },
    esr: { desktop: '128' },
    esr2: { desktop: '115' },
    ff: { desktop: '131', mobile: '131' },
    gcr: {
      desktop: '129.0.0.0',
      deprecated: '109.0.0.0',
      ios: '129.0.6668.69',
      android: '129.0.0.0'
    },
    sf: { desktop: '18', ios1: '15.6', ios2: '16.5', ios3: '18' }
  }

  public static browsers = {
    // edge
    edg: (os: any) => {
      let version: string
      let chromeVersion: string
      let platform: string

      switch (os.id) {
        case 'win1':
        case 'win2':
        case 'win3':
          version = UA.BrowserVersions.edg.deprecated
          chromeVersion = UA.BrowserVersions.edg.deprecatedChrome
          break
        default:
          version = UA.BrowserVersions.edg.desktop
          chromeVersion = UA.BrowserVersions.edg.desktopChrome
          break
      }

      switch (os.id) {
        case 'win1':
        case 'win2':
        case 'win3':
        case 'win4':
          platform = os.nav.oscpu
          break
        case 'mac1':
        case 'mac2':
        case 'mac3':
        case 'lin1':
        case 'lin2':
          platform = os.uaPlatform
          break
        case 'lin3':
          platform = 'X11; Linux x86_64'
          break
        default:
          platform = 'X11; Linux x86_64'
          break
      }

      let ua: string = `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36 Edg/${version}`

      return ua
    },
    // edge (mobile)
    edgm: () => {
      let versions: any = UA.BrowserVersions.edg

      let ua: string = `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${versions.androidChrome} Mobile Safari/537.36 EdgA/${versions.android}`

      return ua
    },
    // firefox esr
    esr: (os: any) => {
      let version: string = UA.BrowserVersions.esr.desktop
      let platform: string

      switch (os.id) {
        case 'win1':
        case 'win2':
        case 'win3':
        case 'win4':
          platform = os.nav.oscpu
          break
        case 'mac1':
        case 'mac2':
        case 'mac3':
          platform = `Macintosh; ${os.nav.oscpu}`
          break
        case 'lin1':
        case 'lin2':
        case 'lin3':
          platform = os.uaPlatform
          break
        default:
          platform = os.uaPlatform
          break
      }

      let ua = `Mozilla/5.0 (${platform}; rv:${version}.0) Gecko/20100101 Firefox/${version}.0`

      return ua
    },
    // firefox esr (previous version)
    esr2: (os: any) => {
      let version: string = UA.BrowserVersions.esr2.desktop
      let platform: string

      switch (os.id) {
        case 'win1':
        case 'win2':
        case 'win3':
        case 'win4':
          platform = os.nav.oscpu
          break
        case 'mac1':
        case 'mac2':
        case 'mac3':
          platform = `Macintosh; ${os.nav.oscpu}`
          break
        case 'lin1':
        case 'lin2':
        case 'lin3':
          platform = os.uaPlatform
          break
        default:
          platform = os.uaPlatform
          break
      }

      let ua = `Mozilla/5.0 (${platform}; rv:109.0) Gecko/20100101 Firefox/${version}.0`

      return ua
    },
    // firefox
    ff: (os: any) => {
      let version: string = UA.BrowserVersions.ff.desktop
      let platform: string

      switch (os.id) {
        case 'win1':
        case 'win2':
        case 'win3':
        case 'win4':
          platform = os.nav.oscpu
          break
        case 'mac1':
        case 'mac2':
        case 'mac3':
          platform = `Macintosh; ${os.nav.oscpu}`
          break
        case 'lin1':
        case 'lin2':
        case 'lin3':
          platform = os.uaPlatform
          break
        default:
          platform = os.uaPlatform
          break
      }

      let ua = `Mozilla/5.0 (${platform}; rv:${version}.0) Gecko/20100101 Firefox/${version}.0`

      return ua
    },
    // firefox for android
    ffm: (os: any) => {
      let version: string = UA.BrowserVersions.ff.mobile
      let ua: string

      ua = `Mozilla/5.0 (${os.uaPlatform}; Mobile; rv:${version}.0) Gecko/${version}.0 Firefox/${version}.0`

      return ua
    },
    fft: (os: any) => {
      let version: string = UA.BrowserVersions.ff.mobile
      let ua: string

      ua = `Mozilla/5.0 (${os.uaPlatform}; Tablet; rv:${version}.0) Gecko/109.0 Firefox/${version}.0`

      return ua
    },
    // google chrome
    gcr: (os: any) => {
      let version: string
      let platform: string

      switch (os.id) {
        case 'win1':
        case 'win2':
        case 'win3':
          version = UA.BrowserVersions.gcr.deprecated
          break
        default:
          version = UA.BrowserVersions.gcr.desktop
          break
      }

      switch (os.id) {
        case 'win1':
        case 'win2':
        case 'win3':
        case 'win4':
          platform = 'Windows NT 10.0; Win64; x64'
          break
        case 'mac1':
        case 'mac2':
        case 'mac3':
          platform = 'Macintosh; Intel Mac OS X 10_15_7'
          break
        case 'lin1':
        case 'lin2':
        case 'lin3':
          platform = 'X11; Linux x86_64'
          break
        default:
          platform = 'X11; Linux x86_64'
          break
      }

      let ua: string = `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version} Safari/537.36`

      return ua
    },
    // google chrome (mobile)
    gcrm: (os: any) => {
      let versions: any = UA.BrowserVersions.gcr
      let ua: string

      if (os.id.includes('ios')) {
        ua = `Mozilla/5.0 (iPhone; CPU iPhone OS ${os.uaPlatform} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/${versions.ios} Mobile/15E148 Safari/604.1`
      } else {
        ua = `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${versions.android} Mobile Safari/537.36`
      }

      return ua
    },
    // google chrome (tablet)
    gcrt: (os: any) => {
      let versions: any = UA.BrowserVersions.gcr
      let ua: string

      if (os.id.includes('ios')) {
        ua = `Mozilla/5.0 (iPad; CPU OS ${os.uaPlatform} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/${versions.ios} Mobile/15E148 Safari/604.1`
      } else {
        ua = `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${versions.android} Safari/537.36`
      }

      return ua
    },
    // internet explorer
    ie: (os: any) => {
      let ua = `Mozilla/5.0 (${os.nav.oscpu.split(';')[0]}; WOW64; Trident/7.0; rv:11.0) like Gecko`
      return ua
    },
    // safari
    sf: (os: any) => {
      let version: string = UA.BrowserVersions.sf.desktop

      let ua = `Mozilla/5.0 (${os.uaPlatform}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${version} Safari/605.1.15`

      return ua
    },
    // safari (mobile)
    sfm: (os: any) => {
      let version: string =
        UA.BrowserVersions.sf[os.id as keyof typeof UA.BrowserVersions.sf]
      let ua = `Mozilla/5.0 (iPhone; CPU iPhone OS ${os.uaPlatform} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${version} Mobile/15E148 Safari/604.1`

      return ua
    },
    // safari (tablet)
    sft: (os: any) => {
      let version: string =
        UA.BrowserVersions.sf[os.id as keyof typeof UA.BrowserVersions.sf]
      let ua = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${version} Safari/605.1.15`

      return ua
    }
  }

  public static getUA(browserId: string, os: any): string {
    const browserFunc = this.browsers[browserId as keyof typeof this.browsers]
    if (browserFunc) {
      return browserFunc(os)
    }
    return ''
  }
}
