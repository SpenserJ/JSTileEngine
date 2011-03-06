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

function Canvas(options) {
  var canvas = this;
  if (options == undefined) { options = {}; }
  if (options.libraries == undefined) { this.pleaseSetLibraries = 'Please set the libraries option'; return false; }
  if (options.canvas    == undefined) { this.pleaseSetCanvas    = 'Please set the Canvas option';    return false; }
  this.libraries = options.libraries;
  this.canvas    = options.canvas;
  this.dirtyTiles = [];
  
  this.renderTile = function(x, y, tileLayer) {
    if (tileLayer[y] == undefined || tileLayer[y][x] == undefined) {
      return false;
    }
    var tile = tileLayer[y][x];
    if (typeof tile[0] == 'number') {
      this.libraries.tileset.drawTileToCanvas(x, y, tile[0], tile[1]);
    } else if (typeof tile[0] == 'object') {
      for (layer in tile) {
        this.libraries.tileset.drawTileToCanvas(x, y, tile[layer][0], tile[layer][1]);
      }
    }
  }
  
  this.renderBase = function(x1, y1, x2, y2) {
    for (var y = y1; y <= y2; y++) {
      for (var x = x1; x <= x2; x++) {
        this.renderTile(x, y, this.libraries.map.base);
      }
    }
    fps++;
    //setTimeout(function() {
    //  map.render(x1, y1, x2, y2, tileset, canvas);
    //}, 0);
  }
  
  this.renderOverlay = function(x1, y1, x2, y2) {
    for (var y = y1; y <= y2; y++) {
      for (var x = x1; x <= x2; x++) {
        this.renderTile(x, y, this.libraries.map.overlay);
      }
    }
  }
  
  this.isPlayerOnTile = function(x, y) {
    //console.log('Checking for player on tile ' + x + ',' + y);
    if (playersOnTile[y] != undefined &&
        playersOnTile[y][x] != undefined &&
        playersOnTile[y][x].length > 0 &&
        playersOnTile[y][x][0] != undefined) {
      return players[playersOnTile[y][x][0]];
    } else {
      return false;
    }
  }
  
  this.renderPlayerOnTile = function(player, kill) {
    player.drawSprite();
    var redrawPlayer;
    if (kill != 2 && (redrawPlayer = this.isPlayerOnTile(player.coords[0], (player.coords[1] + 1))) !== false) {
      this.renderPlayerOnTile(redrawPlayer, kill + 1);
    }
  }
  
  this.renderPlayers = function(x1, y1, x2, y2) {
    for (var y = y1; y <= y2; y++) {
      for (var x = x1; x <= x2; x++) {
        this.renderPlayerOnTile(x, y, this.libraries.map.overlay);
      }
    }
  }
  
  this.cleanTiles = function() {
    var redrawPlayer, tile;
    for (i in this.dirtyTiles) {
      tile = this.dirtyTiles[i];
      this.renderTile(tile[0], tile[1], this.libraries.map.base);
      if ((redrawPlayer = this.isPlayerOnTile(tile[0], tile[1])) !== false) {
        this.renderPlayerOnTile(redrawPlayer, 0);
      }
      if ((redrawPlayer = this.isPlayerOnTile(tile[0], tile[1] + 1)) !== false) {
        this.renderPlayerOnTile(redrawPlayer);
      }
      this.renderTile(tile[0], tile[1], this.libraries.map.overlay);
    }
    this.dirtyTiles = [];
  }
  
  this.drawImage = function(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight) {
    this.canvas.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  }
}