import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import WindowStore from 'WindowStore'
import meatParticles from './MeatParticles'
import materials from './Materials'
import Utils from '../utils'
import translate from 'css3-translate'
import Leap from 'leapjs'
import rproport from 'resize-position-proportionally'
import messages from './Messages'

export default class CanvasContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.addToCanvas = this.addToCanvas.bind(this)
    this.removeFromCanvas = this.removeFromCanvas.bind(this)
    AppStore.on(AppConstants.ADD_TO_CANVAS, this.addToCanvas)
    AppStore.on(AppConstants.REMOVE_FROM_CANVAS, this.removeFromCanvas)
    this.loaderCounter = 0
    this.messagesAreActive = true
  }
  render() {
    return (
      <div style={{ height: 0}} ref='parent'>
        <div id="messages">
          <div className="msg">Great!</div>
          <div className="msg">Awesome!</div>
          <div className="msg">Sweet!</div>
          <div className="msg">Yummmm!</div>
          <div className="msg">Samurai!</div>
          <div className="msg">Juicy!</div>
          <div className="msg">Oh la la!</div>
          <div className="msg">Emporter!</div>
        </div>
        <div id='mouse-dot'>
          <svg width="100%" viewBox="0 0 101.235 101.235">
            <circle fill="#FFFFFF" stroke="#000000" strokeWidth="0" strokeMiterlimit="10" cx="50.617" cy="50.617" r="47.279"/>
          </svg>
        </div>
        <div className="background"><img ref='background' src="assets/images/textures/image.png"/></div>
        <div className="canvas-holder" ref="canvasHolder"></div>
      </div>
    )
  }
  componentDidMount() {
    dom.event.on(window, 'mousemove', this.mousemove)
    this.dot = {
      el: dom.select('#mouse-dot', document),
      x: -200,
      y: -200
    }
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, WindowStore.Size.w / WindowStore.Size.h, 1, 10000 )
    this.camera.position.z = 1400
    this.camera.position.y = -100
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize( WindowStore.Size.w, WindowStore.Size.h )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    dom.tree.add(this.refs.canvasHolder, this.renderer.domElement)
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2(500, 500)
    this.intersection = undefined
    this.intersectionCounter = 0
    this.kebab = new THREE.Object3D()
    this.scene.add(this.kebab)
    this.messages = messages(dom.select('#messages', document))
    this.meatParticles = meatParticles(this.scene)
    const ambientL = new THREE.AmbientLight( 0xffffff )
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 )
    directionalLight.position.set( -40, 17, 100 )
    const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1.0 )
    directionalLight2.position.set( -100, 72, -18 )
    const directionalLight3 = new THREE.DirectionalLight( 0xffffff, 1.0 )
    directionalLight3.position.set( 100, 17, -50 )
    this.lights = {
      ambient: ambientL,
      dir1: directionalLight,
      dir2: directionalLight2,
      dir3: directionalLight3
    }
    this.scene.add(this.lights.ambient)
    this.scene.add(this.lights.dir1)
    this.scene.add(this.lights.dir2)
    this.scene.add(this.lights.dir3)
    this.setupKebabBase(AppStore.getGeometry(AppConstants.KEBAB.BASE))
    this.setupTomato(AppStore.getGeometry(AppConstants.KEBAB.TOMATO))
    this.setupSilverBase(AppStore.getGeometry(AppConstants.KEBAB.SILVER))
    this.meatParticles.setup(AppStore.getGeometry(AppConstants.KEBAB.PARTICLE))
    Leap.loop((frame) => {
      const hand = frame.hands[0]
      if (hand) {
        let x = (window.innerWidth * 0.45) + hand.palmPosition[0]
        let y = (window.innerHeight * 0.9) - hand.palmPosition[1]
        this.updateMousePosition(x, y)
        this.messageActivation()
      }
    })
  }
  setupKebabBase(geometry) {
    const texture = AppStore.getTexture('shawarma-diff')
    const bump = AppStore.getTexture('shawarma-bump')
    this.scaleGeometryMatrix(geometry)
    const diffuseColor = new THREE.Color( 0xffffff )
    const metalness = 0.5
    const roughness = 1.0
    const bumpScale = 1
    const material = materials.meshStandardMaterial('kebab', {
      map: texture,
      bumpMap: bump,
      bumpScale: bumpScale,
      color: diffuseColor,
      metalness: metalness,
      roughness: roughness
    })
    const holder = new THREE.Object3D()
    const mesh = new THREE.Mesh( geometry, material )
    this.kebabBase = mesh
    this.kebab.add(mesh)
  }
  setupTomato(geometry) {
    const texture = AppStore.getTexture('tomato-skin')
    const bump = AppStore.getTexture('tomato-bump')
    this.scaleGeometryMatrix(geometry)
    const diffuseColor = new THREE.Color( 0xffffff )
    const metalness = 0.5
    const roughness = 1.0
    const bumpScale = 1
    const material = materials.meshStandardMaterial('tomato', {
      map: texture,
      bumpMap: bump,
      bumpScale: bumpScale,
      color: diffuseColor,
      metalness: metalness,
      roughness: roughness
    })
    const holder = new THREE.Object3D()
    const mesh = new THREE.Mesh( geometry, material )
    this.kebab.add(mesh)
  }
  setupSilverBase(geometry) {
    const texture = AppStore.getTexture('shawarma-diff')
    const bump = AppStore.getTexture('shawarma-bump')
    this.scaleGeometryMatrix(geometry)
    const diffuseColor = new THREE.Color( 0xe0e0e0 )
    const metalness = 0.56
    const roughness = 0.7
    const bumpScale = 1
    const material = materials.meshStandardMaterial('silver', {
      color: diffuseColor,
      metalness: metalness,
      roughness: roughness
    } )
    const holder = new THREE.Object3D()
    const mesh = new THREE.Mesh( geometry, material )
    this.kebab.add(mesh)
  }
  scaleGeometryMatrix(geometry) {
    geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( 0.5 ) )
  }
  mousemove = () => {
    this.messageActivation()
    this.updateMousePosition(WindowStore.Mouse.x, WindowStore.Mouse.y)
  }
  messageActivation = () => {
    this.messagesAreActive = true
    clearTimeout(this.mouseMoveTimeout)
    this.mouseMoveTimeout = setTimeout(() => {
      this.messagesAreActive = false
    }, 3000)
  }
  updateMousePosition = (x, y) => {
    const size = 50
    this.mouse.x = ( x / window.innerWidth ) * 2 - 1
    this.mouse.y = - ( y / window.innerHeight ) * 2 + 1
    const newX = x - (size >> 1)
    const newY = y - (size >> 1)
    this.dot.x += (newX - this.dot.x) * 0.6
    this.dot.y += (newY - this.dot.y) * 0.6
    translate['3d'](this.dot.el, this.dot.x, this.dot.y, 1)
  }
  addToCanvas(child) {
  }
  removeFromCanvas(child) {
  }
  update() {
    this.kebab.rotation.y += 0.006
    this.raycaster.setFromCamera( this.mouse, this.camera )
    if (this.kebabBase !== undefined) {
      const intersections = this.raycaster.intersectObjects( [ this.kebabBase ] )
      this.intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null
    }
    if (this.intersection) this.intersectionCounter += 1
    if (this.intersectionCounter > 350 ) {
      if (this.messagesAreActive) this.messages.showMsg()
      this.intersectionCounter = 0
    }
    this.meatParticles.update(this.intersection)
    this.renderer.render( this.scene, this.camera )
  }
  resize() {
    const windowW = WindowStore.Size.w
    const windowH = WindowStore.Size.h
    this.camera.aspect = windowW / windowH
    this.camera.updateProjectionMatrix()
    // const scale = 0.8
    this.renderer.setPixelRatio( 0.9 )
    this.renderer.setSize( windowW, windowH )
    const resizeP = rproport(windowW, windowH, 2048, 1024)
    this.refs.background.style.width = `${resizeP.width}px`
    this.refs.background.style.height = `${resizeP.height}px`
    this.refs.background.style.top = `${resizeP.top}px`
    this.refs.background.style.left = `${resizeP.left}px`
    // this.renderer.domElement.style.width = '100%'
    // this.renderer.domElement.style.height = '100%'
    this.messages.resize()
  }
}
