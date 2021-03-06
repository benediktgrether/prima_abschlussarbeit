"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Hitbox extends ƒ.Node {
        constructor(_name) {
            if (_name) {
                super(_name);
            }
            else {
                super("Hitbox");
            }
            this.addComponent(new ƒ.ComponentTransform());
            let cmpMesh = new ƒ.ComponentMesh(Hitbox.mesh);
            cmpMesh.pivot = Hitbox.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
            let mtxResult = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        checkCollision() {
            this.checkItems();
            this.checkEnemys();
            this.checkNewItems();
        }
        checkItems() {
            for (let floor of prima_endaufgabe_grether_benedikt.platform.getChildren()) {
                for (let child of floor.getChildren()) {
                    if (child.name == "Item") {
                        this.checkCollisionItem(child, floor);
                    }
                    else {
                        continue;
                    }
                }
            }
        }
        checkEnemys() {
            for (let child of prima_endaufgabe_grether_benedikt.game.getChildren()) {
                if (child.name == "Zombie") {
                    let hitbox;
                    hitbox = child.hitbox;
                    if (this.detectedHit(hitbox)) {
                        if (child.direction == 1 && prima_endaufgabe_grether_benedikt.fight == false) {
                            this.playerHit(0.1);
                        }
                        else if (child.direction == -1 && prima_endaufgabe_grether_benedikt.fight == false) {
                            this.playerHit(-0.1);
                        }
                        else if (prima_endaufgabe_grether_benedikt.hero.item.type == "Sword" && prima_endaufgabe_grether_benedikt.fight == true) {
                            this.checkCollisionFight(child);
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
        }
        checkNewItems() {
            for (let child of prima_endaufgabe_grether_benedikt.level.getChildren()) {
                if (child.name == "Item") {
                    this.checkCollisionItem(child, prima_endaufgabe_grether_benedikt.level);
                }
            }
        }
        checkCollisionItem(_child, _getLevelElement) {
            let hitbox;
            hitbox = _child.hitbox;
            if (this.detectedHit(hitbox)) {
                if (_child.name == "Item") {
                    if (prima_endaufgabe_grether_benedikt.hero.item == null || prima_endaufgabe_grether_benedikt.hero.item.type == prima_endaufgabe_grether_benedikt.ITEM.NONE) {
                        prima_endaufgabe_grether_benedikt.hero.item = _child;
                        prima_endaufgabe_grether_benedikt.hero.createSwordHitbox();
                        let element = document.getElementById("itemHealthBar");
                        element.style.width = "100%";
                        _getLevelElement.removeChild(_child);
                    }
                }
            }
        }
        checkCollisionFight(_child) {
            if (_child.direction == 1 && prima_endaufgabe_grether_benedikt.hero.direction === -1) {
                this.enemyHit(_child, -0.15);
            }
            else if (_child.direction == -1 && prima_endaufgabe_grether_benedikt.hero.direction === 1) {
                this.enemyHit(_child, 0.15);
            }
            else if (_child.direction == 1 && prima_endaufgabe_grether_benedikt.hero.direction === 1) {
                this.playerHit(0.1);
            }
            else if (_child.direction == -1 && prima_endaufgabe_grether_benedikt.hero.direction === -1) {
                this.playerHit(-0.1);
            }
        }
        enemyHit(_child, _translateX) {
            prima_endaufgabe_grether_benedikt.Sound.play("enemyHit");
            _child.cmpTransform.local.translateX(_translateX);
            _child.updateHealtpoints(_child);
            prima_endaufgabe_grether_benedikt.hero.item.itemUsability();
        }
        playerHit(_translateX) {
            prima_endaufgabe_grether_benedikt.Sound.play("playerHit");
            prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translateX(_translateX);
            prima_endaufgabe_grether_benedikt.hero.updateHealtpoints();
        }
        detectedHit(hitbox) {
            let hit = false;
            let rectOfThis = this.getRectWorld();
            let rectOfThat = hitbox.getRectWorld();
            let expansionRight = new ƒ.Vector2(rectOfThat.size.x);
            let expansionDown = new ƒ.Vector2(0, rectOfThat.size.y);
            let topRight = ƒ.Vector2.SUM(rectOfThat.position, expansionRight);
            let bottomLeft = ƒ.Vector2.SUM(rectOfThat.position, expansionDown);
            let bottomRight = ƒ.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);
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
    Hitbox.mesh = new ƒ.MeshSprite();
    Hitbox.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    prima_endaufgabe_grether_benedikt.Hitbox = Hitbox;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Hitbox.js.map