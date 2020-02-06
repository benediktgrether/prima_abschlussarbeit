namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum ITEM {
    SWORD = "Sword"
  }

  export class Items extends ƒ.Node {

    private static sprites: Sprite[];
    public hitbox: Hitbox;
    private type: ITEM;


    public constructor(type: ITEM) {
      super("Item");
      this.type = type;
      this.addComponent(new ƒ.ComponentTransform());
      this.cmpTransform.local.translateY(0.5);
      for (let sprite of Items.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        this.appendChild(nodeSprite);
      }

      this.show();
      this.hitbox = this.creatHitbox();
      this.appendChild(this.hitbox);
    }

    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Items.sprites = [];
      let sprite: Sprite = new Sprite (ITEM.SWORD);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(170, 126, 8, 18), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
      Items.sprites.push(sprite);
    }

    public creatHitbox(): Hitbox {

      let hitbox: Hitbox = new Hitbox("ItemHitbox");
      hitbox.cmpTransform.local.scaleX(0.2);
      hitbox.cmpTransform.local.scaleY(0.4);
      this.hitbox = hitbox;
      return hitbox;
    }
    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == this.type);
    }
  }
}