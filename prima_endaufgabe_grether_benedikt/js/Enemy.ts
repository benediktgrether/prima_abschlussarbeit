namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum ACTION_ZOMBIE {
    IDLEZOMBIE = "Idle",
    WALKZOMBIE = "Walk"
  }

  export enum DIRECTIONZOMBIE {
    LEFTZOMBIE, RIGHTZOMBIE
  }

  export class Enemy extends ƒ.Node {
    private static sprites: Sprite[];
    private static speedMax: ƒ.Vector2 = new ƒ.Vector2(1, 0);
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public hitbox: Hitbox;

    // All Same with Character

    constructor(_name: string = "Zombie") {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform());

      for (let sprite of Enemy.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);

        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );
        this.appendChild(nodeSprite);

        // Hilfsverschiebung
        this.cmpTransform.local.translateX(1);
      }

      this.hitbox = this.createHitbox();
      this.appendChild(this.hitbox);
      this.show(ACTION_ZOMBIE.IDLEZOMBIE);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Enemy.sprites = [];
      let sprite: Sprite = new Sprite(ACTION_ZOMBIE.WALKZOMBIE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(30, 279, 30.8, 51), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Enemy.sprites.push(sprite);

      sprite = new Sprite(ACTION_ZOMBIE.IDLEZOMBIE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 279, 30.8, 51), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Enemy.sprites.push(sprite);
    }

    public createHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("EnemyHitbox");
      hitbox.cmpTransform.local.translateY(0.6);
      hitbox.cmpTransform.local.scaleX(0.2);
      hitbox.cmpTransform.local.scaleY(0.5);
      this.hitbox = hitbox;
      return hitbox;
    }

    public show(_action: ACTION_ZOMBIE): void {
      for (let child of this.getChildren())
        child.activate(child.name == _action);
    }


    public act(_action: ACTION_ZOMBIE, _direction?: DIRECTIONZOMBIE): void {
      switch (_action) {
        case ACTION_ZOMBIE.IDLEZOMBIE:
          this.speed.x = 0;
          break;
        case ACTION_ZOMBIE.WALKZOMBIE:
          let direction: number = (_direction == DIRECTIONZOMBIE.RIGHTZOMBIE ? 1 : -1);
          this.speed.x = Enemy.speedMax.x;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
          // console.log(direction);
          break;
      }
      this.show(_action);
    }

    private update = (_event: ƒ.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));

      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speed.y += Enemy.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      // this.hitbox.cmpTransform.local.translation = new ƒ.Vector3(this.mtxWorld.translation.x, this.mtxWorld.translation.y + 1.7, 0);

      this.checkCollision(level);
      this.checkCollision(platform);
      this.movement();
      this.hitbox.checkCollision();

    
    }

    private movement(): void{
      if (this.cmpTransform.local.translation.x > bene.cmpTransform.local.translation.x + .1) {
        console.log(this.cmpTransform.local.translation.x);
        this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.LEFTZOMBIE);
      } else if (this.cmpTransform.local.translation.x < bene.cmpTransform.local.translation.x - .1) {
        this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.RIGHTZOMBIE);
      }
      
      else {
        this.act(ACTION_ZOMBIE.IDLEZOMBIE);
      }
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