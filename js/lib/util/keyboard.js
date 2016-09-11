var Keyboard = {
    
    pressedKeys: []

};

Horizon.keyboard = Keyboard;

Keyboard.keydown = function(e) {
	this.pressedKeys[e.key] = true;
	this.pressedKeys[e.code] = true;
	this.pressedKeys[e.keyCode] = true;
};

Keyboard.keyup = function(e) {
	this.pressedKeys[e.key] = false;
	this.pressedKeys[e.code] = false;
	this.pressedKeys[e.keyCode] = false;
};
   
Keyboard.isPressed = function(key){
	return this.pressedKeys[key] ? true : false;
};
   
Keyboard.addKeyPressListener = function(keyCode, callback){
      
	document.addEventListener('keydown', function(e) {
		if (e.keyCode === keyCode || e.key === keyCode){
			callback(e);
		}
	});
   
};

document.addEventListener("keydown", Keyboard.keydown.bind(Keyboard));
document.addEventListener("keyup", Keyboard.keyup.bind(Keyboard));