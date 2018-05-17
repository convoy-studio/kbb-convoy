import {EventEmitter2} from 'eventemitter2'
import assign from 'object-assign'
import page from 'page'
import RouterConstants from 'RouterConstants'
import Dispatcher from 'Dispatcher'
import setupRoutes from '../../routes'
import AppActions from 'AppActions'
import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import WindowStore from 'WindowStore'
import Utils from '../../utils'
const ls = require('local-storage')

let _newRoute = undefined
let _oldRoute = undefined

const _initRouting = () => {
  setupRoutes()
  page({
    hashbang: false
  })
}

const Store = assign({}, EventEmitter2.prototype, {
  oldRoute: () => {
    return _oldRoute
  },
  newRoute: () => {
    return _newRoute
  },
  dispatchToken: Dispatcher.register((payload) => {
    const actionType = payload.type
    const item = payload.item
    switch (actionType) {
    case RouterConstants.UPDATE_PATH:
      const route = item
      _oldRoute = _newRoute
      _newRoute = route
      if (AppStore.menuIsOpened) setTimeout(AppActions.closeMenu)
      Store.emit(actionType)
      break
    case RouterConstants.BEGIN_ROUTING:
      _initRouting()
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
