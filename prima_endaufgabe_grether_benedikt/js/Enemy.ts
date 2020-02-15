namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  let itemDrop: Items;

  export class Enemy extends Character {
    public static sprites: Sprite[];

    constructor(_name: string, _translateX: number, _speed: number) {
      super(_name);

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
      this.cmpTransform.local.translateY(-0.5);
      this.speedMax = new ƒ.Vector2(_speed, 0);

      this.healthpoints = 5;
      this.counter = this.healthpoints - 5;

      this.hitbox = this.createHitbox();
      this.appendChild(this.hitbox);
      this.show(ACTION.IDLE);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public createHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("EnemyHitbox");
      hitbox.cmpTransform.local.scaleX(0.5);
      hitbox.cmpTransform.local.scaleY(0.5);
      this.hitbox = hitbox;
      return hitbox;
    }

    public show(_action: ACTION): void {
      for (let child of this.getChildren())
        child.activate(child.name == _action);
    }


    public act(_action: ACTION, _direction?: DIRECTION): void {
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          this.direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
          this.speed.x = this.speedMax.x;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.direction);
          break;
      }
      this.show(_action);
    }

    public movement(): void {
      if (this.cmpTransform.local.translation.x > hero.cmpTransform.local.translation.x + .1) {
        this.act(ACTION.WALK, DIRECTION.LEFT);
      } else if (this.cmpTransform.local.translation.x < hero.cmpTransform.local.translation.x - .1) {
        this.act(ACTION.WALK, DIRECTION.RIGHT);
      } else {
        this.act(ACTION.IDLE);
      }
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
        this.zombieDied(_enemy);

      }
    }

    private zombieDied(_enemy: Enemy): void {
      Sound.play("zombieDeath");
      game.removeChild(_enemy);
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, _enemy.update);
      this.spawnNewEnemy();
      this.itemDrop(_enemy.mtxWorld.translation.x);
      Highscore.setHighscore();
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
        itemDrop = new Items(ITEM.SWORD, 20, - 0.9);
        itemDrop.cmpTransform.local.translateX(_location + 0.25);
        itemDrop.cmpTransform.local.scaleX(.5);
        itemDrop.cmpTransform.local.scaleY(.5);
        game.appendChild(itemDrop);
      }
    }

    private update = (_event: ƒ.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));

      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speed.y += this.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);

      this.checkCollision(level);
      this.checkCollision(platform);
      this.movement();
    }

    private getRandomInt(max: number): number {
      return Math.floor(Math.random() * Math.floor(max));
    }

    private getRandomSpeed(): number {
      let math: number = Math.random();
      if (math >= 0.3 && math <= 0.5) {
        return math;
      } else {
        return this.getRandomSpeed();
      }
    }
  }
}