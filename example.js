var fps = 0, fpsAvg = 0, $fps, $fpsAvg;
// Replace this with a non-jquery onready
var libraries = {}, canvas, tileset, map, player, players = {}, currentPlayer = 1, playersOnTile = [], playerMovement = ['left', 'up', 'right', 'down'];
$(function() {
  libraries.canvas = new Canvas({ libraries: libraries, canvas: document.getElementById('canvas').getContext('2d') });
  
  libraries.tileset = new Tileset({ path: 'tiles/map.png', tileSpacer: false, tileSize: [32, 32], libraries: libraries });
  libraries.map = new Map({ libraries: libraries });
  libraries.tileset.callback = function() {
    libraries.canvas.renderBase(0, 0, 8, 14);
    libraries.canvas.renderOverlay(0, 0, 8, 14);
    
    players['npc-amy'] = new Player({ spritePath: 'sprites/character/amy.png', coords: [1, 4], libraries: libraries, playerID: 'npc-amy' });
    setInterval(function() {
      players['npc-amy'].move(playerMovement[Math.floor(Math.random() * 4)]);
    }, 1000);
    
    players['npc-misty'] = new Player({ spritePath: 'sprites/character/misty.png', coords: [6, 13], spriteState: 1, libraries: libraries, playerID: 'npc-misty' });
    setInterval(function() {
      players['npc-misty'].move(playerMovement[Math.floor(Math.random() * 4)]);
    }, 1000);
    
    players['player-1'] = new Player({ coords: [4,4], libraries: libraries, playerID: 'player-1', spritePath: 'sprites/character/hiro.png' });
    
    $('body').keydown(function(e) {
      switch (e.keyCode) {
        case 37: players['player-1'].move('left');  break;
        case 38: players['player-1'].move('up');    break;
        case 39: players['player-1'].move('right'); break;
        case 40: players['player-1'].move('down');  break;
      }
    });
  }
  libraries.tileset.load();
  
  $fps = $('#fps');
  $fpsAvg = $('#fps_avg');
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