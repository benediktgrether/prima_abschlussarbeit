"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Level extends ƒ.Node {
        constructor(_data) {
            super("Level");
            let level;
            this.fetchData(_data, level);
        }
        createLevel(_level, _levelDistance) {
            let floorDistance = -3.25;
            for (let index = 0; index < _levelDistance; index++) {
                _level = new prima_endaufgabe_grether_benedikt.Floor(floorDistance);
                floorDistance = floorDistance + 0.25;
                if (index == 5 || index == 10) {
                    let tree = new prima_endaufgabe_grether_benedikt.Tree(0);
                    _level.appendChild(tree);
                }
                if (index == 1 || index == 16) {
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