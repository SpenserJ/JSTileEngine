function Player(options) {
  var player = this;
  if (options == undefined) { options = {}; }
  if (options.map     == undefined) { this.pleaseSetMap     = 'Please set the map option'; return false; }
  if (options.canvas  == undefined) { this.pleaseSetCanvas  = 'Please set the canvas option'; return false; }
  if (options.tileset == undefined) { this.pleaseSetTileset = 'Please set the tileset option'; return false; }
  this.map     = options.map;
  this.canvas  = options.canvas;
  this.tileset = options.tileset;
  this.coords = [3,1];
  this.spritePath = (options.spritePath == undefined) ? 'sprites/character/gramps.png' : options.spritePath;
  this.sprite = new Sprite(this.spritePath, [32, 32]);
  this.sprite.callback = function() {
    player.sprite.drawSpriteToCanvas(player.coords[0], player.coords[1], player.canvas, 0, 0);
  }
  this.sprite.load();
  
  this.move = function(direction) {
    var newCoords = this.coords;
    console.log(newCoords);
    var state;
    switch (direction) {
      case 'up':    newCoords = [newCoords[0], newCoords[1] - 1]; state = 3; break;
      case 'down':  newCoords = [newCoords[0], newCoords[1] + 1]; state = 0; break;
      case 'left':  newCoords = [newCoords[0] - 1, newCoords[1]]; state = 1; break;
      case 'right': newCoords = [newCoords[0] + 1, newCoords[1]]; state = 2; break;
    }
    console.log(newCoords);
    console.log(this.coords);
    this.map.dirtyTiles = this.map.dirtyTiles.concat([this.coords, [this.coords[0], this.coords[1] - 1]]);
    this.map.cleanTiles(this.tileset, this.canvas);
    
    this.coords = newCoords;
    this.sprite.drawSpriteToCanvas(newCoords[0], newCoords[1], this.canvas, state, 0);
  }
}