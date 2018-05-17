import Constants from '../constants/RouterConstants'
import Dispatcher from '../dispatcher'

const Actions = {
  updatePath: (ctx) => {
    Dispatcher.handleRouterAction({
      type: Constants.UPDATE_PATH,
      item: ctx
    })
  },
  beginRouting: () => {
    Dispatcher.handleRouterAction({
      type: Constants.BEGIN_ROUTING,
      item: undefined
    })
  },
  checkQuery: () => {
    Dispatcher.handleRouterAction({
      type: Constants.CHECK_QUERY,
      item: undefined
    })
  }
}

export default Actions
