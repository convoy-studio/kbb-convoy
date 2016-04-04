// Avoid console errors for the IE crappy browsers
if ( ! window.console ) console = { log: function(){} };

import AppStore from 'AppStore'
import Utils from 'Utils'
import App from 'App'
import TweenMax from 'gsap'
import raf from 'raf'
import MobileDetect from 'mobile-detect'
import dom from 'dom-hand'

var md = new MobileDetect(window.navigator.userAgent)

AppStore.Detector.isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
AppStore.Detector.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1
AppStore.Detector.isMobile = (md.mobile() || md.tablet()) ? true : false
AppStore.Parent = dom.select('#app-container')
AppStore.Detector.oldIE = dom.classes.contains(AppStore.Parent, 'ie6') || dom.classes.contains(AppStore.Parent, 'ie7') || dom.classes.contains(AppStore.Parent, 'ie8')
AppStore.Detector.isSupportWebGL = Utils.SupportWebGL()
if(AppStore.Detector.oldIE) AppStore.Detector.isMobile = true

var app = new App()	

app.init()

