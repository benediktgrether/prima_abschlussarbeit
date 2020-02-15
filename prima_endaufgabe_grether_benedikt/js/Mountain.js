"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let MOUNTAINS;
    (function (MOUNTAINS) {
        MOUNTAINS["MOUNTAIN"] = "Mountain";
    })(MOUNTAINS = prima_endaufgabe_grether_benedikt.MOUNTAINS || (prima_endaufgabe_grether_benedikt.MOUNTAINS = {}));
    class Mountain extends ƒ.Node {
        constructor(_location) {
            super("Mountain");
            this.update = (_event) => {
                this.cmpTransform.local.translation = new ƒ.Vector3(prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translation.x, 3.5, -0.2);
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.cmpTransform.local.translateX(_location);
            this.cmpTransform.local.translateY(3.5);
            this.cmpTransform.local.translateZ(-0.2);
            for (let sprite of Mountain.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Mountain.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite(MOUNTAINS.MOUNTAIN);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(4, 156, 261, 110), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
            Mountain.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == MOUNTAINS.MOUNTAIN);
        }
    }
    prima_endaufgabe_grether_benedikt.Mountain = Mountain;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//     if (index == 5 || index == 10) {
//   let tree: Tree = new Tree(0);
//   _level.appendChild(tree);
// }
// if (index == 1 || index == 16) {
//   let mountain: Mountain = new Mountain(4);
//   _level.appendChild(mountain);
// }
//# sourceMappingURL=Mountain.js.map