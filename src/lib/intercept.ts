/* eslint-disable no-param-reassign */
// intercepts requests
import * as prof from './profiles'
// import * as lang from './language';
import util from './util'

interface Settings {
  config: {
    enabled: boolean
  }
  options: {
    webSockets: string
  }
  profile: {
    selected: string
  }
  excluded: string[]
  headers: {
    spoofAcceptLang: {
      enabled: boolean
      value: string
    }
    blockEtag: boolean
    enableDNT: boolean
    spoofIP: {
      enabled: boolean
      value: string
    }
  }
  os: string
}

interface TempStore {
  profile: string
  ipInfo: {
    lang: string
  }
  spoofIP: string
}

interface ProfileCache {
  [key: string]: prof.BrowserProfile
}

class Interceptor {
  // private LINK: any;
  private profiles: prof.Generator
  private profileCache: ProfileCache = {}
  private settings: Settings
  private tempStore: TempStore
  private regex: any
  private olderThanNinety: boolean

  constructor(
    settings: Settings,
    tempStore: TempStore,
    profileCache: ProfileCache,
    olderThanNinety: boolean
  ) {
    this.regex = {
      CLOUDFLARE: RegExp(/chk_jschl/),
      HTTPS: RegExp(/^https:\/\//)
    }

    // this.LINK = document.createElement('a');
    this.profiles = new prof.Generator()
    this.settings = settings
    this.tempStore = tempStore

    this.olderThanNinety = olderThanNinety
    const allProfiles = this.profiles.getAllProfiles()
    console.log('allProfiles', allProfiles)
    // for (const platform in allProfiles) {
    //   for (const profile of allProfiles[platform]) {
    //     this.profileCache[profile.id] = profile;
    //   }
    // }
    console.log('Interceptor constructor')
  }

  public blockWebsocket(details: any): any {
    if (!this.settings.config.enabled) return

    // let wl = this.checkWhitelist(details);

    // if (!wl.active && this.settings.options.webSockets === 'allow_all') {
    //   return;
    // }

    let isWebSocketRequest = false
    if (details.requestHeaders) {
      for (let h of details.requestHeaders) {
        if (h.name.toLowerCase() == 'x-websocket-extensions') {
          isWebSocketRequest = true
        }
      }
    }

    if (
      details.type === 'websocket' ||
      details.url.includes('transport=polling') ||
      isWebSocketRequest
    ) {
      // if (wl.active && wl.opt) {
      //   return { cancel: wl.opt.ws };
      // }

      if (this.settings.options.webSockets === 'block_all') {
        return { cancel: true }
      } else if (this.settings.options.webSockets === 'block_3rd_party') {
        let frame = util.parseURL(details.documentUrl || details.originUrl)
        let ws = util.parseURL(details.url)

        if (!frame.error && !ws.error) {
          if (frame.domain != ws.domain) {
            return { cancel: true }
          }
        }
      }
    }
  }

  // checkWhitelist(request: any): WhitelistResult {
  //   let url: string;

  //   /* Get document url of request */
  //   if (request.type === 'main_frame') {
  //     url = request.url;
  //   } else if (request.parentFrameId == -1) {
  //     url = request.documentUrl;
  //   } else {
  //     let root = request.frameAncestors ? request.frameAncestors.find((f: { frameId: number; }) => f.frameId === 0) : '';
  //     if (root) {
  //       url = root.url;
  //     } else {
  //       url = request.documentUrl;
  //     }
  //   }

  //   if (url) {
  //     this.LINK.href = url;
  //     let rule = util.findWhitelistRule(this.settings.whitelist.rules, this.LINK.host, url);

  //     if (rule) {
  //       return {
  //         active: true,
  //         lang: rule.lang,
  //         opt: rule.options,
  //         pattern: rule.pattern,
  //         profile: rule.profile,
  //         spoofIP: rule.spoofIP,
  //       };
  //     }
  //   }

  //   return { active: false };
  // }

  modifyRequest(details: any): any {
    if (!this.settings.config.enabled) return

    // don't modify request for sites below
    // for (let i = 0; i < whitelisted.length; i++) {
    //   if (
    //     (details.originUrl && details.originUrl.startsWith(whitelisted[i])) ||
    //     (details.documentUrl && details.documentUrl.startsWith(whitelisted[i])) ||
    //     (details.url && details.url.startsWith(whitelisted[i]))
    //   ) {
    //     return;
    //   }
    // }

    // this.LINK.href = details.documentUrl || details.url;
    // if (util.isInternalIP(this.LINK.hostname)) return;

    // let wl: WhitelistResult = this.checkWhitelist(details);

    // used to send different accept headers for https requests
    // let isSecure: boolean = this.regex.HTTPS.test(details.url);
    // let dntIndex: number = -1;

    let profile: prof.BrowserProfile = this.profiles.getProfile(
      this.settings.os
    ) // 有问题

    // if (this.settings.profile.selected != 'none' && !this.settings.excluded.includes(this.settings.profile.selected) && this.tempStore.profile != 'none') {
    //   let profileUsed: string = this.settings.profile.selected.includes('-') ? this.settings.profile.selected : this.tempStore.profile;
    //   console.log("profileUsed", profileUsed);
    //   profile = this.profileCache[profileUsed];
    // }

    // console.log("result profile", profile);
    // let isChromeBased: boolean = profile ? profile.navigator!.userAgent.includes('Chrome') : false;

    for (let i = 0; i < details.requestHeaders.length; i++) {
      let header: string = details.requestHeaders[i].name.toLowerCase()
      if (header === 'user-agent') {
        if (profile) {
          details.requestHeaders[i].value = profile.navigator!.userAgent
          console.log(
            'profile.navigator!.userAgent',
            details.requestHeaders[i].value
          )
        }
      }
    }
    //   else if (header === 'accept') {
    //     if (details.type === 'main_frame' || details.type === 'sub_frame') {
    //       if (profile) {
    //         details.requestHeaders[i].value = profile.accept.header;
    //       }
    //     }
    //   } else if (header === 'accept-encoding') {
    //     if (details.type === 'main_frame' || details.type === 'sub_frame') {
    //       if (profile) {
    //         details.requestHeaders[i].value = isSecure ? profile.accept.encodingHTTPS : profile.accept.encodingHTTP;
    //       }
    //     }
    //   } else if (header === 'accept-language') {

    //     if (this.settings.headers.spoofAcceptLang.enabled) {
    //       if (this.settings.headers.spoofAcceptLang.value === 'ip') {
    //         if (this.tempStore.ipInfo.lang) {
    //           details.requestHeaders[i].value = lang.getLanguage(this.tempStore.ipInfo.lang).value;
    //         }
    //       } else if (this.settings.headers.spoofAcceptLang.value !== 'default') {
    //         details.requestHeaders[i].value = lang.getLanguage(this.settings.headers.spoofAcceptLang.value).value;
    //       }
    //     }

    //   } else if (header === 'dnt') {
    //     dntIndex = i;
    //   }
    // }

    // if (this.settings.headers.enableDNT) {
    //   if (dntIndex === -1) {
    //     details.requestHeaders.push({ name: 'DNT', value: '1' });
    //   }
    // } else {
    //   if (dntIndex > -1) {
    //     details.requestHeaders.splice(dntIndex, 1);
    //   }
    // }

    // if (this.settings.headers.spoofIP.enabled) {
    //   if (
    //     // don't spoof header IP for cloudflare pages
    //     !details.url.includes('cdn-cgi/challenge-platform/generate/') &&
    //     !details.url.includes('__cf_chl_jschl_tk__=') &&
    //     !details.url.includes('jschal/js/nocookie/transparent.gif')
    //   ) {
    //     details.requestHeaders.push({
    //       name: 'Via',
    //       value: '1.1 ' + this.tempStore.spoofIP,
    //     });
    //     details.requestHeaders.push({
    //       name: 'X-Forwarded-For',
    //       value: this.tempStore.spoofIP,
    //     });
    //   }
    // }

    // if (isSecure && isChromeBased && this.olderThanNinety) {
    //   // https://www.w3.org/TR/fetch-metadata/#sec-fetch-dest-header
    //   // implementation below is missing some destinations (mostly worker related)
    //   let secDest = 'empty';

    //   if (details.type == 'main_frame') {
    //     secDest = 'document';
    //   } else if (details.type == 'sub_frame') {
    //     secDest = 'iframe';
    //   } else if (details.type == 'font') {
    //     secDest = 'font';
    //   } else if (details.type == 'imageset' || details.type == 'image') {
    //     secDest = 'image';
    //   } else if (details.type == 'media') {
    //     let h = details.requestHeaders.find((r: { name: string; }) => r.name.toLowerCase() == 'accept');
    //     if (h.value.charAt(0) == 'a') {
    //       secDest = 'audio';
    //     } else if (h.value.charAt(0) == 'v') {
    //       secDest = 'video';
    //     } else if (details.url.includes('.vtt')) {
    //       secDest = 'track';
    //     }
    //   } else if (details.type == 'xslt') {
    //     secDest = 'xslt';
    //   } else if (details.type == 'web_manifest') {
    //     secDest = 'manifest';
    //   } else if (details.type == 'csp_report') {
    //     secDest = 'report';
    //   } else if (details.type == 'object') {
    //     secDest = 'object'; // object is used for both <object> and <embed>
    //   } else if (details.type == 'stylesheet') {
    //     secDest = 'style';
    //   } else if (details.type == 'script') {
    //     secDest = 'script';
    //   }

    //   details.requestHeaders.push({
    //     name: 'sec-fetch-dest',
    //     value: secDest,
    //   });

    //   // https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-site-header
    //   // not quite accurate when determining whether a request from a user action
    //   // let secSite = util.determineRequestType(details.type == 'main_frame' ? details.documentUrl : details.originUrl, details.url);
    //   // details.requestHeaders.push({
    //   //   name: 'sec-fetch-site',
    //   //   value: secSite,
    //   // });

    //   // https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-mode-header
    //   // naive implementation
    //   let secMode = 'no-cors';
    //   let hasOriginHeader = details.requestHeaders.findIndex((r: { name: string; }) => r.name.toLowerCase() == 'origin') > -1;
    //   if (details.type == 'websocket') {
    //     secMode = 'websocket';
    //   } else if (details.type == 'main_frame' || details.type == 'sub_frame') {
    //     secMode = 'navigate';
    //   } else if (hasOriginHeader) {
    //     secMode = 'cors';
    //   }

    //   details.requestHeaders.push({
    //     name: 'sec-fetch-mode',
    //     value: secMode,
    //   });

    //   // this is a guesstimate
    //   // can't determine if this is a user request from this method
    //   // iframe navigation won't be included with this request
    //   if (details.type === 'main_frame') {
    //     details.requestHeaders.push({
    //       name: 'sec-fetch-user',
    //       value: '?1',
    //     });
    //   }
    // }

    console.log('modifyRequest details.requestHeaders', details.requestHeaders)
    return { requestHeaders: details.requestHeaders }
  }

  modifyResponse(details: any): any {
    if (!this.settings.config.enabled) return

    // let wl = this.checkWhitelist(details);

    if (this.settings.headers.blockEtag) {
      for (let i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name.toLowerCase() === 'etag') {
          details.responseHeaders[i].value = ''
        }
      }
    }

    console.log(
      'modifyResponse details.responseHeaders',
      details.responseHeaders
    )
    return { responseHeaders: details.responseHeaders }
  }
}

export { Interceptor }
export type { Settings, TempStore, ProfileCache }
