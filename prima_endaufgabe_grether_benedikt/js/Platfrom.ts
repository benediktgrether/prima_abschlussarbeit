namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  interface Object {
    platform: Object[];
    distance: number;
    item: boolean;
  }

  export class Platform extends ƒ.Node {
    constructor(_data: Object[]) {
      super("Platform");

      let platform: Floor;
      this.fetchData(_data, platform)
    }
    
    private generatePlatform(_platform: Floor, _distance?: number, _item?: boolean): ƒ.Node {
      let floorDistance: number = -0.5;

      for (let index: number = 0; index < 3; index++) {
        if (index == 1) {
          _platform = new Floor(floorDistance, 1, _distance, _item);
          _platform.cmpTransform.local.translateY(-1.5);
        } else {
          _platform = new Floor(floorDistance, 1, _distance);
          _platform.cmpTransform.local.translateY(-1.5);
        }
        floorDistance = floorDistance + 0.25;

        this.appendChild(_platform);
      }
      return level;
    }

    private fetchData(_data: Object[], platform: Floor): void {
      for (let i: number = 0; i < _data[0].platform.length; i++) {
        this.generatePlatform(platform, _data[0].platform[i].distance, _data[0].platform[i].item);
      }
    }
  }
}