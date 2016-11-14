# Change Log

Here is the change log for Explorer.

## 0.0.3

### Added
* Functions for showing/hiding colliders in Debug class
* Constant tilesize
* Dust class
* Item class for collectable items
* Dummy item for future items
* Collision functions for Enter, Stay and Exit
* Type and label variables for player, items and objects
* Inventory for player
* InventoryBar class
* Virtual camera position
* Ability to set static camera position
* Camera focus to focus on objects/items/POIs etc.
* Data class for importing and storing datasets
* Space class

### Updated
* Improved smoke
* Disabled footsteps
* Renamed Item class to Object class for static objects
* Improved layer sorting using colliders
* Moved item creation to Items class to avoid duplicate code


### Fixed
* Variable typo for colliders
* Lack of support for capital letters on keyboard controller

## 0.0.2

### Added
* Require.js to organize files
* Debug class
* EXP Class under effects
* Colliders to Collision class
* Cooldown for jetpack
* Controller class
* Footsteps to player

### Updated
* Moved string prototype to String class
* Improved tile mapping to have vegetation zones
* Improved jetpack sounds
* Renamed Shield class to Sheildbar
* Moved controllers into Controller class to return single directional output
* Moved UI into UI class
* Moved effects into Effects class
* Moved items into Items class
* Moved utilities into Util class

## 0.0.1

### Added
* Sound class
* Support variables for experimental classes

### Updated
* Sprites
* UI location
* Put effects in separate folder
* Shadow sprite and position, shadow is now separate from player sprite
* Moved GamePad.update() to Engine.update()

### Fixed
* Directional problem causing player to always idle left using GamePad
* Proper priority on what controller input to use
* Prevent double render on Engine.stop()

## 0.0.0

### Added
* First commit
* GamePad support