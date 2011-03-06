/* JSTileEngine
 * Copyright (C) 2011 Spenser Jones
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function Map(options) {
  var map = this;
  if (options == undefined) { options = {}; }
  if (options.libraries == undefined) { this.pleaseSetLibraries = 'Please set the libraries option'; return false; }
  this.libraries = options.libraries;
  this.base = [[[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]],
               [[0,1],[0,1],[0,46],[1,46],[2,46],[3,46],[4,46],[0,1],[0,1],[0,1]],
               [[0,1],[0,1],[0,47],[1,47],[2,47],[3,47],[4,47],[0,1],[0,1],[0,1]],
               [[2,25],[0,1],[0,48],[1,48],[2,48],[3,48],[4,48],[4,26],[3,25]],
               [[0,26],[0,0],[[0,0],[0,49]],[1,49],[2,49],[3,49],[[0,0],[4,49]],[0,0],[1,26]],
               [[0,26],[1,0],[[2,0],[1,1]],[0,6],[1,6],[2,6],[0,0],[1,0],[1,26]],
               [[0,26],[0,5],[1,5],[3,6],[1,6],[4,6],[1,5],[2,5],[1,26]],
               [[0,26],[0,6],[4,7],[1,7],[1,7],[1,7],[3,7],[2,6],[1,26]],
               [[0,26],[0,6],[2,6],[5,4],[6,4],[7,4],[0,6],[2,6],[1,26]],
               [[0,26],[0,6],[2,6],[5,7],[6,7],[7,7],[0,6],[2,6],[1,26]],
               [[0,26],[0,6],[2,6],[5,8],[6,8],[7,8],[0,6],[2,6],[1,26]],
               [[0,26],[0,6],[4,6],[1,5],[1,5],[1,5],[3,6],[2,6],[1,26]],
               [[0,26],[0,7],[1,7],[1,7],[1,7],[1,7],[1,7],[2,7],[1,26]],
               [[0,26],[1,0],[2,0],[0,0],[1,0],[[2,0],[5,3]],[0,0],[1,0],[1,26]],
               [[2,26],[4,26],[4,26],[4,26],[4,26],[4,26],[4,26],[4,26],[3,26]]];
  this.overlay = [[,,[0,45],[1,45],[2,45],[3,45],[4,45]]];
  this.overlay[7] = [,,,,[6,3]];
  
  this.dirtyTiles = [];
  
  this.isPlayerOnTile = function(x, y) {
    if (playersOnTile[y] != undefined &&
        playersOnTile[y][x] != undefined &&
        playersOnTile[y][x].length > 0 &&
        playersOnTile[y][x][0] != undefined) {
      return players[playersOnTile[y][x][0]];
    } else {
      return false;
    }
  }
  
  this.cleanTiles = function() {
    var redrawPlayer, tile;
    for (i in this.dirtyTiles) {
      tile = this.dirtyTiles[i];
      this.libraries.canvas.renderTile(tile[0], tile[1], this.base);
      this.libraries.canvas.renderPlayers(tile[0], tile[1]);
      this.libraries.canvas.renderTile(tile[0], tile[1], this.overlay);
      /*if ((redrawPlayer = this.isPlayerOnTile(tile[0], tile[1])) !== false) {
        console.log('Need to redraw players on ' + tile[0] + ',' + tile[1]);
        console.log(redrawPlayer);
        redrawPlayer.sprite.drawSpriteToCanvas(redrawPlayer.coords[0], redrawPlayer.coords[1], redrawPlayer.spriteState, redrawPlayer.spriteStep);
      }
      if((redrawPlayer = this.isPlayerOnTile(tile[0], tile[1] + 1)) !== false) {
        console.log('Need to redraw players on ' + tile[0] + ',' + (tile[1] + 1));
        console.log(redrawPlayer);
        redrawPlayer.sprite.drawSpriteToCanvas(redrawPlayer.coords[0], redrawPlayer.coords[1], redrawPlayer.spriteState, redrawPlayer.spriteStep);
      }*/
    }
    this.dirtyTiles = [];
  }
  
  this.isTileWalkable = function(x, y) {
    var tile = this.base[y][x];
    var walkbit;
    if (typeof tile[0] == 'number') {
      walkBit = this.isWalkBitWalkable(this.libraries.tileset.walkBit[tile[1]][tile[0]]);
      if (walkBit === false) { return false; }
    } else if (typeof tile[0] == 'object') {
      for (layer in tile) {
        walkBit = this.isWalkBitWalkable(this.libraries.tileset.walkBit[tile[layer][1]][tile[layer][0]]);
        if (walkBit === false) { return false; }
      }
    }
    return true;
  }
  
  this.isWalkBitWalkable = function(walkBit) {
    switch (walkBit) {
      case 0:
      case 2:
      case 4: return true; break;
      default: return false; break;
    }
  }
}