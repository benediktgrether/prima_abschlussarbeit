"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let ACTION_ZOMBIE;
    (function (ACTION_ZOMBIE) {
        ACTION_ZOMBIE["IDLEZOMBIE"] = "Idle";
        ACTION_ZOMBIE["WALKZOMBIE"] = "Walk";
    })(ACTION_ZOMBIE = prima_endaufgabe_grether_benedikt.ACTION_ZOMBIE || (prima_endaufgabe_grether_benedikt.ACTION_ZOMBIE = {}));
    let DIRECTIONZOMBIE;
    (function (DIRECTIONZOMBIE) {
        DIRECTIONZOMBIE[DIRECTIONZOMBIE["LEFTZOMBIE"] = 0] = "LEFTZOMBIE";
        DIRECTIONZOMBIE[DIRECTIONZOMBIE["RIGHTZOMBIE"] = 1] = "RIGHTZOMBIE";
    })(DIRECTIONZOMBIE = prima_endaufgabe_grether_benedikt.DIRECTIONZOMBIE || (prima_endaufgabe_grether_benedikt.DIRECTIONZOMBIE = {}));
    class Enemy extends ƒ.Node {
        // All Same with Character
        constructor(_name = "Zombie") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                // this.hitbox.cmpTransform.local.translation = new ƒ.Vector3(this.mtxWorld.translation.x, this.mtxWorld.translation.y + 1.7, 0);
                this.checkCollision(prima_endaufgabe_grether_benedikt.level);
                this.checkCollision(prima_endaufgabe_grether_benedikt.platform);
                this.movement();
                this.hitbox.checkCollision();
            };
            this.addComponent(new ƒ.ComponentTransform());
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
                // Hilfsverschiebung
                this.cmpTransform.local.translateX(1);
            }
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(ACTION_ZOMBIE.IDLEZOMBIE);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Enemy.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION_ZOMBIE.WALKZOMBIE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(30, 279, 30.8, 51), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION_ZOMBIE.IDLEZOMBIE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 279, 30.8, 51), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
        }
        createHitbox() {
            let hitbox = new prima_endaufgabe_grether_benedikt.Hitbox("EnemyHitbox");
            hitbox.cmpTransform.local.translateY(0.6);
            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            return hitbox;
        }
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION_ZOMBIE.IDLEZOMBIE:
                    this.speed.x = 0;
                    break;
                case ACTION_ZOMBIE.WALKZOMBIE:
                    let direction = (_direction == DIRECTIONZOMBIE.RIGHTZOMBIE ? 1 : -1);
                    this.speed.x = Enemy.speedMax.x;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
            }
            this.show(_action);
        }
        movement() {
            if (this.cmpTransform.local.translation.x > prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translation.x + .1) {
                console.log(this.cmpTransform.local.translation.x);
                this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.LEFTZOMBIE);
            }
            else if (this.cmpTransform.local.translation.x < prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translation.x - .1) {
                this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.RIGHTZOMBIE);
            }
            else {
                this.act(ACTION_ZOMBIE.IDLEZOMBIE);
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
    Enemy.speedMax = new ƒ.Vector2(1, 0);
    Enemy.gravity = ƒ.Vector2.Y(-3);
    prima_endaufgabe_grether_benedikt.Enemy = Enemy;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Enemy.js.map