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

  export class Hero extends ƒ.Node {
    public static sprites: Sprite[];
    private static speedMax: ƒ.Vector2 = new ƒ.Vector2(1.5, 5); // units per second
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public item: Items = null;
    public hitbox: Hitbox;
    public directionChar: number;
    public healthpoints: number = 50;

    constructor(_name: string = "Bene") {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform());

      for (let sprite of Hero.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);

        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );
        this.appendChild(nodeSprite);
      }
      this.cmpTransform.local.translateY(-0.5);
      this.hitbox = this.createHitbox();
      this.appendChild(this.hitbox);

      if (this.item == null) {
        // this.item.type = ITEM.NONE;
        this.show(ACTION.IDLE, ITEM.NONE);
      }


      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);

    }

    // public static generateSprites(_txtImage: ƒ.TextureImage): void {
    //   Hero.sprites = [];
    //   let sprite: Sprite = new Sprite(ACTION.WALK + "." + ITEM.NONE);
    //   sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(24, 8, 24, 43), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
    //   Hero.sprites.push(sprite);

    //   sprite = new Sprite(ACTION.IDLE + "." + ITEM.NONE);
    //   sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(3, 8, 20, 43), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
    //   Hero.sprites.push(sprite);

    //   sprite = new Sprite(ACTION.IDLE + "." + ITEM.SWORD);
    //   sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(120, 8, 22, 43), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
    //   Hero.sprites.push(sprite);

    //   sprite = new Sprite(ACTION.WALK + "." + ITEM.SWORD);
    //   sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(144, 8, 26, 43), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
    //   Hero.sprites.push(sprite);

    //   sprite = new Sprite(ACTION.SWORD + "." + ITEM.SWORD);
    //   sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(252, 5, 28, 46), 2, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
    //   Hero.sprites.push(sprite);
    // }


    public createHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("PlayerHitbox");
      // hitbox.cmpTransform.local.translateY(0.6);
      hitbox.cmpTransform.local.scaleX(0.2);
      hitbox.cmpTransform.local.scaleY(0.5);
      this.hitbox = hitbox;
      return hitbox;
    }

    public createSwordHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("SwordHitBox");
      hitbox.cmpTransform.local.translateX(0.2);
      hitbox.cmpTransform.local.scaleX(0.5);
      hitbox.cmpTransform.local.scaleY(0.5);
      this.hitbox = hitbox;
      this.appendChild(hitbox);
      return hitbox;
    }

    public show(_action: ACTION, _item: ITEM): void {
      for (let child of this.getChildren()) {
        child.activate(child.name == _action + "." + _item);
      }
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          this.directionChar = (_direction == DIRECTION.RIGHT ? 1 : -1);
          this.speed.x = Hero.speedMax.x;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.directionChar);
          Sound.play("walkPlayer");
          break;
        case ACTION.JUMP:
          if (this.speed.y != 0 || this.cmpTransform.local.translation.y > 0)
            break;
          this.speed.y = 2.5;
          Sound.play("jump");
          break;
      }

      if (this.item == null) {
        this.show(_action, ITEM.NONE);
      } else {
        this.show(_action, this.item.type);
      }
    }

    // public itemUsability(): void {
    //   this.itemUsabilityPoints = this.itemUsabilityPoints - 1;
    //   this.updateItemUsability();
    // }

    public updateHealtpoints(): void {
      this.healthpoints = this.healthpoints - 1;
      this.updateHealthbar();
    }


    private updateHealthbar(): void {
      if (counter == this.healthpoints) {
        let elementIndex: string = counter.toString();
        let element: HTMLElement = document.getElementById(elementIndex);
        element.classList.remove("heart-full");
        element.classList.add("heart-empty");
        counter -= 5;
      }

      if (this.healthpoints === 0) {
        life = false;
        game.removeChild(hero);
      }
    }

    private update = (_event: ƒ.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));

      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speed.y += Hero.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);

      this.checkCollision(level);
      this.checkCollision(platform);
      this.hitbox.checkCollision();
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