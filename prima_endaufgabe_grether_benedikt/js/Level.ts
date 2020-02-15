namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;
  
  interface Object {
    level: Object[];
    distanceLevel: number;
  }

  let counter: number = 5;

  export class Level extends ƒ.Node {

    constructor(_data: Object[]) {
      super("Level");

      let level: Floor;
      this.fetchData(_data, level);
    }

    private createLevel(_level: Floor, _levelDistance: number): ƒ.Node {
      let floorDistance: number = -12.5;

      for (let index: number = 0; index < _levelDistance; index++) {
        _level = new Floor(floorDistance);
        _level.cmpTransform.local.translateY(-1.5);
        floorDistance = floorDistance + 0.25;

        if (index == counter) {

          let tree: Tree = new Tree(0);
          _level.appendChild(tree);
          counter += 10;
        }

        if (index == 24 || index == 38 || index == 52 || index == 67 || index == 80) {
          let mountain: Mountain = new Mountain(4);
          _level.appendChild(mountain);
        }

        this.appendChild(_level);
      }
      return level;
    }
    private fetchData(_data: Object[], level: Floor): void {
      for (let i: number = 0; i < _data[0].level.length; i++) {
        this.createLevel(level, _data[0].level[i].distanceLevel);
      }
    }
  }
}

