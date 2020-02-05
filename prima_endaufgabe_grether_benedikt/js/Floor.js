"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Floor extends ƒ.Node {
        constructor() {
            super("Floor");
            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(new ƒ.ComponentMaterial(Floor.material));
            let cmpMesh = new ƒ.ComponentMesh(Floor.mesh);
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
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
    Floor.material = new ƒ.Material("Floor", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("red", 0.5)));
    Floor.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(0));
    prima_endaufgabe_grether_benedikt.Floor = Floor;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Floor.js.map