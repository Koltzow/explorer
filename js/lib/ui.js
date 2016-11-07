define([
	'lib/ui/healthbar',
	'lib/ui/shieldbar',
	'lib/ui/jetfuelbar'
], function (Healthbar, Shieldbar, Jetfuelbar) {

	var Ui = {
	    
	    healthbar: Healthbar,
	    shieldbar: Shieldbar,
	    jetfuelbar: Jetfuelbar
	
	};
	
	Ui.update = function () {
	
		this.shieldbar.update();
		this.healthbar.update();
		this.jetfuelbar.update();
	
	};
		
	Ui.render = function () {
		
		this.shieldbar.render();
		this.healthbar.render();
		this.jetfuelbar.render();
		
	};	
	
	return Ui;
    
});