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

const textureLoader = (id, src, callback) => {
  let scope
  const texture = new THREE.TextureLoader().load(src, () => {
    scope.callback(scope)
  })
  scope = {
    texture,
    id,
    src,
    callback
  }
  return scope
}

const geometryLoader = (id, src, callback) => {
  let scope
  const jsonLoader = new THREE.JSONLoader()
  jsonLoader.load(src, (geometry) => {
    scope.geometry = geometry
    scope.callback(scope)
  })
  scope = {
    id,
    src,
    callback
  }
  return scope
}

class App {
  init() {
    this.onDataLoad = this.onDataLoad.bind(this)
    this.textures = []
    this.geometries = []
    this.loadGeneralAssets()
    this.texturesLoaded = 0
    this.geometriesLoaded = 0
  }
  loadGeneralAssets() {
    this.texturesManifest = [
      { id: 'shawarma-diff', src: 'assets/images/textures/Shawarma-diff.jpg' },
      { id: 'shawarma-diff-small', src: 'assets/images/textures/Shawarma-diff-small.jpg' },
      { id: 'shawarma-bump', src: 'assets/images/textures/Shawarma-bump.jpg' },
      { id: 'favorite-icon', src: 'assets/images/textures/favorite-icon.png' },
      { id: 'tomato-skin', src: 'assets/images/textures/Tomato_Skin.jpg' },
      { id: 'tomato-bump', src: 'assets/images/textures/Tomato_skin_bump.jpg' }
    ]
    this.texturesManifest.forEach(item => {
      textureLoader(item.id, item.src, this.onLoadImage)
    })
    this.geometriesManifest = [
      { id: AppConstants.KEBAB.BASE, src: 'assets/mesh/kebab_base.js' },
      { id: AppConstants.KEBAB.TOMATO, src: 'assets/mesh/tomato.js' },
      { id: AppConstants.KEBAB.SILVER, src: 'assets/mesh/silver.js' },
      { id: AppConstants.KEBAB.PARTICLE, src: 'assets/mesh/meat-particle.js' }
    ]
    this.geometriesManifest.forEach(item => {
      geometryLoader(item.id, item.src, this.onLoadGeometry)
    })
  }
  onLoadImage = (image) => {
    this.texturesLoaded += 1
    image.texture.wrapS = image.texture.wrapT = THREE.RepeatWrapping
    image.texture.anisotropy = 16
    this.textures.push({
      id: image.id,
      texture: image.texture
    })
    if (this.texturesLoaded === this.texturesManifest.length && this.geometriesLoaded === this.geometriesManifest.length) this.onDataLoad()
  }
  onLoadGeometry = (geometry) => {
    this.geometriesLoaded += 1
    this.geometries.push({
      id: geometry.id,
      geometry: geometry.geometry
    })
    if (this.geometriesLoaded === this.geometriesManifest.length && this.texturesLoaded === this.texturesManifest.length) this.onDataLoad()
  }
  onDataLoad() {
    const data = assign(assign(_data, { textures: this.textures }), { geometries: this.geometries })
    AppActions.fillAppWithInitialData( data ) // Propagate initial data on app
    ReactDOM.render( <AppTemplate />, AppStore.Parent ) // Render the app
    setTimeout( AppActions.appStart ) // Dispatch that the app is ready
    setTimeout( AppActions.introEnded )
  }
}

export default App
