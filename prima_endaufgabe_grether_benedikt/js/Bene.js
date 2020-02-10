"use strict";
/// <reference path="./SpriteGenerator.ts"/>
var prima_endaufgabe_grether_benedikt;
/// <reference path="./SpriteGenerator.ts"/>
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
        ACTION["SWORD"] = "Sword";
    })(ACTION = prima_endaufgabe_grether_benedikt.ACTION || (prima_endaufgabe_grether_benedikt.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = prima_endaufgabe_grether_benedikt.DIRECTION || (prima_endaufgabe_grether_benedikt.DIRECTION = {}));
    let counter = 45;
    let itemCounter = 20;
    class Character extends ƒ.Node {
        constructor(_name = "Bene") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.item = prima_endaufgabe_grether_benedikt.ITEM.NONE;
            // public healthbar: Healthpoints[] = [];
            this.healthpoints = 50;
            this.itemUsabilityPoints = 25;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Character.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                // this.hitbox.cmpTransform.local.translation = new ƒ.Vector3(this.mtxWorld.translation.x, this.mtxWorld.translation.y + 1.7, 0);
                this.checkCollision(prima_endaufgabe_grether_benedikt.level);
                this.checkCollision(prima_endaufgabe_grether_benedikt.platform);
                this.hitbox.checkCollision();
                // console.log(this.item);
            };
            this.addComponent(new ƒ.ComponentTransform());
            for (let sprite of Character.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(ACTION.IDLE, this.item);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Character.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION.WALK + "." + prima_endaufgabe_grether_benedikt.ITEM.NONE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(24, 8, 24, 43), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Character.sprites.push(sprite);
            sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION.IDLE + "." + prima_endaufgabe_grether_benedikt.ITEM.NONE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(3, 8, 20, 43), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Character.sprites.push(sprite);
            sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION.IDLE + "." + prima_endaufgabe_grether_benedikt.ITEM.SWORD);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(120, 8, 22, 43), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Character.sprites.push(sprite);
            sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION.WALK + "." + prima_endaufgabe_grether_benedikt.ITEM.SWORD);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(144, 8, 26, 43), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Character.sprites.push(sprite);
            sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION.SWORD + "." + prima_endaufgabe_grether_benedikt.ITEM.SWORD);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(252, 5, 28, 46), 2, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Character.sprites.push(sprite);
        }
        createHitbox() {
            let hitbox = new prima_endaufgabe_grether_benedikt.Hitbox("PlayerHitbox");
            hitbox.cmpTransform.local.translateY(0.6);
            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            return hitbox;
        }
        createSwordHitbox() {
            let hitbox = new prima_endaufgabe_grether_benedikt.Hitbox("SwordHitBox");
            console.log("test");
            hitbox.cmpTransform.local.translateY(0.6);
            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            this.appendChild(hitbox);
            console.log(hitbox);
            return hitbox;
        }
        show(_action, _item) {
            for (let child of this.getChildren())
                child.activate(child.name == _action + "." + _item);
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    this.directionChar = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Character.speedMax.x;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.directionChar);
                    // console.log(direction);
                    break;
                case ACTION.JUMP:
                    if (this.speed.y != 0 || this.cmpTransform.local.translation.y > 0)
                        break;
                    this.speed.y = 2.5;
                    break;
            }
            this.show(_action, this.item);
        }
        itemUsability() {
            this.itemUsabilityPoints = this.itemUsabilityPoints - 1;
            this.updateItemUsability();
        }
        updateHealtpoints() {
            this.healthpoints = this.healthpoints - 1;
            this.updateHealthbar();
        }
        updateItemUsability() {
            console.log(this.itemUsabilityPoints);
            if (itemCounter == this.itemUsabilityPoints) {
                itemCounter -= 5;
            }
            if (this.itemUsabilityPoints == 0) {
                this.item = prima_endaufgabe_grether_benedikt.ITEM.NONE;
            }
        }
        updateHealthbar() {
            if (counter == this.healthpoints) {
                let elementIndex = counter.toString();
                let element = document.getElementById(elementIndex);
                element.classList.remove("heart-full");
                element.classList.add("heart-empty");
                counter -= 5;
                console.log(this.healthpoints);
            }
            if (this.healthpoints === 0) {
                prima_endaufgabe_grether_benedikt.game.removeChild(prima_endaufgabe_grether_benedikt.bene);
            }
        }
        checkCollision(_checkCollision) {
            for (let floor of _checkCollision.getChildren()) {
                let rect = floor.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }
    }
    Character.speedMax = new ƒ.Vector2(1.5, 5); // units per second
    Character.gravity = ƒ.Vector2.Y(-3);
    prima_endaufgabe_grether_benedikt.Character = Character;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Bene.js.map