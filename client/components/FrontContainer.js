import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import AppActions from 'AppActions'
import WindowStore from 'WindowStore'
import RouterStore from 'RouterStore'
import RouterConstants from 'RouterConstants'
import Utils from '../utils'
import assign from 'object-assign'
import transform from 'dom-css-transform'

export default class FrontContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  render() {
    return (
      <div id='front-container' ref='front-container'>
        <header id="header">
        </header>
        <footer>
        </footer>
      </div>
    )
  }
  componentDidMount() {
  }
  componentWillUpdate() {
  }
  componentDidUpdate() {
  }
  setupAnimation() {
  }
  update() {
  }
  resize = () => {
    const windowW = WindowStore.Size.w
    const windowH = WindowStore.Size.h
  }
}
