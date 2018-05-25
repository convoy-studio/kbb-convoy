import DesktopApp from './app/desktop'
import detector from './utils/environment-detector'
Math.radians = (degrees) => degrees * Math.PI / 180
Math.degrees = (radians) => radians * 180 / Math.PI
dom.event.ready(() => {
  // Init Application
  const app = new DesktopApp()
  app.init()
})
