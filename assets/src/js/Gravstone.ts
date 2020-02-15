namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  export enum GRAVSTONE {
    WOOD = "Wood"
  }

  export class Gravstone extends ƒ.Node {
    public static sprites: Sprite[];
  
    constructor(_location: number) {
      super("Gravestone");
      this.addComponent(new ƒ.ComponentTransform());
      this.cmpTransform.local.translateX(_location);
      this.cmpTransform.local.translateY(-0.9);
      for (let sprite of Gravstone.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        this.appendChild(nodeSprite);
      }
      this.show();
    }
    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == GRAVSTONE.WOOD);
    }
  }
}
