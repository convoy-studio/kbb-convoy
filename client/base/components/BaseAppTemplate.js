import AppStore from 'AppStore'

export default class BaseAppTemplate extends React.Component {
  componentDidMount() {
    AppStore.FrontBlock = this.refs['front-block']
  }
}
