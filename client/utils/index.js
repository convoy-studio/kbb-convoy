class Utils {
  static normalizeMouseCoords(e, objWrapper) {
    let posx = 0
    let posy = 0
    if (e.pageX || e.pageY) {
      posx = e.pageX
      posy = e.pageY
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    objWrapper.x = posx
    objWrapper.y = posy
    return objWrapper
  }
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  static supportWebGL() {
    try {
      const canvas = document.createElement( 'canvas' )
      return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) )
    } catch ( e ) {
      return false
    }
  }
  static destroyVideo(video) {
    video.pause()
    video.src = ''
    const children = video.childNodes
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      child.setAttribute('src', '')
      // Working with a polyfill or use jquery
      dom.tree.remove(child)
    }
  }
  static resizePositionProportionally(windowW, windowH, contentW, contentH) {
    const aspectRatio = contentW / contentH
    let scale = ((windowW / windowH) < aspectRatio) ? (windowH / contentH) * 1 : (windowW / contentW) * 1
    const newW = contentW * scale
    const newH = contentH * scale
    const css = {
      width: newW,
      height: newH,
      left: (windowW >> 1) - (newW >> 1),
      top: (windowH >> 1) - (newH >> 1),
      scale: scale
    }
    return css
  }
  static destroyVideoTexture(texture) {
    const video = texture.baseTexture.source
    Utils.destroyVideo(video)
  }
  static rand(min, max, decimals) {
    const randomNum = Math.random() * (max - min) + min
    if (decimals === undefined) {
      return randomNum
    }
    const d = Math.pow(10, decimals)
    return ~~((d * randomNum) + 0.5) / d
  }
  static safeSplice(array, start, deleteCount) {
    return {
      select: [
        ...array.slice(start, start + deleteCount)
      ],
      remain: [
        ...array.slice(0, start),
        ...array.slice(start + deleteCount, array.length)
      ]
    }
  }
  static request(obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open(obj.method || 'GET', obj.url)
      if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
          xhr.setRequestHeader(key, obj.headers[key])
        })
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          reject(xhr.statusText)
        }
      }
      xhr.onerror = () => reject(xhr.statusText)
      xhr.send(obj.body)
    })
  }
  static parseQueryString(url) {
    const urlParams = {}
    url.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      ($0, $1, $2, $3) => {
        urlParams[$1] = $3
      }
    )
    return urlParams
  }
  static youtubeParser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : false
  }
  static popup = (href, intWidth = 500, intHeight = 400, strResize = 'yes') => {
    const strTitle = 'Social Share',
      strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
      objWindow = window.open(href, strTitle, strParam).focus()
  }
}

export default Utils
