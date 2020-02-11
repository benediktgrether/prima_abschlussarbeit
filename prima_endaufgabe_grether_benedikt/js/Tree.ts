namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum TREES {
    TREE = "TREE"
  }

  export class Tree extends ƒ.Node {
    private static sprites: Sprite[];
    

    constructor(_location: number) {
      super("Gravestone");
      this.addComponent(new ƒ.ComponentTransform());
      this.cmpTransform.local.translateX(_location);
      this.cmpTransform.local.translateY(2.5);
      this.cmpTransform.local.translateZ(-0.1);
      // this.cmpTransform.local.scaleX(3);
      // this.cmpTransform.local.scaleY(3);
      for (let sprite of Tree.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        this.appendChild(nodeSprite);
      }
      this.show();
    }
    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Tree.sprites = [];
      let sprite: Sprite = new Sprite(TREES.TREE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(50, 70, 47, 83), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
      Tree.sprites.push(sprite);
    }
    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == TREES.TREE);
    }
  }
}