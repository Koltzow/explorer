define([
	'lib/effects/smoke',
	'lib/effects/exp',
	'lib/effects/dust'
], function (Smoke, Exp, Dust) {

	var Effects = {
	    
	    smoke: Smoke,
	    exp: Exp,
	    dust: Dust
	
	};
	
	Effects.update = function () {
	
		this.smoke.update();
		this.exp.update();
		this.dust.update();
	
	};
	
	Effects.render = function () {
		
		this.smoke.render();
		this.exp.render();
		this.dust.render();
		
	};
		
	return Effects;
    
});