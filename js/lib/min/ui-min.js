define(["lib/ui/healthbar","lib/ui/shieldbar","lib/ui/jetfuelbar","lib/ui/inventorybar"],function(e,r,t,i){var a={healthbar:e,shieldbar:r,jetfuelbar:t,inventorybar:i};return a.update=function(){this.shieldbar.update(),this.healthbar.update(),this.jetfuelbar.update(),this.inventorybar.update()},a.render=function(){this.shieldbar.render(),this.healthbar.render(),this.jetfuelbar.render(),this.inventorybar.render()},a});