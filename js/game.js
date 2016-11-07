(function() {

	'use strict';
	
    // Matter aliases
	var Util		= Horizon.util,
		Ui			= Horizon.ui,
		Camera		= Horizon.camera,
		Planet		= Horizon.planet,
		Player		= Horizon.player,
		Keyboard	= Horizon.keyboard,
		Touch 		= Horizon.touch,
		Items		= Horizon.items,
		Engine 		= Horizon.engine;
				        
    var Game = {};
        
    Game.init = function() {
                
    
        Engine.create({
        	camera: Camera
        });
        
        Planet.create();
        console.log(Planet);	
        
        var player = Player.create({controllable: true});
        Engine.add(player);
        Camera.follow(player);
        
        var health = Items.health.create({x: 8*32, y: 6*32});
        Engine.add(health);
        
        var health2 = Items.health.create({x: -2*32, y: -4*32, boost: 50});
        Engine.add(health2);
        
        var portal = Items.portal.create({x: 2*32, y: 2*32});
        Engine.add(portal);
        
        Engine.run();
        
    };

    window.addEventListener('load', Game.init);

})();