/// <reference path="./SpriteGenerator.ts"/>
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

  let counter: number = 45;
  // let itemCounter: number = 20;

  export class Character extends ƒ.Node {
    private static sprites: Sprite[];
    private static speedMax: ƒ.Vector2 = new ƒ.Vector2(1.5, 5); // units per second
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public item: ITEM = ITEM.NONE;
    public hitbox: Hitbox;
    public directionChar: number;
    // public healthbar: Healthpoints[] = [];
    public healthpoints: number = 50;
    // public itemUsabilityPoints: number = 25;

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
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(24, 8, 24, 43), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Character.sprites.push(sprite);

      sprite = new Sprite(ACTION.IDLE + "." + ITEM.NONE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(3, 8, 20, 43), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Character.sprites.push(sprite);

      sprite = new Sprite(ACTION.IDLE + "." + ITEM.SWORD);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(120, 8, 22, 43), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Character.sprites.push(sprite);

      sprite = new Sprite(ACTION.WALK + "." + ITEM.SWORD);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(144, 8, 26, 43), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Character.sprites.push(sprite);

      sprite = new Sprite(ACTION.SWORD + "." + ITEM.SWORD);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(252, 5, 28, 46), 2, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
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

    public createSwordHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("SwordHitBox");
      console.log("test");
      hitbox.cmpTransform.local.translateY(0.6);
      hitbox.cmpTransform.local.scaleX(0.2);
      hitbox.cmpTransform.local.scaleY(0.5);
      this.hitbox = hitbox;
      this.appendChild(hitbox);
      console.log(hitbox);
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
          this.directionChar = (_direction == DIRECTION.RIGHT ? 1 : -1);
          this.speed.x = Character.speedMax.x;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.directionChar);
          // console.log(direction);
          break;
        case ACTION.JUMP:
          if (this.speed.y != 0 || this.cmpTransform.local.translation.y > 0)
            break;
          this.speed.y = 2.5;
          break;
      }

      this.show(_action, this.item);
    }

    // public itemUsability(): void {
    //   this.itemUsabilityPoints = this.itemUsabilityPoints - 1;
    //   this.updateItemUsability();
    // }

    public updateHealtpoints(): void {
      this.healthpoints = this.healthpoints - 1;
      this.updateHealthbar();
    }

    // private updateItemUsability(): void {
    //   console.log(this.itemUsabilityPoints);
    //   if (itemCounter == this.itemUsabilityPoints) {
    //     itemCounter -= 5;
    //   }
    //   if ( this.itemUsabilityPoints == 0 ) {
    //     this.item = ITEM.NONE;
    //   }
    // }

    private updateHealthbar(): void {
      if (counter == this.healthpoints) {
        let elementIndex: string = counter.toString();
        let element: HTMLElement = document.getElementById(elementIndex);
        element.classList.remove("heart-full");
        element.classList.add("heart-empty");
        counter -= 5;
        console.log(this.healthpoints);
      }

      if (this.healthpoints === 0) {
        life = false;
        game.removeChild(bene);
      }
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
      // console.log(this.item);
    }

    private checkCollision(_checkCollision: ƒ.Node): void {
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
        }
      }
    }
  }
}