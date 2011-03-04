// Replace this with a non-jquery onready
$(function() {
  var canvas = document.getElementById('canvas').getContext('2d');
  var tileset = new Tileset({ path: 'tiles/map.png', offset: [1, 1] });
  var map = new Map();
  tileset.callback = function() {
    map.render(0, 0, 9, 9, this, canvas);
  }
  tileset.load();
});