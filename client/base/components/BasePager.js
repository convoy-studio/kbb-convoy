import AppStore from 'AppStore'
import AppActions from 'AppActions'
import AppConstants from 'AppConstants'
import RouterStore from 'RouterStore'
import RouterConstants from 'RouterConstants'
import PagerStore from '../stores/PagerStore'
import PagerConstants from '../constants/PagerConstants'
import PagerActions from '../actions/PagerActions'
import translate from 'css3-translate'

class BasePager extends React.Component {
  constructor() {
    super()
    this.willPageTransitionIn = this.willPageTransitionIn.bind(this)
    this.willPageTransitionOut = this.willPageTransitionOut.bind(this)
    this.didPageTransitionInComplete = this.didPageTransitionInComplete.bind(this)
    this.didPageTransitionOutComplete = this.didPageTransitionOutComplete.bind(this)
    this.pageTransitionDidFinish = this.pageTransitionDidFinish.bind(this)
    this.didPathUpdate = this.didPathUpdate.bind(this)
    this.pageAssetsLoaded = this.pageAssetsLoaded.bind(this)
    this.currentPageDivRef = 'page-b'
    this.components = {
      newComponent: undefined,
      oldComponent: undefined
    }
  }
  componentWillMount() {
    PagerStore.on(PagerConstants.PAGE_TRANSITION_IN, this.willPageTransitionIn)
    PagerStore.on(PagerConstants.PAGE_TRANSITION_OUT, this.willPageTransitionOut)
    PagerStore.on(PagerConstants.PAGE_TRANSITION_DID_FINISH, this.pageTransitionDidFinish)
    RouterStore.on(RouterConstants.UPDATE_PATH, this.didPathUpdate)
    AppStore.on(AppConstants.PAGE_ASSETS_LOADED, this.pageAssetsLoaded)
  }
  render() {
    return (
      <main>
        <div id='pages-container'>
          <div style={this.divStyle} ref='page-a' className='page-a'></div>
          <div style={this.divStyle} ref='page-b' className='page-b'></div>
        </div>
      </main>
    )
  }
  willPageTransitionIn() {
    this.switchPagesDivIndex()
    this.components.newComponent.willTransitionIn()
  }
  willPageTransitionOut() {
    if (this.components.oldComponent) this.components.oldComponent.willTransitionOut()
    else this.willPageTransitionIn()
  }
  didPageTransitionInComplete() {
    PagerActions.onTransitionInComplete()
    PagerActions.pageTransitionDidFinish()
  }
  didPageTransitionOutComplete() {
    PagerActions.onTransitionOutComplete()
  }
  pageTransitionDidFinish() {
    this.hideLoadState()
    this.unmountOldComponent()
  }
  switchPagesDivIndex() {
    const newEl = this.refs[this.currentPageDivRef]
    const oldEl = this.refs[this.oldPageDivRef]
    newEl.style.zIndex = 2
    oldEl.style.zIndex = 1
  }
  setupNewComponent() {
    const newRoute = RouterStore.newRoute()
    const Template = newRoute.template
    this.oldPageDivRef = this.currentPageDivRef
    this.currentPageDivRef = (this.currentPageDivRef === 'page-a') ? 'page-b' : 'page-a'
    const el = this.refs[this.currentPageDivRef]
    const page =
      <Template
        id={this.currentPageDivRef}
        isReady={this.onPageReady}
        didTransitionInComplete={this.didPageTransitionInComplete.bind(this)}
        didTransitionOutComplete={this.didPageTransitionOutComplete.bind(this)}
      />
    this.components.oldComponent = this.components.newComponent
    this.components.newComponent = ReactDOM.render(page, el)
  }
  didPathUpdate() {
    this.showLoadState()
    const newRoute = RouterStore.newRoute()
    const oldRoute = RouterStore.oldRoute()
    if (oldRoute === undefined) this.setupNewComponent()
    else setTimeout(AppActions.loadPageAssets)
  }
  pageAssetsLoaded() {
    this.setupNewComponent()
  }
  onPageReady(route) {
    PagerActions.onPageReady(route)
  }
  showLoadState() {
    AppStore.Parent.style.cursor = 'wait'
    translate['3d'](AppStore.FrontBlock, 0, 0, 0) // Block interactivity
  }
  hideLoadState() {
    AppStore.Parent.style.cursor = 'auto'
    translate['3d'](AppStore.FrontBlock, 99999, 99999, 1) // Put back interactivity
  }
  unmountOldComponent() {
    if (this.components.oldComponent) {
      const id = this.components.oldComponent.props.id
      const domToRemove = this.refs[id]
      ReactDOM.unmountComponentAtNode(domToRemove)
      this.components.oldComponent = undefined
    }
  }
}

export default BasePager
