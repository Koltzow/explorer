define([
	'lib/effects/smoke',
	'lib/effects/Exp'
], function (Smoke, Exp) {

	var Effects = {
	    
	    smoke: Smoke,
	    exp: Exp
	
	};
	
	Effects.update = function () {
	
		this.smoke.update();
		this.exp.update();
	
	};
	
	Effects.render = function () {
		
		this.smoke.render();
		this.exp.render();
		
	};
		
	return Effects;
    
});