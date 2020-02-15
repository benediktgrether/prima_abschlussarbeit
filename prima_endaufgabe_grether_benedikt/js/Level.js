"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let counter = 5;
    let _rotateZ = -180;
    class Level extends ƒ.Node {
        constructor(_data) {
            super("Level");
            let level;
            this.fetchData(_data, level);
        }
        createLevel(_level, _levelDistance) {
            let floorDistance = -12.5;
            console.log(_levelDistance);
            for (let index = 0; index < _levelDistance; index++) {
                _level = new prima_endaufgabe_grether_benedikt.Floor("Floor", floorDistance);
                _level.cmpTransform.local.translateY(-1.5);
                floorDistance = floorDistance + 0.25;
                if (index == 0 || index == _levelDistance - 2) {
                    this.setNotPlayableLevelElements(_level, floorDistance, index);
                    this.setWall(_level, floorDistance);
                }
                this.setTrees(_level, index);
                this.setMountains(_level, index);
                this.appendChild(_level);
            }
            return prima_endaufgabe_grether_benedikt.level;
        }
        fetchData(_data, level) {
            for (let i = 0; i < _data[0].level.length; i++) {
                this.createLevel(level, _data[0].level[i].distanceLevel);
            }
        }
        setTrees(_level, _index) {
            if (_index == counter) {
                let tree = new prima_endaufgabe_grether_benedikt.Tree(0);
                _level.appendChild(tree);
                counter += 10;
            }
        }
        setMountains(_level, _index) {
            if (_index == 24 || _index == 38 || _index == 52 || _index == 67 || _index == 80) {
                let mountain = new prima_endaufgabe_grether_benedikt.Mountain(4);
                _level.appendChild(mountain);
            }
        }
        setWall(_level, _floorDistance) {
            let _translateY = -1.25;
            console.log("test");
            console.log(_floorDistance);
            for (let index = 0; index < 8; index++) {
                _level = new prima_endaufgabe_grether_benedikt.Floor("Wall", _floorDistance);
                _level.cmpTransform.local.translateY(_translateY);
                _level.cmpTransform.local.rotateZ(_rotateZ);
                this.appendChild(_level);
                _translateY += 0.25;
            }
            _rotateZ = 0;
        }
        setNotPlayableLevelElements(_level, _floorDistance, _index) {
            let floorDistance = _floorDistance;
            for (let index = 0; index < 10; index++) {
                _level = new prima_endaufgabe_grether_benedikt.Floor("Floor", floorDistance);
                _level.cmpTransform.local.translateY(-1.5);
                if (_index == 0) {
                    floorDistance = floorDistance - 0.25;
                    this.appendChild(_level);
                }
                else {
                    floorDistance = floorDistance + 0.25;
                    this.appendChild(_level);
                }
            }
        }
    }
    prima_endaufgabe_grether_benedikt.Level = Level;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Level.js.map