var fps = 0, fpsAvg = 0;
var $fps = $('<div style="position: absolute; bottom: 16px; left: 0px;"></div>');
var $fpsAvg = $('<div style="position: absolute; bottom: 0px; left: 0px;"></div>');
// Replace this with a non-jquery onready
var canvas;
$(function() {
  canvas = document.getElementById('canvas').getContext('2d');
  var tileset = new Tileset({ path: 'tiles/map.png', tileSpacer: false, tileSize: [32, 32] });
  var map = new Map();
  tileset.callback = function() {
    map.render(0, 0, 7, 9, this, canvas);
  }
  tileset.load();
  sprite = new Sprite('sprites/character/gramps.png');
  sprite.callback = function() {
    sprite.drawSpriteToCanvas(0-8,64,canvas);
    sprite.drawSpriteToCanvas(192-8,256,canvas,1,1);
    sprite.drawSpriteToCanvas(224-8,0,canvas,3,2);
  }
  sprite.load();
  $fps.appendTo('body');
  $fpsAvg.appendTo('body');
});
setInterval(function() {
  $fps.html('FPS: ' + fps);
  fpsAvg += fps;
  fps = 0;
}, 1000);
setInterval(function() {
  $fpsAvg.html('Average FPS: ' + fpsAvg / 5);
  fpsAvg = 0;
}, 5000);