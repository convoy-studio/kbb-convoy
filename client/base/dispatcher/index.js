import Flux from 'flux'
import assign from 'object-assign'

const Dispatcher = assign(new Flux.Dispatcher(), {
  /**
   * For Pager Store
   * @param  {[object]} action
   */
  handlePagerAction: (action) => {
    Dispatcher.dispatch(action)
  },
  /**
   * For Router Store
   * @param  {[object]} action
   */
  handleRouterAction: (action) => {
    Dispatcher.dispatch(action)
  },
  /**
   * For Window Store
   * @param  {[object]} action
   */
  handleWindowAction: (action) => {
    Dispatcher.dispatch(action)
  },
  /**
   * For App Store
   * @param  {[object]} action
   */
  handleAppAction: (action) => {
    Dispatcher.dispatch(action)
  }
})

export default Dispatcher
