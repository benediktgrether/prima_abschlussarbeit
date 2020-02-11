namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum GRAVSTONE {
    WOOD = "Wood"
  }

  export class Gravstone extends ƒ.Node {

    private static sprites: Sprite[];
    

    constructor(_location: number) {
      super("Gravestone");
      this.addComponent(new ƒ.ComponentTransform());
      this.cmpTransform.local.translateX(_location);
      this.cmpTransform.local.translateY(0.25);
      for (let sprite of Gravstone.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        this.appendChild(nodeSprite);
      }
      this.show();
    }
    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Gravstone.sprites = [];
      let sprite: Sprite = new Sprite(GRAVSTONE.WOOD);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(186, 123, 13, 20), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.TOPCENTER);
      Gravstone.sprites.push(sprite);
    }
    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == GRAVSTONE.WOOD);
    }
  }
}
