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
  
function ajaxGet(URL, func) {
  req = null;
  if (window.XMLHttpRequest) { req = new XMLHttpRequest(); }
  else if (window.ActiveXObject) { req = new ActiveXObject("Microsoft.XMLHTTP"); }
  if (req == null) { return; } // Failed to create the request

  req.onreadystatechange = function() {
    switch(req.readyState) {
      case 0:  break; // Uninitialized
      case 1:  break; // Loading
      case 2:  break; // Loaded
      case 3:  break; // Interactive
      case 4:  func(req.responseText); break; // Done!
      default: break;
    }
  }

  req.open('GET', URL, true);
  req.send(null);
}