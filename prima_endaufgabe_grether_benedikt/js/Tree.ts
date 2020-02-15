namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum TREES {
    TREE = "Tree"
  }

  export class Tree extends ƒ.Node {
    public static sprites: Sprite[];
    
    constructor(_location: number) {
      super("Tree");

      this.addComponent(new ƒ.ComponentTransform());
      this.cmpTransform.local.translateX(_location);
      this.cmpTransform.local.translateZ(-0.1);

      for (let sprite of Tree.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        this.appendChild(nodeSprite);
      }
      this.show();
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == TREES.TREE);
    }

    private update = (_event: ƒ.Eventƒ): void => {
      this.cmpTransform.local.translation = new ƒ.Vector3(hero.cmpTransform.local.translation.x, 3.2, -0.1);
    }
  }
}