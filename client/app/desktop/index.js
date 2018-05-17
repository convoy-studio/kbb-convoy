require('../style/app.scss')

import _data from '../../data/index'
import AppStore from 'AppStore'
import AppActions from 'AppActions'
import AppConstants from 'AppConstants'
import WindowActions from 'WindowActions'
import RouterStore from 'RouterStore'
import RouterActions from 'RouterActions'
import RouterConstants from 'RouterConstants'
import AppTemplate from './template'
import Utils from '../../utils'
import assign from 'object-assign'

class App {
  init() {
    this.onDataLoad = this.onDataLoad.bind(this)
    this.loadGeneralAssets()
  }
  loadGeneralAssets() {
    let dataUrl
    const pixiLoader = new PIXI.loaders.Loader()
    pixiLoader.add('gradient', 'assets/images/gradient.png')
    pixiLoader.add('gradient-intro', 'assets/images/gradient-intro.png')
    pixiLoader.load((loader, resources) => {
      this.resources = resources
      this.onDataLoad()
      // if (AppStore.getEnvironment() === 'PROD') dataUrl = `${AppConstants.API}builder/endpoint/feed`
      // else dataUrl = 'data/feed.json'
      // Utils.request({url: dataUrl, headers: 'application/json', method: 'GET'}).then(this.onDataLoad)
    })
  }
  onDataLoad() {
    const data = assign(_data, { assets: this.resources })
    AppActions.fillAppWithInitialData( data ) // Propagate initial data on app
    ReactDOM.render( <AppTemplate />, AppStore.Parent ) // Render the app
    setTimeout( AppActions.appStart ) // Dispatch that the app is ready
    setTimeout( AppActions.introEnded )
  }
}

export default App
