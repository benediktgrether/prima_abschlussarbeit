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
                this.cmpTransform.local.translation = new ƒ.Vector3(prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translation.x, 3.7, -0.2);
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.cmpTransform.local.translateX(_location);
            this.cmpTransform.local.translateZ(-0.2);
            for (let sprite of Mountain.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == MOUNTAINS.MOUNTAIN);
        }
    }
    prima_endaufgabe_grether_benedikt.Mountain = Mountain;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Mountain.js.map