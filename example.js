// Replace this with a non-jquery onready
$(function() {
  var canvas = document.getElementById('canvas').getContext('2d');
  var tileset = new Tileset({ path: 'tiles/map.png', tileSpacer: false, tileSize: [32, 32] });
  var map = new Map();
  tileset.callback = function() {
    map.render(0, 0, 7, 9, this, canvas);
  }
  tileset.load();
});