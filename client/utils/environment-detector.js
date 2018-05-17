import AppStore from 'AppStore'
import MobileDetect from 'mobile-detect'
import getContext from 'get-canvas-context'

const testCanvas = document.createElement('canvas')
const md = new MobileDetect(window.navigator.userAgent)

const detector = {
  isSafari: () => {
    return (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1)
  },
  isChrome: () => {
    return (navigator.userAgent.indexOf('Safari') === -1 && navigator.userAgent.indexOf('Chrome') !== -1)
  },
  isFirefox: () => {
    return navigator.userAgent.toLowerCase().indexOf('firefox') !== -1
  },
  isIE: () => {
    return navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))
  },
  isMobile: () => {
    return md.mobile() || md.tablet() ? true : false // Include both phones and tablets
  },
  isTablet: () => {
    return md.tablet() && md.mobile() ? true : false
  },
  isPhone: () => {
    return md.mobile() && !md.tablet() ? true : false
  },
  isOldIE: () => {
    return dom.classes.contains(AppStore.Parent, 'ie6') || dom.classes.contains(AppStore.Parent, 'ie7') || dom.classes.contains(AppStore.Parent, 'ie8') || dom.classes.contains(AppStore.Parent, 'ie9')
  },
  isSupportWebGL: () => {
    return getContext('webgl', {canvas: testCanvas}) ? true : false
  }
}

export default detector
