namespace prima_endaufgabe_grether_benedikt {
  import ƒ = FudgeCore;

  export class Hitbox extends ƒ.Node {
    private static mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
    private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

    public constructor(_name?: string) {

      if (_name) {
        super(_name);
      } else {
        super("Hitbox");
      }
      this.addComponent(new ƒ.ComponentTransform());
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Hitbox.mesh);
      cmpMesh.pivot = Hitbox.pivot;
      this.addComponent(cmpMesh);

    }

    public getRectWorld(): ƒ.Rectangle {
      let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
      let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
      let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);

      let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: ƒ.Vector2 = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }

    public checkCollision(): void {
      this.checkItems();
      this.checkEnemys();
      this.checkNewItems();
    }

    private checkItems(): void {
      for (let floor of platform.getChildren()) {
        for (let child of floor.getChildren()) {
          if (child.name == "Item") {
            this.checkCollisionItem(child, floor);
          } else {
            continue;
          }
        }
      }
    }

    private checkEnemys(): void {
      for (let child of game.getChildren()) {
        if (child.name == "Zombie") {
          let hitbox: Hitbox;
          hitbox = (<Enemy>child).hitbox;
          if (this.detectedHit(hitbox)) {
            if ((<Enemy>child).direction == 1 && fight == false) {
              this.playerHit(0.1);

            } else if ((<Enemy>child).direction == -1 && fight == false) {
              this.playerHit(- 0.1);

            } else if (hero.item.type == "Sword" && fight == true) {
              this.checkCollisionFight(<Enemy>child);
            } else {
              continue;
            }
          }
        }
      }
    }

    private checkNewItems(): void {
      for (let child of level.getChildren()) {
        if (child.name == "Item") {
          this.checkCollisionItem(child, level);
        }
      }
    }

    private checkCollisionItem(_child: ƒ.Node, _getLevelElement: ƒ.Node): void {
      let hitbox: Hitbox;
      hitbox = (<Items>_child).hitbox;
      if (this.detectedHit(hitbox)) {
        if (_child.name == "Item") {
          if (hero.item == null || hero.item.type == ITEM.NONE) {
            hero.item = (<Items>_child);
            hero.createSwordHitbox();
            let element: HTMLElement = document.getElementById("itemHealthBar");
            element.style.width = "100%";
            _getLevelElement.removeChild(_child);
          }
        }
      }
    }

    private checkCollisionFight(_child: Enemy): void {
      if (_child.direction == 1 && hero.direction === -1) {
        this.enemyHit(_child, -0.15);

      } else if (_child.direction == -1 && hero.direction === 1) {
        this.enemyHit(_child, 0.15);

      } else if (_child.direction == 1 && hero.direction === 1) {
        this.playerHit(0.1);
      } else if (_child.direction == -1 && hero.direction === -1) {
        this.playerHit(-0.1);
      }
    }

    private enemyHit(_child: Enemy, _translateX: number): void {
      Sound.play("enemyHit");
      _child.cmpTransform.local.translateX(_translateX);
      _child.updateHealtpoints(_child);
      hero.item.itemUsability();
    }

    private playerHit(_translateX: number): void {
      Sound.play("playerHit");
      hero.cmpTransform.local.translateX(_translateX);
      hero.updateHealtpoints();
    }

    private detectedHit(hitbox: Hitbox): boolean {
      let hit: boolean = false;
      let rectOfThis: ƒ.Rectangle = (<Hitbox>this).getRectWorld();
      let rectOfThat: ƒ.Rectangle = hitbox.getRectWorld();
      let expansionRight: ƒ.Vector2 = new ƒ.Vector2(rectOfThat.size.x);
      let expansionDown: ƒ.Vector2 = new ƒ.Vector2(0, rectOfThat.size.y);
      let topRight: ƒ.Vector2 = ƒ.Vector2.SUM(rectOfThat.position, expansionRight);
      let bottomLeft: ƒ.Vector2 = ƒ.Vector2.SUM(rectOfThat.position, expansionDown);
      let bottomRight: ƒ.Vector2 = ƒ.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);

      if (rectOfThis.isInside(rectOfThat.position)) {
        hit = true;
      } else if (rectOfThis.isInside(topRight)) {
        hit = true;
      } else if (rectOfThis.isInside(bottomLeft)) {
        hit = true;
      } else if (rectOfThis.isInside(bottomRight)) {
        hit = true;
      }
      return hit;
    }
  }
}