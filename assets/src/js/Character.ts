namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;
  
  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk",
    JUMP = "Jump",
    SWORD = "Sword"
  }
  export enum DIRECTION {
    LEFT, RIGHT
  }

  export class Character extends ƒ.Node {
      public gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
      public speedMax: ƒ.Vector2;
      public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
      public hitbox: Hitbox;
      public direction: number;
      public healthpoints: number;
      public counter: number;

      public constructor(_name: string) {
        super(_name);
        this.addComponent(new ƒ.ComponentTransform());
      }

      public checkCollision(_checkCollision: ƒ.Node): void {
        for (let floor of _checkCollision.getChildren()) {
          if (floor.name == "Floor") {
            let rect: ƒ.Rectangle = (<Floor>floor).getRectWorld();
            let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
              let translation: ƒ.Vector3 = this.cmpTransform.local.translation;
              translation.y = rect.y;
              this.cmpTransform.local.translation = translation;
              this.speed.y = 0;
            }
          } else if (floor.name == "Wall") {
            let rect: ƒ.Rectangle = (<Floor>floor).getRectWorld();
            let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
              let translation: ƒ.Vector3 = this.cmpTransform.local.translation;
              translation.x = rect.x;
              this.cmpTransform.local.translation = translation;
              this.speed.y = 0;
              this.speed.x = 0;
            }
          }
        }
      }
  }
}