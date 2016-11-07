'use strict';

var EXP = {};

requirejs([
	'lib/sound',
	'lib/controller',
	'lib/effects',
	'lib/util',
	'lib/ui',
	'lib/physics',
	'lib/items',
	'lib/planet',
	'lib/camera',
	'lib/player',
	'lib/engine',
	'lib/debug'
], function(Sound, Controller, Effects, Util, Ui, Physics, Items, Planet, Camera, Player, Engine, Debug) {

	EXP = {
		sound: Sound,
		planet: Planet,
		player: Player,
		engine: Engine,
		camera: Camera,
		controller: Controller,
		items: Items,
		effects: Effects,
		util: Util,
		ui: Ui,
		physics: Physics,
		debug: Debug
	};	
    
    var Game = {};
            
    Game.init = function() {
                
    
        EXP.engine.create({
        	camera: EXP.camera
        });
        
        EXP.planet.create();
        console.log(EXP.planet);	
        
        var player = EXP.player.create({controllable: true});
        EXP.engine.add(player);
        EXP.camera.follow(player);
        
        var health = EXP.items.health.create({x: 8*32, y: 6*32});
        EXP.engine.add(health);
        
        var health2 = EXP.items.health.create({x: -2*32, y: -4*32, boost: 50});
        EXP.engine.add(health2);
        
        var portal = EXP.items.portal.create({x: 2*32, y: 2*32});
        EXP.engine.add(portal);
        
        EXP.engine.run();
        
    };

    Game.init();
    
});