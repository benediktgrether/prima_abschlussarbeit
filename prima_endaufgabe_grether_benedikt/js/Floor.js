"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Floor extends ƒ.Node {
        constructor(_distance, _translateY, _distancePlatform, _item) {
            super("Floor");
            let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite("FloorSprite", Floor.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new ƒ.ComponentTransform());
            // this.addComponent(new ƒ.ComponentMaterial(Floor.material));
            let cmpMesh = new ƒ.ComponentMesh(Floor.mesh);
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
            if (_distancePlatform) {
                this.cmpTransform.local.translateX(_distancePlatform);
            }
            if (_item) {
                let item = new prima_endaufgabe_grether_benedikt.Items(prima_endaufgabe_grether_benedikt.ITEM.SWORD, 105, 0.5);
                item.itemUsability();
                this.item = item;
                this.appendChild(this.item);
            }
        }
        static generateSprites(_txtImage) {
            Floor.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite("FloorSprite");
            // sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 20, 20, 150), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.BOTTOMCENTER);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(6, 131, 19, 19), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
            Floor.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "FloorSprite");
        }
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
            //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
            let mtxResult = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Floor.mesh = new ƒ.MeshSprite();
    Floor.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1.8));
    prima_endaufgabe_grether_benedikt.Floor = Floor;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Floor.js.map