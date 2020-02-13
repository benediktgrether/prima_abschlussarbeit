namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;


  interface Object {
    // platform: any;
    level: Object[];
    distanceLevel: number;
  }


  export class Level extends ƒ.Node {

    constructor(_data: Object[]) {
      super("Level");

      let level: Floor;
      this.fetchData(_data, level);
    }

    private createLevel(_level: Floor, _levelDistance: number): ƒ.Node {
      let floorDistance: number = -3.25;

      for (let index: number = 0; index < _levelDistance; index++) {
        _level = new Floor(floorDistance);
        floorDistance = floorDistance + 0.25;

        if (index == 5 || index == 10) {
          let tree: Tree = new Tree(0);
          _level.appendChild(tree);
        }

        if (index == 1 || index == 16) {
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

