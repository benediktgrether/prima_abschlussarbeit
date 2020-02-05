namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export class Level extends ƒ.Node {

    public static createLevel(): ƒ.Node {
      let floorDistance: number = -3.25;

      let level: ƒ.Node = new ƒ.Node("Level");
      
      for (let index: number = 0; index < 30; index++) {
        let floor: Floor = new Floor();
        floor.cmpTransform.local.scaleY(0.5);
        floor.cmpTransform.local.scaleX(0.5);
        floor.cmpTransform.local.translateX(floorDistance);

        floorDistance = floorDistance + 0.25;
       
        level.appendChild(floor);        
      }

      return level;
    }

    public static createPlatform(): ƒ.Node {
      let floorDistance: number = -0.5;
      let platform: ƒ.Node = new ƒ.Node("Platform");
      for (let index: number = 0; index < 5; index++) {
      let floor: Floor = new Floor();

      floor.cmpTransform.local.scaleY(0.5);
      floor.cmpTransform.local.scaleX(0.5);
      floor.cmpTransform.local.translateY(1);
      floor.cmpTransform.local.translateX(floorDistance);
      floorDistance = floorDistance + 0.25;
      
      platform.appendChild(floor);
      }

      return platform;
    }
  }
}