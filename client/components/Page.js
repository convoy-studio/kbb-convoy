import BasePage from '../base/components/BasePage'
import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import scrolltop from 'simple-scrolltop'
import raf from 'raf'

export default class Page extends BasePage {
  constructor(props) {
    super(props)
    this.data = {}
    this.scrollPos = 0
    this.resize = this.resize.bind(this)
  }
  componentWillMount() {
    this.didScroll = this.didScroll.bind(this)
    super.componentWillMount()
  }
  componentDidMount() {
    this.initScroll()
    super.componentDidMount()
  }
  initScroll() {
    dom.event.on(window, 'scroll', this.didScroll)
  }
  didScroll(e) {
    e.preventDefault()
    raf(() => {
      this.scrollPos = scrolltop()
    })
  }
  render() {
    super.render()
  }
  willTransitionIn() {
    scrolltop(0)
    super.willTransitionIn()
  }
  setupAnimations() {
    super.setupAnimations()
  }
  update() {
  }
  resize() {
    super.resize()
  }
  componentWillUnmount() {
    dom.event.off(window, 'scroll', this.didScroll)
    AppStore.off(AppConstants.WINDOW_RESIZE, this.resize)
    super.componentWillUnmount()
  }
}
