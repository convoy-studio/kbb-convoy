import WindowStore from 'WindowStore'
import WindowActions from 'WindowActions'
import AppActions from 'AppActions'
import AppConstants from 'AppConstants'
import AppStore from 'AppStore'
import RouterStore from 'RouterStore'
import RouterConstants from 'RouterConstants'
import WindowConstants from 'WindowConstants'
import BaseAppTemplate from '../../base/components/BaseAppTemplate'
import FrontContainer from '../../components/FrontContainer'
import PagesContainer from '../../components/PagesContainer'
import CanvasContainer from '../../components/CanvasContainer'
import detector from '../../utils/environment-detector'

export default class AppTemplate extends BaseAppTemplate {
  componentWillMount() {
    this.didPathUpdate = this.didPathUpdate.bind(this)
    this.update = this.update.bind(this)
    WindowStore.on(WindowConstants.WINDOW_RESIZE, this.resize.bind(this))
    RouterStore.on(RouterConstants.UPDATE_PATH, this.didPathUpdate)
  }
  render() {
    return (
      <div id='app-template'>
        <div ref='front-block' id='front-block'></div>
        <FrontContainer ref='front-container' />
        <div id="top-container" ref='top-container'>
          <PagesContainer ref='pages-container' />
        </div>
        <CanvasContainer ref='canvas-container' />
    	</div>
    )
  }
  componentDidMount() {
    WindowActions.resize()
    let ticker = PIXI.ticker.shared
    ticker.add(this.update)
    ticker.stop()
    setTimeout(AppActions.startTicker)
    super.componentDidMount()
  }
  setupAnimation() {
  }
  didPathUpdate() {
    const route = RouterStore.newRoute()
  }
  update() {
    this.refs['pages-container'].update()
    this.refs['canvas-container'].update()
    this.refs['front-container'].update()
  }
  resize() {
    const windowH = WindowStore.Size.h
    this.setupAnimation()
    this.refs['pages-container'].resize()
    this.refs['front-container'].resize()
    this.refs['canvas-container'].resize()
  }
}
