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
  
  sprite = new Sprite('sprites/character/amy.png', [32, 32]);
  sprite.callback = function() {
    sprite.drawSpriteToCanvas(0,2,canvas);
  }
  sprite.load();
  
  sprite2 = new Sprite('sprites/character/misty.png', [32, 32]);
  sprite2.callback = function() {
    sprite2.drawSpriteToCanvas(6,9,canvas,1,1);
  }
  sprite2.load();
  
  sprite3 = new Sprite('sprites/character/gramps.png', [32, 32]);
  sprite3.callback = function() {
    sprite3.drawSpriteToCanvas(7,1,canvas,3,2);
  }
  sprite3.load();
  
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