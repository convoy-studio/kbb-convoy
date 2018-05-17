import AppConstants from 'AppConstants'
import Dispatcher from 'Dispatcher'

const Actions = {
  loadPageAssets: () => {
    Dispatcher.handleAppAction({
      type: AppConstants.PAGE_ASSETS_LOADED,
      item: undefined
    })
  },
  fillAppWithInitialData: (data) => {
    Dispatcher.handleAppAction({
      type: AppConstants.FILL_APP_WITH_INITIAL_DATA,
      item: data
    })
  },
  appStart: () => {
    Dispatcher.handleAppAction({
      type: AppConstants.APP_START,
      item: undefined
    })
  },
  addToCanvas: (child) => {
    Dispatcher.handleAppAction({
      type: AppConstants.ADD_TO_CANVAS,
      item: child
    })
  },
  removeFromCanvas: (child) => {
    Dispatcher.handleAppAction({
      type: AppConstants.REMOVE_FROM_CANVAS,
      item: child
    })
  },
  startTicker: () => {
    Dispatcher.handleAppAction({
      type: AppConstants.START_TICKER,
      item: undefined
    })
  },
  stopTicker: () => {
    Dispatcher.handleAppAction({
      type: AppConstants.STOP_TICKER,
      item: undefined
    })
  }
}

export default Actions
