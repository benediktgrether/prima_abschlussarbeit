namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export class Level extends ƒ.Node {

    constructor() {
      super("Level");

      let level: Floor;

      this.createLevel(level);
    }

    private createLevel(_level: Floor): ƒ.Node {
      let floorDistance: number = -3.25;

      for (let index: number = 0; index < 30; index++) {
        _level = new Floor(floorDistance);
        floorDistance = floorDistance + 0.25;

        if (index == 5 || index == 10) {
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
  }
}

