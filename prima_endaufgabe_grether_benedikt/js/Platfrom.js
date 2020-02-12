"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Platform extends ƒ.Node {
        constructor() {
            super("Level");
            let platform;
            this.generatePlatform(platform, null, true);
            this.generatePlatform(platform, 3, true);
            // platform = new Floor(0, 1, ITEM.SWORD);
            // this.appendChild(platform);
        }
        generatePlatform(_platform, _distance, _item) {
            let floorDistance = -0.5;
            for (let index = 0; index < 3; index++) {
                if (index == 1) {
                    _platform = new prima_endaufgabe_grether_benedikt.Floor(floorDistance, 1, _distance, _item);
                }
                else {
                    _platform = new prima_endaufgabe_grether_benedikt.Floor(floorDistance, 1, _distance);
                }
                floorDistance = floorDistance + 0.25;
                this.appendChild(_platform);
            }
            return prima_endaufgabe_grether_benedikt.level;
        }
    }
    prima_endaufgabe_grether_benedikt.Platform = Platform;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Platfrom.js.map