"use strict";
// / <reference path="../L20_ScrollerFoundation/SpriteGenerator.js"/>
var L22_ScrollerFloor;
// / <reference path="../L20_ScrollerFoundation/SpriteGenerator.js"/>
(function (L22_ScrollerFloor) {
    var ƒ = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
    })(ACTION = L22_ScrollerFloor.ACTION || (L22_ScrollerFloor.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = L22_ScrollerFloor.DIRECTION || (L22_ScrollerFloor.DIRECTION = {}));
    class Bene extends ƒ.Node {
        constructor(_name = "Bene") {
            super(_name);
            // private action: ACTION;
            // private time: ƒ.Time = new ƒ.Time();
            this.speed = 0;
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.cmpTransform.local.translateX(this.speed * timeFrame);
                this.broadcastEvent(new CustomEvent("showNext"));
            };
            this.addComponent(new ƒ.ComponentTransform());
            for (let sprite of Bene.sprites) {
                let nodeSprite = new L22_ScrollerFloor.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Bene.sprites = [];
            let sprite = new L22_ScrollerFloor.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(30, 279, 30.8, 51), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Bene.sprites.push(sprite);
            sprite = new L22_ScrollerFloor.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 279, 30.8, 51), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Bene.sprites.push(sprite);
        }
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
            // this.action = _action;
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed = Bene.speedMax * direction;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
            }
            this.show(_action);
        }
    }
    Bene.speedMax = 1.5; // units per second
    L22_ScrollerFloor.Bene = Bene;
})(L22_ScrollerFloor || (L22_ScrollerFloor = {}));
//# sourceMappingURL=Bene.js.map