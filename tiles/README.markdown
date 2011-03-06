# What is this folder
This folder contains tileset images, and their related walkable bit-arrays

# How do I make it work
When you load a tileset (new Tileset({ path: 'tiles/map.png' })), it automatically loads the .txt file of the same name. This file should be filled with a two dimensional array, with one cell for every tile on the tileset.

# How do I format the walkable bit-array?
In each cell, you will insert a single number. Each number refers to a tile type:
* 0 - Standard ground tile - Walkable
* 1 - Block-type ground tile - Not Walkable - These are things like trees and buildings
* 2 - Air level tiles - Walkable (under) - These are things like tree-tops
* 3 - Item level tiles - Not Walkable - Signs, shrubs, rocks, etc. These have a transparent background
* 4 - Door tiles - Walkable
* 5 - Water Tiles - Walkable