"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var fudge = FudgeCore;
    let STATUS;
    (function (STATUS) {
        STATUS["FULL"] = "Full";
        STATUS["EMPTY"] = "Empty";
    })(STATUS = prima_endaufgabe_grether_benedikt.STATUS || (prima_endaufgabe_grether_benedikt.STATUS = {}));
    class Healthpoints extends fudge.Node {
        constructor(_name) {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
            };
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Healthpoints.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Healthpoints.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite(STATUS.EMPTY);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(32, 0, 35, 34), 1, fudge.Vector2.ZERO(), 120, fudge.ORIGIN2D.BOTTOMCENTER);
            Healthpoints.sprites.push(sprite);
            sprite = new prima_endaufgabe_grether_benedikt.Sprite(STATUS.FULL);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(110, 0, 35, 34), 1, fudge.Vector2.ZERO(), 120, fudge.ORIGIN2D.BOTTOMCENTER);
            Healthpoints.sprites.push(sprite);
        }
        show(_status) {
            for (let child of this.getChildren()) {
                child.activate(child.name == _status);
            }
        }
        act(_status) {
            this.show(_status);
        }
    }
    prima_endaufgabe_grether_benedikt.Healthpoints = Healthpoints;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Healthpoints.js.map