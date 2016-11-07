define([
	'lib/controller/keyboard',
	'lib/controller/touch',
	'lib/controller/gamepad'
], function (Keyboard, Touch, GamePad) {

	var Controller = {
	    
	    keyboard: Keyboard,
	    touch: Touch,
	    gamepad: GamePad,
	    dir: {
	    	x: 0,
	    	y: 0
	    }
	
	};
		
	Controller.update = function () {
	
		if(this.gamepad.connected) EXP.controller.gamepad.update();
		
	
		if(this.gamepad.supported && this.gamepad.connected){
			this.dir = this.gamepad.dir;
		} else if(this.touch.supported && this.touch.enabled){
			this.dir = this.touch.dir;
		} else {
			this.dir = this.keyboard.dir;
		}
	
	};
	
	Controller.render = function () {
	
		if(this.touch.supported && this.touch.enabled){
			this.touch.render();
		}
	
	};
	
	Controller.update();
		
	return Controller;
    
});