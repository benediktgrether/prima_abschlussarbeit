"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var fudge = FudgeCore;
    class Hitbox extends fudge.Node {
        constructor(_name) {
            if (_name) {
                super(_name);
            }
            else {
                super("Hitbox");
            }
            this.addComponent(new fudge.ComponentTransform());
            // this.addComponent(new fudge.ComponentMaterial(Hitbox.material));
            let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
            cmpMesh.pivot = Hitbox.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = fudge.Rectangle.GET(0, 0, 100, 100);
            let topleft = new fudge.Vector3(-0.5, 0.5, 0);
            let bottomright = new fudge.Vector3(0.5, -0.5, 0);
            //let pivot: fudge.Matrix4x4 = this.getComponent(fudge.ComponentMesh).pivot;
            let mtxResult = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        checkCollision() {
            for (let floor of prima_endaufgabe_grether_benedikt.platform.getChildren()) {
                for (let child of floor.getChildren()) {
                    if (child.name == "Item") {
                        let hitbox;
                        hitbox = child.hitbox;
                        if (this.detectedHit(hitbox)) {
                            console.log(prima_endaufgabe_grether_benedikt.bene.item);
                            if (child.name == "Item") {
                                child.cmpTransform.local.translateY(5);
                                if (prima_endaufgabe_grether_benedikt.bene.item == prima_endaufgabe_grether_benedikt.ITEM.NONE) {
                                    prima_endaufgabe_grether_benedikt.bene.item = child.type;
                                    prima_endaufgabe_grether_benedikt.bene.createSwordHitbox();
                                    console.log(prima_endaufgabe_grether_benedikt.bene.item);
                                }
                            }
                        }
                        // fudge.Debug.log(child);
                    }
                    else {
                        continue;
                    }
                }
                for (let child of prima_endaufgabe_grether_benedikt.game.getChildren()) {
                    if (child.name == "Zombie") {
                        let hitbox;
                        hitbox = child.hitbox;
                        if (this.detectedHit(hitbox)) {
                            if (child.direction == 1 && prima_endaufgabe_grether_benedikt.fight == false) {
                                console.log("hit left");
                                prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translateX(0.05);
                                prima_endaufgabe_grether_benedikt.bene.updateHealtpoints();
                            }
                            else if (child.direction == -1 && prima_endaufgabe_grether_benedikt.fight == false) {
                                console.log("hit right");
                                prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translateX(-0.05);
                                prima_endaufgabe_grether_benedikt.bene.updateHealtpoints();
                            }
                            else if (prima_endaufgabe_grether_benedikt.bene.item == "Sword" && prima_endaufgabe_grether_benedikt.fight == true) {
                                if (child.direction == 1 && prima_endaufgabe_grether_benedikt.bene.directionChar === -1) {
                                    child.cmpTransform.local.translateX(-0.05);
                                    prima_endaufgabe_grether_benedikt.enemy.updateHealtpoints(child);
                                }
                                else if (child.direction == -1 && prima_endaufgabe_grether_benedikt.bene.directionChar === 1) {
                                    child.cmpTransform.local.translateX(0.05);
                                    prima_endaufgabe_grether_benedikt.enemy.updateHealtpoints(child);
                                }
                                else if (child.direction == 1 && prima_endaufgabe_grether_benedikt.bene.directionChar === 1) {
                                    prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translateX(0.05);
                                    prima_endaufgabe_grether_benedikt.bene.updateHealtpoints();
                                }
                                else if (child.direction == -1 && prima_endaufgabe_grether_benedikt.bene.directionChar === -1) {
                                    prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translateX(-0.05);
                                    prima_endaufgabe_grether_benedikt.bene.updateHealtpoints();
                                }
                                else {
                                    continue;
                                }
                            }
                        }
                    }
                }
            }
        }
        detectedHit(hitbox) {
            let hit = false;
            let rectOfThis = this.getRectWorld();
            let rectOfThat = hitbox.getRectWorld();
            let expansionRight = new fudge.Vector2(rectOfThat.size.x);
            let expansionDown = new fudge.Vector2(0, rectOfThat.size.y);
            let topRight = fudge.Vector2.SUM(rectOfThat.position, expansionRight);
            let bottomLeft = fudge.Vector2.SUM(rectOfThat.position, expansionDown);
            let bottomRight = fudge.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);
            if (rectOfThis.isInside(rectOfThat.position)) {
                hit = true;
            }
            else if (rectOfThis.isInside(topRight)) {
                hit = true;
            }
            else if (rectOfThis.isInside(bottomLeft)) {
                hit = true;
            }
            else if (rectOfThis.isInside(bottomRight)) {
                hit = true;
            }
            return hit;
        }
    }
    Hitbox.mesh = new fudge.MeshSprite();
    // private static material: fudge.Material = new fudge.Material("Hitbox", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("black", 0.5)));
    Hitbox.pivot = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    prima_endaufgabe_grether_benedikt.Hitbox = Hitbox;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Hitbox.js.map