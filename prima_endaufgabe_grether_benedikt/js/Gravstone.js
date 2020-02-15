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
            this.cmpTransform.local.translateY(-0.9);
            for (let sprite of Gravstone.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == GRAVSTONE.WOOD);
        }
    }
    prima_endaufgabe_grether_benedikt.Gravstone = Gravstone;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Gravstone.js.map