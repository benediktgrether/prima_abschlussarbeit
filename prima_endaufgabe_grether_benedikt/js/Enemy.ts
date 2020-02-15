namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum ACTION_ZOMBIE {
    IDLEZOMBIE = "Idle",
    WALKZOMBIE = "Walk"
  }

  export enum DIRECTIONZOMBIE {
    LEFTZOMBIE, RIGHTZOMBIE
  }
  let itemDrop: Items;

  export class Enemy extends ƒ.Node {
    private static sprites: Sprite[];
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public speedMax: ƒ.Vector2;
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public hitbox: Hitbox;
    public direction: number;
    public healthpoints: number;
    private counter: number;

    // All Same with Character

    constructor(_name: string, _translateX: number, _speed: number) {
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
      }

      // Hilfsverschiebung
      this.cmpTransform.local.translateX(_translateX);
      this.speedMax = new ƒ.Vector2(_speed, 0);

      this.healthpoints = 20;
      this.counter = this.healthpoints - 5;
      console.log(this.healthpoints);

      this.hitbox = this.createHitbox();
      this.appendChild(this.hitbox);
      this.show(ACTION_ZOMBIE.IDLEZOMBIE);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Enemy.sprites = [];
      let sprite: Sprite = new Sprite(ACTION_ZOMBIE.WALKZOMBIE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(141, 55, 24, 45), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Enemy.sprites.push(sprite);

      sprite = new Sprite(ACTION_ZOMBIE.IDLEZOMBIE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(117, 55, 22, 45), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
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
          this.direction = (_direction == DIRECTIONZOMBIE.RIGHTZOMBIE ? 1 : -1);
          this.speed.x = this.speedMax.x;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.direction);
          // Sound.play("walkZombie");
          break;
      }
      this.show(_action);
    }

    public updateHealtpoints(_enemy: Enemy): void {
      this.healthpoints = this.healthpoints - 1;
      this.updateHealthbar(_enemy);
    }

    private updateHealthbar(_enemy: Enemy): void {
      if (this.counter == this.healthpoints) {
        this.counter -= 5;
      }
      if (this.healthpoints === 0) {
        let gravestone: Gravstone = new Gravstone(_enemy.mtxWorld.translation.x);
        game.appendChild(gravestone);
        game.removeChild(_enemy);
        Sound.play("zombieDeath");
        ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, _enemy.update);
        this.spawnNewEnemy();
        this.itemDrop(_enemy.mtxWorld.translation.x);
        Highscore.setHighscore();

      }
    }

    private spawnNewEnemy(): void {
      let enemy: Enemy;
      let positonHero: number = hero.mtxWorld.translation.x;
      if (this.getRandomInt(2) == 0) {
        if ((positonHero + 3.5) < 12.5) {
          enemy = new Enemy("Zombie", (positonHero + 3), this.getRandomSpeed());
        } else {
          enemy = new Enemy("Zombie", (positonHero - 3), this.getRandomSpeed());
        }
      } else {
        if ((positonHero - 3.5) > - 12.5) {
          enemy = new Enemy("Zombie", (positonHero - 3), this.getRandomSpeed());
        } else {
          enemy = new Enemy("Zombie", (positonHero + 3), this.getRandomSpeed());

        }
      }
      game.appendChild(enemy);
    }

    private itemDrop(_location: number): void {
      if (this.getRandomInt(5) == 1) {
        Sound.play("itemDropZombie");
        itemDrop = new Items(ITEM.SWORD, 105, 0.25);
        itemDrop.cmpTransform.local.translateX(_location + 0.25);
        itemDrop.cmpTransform.local.scaleX(.5);
        itemDrop.cmpTransform.local.scaleY(.5);
        game.appendChild(itemDrop);
      }
    }

    private update = (_event: ƒ.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));

      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speed.y += Enemy.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);

      this.checkCollision(level);
      this.checkCollision(platform);
      this.movement();


    }

    private movement(): void {
      if (this.cmpTransform.local.translation.x > hero.cmpTransform.local.translation.x + .1) {
        this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.LEFTZOMBIE);
      } else if (this.cmpTransform.local.translation.x < hero.cmpTransform.local.translation.x - .1) {
        this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.RIGHTZOMBIE);
      }

      else {
        this.act(ACTION_ZOMBIE.IDLEZOMBIE);
      }
    }

    private getRandomInt(max: number): number {
      return Math.floor(Math.random() * Math.floor(max));
    }

    private getRandomSpeed(): number {
      let math: number = Math.random();
      if (math >= 0.3 && math <= 0.5) {
        console.log(math);
        return math;
      } else {
        return this.getRandomSpeed();
      }
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