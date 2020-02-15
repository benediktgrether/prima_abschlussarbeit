namespace prima_endaufgabe_grether_benedikt {
  import ƒ = FudgeCore;
  export class Hero extends Character {
    public static sprites: Sprite[];
    public item: Items = null;

    constructor(_name: string) {
      super(_name);

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
      this.speedMax = new ƒ.Vector2(1.5, 5);

      this.hitbox = this.createHitbox();
      this.appendChild(this.hitbox);
      this.healthpoints = 10;
      this.counter = this.healthpoints - 1;

      if (this.item == null) {
        this.show(ACTION.IDLE, ITEM.NONE);
      }

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);

    }
    public createHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("PlayerHitbox");
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
          this.direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
          this.speed.x = this.speedMax.x;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.direction);
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

    public updateHealtpoints(): void {
      this.healthpoints = this.healthpoints - 0.5;
      this.updateHealthbar();
    }


    private updateHealthbar(): void {
      if (this.counter == this.healthpoints && this.counter >= 0) {
        this.getHTMLElements();
        this.counter -= 1;
      }
      if (this.healthpoints == -1) {
        life = false;
        game.removeChild(hero);
        ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        
      }
    }

    private getHTMLElements(): void {
      let elementIndex: string = this.healthpoints.toString();
      let element: HTMLElement = document.getElementById(elementIndex);
      element.classList.remove("heart-full");
      element.classList.add("heart-empty");
    }

    private update = (_event: ƒ.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));

      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speed.y += this.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);

      this.checkCollision(level);
      this.checkCollision(platform);
      this.hitbox.checkCollision();
    }
  }
}