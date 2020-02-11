namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum ITEM {
    NONE = "None",
    SWORD = "Sword"
  }

  // let itemCounter: number = 20;

  export class Items extends ƒ.Node {
    static itemUsabilityPoints: number = 25;
    static itemCounter: number = 20;
    static healthBar: number = 100;

    private static sprites: Sprite[];
    public hitbox: Hitbox;
    public type: ITEM;
    // public itemUsabilityPoints: number;


    constructor(type: ITEM) {
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
      let sprite: Sprite = new Sprite(ITEM.SWORD);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(169, 125, 8, 18), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
      Items.sprites.push(sprite);
    }

    public static itemUsability(): void {
      this.itemUsabilityPoints = this.itemUsabilityPoints - 1;
      this.updateItemUsability();
    }
    static updateItemUsability(): void {
      console.log(this.itemUsabilityPoints);
      if (this.itemCounter == this.itemUsabilityPoints) {
        this.itemCounter -= 5;
        this.healthBar -= 20;
        let element: HTMLElement = document.getElementById("itemHealthBar");
        element.style.width = this.healthBar + "%";
      }
      if (this.itemUsabilityPoints == 0) {
        bene.item = ITEM.NONE;
        this.itemCounter = 20;
        this.itemUsabilityPoints = 25;
        this.healthBar = 100;
      }
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