"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
        ACTION["SWORD"] = "Sword";
    })(ACTION = prima_endaufgabe_grether_benedikt.ACTION || (prima_endaufgabe_grether_benedikt.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = prima_endaufgabe_grether_benedikt.DIRECTION || (prima_endaufgabe_grether_benedikt.DIRECTION = {}));
    class Character extends ƒ.Node {
        constructor(_name) {
            super(_name);
            this.gravity = ƒ.Vector2.Y(-3);
            this.speed = ƒ.Vector3.ZERO();
            this.addComponent(new ƒ.ComponentTransform());
        }
        checkCollision(_checkCollision) {
            for (let floor of _checkCollision.getChildren()) {
                if (floor.name == "Floor") {
                    let rect = floor.getRectWorld();
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        let translation = this.cmpTransform.local.translation;
                        translation.y = rect.y;
                        this.cmpTransform.local.translation = translation;
                        this.speed.y = 0;
                    }
                }
                else if (floor.name == "Wall") {
                    let rect = floor.getRectWorld();
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        let translation = this.cmpTransform.local.translation;
                        translation.x = rect.x;
                        this.cmpTransform.local.translation = translation;
                        this.speed.y = 0;
                        this.speed.x = 0;
                    }
                }
            }
        }
    }
    prima_endaufgabe_grether_benedikt.Character = Character;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Character.js.map