var GamePad = {
    supported: "getGamepads" in navigator,
    connected: false,
    buttons: [],
    sticks: [],
    dir: {
    	x: 0,
    	y: 0
    },
    interval: null
};

Horizon.gamepad = GamePad;

GamePad.update = function () {

	this.dir.x = 0;

	if(navigator.getGamepads()[0]) {
		
	    this.connected = true;
	    this.buttons = navigator.getGamepads()[0].buttons;
	    this.sticks = navigator.getGamepads()[0].axes;
	    
	    if(this.sticks.length > 0) {
	    	this.dir.x = Math.round(this.sticks[0]);
	    	this.dir.y = Math.round(this.sticks[1]);
	    }
	    
	    if(this.buttons[9].pressed) {
	    	if(!Engine.stopped){
	    		Engine.stop();
	    	}
	    }
	    
	} else {
		this.disconnect();
	}

};

GamePad.connect = function () {

	console.log('GAMEPAD: Connected');
	
	this.connected = true;

};

GamePad.disconnect = function () {

	console.log('GAMEPAD: Disconnected');
	
	this.connected = false;
	this.buttons = [];
	this.sticks = [];
	
	window.clearInterval(this.interval);
	
};

if(GamePad.supported){
	
	window.addEventListener("gamepadconnected", GamePad.connect.bind(GamePad));
	window.addEventListener("gamepaddisconnected", GamePad.disconnect.bind(GamePad));
	
	var maxCheck = 10;
	var counter = 0;
	
    var checkGP = window.setInterval(function() {
    
    	if(counter >= maxCheck){
    		window.clearInterval(checkGP);
    	} else {
	        
	        if(navigator.getGamepads()[0]) {
	            if(!GamePad.connected) {
	            	GamePad.connect();
	            	GamePad.buttons = navigator.getGamepads()[0].buttons;
	            	GamePad.sticks = navigator.getGamepads()[0].axes;
	            	window.clearInterval(checkGP);
	            }
	        }
	        
	        counter++;
        
        }
        
    }, 100);

}
