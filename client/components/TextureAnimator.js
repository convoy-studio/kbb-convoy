export default (texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) => {
  let scope
  const tilesHorizontal = tilesHoriz
  const tilesVertical = tilesVert
  const numberOfTiles = numTiles
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set( 1 / tilesHorizontal, 1 / tilesVertical )
  const tileDisplayDuration = tileDispDuration
  let currentDisplayTime = 0
  let currentTile = 0
  scope = {
    update: (milliSec) => {
      currentDisplayTime += milliSec
      while (currentDisplayTime > tileDisplayDuration) {
        currentDisplayTime -= tileDisplayDuration
        currentTile++
        if (currentTile === numberOfTiles) currentTile = 0
        const currentColumn = currentTile % tilesHorizontal
        texture.offset.x = currentColumn / tilesHorizontal
        const currentRow = Math.floor( currentTile / tilesHorizontal )
        texture.offset.y = currentRow / tilesVertical
      }
    }
  }
  return scope
}
