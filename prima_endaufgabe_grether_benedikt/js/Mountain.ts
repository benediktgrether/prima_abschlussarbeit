namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum MOUNTAINS {
    MOUNTAIN = "Mountain"
  }

  export class Mountain extends ƒ.Node {
    private static sprites: Sprite[];
    

    constructor(_location: number) {
      super("Mountain");

      this.addComponent(new ƒ.ComponentTransform());

      this.cmpTransform.local.translateX(_location);
      this.cmpTransform.local.translateY(3.5);
      this.cmpTransform.local.translateZ(-0.2);

      for (let sprite of Mountain.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        this.appendChild(nodeSprite);
      }
      this.show();
    }
    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Mountain.sprites = [];
      let sprite: Sprite = new Sprite(MOUNTAINS.MOUNTAIN);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(4, 156, 261, 110), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
      Mountain.sprites.push(sprite);
    }
    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == MOUNTAINS.MOUNTAIN);
    }
  }
}