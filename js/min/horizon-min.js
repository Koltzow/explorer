"use strict";var EXP={};requirejs(["lib/sound","lib/effects/smoke","lib/util/string","lib/util/number","lib/util/seed","lib/util/keyboard","lib/util/touch","lib/util/gamepad","lib/ui/jetfuelbar","lib/ui/healthbar","lib/ui/shieldbar","lib/physics/collision","lib/items/health","lib/items/portal","lib/planet","lib/camera","lib/player","lib/engine"],function(e,i,l){console.log(l),EXP={sound:e,effects:{smoke:i}};var a={};a.init=function(){Engine.create({camera:Camera}),Planet.create(),console.log(Planet);var e=Player.create({controllable:!0});Engine.add(e),Camera.follow(e);var i=Items.health.create({x:256,y:192});Engine.add(i);var l=Items.health.create({x:-64,y:-128,boost:50});Engine.add(l);var a=Items.portal.create({x:64,y:64});Engine.add(a),Engine.run()},window.addEventListener("load",a.init),console.log(Horizon)});