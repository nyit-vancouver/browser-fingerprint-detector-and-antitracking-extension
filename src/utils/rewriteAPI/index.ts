import { rewriteAttribute } from './attribute'
import { rewriteAudio } from './audio'
import { rewriteCanvas } from './canvas'
import { rewriteTimezone } from './timezone'
import { rewriteUserAgentData } from './userAgentData'
import { rewriteWebgl } from './webgl'
import { blockWebrtc } from './webrtc'

export {
  rewriteAttribute,
  rewriteTimezone,
  rewriteCanvas,
  rewriteWebgl,
  rewriteAudio,
  blockWebrtc,
  rewriteUserAgentData
}
