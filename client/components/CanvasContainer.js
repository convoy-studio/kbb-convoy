import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import WindowStore from 'WindowStore'

export default class CanvasContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.addToCanvas = this.addToCanvas.bind(this)
    this.removeFromCanvas = this.removeFromCanvas.bind(this)
    AppStore.on(AppConstants.ADD_TO_CANVAS, this.addToCanvas)
    AppStore.on(AppConstants.REMOVE_FROM_CANVAS, this.removeFromCanvas)
  }
  render() {
    return (
      <canvas id="canvas-container" ref='canvas-container'></canvas>
    )
  }
  componentDidMount() {
    this.app = this.initCanvas()
    const blurFilter = new PIXI.filters.BlurFilter()
    blurFilter.blur = 60
    this.app.stage.filters = [ blurFilter ]
  }
  initCanvas() {
    return new PIXI.Application({ view: this.refs['canvas-container'], transparent: true })
  }
  addToCanvas(child) {
    this.app.stage.addChild(child)
  }
  removeFromCanvas(child) {
    this.app.stage.removeChild(child)
    child.destroy({ children: true })
  }
  update() {
  }
  resize() {
    const windowW = WindowStore.Size.w
    const windowH = WindowStore.Size.h
    this.app.renderer.resize(windowW, windowH)
  }
}
