import Page from '../Page'
import WindowStore from 'WindowStore'
import AppConstants from 'AppConstants'
import AppActions from 'AppActions'
import WindowActions from 'WindowActions'
import AppStore from 'AppStore'

export default class Home extends Page {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    super.componentWillMount()
  }
  render() {
    return (
      <div id='home-page' ref='parent' className='page-wrapper'>
        home
      </div>
    )
  }
  componentDidMount() {
    super.componentDidMount()
  }
  setupAnimations() {
    this.tlIn.from(this.refs.parent, 1, { opacity: 0, ease: Expo.easeInOut }, 0)
    this.tlOut.to(this.refs.parent, 1, { opacity: 0, ease: Expo.easeInOut }, 0)
    super.setupAnimations()
  }
  update() {
  }
  resize() {
    const windowW = WindowStore.Size.w
    const windowH = WindowStore.Size.h
    super.resize()
  }
  componentWillUnmount() {
    super.componentWillUnmount()
  }
}
