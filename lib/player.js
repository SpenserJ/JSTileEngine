function Player(options) {
  var player = this;
  if (options == undefined) { options = {}; }
  if (options.map     == undefined) { this.pleaseSetMap     = 'Please set the map option'; return false; }
  if (options.canvas  == undefined) { this.pleaseSetCanvas  = 'Please set the canvas option'; return false; }
  if (options.tileset == undefined) { this.pleaseSetTileset = 'Please set the tileset option'; return false; }
  if (options.playerID == undefined) { this.pleaseSetPlayerID = 'Please set the player ID option'; return false; }
  this.map     = options.map;
  this.canvas  = options.canvas;
  this.tileset = options.tileset;
  this.playerID = options.playerID;
  this.coords = (options.coords == undefined) ? [1,2] : options.coords;//[4,5] : options.coords;
  if (playersOnTile[this.coords[1]] == undefined) { playersOnTile[this.coords[1]] = []; }
  if (playersOnTile[this.coords[1]][this.coords[0]] == undefined) { playersOnTile[this.coords[1]][this.coords[0]] = []; }
  playersOnTile[this.coords[1]][this.coords[0]].push(this.playerID);
  this.spriteStep  = (options.spriteStep  == undefined) ? 0 : options.spriteStep;
  this.spriteState = (options.spriteState == undefined) ? 0 : options.spriteState;
  this.spritePath  = (options.spritePath  == undefined) ? 'sprites/character/gramps.png' : options.spritePath;
  this.sprite = new Sprite(this.spritePath, [32, 32], this.map, this.tileset);
  this.sprite.callback = function() {
    player.sprite.drawSpriteToCanvas(player.coords[0], player.coords[1], player.canvas, player.spriteState, player.spriteStep);
  }
  this.sprite.load();
  
  this.move = function(direction) {
    var newCoords = this.coords;
    switch (direction) {
      case 'up':    newCoords = [newCoords[0], newCoords[1] - 1]; this.spriteState = 3; break;
      case 'down':  newCoords = [newCoords[0], newCoords[1] + 1]; this.spriteState = 0; break;
      case 'left':  newCoords = [newCoords[0] - 1, newCoords[1]]; this.spriteState = 1; break;
      case 'right': newCoords = [newCoords[0] + 1, newCoords[1]]; this.spriteState = 2; break;
    }
    
    if (this.map.isTileWalkable(newCoords[0], newCoords[1], this.tileset) === false) {
      newCoords = this.coords;
    }
    
    if (playersOnTile[newCoords[1]] == undefined) { playersOnTile[newCoords[1]] = []; }
    if (playersOnTile[newCoords[1]][newCoords[0]] == undefined) { playersOnTile[newCoords[1]][newCoords[0]] = []; }
    playersOnTile[newCoords[1]][newCoords[0]].push(this.playerID);
    array_remove(playersOnTile[this.coords[1]][this.coords[0]], playersOnTile[this.coords[1]][this.coords[0]].indexOf(this.playerID));
    //console.log(playersOnTile);
    
    this.map.dirtyTiles = this.map.dirtyTiles.concat([[this.coords[0], this.coords[1] - 1], this.coords]);
    this.map.cleanTiles(this.tileset, this.canvas);
    
    this.coords = newCoords;
    this.sprite.drawSpriteToCanvas(newCoords[0], newCoords[1], this.canvas, this.spriteState, this.spriteStep);
    this.spriteStep = (this.spriteStep > 2) ? this.spriteStep = 0 : this.spriteStep + 1;
  }
}