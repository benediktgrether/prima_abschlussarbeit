namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum ITEM {
    NONE = "None",
    SWORD = "Sword"
  }

  // let itemCounter: number = 20;

  export class Items extends ƒ.Node {
    // static itemCounter: number = 20;
    static healthBar: number = 100;

    private static sprites: Sprite[];
    public itemUsabilityPoints: number;
    public hitbox: Hitbox;
    public type: ITEM;
    private itemCounter: number;
    // public itemUsabilityPoints: number;


    constructor(type: ITEM, _itemUsabilityPoints: number, _locationY?: number) {
      super("Item");
      this.type = type;
      this.addComponent(new ƒ.ComponentTransform());
      this.cmpTransform.local.translateY(_locationY);
      this.itemUsabilityPoints = _itemUsabilityPoints;
      this.itemCounter = _itemUsabilityPoints - 5;

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

    public itemUsability(): void {
      console.log(this.itemUsabilityPoints);
      this.itemUsabilityPoints = this.itemUsabilityPoints - 1;
      this.updateItemUsability();
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

    private updateItemUsability(): void {
      if (this.itemCounter == this.itemUsabilityPoints) {
        this.itemCounter -= 5;
        Items.healthBar -= 20;
        let element: HTMLElement = document.getElementById("itemHealthBar");
        element.style.width = Items.healthBar + "%";
      }
      if (this.itemUsabilityPoints == 0) {
        bene.item.type = ITEM.NONE;
        Items.healthBar = 100;
        Sound.play("itemDegredation");
      }
    }
  }
  
}