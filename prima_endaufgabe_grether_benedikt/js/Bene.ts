/// <reference path="./SpriteGenerator.ts"/>
namespace prima_endaufgabe_grether_benedikt {
  import ƒ = FudgeCore;

  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk",
    JUMP = "Jump"
  }
  export enum DIRECTION {
    LEFT, RIGHT
  }

  export class Character extends ƒ.Node {
    private static sprites: Sprite[];
    private static speedMax: ƒ.Vector2 = new ƒ.Vector2(1.5, 5); // units per second
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public item: ITEM = ITEM.NONE;
    public hitbox: Hitbox;
    public isMoving: boolean = false;

    constructor(_name: string = "Bene") {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform());

      for (let sprite of Character.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);

        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );
        this.appendChild(nodeSprite);
      }
      this.hitbox = this.createHitbox();
      this.appendChild(this.hitbox);
      this.show(ACTION.IDLE, this.item);
            

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);

    }

    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Character.sprites = [];
      let sprite: Sprite = new Sprite(ACTION.WALK + "." + ITEM.NONE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(30, 279, 30.8, 51), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Character.sprites.push(sprite);

      sprite = new Sprite(ACTION.IDLE + "." + ITEM.NONE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 279, 30.8, 51), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Character.sprites.push(sprite);

      sprite = new Sprite(ACTION.IDLE + "." + ITEM.SWORD);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(170, 279, 18, 51), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Character.sprites.push(sprite);
    }


    public createHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("PlayerHitbox");
      hitbox.cmpTransform.local.translateY(0.6);
      hitbox.cmpTransform.local.scaleX(0.2);
      hitbox.cmpTransform.local.scaleY(0.5);
      this.hitbox = hitbox;
      return hitbox;
    }

    public show(_action: ACTION, _item: ITEM): void {
      for (let child of this.getChildren())
        child.activate(child.name == _action + "." + _item);
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
          this.speed.x = Character.speedMax.x;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
          // console.log(direction);
          break;
        case ACTION.JUMP:
          if (this.speed.y != 0 || this.cmpTransform.local.translation.y > 0)
           break;
          this.speed.y = 2.5;
          break;
      }
                  
      this.show(_action, this.item);
    }

    private update = (_event: ƒ.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));

      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speed.y += Character.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      // this.hitbox.cmpTransform.local.translation = new ƒ.Vector3(this.mtxWorld.translation.x, this.mtxWorld.translation.y + 1.7, 0);

      this.checkCollision(level);
      this.checkCollision(platform);
      this.hitbox.checkCollision();
    }

    private checkCollision(_checkCollision: ƒ.Node): void {
      for (let floor of _checkCollision.getChildren()) {
        let rect: ƒ.Rectangle = (<Floor>floor).getRectWorld();
        let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
        if (hit) {
          let translation: ƒ.Vector3 = this.cmpTransform.local.translation;
          translation.y = rect.y;
          this.cmpTransform.local.translation = translation;
          this.speed.y = 0;
        }
      }
    }
  }
}