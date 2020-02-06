namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export class Platform extends ƒ.Node {

    constructor() {
      super("Level");

      let platform: Floor;

      this.generatePlatform(platform);
      // platform = new Floor(0, 1, ITEM.SWORD);
      // this.appendChild(platform);
    }

    private generatePlatform(_platform: Floor, _item?: ITEM): ƒ.Node {
      let floorDistance: number = -0.5;

      for (let index: number = 0; index < 3; index++) {
        if (index == 1) {
          _platform = new Floor(floorDistance, 1, ITEM.SWORD);
        } else {
          _platform = new Floor(floorDistance, 1);
        }
        floorDistance = floorDistance + 0.25;

        this.appendChild(_platform);
      }

      return level;
    }
  }
}