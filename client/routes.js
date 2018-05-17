import page from 'page'
import assign from 'object-assign'
import RouterActions from 'RouterActions'
import AppStore from 'AppStore'
import Home from './components/pages/Home'
import UI from './components/pages/UI'

/**
 * Assign the routes of the app
 */
export default () => {
  page('/', ctx => next(ctx, Home, 'HOME', 'home', 'Home'))
  if (AppStore.getEnvironment() === 'DEV') page('/ui', ctx => next(ctx, UI, 'UI', 'ui', 'UI')) // Visible only on DEV env
  page('*', ctx => next(ctx, Home, 'HOME', 'home', 'Home'))
}

/**
 * Dispatch the updated route
 * @param  {[object]}               ctx           [context]
 * @param  {[React Component]}      template      [template of the page]
 */
const next = (ctx, template, type, id, name) => {
  setTimeout(() => {
    RouterActions.updatePath(assign({}, ctx, {template}, {type}, {id}, {name}))
  })
}
