var Collision = {};

Horizon.physics = Horizon.physics || {};
Horizon.physics.collision = Collision;

Collision.test = function (a, b) {
	return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
}