namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  interface Object {
    level: Object[];
    distanceLevel: number;
  }

  let counter: number = 5;
  let _rotateZ: number = -180
  export class Level extends ƒ.Node {

    constructor(_data: Object[]) {
      super("Level");

      let level: Floor;
      this.fetchData(_data, level);
    }

    private createLevel(_level: Floor, _levelDistance: number): ƒ.Node {
      let floorDistance: number = -12.5;

      for (let index: number = 0; index < _levelDistance; index++) {
        _level = new Floor("Floor", floorDistance);
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
      return level;
    }
    private fetchData(_data: Object[], level: Floor): void {
      for (let i: number = 0; i < _data[0].level.length; i++) {
        this.createLevel(level, _data[0].level[i].distanceLevel);
      }
    }
    private setTrees(_level: Floor, _index: number): void {
      if (_index == counter) {
        let tree: Tree = new Tree(0);
        _level.appendChild(tree);
        counter += 10;
      }
    }

    private setMountains(_level: Floor, _index: number): void {
      if (_index == 24 || _index == 38 || _index == 52 || _index == 67 || _index == 80) {
        let mountain: Mountain = new Mountain(4);
        _level.appendChild(mountain);
      }
    }

    private setWall(_level: Floor, _floorDistance: number): void {
      let _translateY: number = -1.25;
      for (let index: number = 0; index < 8; index++) {
        _level = new Floor("Wall", _floorDistance);
        _level.cmpTransform.local.translateY(_translateY);
        _level.cmpTransform.local.rotateZ(_rotateZ);
        this.appendChild(_level);
        _translateY += 0.25;
      }
      _rotateZ = 0;
    }
    private setNotPlayableLevelElements(_level: Floor, _floorDistance: number, _index: number): void {
      let floorDistance: number = _floorDistance;
      for (let index: number = 0; index < 10; index++) {
        _level = new Floor("Floor", floorDistance);
        _level.cmpTransform.local.translateY(-1.5);
        if (_index == 0) {
          floorDistance = floorDistance - 0.25;
          this.appendChild(_level);
        } else {
          floorDistance = floorDistance + 0.25;
          this.appendChild(_level);
        }
      }
    }
  }
}

