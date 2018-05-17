import WindowConstants from 'WindowConstants'
import Dispatcher from 'Dispatcher'

const Actions = {
  resize: (windowW, windowH) => {
    const w = windowW || window.innerWidth
    const h = windowH || window.innerHeight
    Dispatcher.handleWindowAction({
      type: WindowConstants.WINDOW_RESIZE,
      item: { windowW: w, windowH: h }
    })
  },
  enableScroll: () => {
    Dispatcher.handleWindowAction({
      type: WindowConstants.ENABLE_SCROLL,
      item: undefined
    })
  },
  disableScroll: () => {
    Dispatcher.handleWindowAction({
      type: WindowConstants.DISABLE_SCROLL,
      item: undefined
    })
  }
}

export default Actions
