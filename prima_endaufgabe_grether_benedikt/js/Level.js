"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Level extends ƒ.Node {
        static createLevel() {
            let floorDistance = -3.25;
            let level = new ƒ.Node("Level");
            for (let index = 0; index < 30; index++) {
                let floor = new prima_endaufgabe_grether_benedikt.Floor();
                floor.cmpTransform.local.scaleY(0.5);
                floor.cmpTransform.local.scaleX(0.5);
                floor.cmpTransform.local.translateX(floorDistance);
                floorDistance = floorDistance + 0.25;
                level.appendChild(floor);
            }
            return level;
        }
        static createPlatform() {
            let floorDistance = -0.5;
            let platform = new ƒ.Node("Platform");
            for (let index = 0; index < 5; index++) {
                let floor = new prima_endaufgabe_grether_benedikt.Floor();
                floor.cmpTransform.local.scaleY(0.5);
                floor.cmpTransform.local.scaleX(0.5);
                floor.cmpTransform.local.translateY(1);
                floor.cmpTransform.local.translateX(floorDistance);
                floorDistance = floorDistance + 0.25;
                platform.appendChild(floor);
            }
            return platform;
        }
    }
    prima_endaufgabe_grether_benedikt.Level = Level;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Level.js.map