define([
	'lib/ui/healthbar',
	'lib/ui/shieldbar',
	'lib/ui/jetfuelbar',
	'lib/ui/inventorybar'
], function (Healthbar, Shieldbar, Jetfuelbar, Inventorybar) {

	var Ui = {
	    
	    healthbar: Healthbar,
	    shieldbar: Shieldbar,
	    jetfuelbar: Jetfuelbar,
	    inventorybar: Inventorybar
	
	};
	
	Ui.update = function () {
	
		this.shieldbar.update();
		this.healthbar.update();
		this.jetfuelbar.update();
		this.inventorybar.update();
	
	};
		
	Ui.render = function () {
		
		this.shieldbar.render();
		this.healthbar.render();
		this.jetfuelbar.render();
		this.inventorybar.render();
		
	};	
	
	return Ui;
    
});