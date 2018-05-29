import dom from 'dom-hand'
import Utils from '../utils'

export default (parent)=> {
  let scope
  const msgs = dom.select.all('.msg', parent)
  let oldItem, newItem
  let currentIndex = 0
  let items = []
  msgs.forEach((msg) => {
    items.push({
      el: msg,
      size: [0, 0],
      tweenIn: undefined,
      tweenOut: undefined
    })
  })
  scope = {
    showMsg: () => {
      currentIndex = Utils.rand(0, items.length - 1, 0)
      oldItem = newItem
      newItem = items[currentIndex]
      setTimeout(() => newItem.tweenIn.play(0), 0)
      setTimeout(() => newItem.tweenOut.play(0), 2000)
    },
    resize: () => {
      items.forEach((item) => {
        let size = dom.size(item.el)
        item.size[0] = size[0]
        item.size[1] = size[1]
        item.el.style.left = (window.innerWidth >> 1) - (item.size[0] >> 1) + 'px'
        item.el.style.top = (window.innerHeight >> 1) - (item.size[1] >> 1) + 'px'
        item.tweenIn = TweenMax.fromTo(item.el, 0.6, { scale: 0.6, opacity: 0 }, { scale: 1, paused: true, opacity: 1, force3D: true, ease: Elastic.easeOut })
        item.tweenOut = TweenMax.to(item.el, 0.2, { scale: 2.4, opacity: 0, force3D: true, paused: true, ease: Expo.easeIn })
      })
    }
  }
  return scope
}
