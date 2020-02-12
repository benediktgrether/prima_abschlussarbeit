namespace prima_endaufgabe_grether_benedikt {
  import ƒ = FudgeCore;

  export class Floor extends ƒ.Node {
    private static mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
    private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1.8));
    private static sprites: Sprite[];
    public item: Items;

    public constructor(_distance: number, _translateY?: number, _distancePlatform?: number, _item?: boolean) {
      super("Floor");

      let nodeSprite: NodeSprite = new NodeSprite("FloorSprite", Floor.sprites[0]);
      nodeSprite.activate(false);
      
      this.appendChild(nodeSprite);

      this.addComponent(new ƒ.ComponentTransform());
      // this.addComponent(new ƒ.ComponentMaterial(Floor.material));
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Floor.mesh);
      // cmpMesh.pivot.translateY(-0.5);
      cmpMesh.pivot = Floor.pivot;
      this.addComponent(cmpMesh);
      this.show();
      
      this.cmpTransform.local.scaleX(0.5);
      this.cmpTransform.local.scaleY(0.5);
      this.cmpTransform.local.translateX(_distance);
      if (_translateY) {
        this.cmpTransform.local.translateY(_translateY);
      }
      if(_distancePlatform) {
        this.cmpTransform.local.translateX(_distancePlatform);
      }

      if (_item) {
        let item: Items = new Items(ITEM.SWORD);
        this.item = item;
        this.appendChild(this.item);
      }
    }

    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Floor.sprites = [];
      let sprite: Sprite = new Sprite("FloorSprite");
      // sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 20, 20, 150), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.BOTTOMCENTER);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(6, 131, 19, 19), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
      Floor.sprites.push(sprite);
    }

    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == "FloorSprite");
    }

    public getRectWorld(): ƒ.Rectangle {
      let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
      let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
      let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
      
      //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
      let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: ƒ.Vector2 = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }
  }
}