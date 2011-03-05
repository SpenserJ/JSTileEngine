var map;
function Map(options) {
  map = this;
  this.base = [[[0,0],[[1,0],[1,1]],[2,0],[0,6],[2,6],[0,0],[1,0],[[2,0],[1,1]],[0,0]],
               [[0,1],[0,5],[1,5],[3,6],[4,6],[1,5],[2,5],[0,0],[8,1]],
               [[0,1],[0,6],[4,7],[[1,7],[6,0]],[[1,7],[7,0]],[3,7],[2,6],[0,0],[8,1]],
               [[0,1],[0,6],[2,6],[6,1],[7,1],[0,6],[2,6],[0,0],[8,1]],
               [[0,1],[0,6],[2,6],[4,0],[5,0],[0,6],[2,6],[0,0],[8,1]],
               [[0,1],[0,6],[2,6],[4,1],[5,1],[0,6],[2,6],[0,0],[8,1]],
               [[0,1],[0,6],[2,6],[4,2],[5,2],[0,6],[2,6],[0,0],[8,1]],
               [[0,1],[0,6],[4,6],[1,5],[1,5],[3,6],[2,6],[0,0],[8,1]],
               [[0,1],[0,7],[1,7],[1,7],[1,7],[1,7],[2,7],[0,0],[8,1]],
               [[0,0],[1,0],[2,0],[0,0],[1,0],[[2,0],[5,3]],[0,0],[1,0],[2,0]],
               [[0,0],[1,0],[2,0],[0,0],[1,0],[2,0],[0,0],[1,0],[2,0]]];
  
  this.dirtyTiles = [];
  
  this.renderTile = function(x, y, tileset, canvas) {
    var tile = this.base[y][x];
    if (typeof tile[0] == 'number') {
      tileset.drawTileToCanvas(x, y, tile[0], tile[1], canvas);
    } else if (typeof tile[0] == 'object') {
      for (layer in tile) {
        tileset.drawTileToCanvas(x, y, tile[layer][0], tile[layer][1], canvas);
      }
    }
  }
  
  this.render = function(x1, y1, x2, y2, tileset, canvas) {
    for (var y = y1; y <= y2; y++) {
      for (var x = x1; x <= x2; x++) {
        this.renderTile(x, y, tileset, canvas);
      }
    }
    fps++;
    //setTimeout(function() {
    //  map.render(x1, y1, x2, y2, tileset, canvas);
    //}, 0);
  }
  
  this.cleanTiles = function(tileset, canvas) {
    console.log(this.dirtyTiles);
    for (i in this.dirtyTiles) {
      var tile = this.dirtyTiles[i];
      this.renderTile(tile[0], tile[1], tileset, canvas);
    }
    this.dirtyTiles = [];
  }
}