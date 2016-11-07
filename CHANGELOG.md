# Change Log

Here is the change log for Explorer.

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
* Moved controllers into Controller class to return single directional output
* Renamed Shield class to Sheildbar
* Moved UI into UI class
* Moved effects into Effects class
* Moved items into Items class
* Moved utilities into Util class
* Improved jetpack sounds

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