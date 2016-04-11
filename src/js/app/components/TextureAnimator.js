export default (texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)=> {
	var scope;

	// note: texture passed by reference, will be updated by the update function.
		
	var tilesHorizontal = tilesHoriz;
	var tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	var numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / tilesHorizontal, 1 / tilesVertical );

	// how long should each image be displayed?
	var tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	var currentDisplayTime = 0;

	// which image is currently being displayed?
	var currentTile = 0;
	
	scope = {
		update: (milliSec)=> {
			currentDisplayTime += milliSec;
			while (currentDisplayTime > tileDisplayDuration)
			{
				currentDisplayTime -= tileDisplayDuration;
				currentTile++;
				if (currentTile == numberOfTiles)
					currentTile = 0;
				var currentColumn = currentTile % tilesHorizontal;
				texture.offset.x = currentColumn / tilesHorizontal;
				var currentRow = Math.floor( currentTile / tilesHorizontal );
				texture.offset.y = currentRow / tilesVertical;
			}
		}
	}

	return scope
}