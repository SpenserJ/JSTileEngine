// Replace this with a non-jquery onready
/*$(function() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
  img.src = 'tiles/map.png';
});*/

$(function() {
  var canvas = document.getElementById('canvas').getContext('2d');
  var tileset = new Tileset({ path: 'tiles/map.png', offset: [1, 1] });
  var map = new Map();
  tileset.callback = function() {
    /*this.drawTileToCanvas(0, 0, 0, 0, canvas);
    this.drawTileToCanvas(0, 1, 0, 1, canvas);
    this.drawTileToCanvas(1, 0, 1, 0, canvas);
    this.drawTileToCanvas(1, 1, 1, 1, canvas);
    this.drawTileToCanvas(0, 2, 0, 2, canvas);
    this.drawTileToCanvas(2, 0, 2, 0, canvas);
    this.drawTileToCanvas(1, 2, 1, 2, canvas);
    this.drawTileToCanvas(2, 1, 2, 1, canvas);
    this.drawTileToCanvas(2, 2, 2, 2, canvas);*/
    map.render(0, 0, 9, 9, this, canvas);
  }
  tileset.load();
});