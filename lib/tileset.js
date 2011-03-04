function Tileset(options) {
  var tileset = this;
  this.path = options.path;
  this.tileSize = (options.tileSize == undefined) ? [16, 16] : options.tileSize;
  this.offset = (options.offset == undefined) ? [0, 0] : options.offset;
  this.tileSpacer = (options.tileSpacer == undefined) ? true : options.tileSpacer;
  this.ready = false;
  
  this.load = function() {
    image = new Image();
    if (tileset.callback != undefined) {
      image.onload = function() {
        tileset.ready = true;
        tileset.callback();
      }
    }
    image.src = this.path;
    ajaxGet(this.path.substring(0, this.path.lastIndexOf('.')) + '.txt', function(data) {
      tileset.walkBit = JSON.parse(data);
    });
  }
  
  var image;
  this.load();
  
  this.getTile = function(x, y) {
    if (this.ready) {
      return [this.offset[0] + x * (this.tileSize[0] + this.tileSpacer),
              this.offset[1] + y * (this.tileSize[1] + this.tileSpacer),
              this.tileSize[0], this.tileSize[1]];
    }
  }
  
  this.drawTileToCanvas = function(destX, destY, tileX, tileY, canvas) {
    if (this.ready) {
      coords = this.getTile(tileX, tileY);
      canvas.drawImage(image, coords[0], coords[1], coords[2], coords[3], destX * coords[2], destY * coords[3], coords[2], coords[3]);
    }
  }
}