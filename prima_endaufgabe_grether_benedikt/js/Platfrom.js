"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Platform extends ƒ.Node {
        constructor(_data) {
            super("Platform");
            let platform;
            this.fetchData(_data, platform);
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
        fetchData(_data, platform) {
            for (let i = 0; i < _data[0].platform.length; i++) {
                this.generatePlatform(platform, _data[0].platform[i].distance, _data[0].platform[i].item);
            }
        }
    }
    prima_endaufgabe_grether_benedikt.Platform = Platform;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Platfrom.js.map