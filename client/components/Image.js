export default (src, parentTop, parentBottom, index, cb) => {
  let scope
  const el = new Image()
  const load = () => {
    el.src = scope.src
    return scope
  }
  const cancel = () => {
    el.src = ''
  }
  el.onload = () => {
    scope.isLoaded = true
    parentTop.setAttribute('src', src)
    parentBottom.setAttribute('data-loaded', 'true')
    dom.classes.add(parentTop, 'loaded')
    dom.classes.add(parentBottom, 'hide')
    setTimeout(() => { parentBottom.setAttribute('src', '') }, 1000)
    cb(scope)
  }
  scope = {
    src,
    isLoaded: false,
    load,
    cancel,
    index,
    el
  }
  return scope
}
