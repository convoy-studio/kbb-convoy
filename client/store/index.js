import Dispatcher from 'Dispatcher'
import AppConstants from 'AppConstants'
import AppActions from 'AppActions'
import WindowStore from 'WindowStore'
import RouterStore from 'RouterStore'
import WindowActions from 'WindowActions'
import RouterActions from 'RouterActions'
import {EventEmitter2} from 'eventemitter2'
import assign from 'object-assign'
import Utils from '../utils'

let _data = undefined
const appContainer = dom.select('#app-container')

const _getAppData = () => {
  return _data
}
const _getTexture = (id) => {
  let texture
  for (let index = 0; index < _data.textures.length; index++) {
    const element = _data.textures[index]
    if (id === element.id) {
      texture = element.texture
      break
    }
  }
  return texture
}
const _getGeometry = (id) => {
  let geometry
  for (let index = 0; index < _data.geometries.length; index++) {
    const element = _data.geometries[index]
    if (id === element.id) {
      geometry = element.geometry
      break
    }
  }
  return geometry
}

const Store = assign({}, EventEmitter2.prototype, {
  appData: _getAppData,
  getTexture: _getTexture,
  getGeometry: _getGeometry,
  basePath: () => {
    return AppConstants.ENVIRONMENTS[ENV]
  },
  getEnvironment: () => {
    return ENV // It takes the ENV variable from client/templates/index.tpl.ejs
  },
  Parent: document.getElementById('app-container'),
  FrontBlock: undefined,
  dispatchToken: Dispatcher.register((payload) => {
    const actionType = payload.type
    const item = payload.item
    switch (actionType) {
    case AppConstants.FILL_APP_WITH_INITIAL_DATA:
      _data = item
      Store.emit(actionType)
      break
    case AppConstants.APP_START:
      setTimeout(RouterActions.beginRouting)
      Store.emit(actionType)
      break
    case AppConstants.START_TICKER:
      PIXI.ticker.shared.start()
      Store.emit(actionType)
      break
    case AppConstants.STOP_TICKER:
      PIXI.ticker.shared.stop()
      Store.emit(actionType)
      break
    default:
      Store.emit(actionType, item)
      break
    }
  })
})

export default Store
