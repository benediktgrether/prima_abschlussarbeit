"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let GRAVSTONE;
    (function (GRAVSTONE) {
        GRAVSTONE["WOOD"] = "Wood";
    })(GRAVSTONE = prima_endaufgabe_grether_benedikt.GRAVSTONE || (prima_endaufgabe_grether_benedikt.GRAVSTONE = {}));
    class Gravstone extends ƒ.Node {
        constructor(_location) {
            super("Gravestone");
            this.addComponent(new ƒ.ComponentTransform());
            this.cmpTransform.local.translateX(_location);
            this.cmpTransform.local.translateY(0.25);
            for (let sprite of Gravstone.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
        }
        static generateSprites(_txtImage) {
            Gravstone.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite(GRAVSTONE.WOOD);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(186, 123, 13, 20), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.TOPCENTER);
            Gravstone.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == GRAVSTONE.WOOD);
        }
    }
    prima_endaufgabe_grether_benedikt.Gravstone = Gravstone;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Gravstone.js.map