function Sprite(path, tileSize, map, tileset) {
  var sprite = this;
  this.ready = false;
  this.path = path;
  this.tileSize = tileSize;
  this.map = map;
  this.tileset = tileset;
  this.spriteSize = [48, 64];
  this.outputSize = [48, 64];
  
  this.load = function() {
    image = new Image();
    if (sprite.callback != undefined) {
      image.onload = function() {
        sprite.ready = true;
        sprite.callback();
      }
    } else {
      image.onload = function() {
        sprite.ready = true;
      }
    }
    image.src = this.path;
  }
  
  var image;
  this.load();
  
  this.getSprite = function(state, step) {
    if (this.ready) {
      state = (state == undefined) ? 0 : state;
      step  = (step  == undefined) ? 0 : step;
      return [step * this.spriteSize[0],
              state * this.spriteSize[1],
              this.spriteSize[0], this.spriteSize[1],
              this.outputSize[0], this.outputSize[1]];
    }
  }
  
  this.drawSpriteToCanvas = function(destX, destY, canvas, state, step) {
    if (this.ready) {
      state = (state == undefined) ? 0 : state;
      step = (step == undefined) ? 0 : step;
      coords = this.getSprite(state, step);
      canvas.drawImage(image, coords[0], coords[1], coords[2], coords[3],
                       destX * this.tileSize[0] - (this.spriteSize[0] - this.tileSize[0]) / 2,
                       destY * this.tileSize[1] - (this.spriteSize[1] - this.tileSize[1]),
                       coords[4], coords[5]);
      var tile = this.map.base[destY][destX];
      if (typeof tile[0] == 'object') {
        for (layer in tile) {
          var walkBit = this.tileset.walkBit[tile[layer][1]][tile[layer][0]];
          if (walkBit == 2) {
            this.tileset.drawTileToCanvas(destX, destY, tile[layer][0], tile[layer][1], canvas);
          }
        }
      }
    }
  }
}