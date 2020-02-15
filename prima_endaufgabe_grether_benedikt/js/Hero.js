"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    class Hero extends prima_endaufgabe_grether_benedikt.Character {
        constructor(_name) {
            super(_name);
            this.item = null;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += this.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(prima_endaufgabe_grether_benedikt.level);
                this.checkCollision(prima_endaufgabe_grether_benedikt.platform);
                this.hitbox.checkCollision();
            };
            for (let sprite of Hero.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.cmpTransform.local.translateY(-0.5);
            this.speedMax = new ƒ.Vector2(1.5, 5);
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.healthpoints = 10;
            this.counter = this.healthpoints - 1;
            if (this.item == null) {
                this.show(prima_endaufgabe_grether_benedikt.ACTION.IDLE, prima_endaufgabe_grether_benedikt.ITEM.NONE);
            }
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        createHitbox() {
            let hitbox = new prima_endaufgabe_grether_benedikt.Hitbox("PlayerHitbox");
            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            return hitbox;
        }
        createSwordHitbox() {
            let hitbox = new prima_endaufgabe_grether_benedikt.Hitbox("SwordHitBox");
            hitbox.cmpTransform.local.translateX(0.2);
            hitbox.cmpTransform.local.scaleX(0.5);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            this.appendChild(hitbox);
            return hitbox;
        }
        show(_action, _item) {
            for (let child of this.getChildren()) {
                child.activate(child.name == _action + "." + _item);
            }
        }
        act(_action, _direction) {
            switch (_action) {
                case prima_endaufgabe_grether_benedikt.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case prima_endaufgabe_grether_benedikt.ACTION.WALK:
                    this.direction = (_direction == prima_endaufgabe_grether_benedikt.DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = this.speedMax.x;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.direction);
                    prima_endaufgabe_grether_benedikt.Sound.play("walkPlayer");
                    break;
                case prima_endaufgabe_grether_benedikt.ACTION.JUMP:
                    if (this.speed.y != 0 || this.cmpTransform.local.translation.y > 0)
                        break;
                    this.speed.y = 2.5;
                    prima_endaufgabe_grether_benedikt.Sound.play("jump");
                    break;
            }
            if (this.item == null) {
                this.show(_action, prima_endaufgabe_grether_benedikt.ITEM.NONE);
            }
            else {
                this.show(_action, this.item.type);
            }
        }
        updateHealtpoints() {
            this.healthpoints = this.healthpoints - 0.5;
            this.updateHealthbar();
        }
        updateHealthbar() {
            if (this.counter == this.healthpoints && this.counter >= 0) {
                this.getHTMLElements();
                this.counter -= 1;
            }
            if (this.healthpoints == -1) {
                prima_endaufgabe_grether_benedikt.life = false;
                prima_endaufgabe_grether_benedikt.game.removeChild(prima_endaufgabe_grether_benedikt.hero);
                ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            }
        }
        getHTMLElements() {
            let elementIndex = this.healthpoints.toString();
            let element = document.getElementById(elementIndex);
            element.classList.remove("heart-full");
            element.classList.add("heart-empty");
        }
    }
    prima_endaufgabe_grether_benedikt.Hero = Hero;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Hero.js.map