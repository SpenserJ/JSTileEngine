var fps = 0, fpsAvg = 0;
var $fps = $('<div style="position: absolute; bottom: 16px; left: 0px;"></div>');
var $fpsAvg = $('<div style="position: absolute; bottom: 0px; left: 0px;"></div>');
// Replace this with a non-jquery onready
var canvas, tileset, map, player, npc = {}, playerMovement = ['left', 'up', 'right', 'down'];
$(function() {
  canvas = document.getElementById('canvas').getContext('2d');
  
  tileset = new Tileset({ path: 'tiles/map.png', tileSpacer: false, tileSize: [32, 32] });
  map = new Map();
  tileset.callback = function() {
    map.render(0, 0, 8, 14, this, canvas);
    
    npc.amy = new Player({ spritePath: 'sprites/character/amy.png', coords: [1, 7], map: map, canvas: canvas, tileset: tileset });
    setInterval(function() {
      npc.amy.move(playerMovement[Math.floor(Math.random() * 4)]);
    }, 1000);
    
    npc.misty = new Player({ spritePath: 'sprites/character/misty.png', coords: [6, 13], spriteState: 1, map: map, canvas: canvas, tileset: tileset });
    setInterval(function() {
      npc.misty.move(playerMovement[Math.floor(Math.random() * 4)]);
    }, 1000);
    
    sprite3 = new Sprite('sprites/character/gramps.png', [32, 32], map, tileset);
    sprite3.callback = function() {
      sprite3.drawSpriteToCanvas(4,11,canvas,3,2);
    }
    sprite3.load();
    
    player = new Player({ map: map, canvas: canvas, tileset: tileset });
    
    $('body').keydown(function(e) {
      switch (e.keyCode) {
        case 37: player.move('left');  break;
        case 38: player.move('up');    break;
        case 39: player.move('right'); break;
        case 40: player.move('down');  break;
      }
    });
  }
  tileset.load();
  
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