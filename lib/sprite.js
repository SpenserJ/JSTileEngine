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
  
function Sprite(options) {
  var sprite = this;
  if (options == undefined) { options = {}; }
  if (options.path      == undefined) { this.pleaseSetPath      = 'Please set the path option'; return false; }
  if (options.tileSize  == undefined) { this.pleaseSetTileSize  = 'Please set the tileSize option'; return false; }
  if (options.libraries == undefined) { this.pleaseSetLibraries = 'Please set the libraries option'; return false; }
  this.ready = false;
  this.path = options.path;
  this.tileSize = options.tileSize;
  this.libraries = options.libraries;
  this.spriteSize = [48, 64];
  this.outputSize = [48, 64];
  
  this.load = function() {
    image = new Image();
    if (sprite.callback != undefined) {
      image.onload = function() {
        sprite.ready = true;
        sprite.callback();
      }
    } else {
      image.onload = function() {
        sprite.ready = true;
      }
    }
    image.src = this.path;
  }
  
  var image;
  this.load();
  
  this.getSprite = function(state, step) {
    if (this.ready) {
      state = (state == undefined) ? 0 : state;
      step  = (step  == undefined) ? 0 : step;
      return [step * this.spriteSize[0],
              state * this.spriteSize[1],
              this.spriteSize[0], this.spriteSize[1],
              this.outputSize[0], this.outputSize[1]];
    }
  }
  
  this.drawSpriteToCanvas = function(destX, destY, state, step) {
    if (this.ready) {
      state = (state == undefined) ? 0 : state;
      step = (step == undefined) ? 0 : step;
      coords = this.getSprite(state, step);
      this.libraries.canvas.drawImage(image, coords[0], coords[1], coords[2], coords[3],
                                      destX * this.tileSize[0] - (this.spriteSize[0] - this.tileSize[0]) / 2,
                                      destY * this.tileSize[1] - (this.spriteSize[1] - this.tileSize[1]),
                                      coords[4], coords[5]);
      var tile = this.libraries.map.base[destY][destX];
      if (typeof tile[0] == 'object') {
        for (layer in tile) {
          var walkBit = this.libraries.tileset.walkBit[tile[layer][1]][tile[layer][0]];
          if (walkBit == 2) {
            this.libraries.tileset.drawTileToCanvas(destX, destY, tile[layer][0], tile[layer][1]);
          }
        }
      }
    }
  }
}