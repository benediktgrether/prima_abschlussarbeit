namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export class Level extends ƒ.Node {

    constructor() {
      super("Level");

      let level: Floor;

      // level = new Floor(0);
      // this.appendChild(level);
      // console.log(level.name);
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

        this.appendChild(_level);
      }

      return level;
    }
  }
}


  //   public static createPlatform(): ƒ.Node {
  //     let floorDistance: number = -0.5;
  //     let platform: ƒ.Node = new ƒ.Node("Platform");
  //     for (let index: number = 0; index < 5; index++) {
  //     let floor: Floor = new Floor();

  //     floor.cmpTransform.local.scaleY(0.5);
  //     floor.cmpTransform.local.scaleX(0.5);
  //     floor.cmpTransform.local.translateY(1);
  //     floor.cmpTransform.local.translateX(floorDistance);
  //     floorDistance = floorDistance + 0.25;

  //     platform.appendChild(floor);
  //     }

  //     return platform;
  //   }


  //   public static createItem(): ƒ.Node {
  //     let setItems: ƒ.Node = new ƒ.Node("Items");
  //     let item: Items = new Items();

  //     item.cmpTransform.local.scaleY(0.5);
  //     item.cmpTransform.local.scaleX(0.5);
  //     item.cmpTransform.local.translateY(1.25);

  //     setItems.appendChild(item);

  //     return setItems;
  //   }
  // }
