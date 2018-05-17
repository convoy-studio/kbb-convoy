import {EventEmitter2} from 'eventemitter2'
import assign from 'object-assign'
import WindowConstants from 'WindowConstants'
import RouterStore from 'RouterStore'
import WindowActions from 'WindowActions'
import Dispatcher from 'Dispatcher'
import isRetina from 'is-retina'

const _windowSize = { w: window.innerWidth, h: window.innerHeight }
const _mouse = { x: 0, y: 0, nX: 0, nY: 0 }
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
let _orientation = WindowConstants.LANDSCAPE

const resize = () => {
  if (_windowSize.w === window.innerWidth && _windowSize.h === window.innerHeight) return
  WindowActions.resize(window.innerWidth, window.innerHeight)
}

const mousemove = (e) => {
  e.preventDefault()
  _mouse.x  = e.clientX || _mouse.x
  _mouse.y  = e.clientY || _mouse.y
  _mouse.nX = (_mouse.x / _windowSize.w) * 2 - 1
  _mouse.nY = (_mouse.y / _windowSize.h) * 2 + 1
}

const _isRetina = () => {
  return isRetina()
}

const _getDevicePixelRatio = () => {
  const scale = (window.devicePixelRatio === undefined) ? 1 : window.devicePixelRatio
  return (scale > 1) ? 2 : 1
}

const _getImageDeviceExtension = () => {
  const retina = _isRetina()
  let str = '@1x'
  if (retina) str = '@2x'
  return str
}

const preventDefault = (e) => {
  const event = e || window.event
  if (event.preventDefault) event.preventDefault()
  event.returnValue = false
}

const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
  return true
}

dom.event.on(window, 'resize', resize)
dom.event.on(window, 'mousemove', mousemove)

const Store = assign({}, EventEmitter2.prototype, {
  devicePixelRatio: () => { return _getDevicePixelRatio() },
  isRetina: () => { return _isRetina() },
  orientation: () => { return _orientation },
  Size: _windowSize,
  Mouse: _mouse,
  dispatchToken: Dispatcher.register((payload) => {
    const actionType = payload.type
    const item = payload.item
    switch (actionType) {
    case WindowConstants.WINDOW_RESIZE:
      _windowSize.w = item.windowW
      _windowSize.h = item.windowH
      _orientation = (_windowSize.w > _windowSize.h) ? WindowConstants.LANDSCAPE : WindowConstants.PORTRAIT
      Store.emit(actionType)
      break
    case WindowConstants.ENABLE_SCROLL:
      if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false)
      window.onmousewheel = document.onmousewheel = null
      window.onwheel = null
      window.ontouchmove = null
      document.onkeydown = null
      Store.emit(actionType)
      break
    case WindowConstants.DISABLE_SCROLL:
      if (window.addEventListener) window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
      window.onwheel = preventDefault // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
      window.ontouchmove  = preventDefault // mobile
      document.onkeydown  = preventDefaultForScrollKeys
      Store.emit(actionType)
      break
    default:
      Store.emit(actionType, item)
      break
    }
    return true
  })
})

export default Store
