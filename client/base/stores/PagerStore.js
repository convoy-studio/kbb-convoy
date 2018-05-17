import {EventEmitter2} from 'eventemitter2'
import assign from 'object-assign'
import PagerConstants from '../constants/PagerConstants'
import Dispatcher from 'Dispatcher'

const Store = assign({}, EventEmitter2.prototype, {
  firstPageTransition: true,
  pageTransitionState: undefined,
  dispatchToken: Dispatcher.register((payload) => {
    const actionType = payload.type
    const item = payload.item
    switch (actionType) {
    case PagerConstants.PAGE_IS_READY:
      Store.pageTransitionState = PagerConstants.PAGE_TRANSITION_OUT_PROGRESS
      Store.emit(PagerConstants.PAGE_TRANSITION_OUT)
      break
    case PagerConstants.PAGE_TRANSITION_OUT_COMPLETE:
      Store.pageTransitionState = PagerConstants.PAGE_TRANSITION_IN_PROGRESS
      Store.emit(PagerConstants.PAGE_TRANSITION_IN)
      break
    case PagerConstants.PAGE_TRANSITION_DID_FINISH:
      if (Store.firstPageTransition) Store.firstPageTransition = false
      Store.pageTransitionState = PagerConstants.PAGE_TRANSITION_DID_FINISH
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
