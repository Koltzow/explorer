'use strict';

var EXP = {};

require([
	'lib/data',
	'lib/sound',
	'lib/controller',
	'lib/effects',
	'lib/util',
	'lib/ui',
	'lib/physics',
	'lib/objects',
	'lib/items',
	'lib/planet',
	'lib/space',
	'lib/camera',
	'lib/player',
	'lib/engine',
	'lib/debug'
], function(Data, Sound, Controller, Effects, Util, Ui, Physics, Objects, Items, Planet, Space, Camera, Player, Engine, Debug) {

	EXP = {
		data: Data,
		sound: Sound,
		planet: Planet,
		space: Space,
		player: Player,
		engine: Engine,
		camera: Camera,
		controller: Controller,
		objects: Objects,
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
        
        var planet = EXP.planet.create();
        console.log(EXP.planet);	
        
        var player = EXP.player.create({controllable: true});
        EXP.engine.add(player);
        EXP.camera.follow(player);
        
        EXP.engine.add( EXP.items.create(EXP.data.items.gold));
        EXP.engine.add( EXP.items.create(EXP.data.items.rock));
        
        var health = EXP.objects.health.create({x: 8*32, y: 6*32});
        EXP.engine.add(health);
        
        var health2 = EXP.objects.health.create({x: -2*32, y: -4*32, boost: 50});
        EXP.engine.add(health2);
        
        var portal = EXP.objects.portal.create({x: 2*32, y: 2*32});
        EXP.engine.add(portal);
        
        EXP.engine.run();
        
    };

    Game.init();
    
});