import Page from '../Page'
import WindowStore from 'WindowStore'

export default class UI extends Page {
  constructor(props) {
    super(props)
  }
  render() {
    return (
  		<div id='ui-page' ref='parent' className='page-wrapper'>
  			<div className='vertical-center-parent'>
  				<p className='vertical-center-child'>
  					UI page
  				</p>
  			</div>
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
  didTransitionInComplete() {
    super.didTransitionInComplete()
  }
  willTransitionIn() {
    super.willTransitionIn()
  }
  willTransitionOut() {
    super.willTransitionOut()
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
