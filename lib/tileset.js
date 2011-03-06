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
  
function Tileset(options) {
  var tileset = this;
  if (options == undefined) { options = {}; }
  if (options.path      == undefined) { this.pleaseSetPath      = 'Please set the path option'; return false; }
  if (options.libraries == undefined) { this.pleaseSetLibraries = 'Please set the libraries option'; return false; }
  this.path = options.path;
  this.libraries = options.libraries;
  this.tileSize = (options.tileSize == undefined) ? [16, 16] : options.tileSize;
  this.offset = (options.offset == undefined) ? [0, 0] : options.offset;
  this.tileSpacer = (options.tileSpacer == undefined) ? true : options.tileSpacer;
  this.ready = false;
  
  this.load = function() {
    image = new Image();
    if (tileset.callback != undefined) {
      image.onload = function() {
        tileset.ready = true;
        tileset.callback();
      }
    }
    image.src = this.path;
    ajaxGet(this.path.substring(0, this.path.lastIndexOf('.')) + '.txt', function(data) {
      tileset.walkBit = JSON.parse(data);
    });
  }
  
  var image;
  this.load();
  
  this.getTile = function(x, y) {
    if (this.ready) {
      return [this.offset[0] + x * (this.tileSize[0] + this.tileSpacer),
              this.offset[1] + y * (this.tileSize[1] + this.tileSpacer),
              this.tileSize[0], this.tileSize[1]];
    }
  }
  
  this.drawTileToCanvas = function(destX, destY, tileX, tileY) {
    if (this.ready) {
      coords = this.getTile(tileX, tileY);
      this.libraries.canvas.drawImage(image, coords[0], coords[1], coords[2], coords[3], destX * coords[2], destY * coords[3], coords[2], coords[3]);
    }
  }
}