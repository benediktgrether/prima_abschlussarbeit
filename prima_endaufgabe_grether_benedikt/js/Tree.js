"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let TREES;
    (function (TREES) {
        TREES["TREE"] = "Tree";
    })(TREES = prima_endaufgabe_grether_benedikt.TREES || (prima_endaufgabe_grether_benedikt.TREES = {}));
    class Tree extends ƒ.Node {
        constructor(_location) {
            super("Tree");
            this.update = (_event) => {
                this.cmpTransform.local.translation = new ƒ.Vector3(prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translation.x, 2.5, -0.1);
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.cmpTransform.local.translateX(_location);
            this.cmpTransform.local.translateY(2.5);
            this.cmpTransform.local.translateZ(-0.1);
            for (let sprite of Tree.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        // public static generateSprites(_txtImage: ƒ.TextureImage): void {
        //   Tree.sprites = [];
        //   let sprite: Sprite = new Sprite(TREES.TREE);
        //   sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(50, 70, 47, 83), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.TOPCENTER);
        //   Tree.sprites.push(sprite);
        // }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == TREES.TREE);
        }
    }
    prima_endaufgabe_grether_benedikt.Tree = Tree;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Tree.js.map