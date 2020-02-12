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
    let counter = 15;
    let itemDrop;
    class Enemy extends ƒ.Node {
        // All Same with Character
        constructor(_name, _translateX, _speed) {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            // public healthbar: [] = [];
            this.healthpoints = 20;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(prima_endaufgabe_grether_benedikt.level);
                this.checkCollision(prima_endaufgabe_grether_benedikt.platform);
                this.movement();
            };
            this.addComponent(new ƒ.ComponentTransform());
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
                // Hilfsverschiebung
                this.cmpTransform.local.translateX(_translateX);
                this.speedMax = new ƒ.Vector2(_speed, 0);
            }
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(ACTION_ZOMBIE.IDLEZOMBIE);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Enemy.sprites = [];
            let sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION_ZOMBIE.WALKZOMBIE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(141, 55, 24, 45), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            sprite = new prima_endaufgabe_grether_benedikt.Sprite(ACTION_ZOMBIE.IDLEZOMBIE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(117, 55, 22, 45), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
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
                    this.direction = (_direction == DIRECTIONZOMBIE.RIGHTZOMBIE ? 1 : -1);
                    this.speed.x = this.speedMax.x;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.direction);
                    // Sound.play("walkZombie");
                    break;
            }
            this.show(_action);
        }
        updateHealtpoints(_enemy) {
            this.healthpoints = this.healthpoints - 1;
            this.updateHealthbar(_enemy);
        }
        updateHealthbar(_enemy) {
            if (counter == this.healthpoints) {
                counter -= 5;
            }
            if (this.healthpoints === 0) {
                let gravestone = new prima_endaufgabe_grether_benedikt.Gravstone(_enemy.cmpTransform.local.translation.x);
                prima_endaufgabe_grether_benedikt.game.appendChild(gravestone);
                prima_endaufgabe_grether_benedikt.game.removeChild(_enemy);
                prima_endaufgabe_grether_benedikt.Sound.play("zombieDeath");
                this.healthpoints = 20;
                counter = 15;
                let enemy = new Enemy("Zombie", -1, 0.5);
                prima_endaufgabe_grether_benedikt.game.appendChild(enemy);
                this.itemDrop(_enemy.cmpTransform.local.translation.x);
            }
        }
        itemDrop(_location) {
            if (this.getRandomInt(3) == 1) {
                itemDrop = new prima_endaufgabe_grether_benedikt.Items(prima_endaufgabe_grether_benedikt.ITEM.SWORD, 0.25);
                itemDrop.cmpTransform.local.translateX(_location + 0.25);
                itemDrop.cmpTransform.local.scaleX(.5);
                itemDrop.cmpTransform.local.scaleY(.5);
                prima_endaufgabe_grether_benedikt.game.appendChild(itemDrop);
            }
        }
        movement() {
            if (this.cmpTransform.local.translation.x > prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translation.x + .1) {
                this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.LEFTZOMBIE);
            }
            else if (this.cmpTransform.local.translation.x < prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translation.x - .1) {
                this.act(ACTION_ZOMBIE.WALKZOMBIE, DIRECTIONZOMBIE.RIGHTZOMBIE);
            }
            else {
                this.act(ACTION_ZOMBIE.IDLEZOMBIE);
            }
        }
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        checkCollision(_checkCollision) {
            for (let floor of _checkCollision.getChildren()) {
                if (floor.name == "Floor") {
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
    }
    Enemy.gravity = ƒ.Vector2.Y(-3);
    prima_endaufgabe_grether_benedikt.Enemy = Enemy;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Enemy.js.map