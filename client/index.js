import DesktopApp from './app/desktop'
import detector from './utils/environment-detector'

dom.event.ready(() => {
  // Init Application
  const app = new DesktopApp()
  app.init()
})
