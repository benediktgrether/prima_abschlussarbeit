namespace prima_endaufgabe_grether_benedikt {
  import fudge = FudgeCore;

  export class Hitbox extends fudge.Node {
    private static mesh: fudge.MeshSprite = new fudge.MeshSprite();
    private static readonly pivot: fudge.Matrix4x4 = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));

    public constructor(_name?: string) {

      if (_name) {
        super(_name);
      } else {
        super("Hitbox");
      }
      this.addComponent(new fudge.ComponentTransform());
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Hitbox.mesh);
      cmpMesh.pivot = Hitbox.pivot;
      this.addComponent(cmpMesh);

    }

    public getRectWorld(): fudge.Rectangle {
      let rect: fudge.Rectangle = fudge.Rectangle.GET(0, 0, 100, 100);
      let topleft: fudge.Vector3 = new fudge.Vector3(-0.5, 0.5, 0);
      let bottomright: fudge.Vector3 = new fudge.Vector3(0.5, -0.5, 0);

      let mtxResult: fudge.Matrix4x4 = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: fudge.Vector2 = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
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
      for (let child of game.getChildren()) {
        if (child.name == "Item") {
          this.checkCollisionItem(child, game);
        }
      }
    }

    private checkCollisionItem(_child: ƒ.Node, _floor: ƒ.Node): void {
      let hitbox: Hitbox;
      hitbox = (<Items>_child).hitbox;
      if (this.detectedHit(hitbox)) {
        if (_child.name == "Item") {
          if (hero.item == null || hero.item.type == ITEM.NONE) {
            hero.item = (<Items>_child);
            hero.createSwordHitbox();
            let element: HTMLElement = document.getElementById("itemHealthBar");
            element.style.width = "100%";
            _floor.removeChild(_child);
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
      let rectOfThis: fudge.Rectangle = (<Hitbox>this).getRectWorld();
      let rectOfThat: fudge.Rectangle = hitbox.getRectWorld();
      let expansionRight: fudge.Vector2 = new fudge.Vector2(rectOfThat.size.x);
      let expansionDown: fudge.Vector2 = new fudge.Vector2(0, rectOfThat.size.y);
      let topRight: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionRight);
      let bottomLeft: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionDown);
      let bottomRight: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);

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