export interface Headers {
  blockEtag: boolean
  enableDNT: boolean
  disableReferer: boolean
  spoofAcceptLang: {
    enabled: boolean
    value: string
  }
  spoofIP: {
    enabled: boolean
    value: string
  }
}

export type NewHeader =
  | {
      blockEtag: boolean
    }
  | {
      enableDNT: boolean
    }
  | {
      disableReferer: boolean
    }
  | {
      spoofAcceptLang: {
        enabled: boolean
        value: string
      }
    }
  | {
      spoofIP: {
        enabled: boolean
        value: string
      }
    }
