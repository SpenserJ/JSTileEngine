# What is this?
This is eventually going to be a 2D tile game engine with multi-tileset support

# TODO:
* Move FPS to debug code (See commit:5d53f29b8b89c9615f71)
* Render X tiles beyond the viewport

# Known bugs
* Double sprite rendering may result in two steps at once
* * Reproduce: Spastically run around Amy as she walks. Occasionally a red line appears above her
* * Alt Reproduce: Stand below an NPC, and when they move, your sprite will change its current step
* Resources (tiles/map.txt and sprites) are loaded twice