"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let counter = 5;
    class Level extends ƒ.Node {
        constructor(_data) {
            super("Level");
            let level;
            this.fetchData(_data, level);
        }
        createLevel(_level, _levelDistance) {
            let floorDistance = -12.5;
            for (let index = 0; index < _levelDistance; index++) {
                _level = new prima_endaufgabe_grether_benedikt.Floor(floorDistance);
                _level.cmpTransform.local.translateY(-1.5);
                floorDistance = floorDistance + 0.25;
                if (index == counter) {
                    let tree = new prima_endaufgabe_grether_benedikt.Tree(0);
                    _level.appendChild(tree);
                    counter += 10;
                }
                if (index == 24 || index == 38 || index == 52 || index == 67 || index == 80) {
                    let mountain = new prima_endaufgabe_grether_benedikt.Mountain(4);
                    _level.appendChild(mountain);
                }
                this.appendChild(_level);
            }
            return prima_endaufgabe_grether_benedikt.level;
        }
        fetchData(_data, level) {
            for (let i = 0; i < _data[0].level.length; i++) {
                this.createLevel(level, _data[0].level[i].distanceLevel);
            }
        }
    }
    prima_endaufgabe_grether_benedikt.Level = Level;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Level.js.map