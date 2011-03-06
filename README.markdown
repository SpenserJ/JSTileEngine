# What is this?
This is eventually going to be a 2D tile game engine with multi-tileset support

# TODO:
* Move FPS to debug code (See commit:5d53f29b8b89c9615f71)
* Only re-render changed tiles (when characters move)
* Render X tiles beyond the viewport
* Optimize z-index rendering
* Retain temporary sprites/tiles (other players) when you walk over them

# Logic for drawing map
* Draw map base
* Draw players/sprites
* * Draw transparent map portions that were overlaid
* Player moves
* * Redraw players/sprites
* * * Redraw transparent map portions that were overlaid