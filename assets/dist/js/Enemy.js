"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let itemDrop;
    class Enemy extends prima_endaufgabe_grether_benedikt.Character {
        constructor(_name, _translateX, _speed) {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += this.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(prima_endaufgabe_grether_benedikt.level);
                this.checkCollision(prima_endaufgabe_grether_benedikt.platform);
                this.movement();
            };
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new prima_endaufgabe_grether_benedikt.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            // Hilfsverschiebung
            this.cmpTransform.local.translateX(_translateX);
            this.cmpTransform.local.translateY(-0.5);
            this.speedMax = new ƒ.Vector2(_speed, 0);
            this.healthpoints = 5;
            this.counter = this.healthpoints - 5;
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        createHitbox() {
            let hitbox = new prima_endaufgabe_grether_benedikt.Hitbox("EnemyHitbox");
            hitbox.cmpTransform.local.scaleX(0.5);
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
                case prima_endaufgabe_grether_benedikt.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case prima_endaufgabe_grether_benedikt.ACTION.WALK:
                    this.direction = (_direction == prima_endaufgabe_grether_benedikt.DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = this.speedMax.x;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * this.direction);
                    break;
            }
            this.show(_action);
        }
        movement() {
            if (this.cmpTransform.local.translation.x > prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translation.x + .1) {
                this.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.LEFT);
            }
            else if (this.cmpTransform.local.translation.x < prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translation.x - .1) {
                this.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.RIGHT);
            }
            else {
                this.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
            }
        }
        updateHealtpoints(_enemy) {
            this.healthpoints = this.healthpoints - 1;
            this.updateHealthbar(_enemy);
        }
        updateHealthbar(_enemy) {
            if (this.counter == this.healthpoints) {
                this.counter -= 5;
            }
            if (this.healthpoints === 0) {
                let gravestone = new prima_endaufgabe_grether_benedikt.Gravstone(_enemy.mtxWorld.translation.x);
                prima_endaufgabe_grether_benedikt.game.appendChild(gravestone);
                this.zombieDied(_enemy);
            }
        }
        zombieDied(_enemy) {
            prima_endaufgabe_grether_benedikt.Sound.play("zombieDeath");
            prima_endaufgabe_grether_benedikt.game.removeChild(_enemy);
            ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, _enemy.update);
            this.spawnNewEnemy();
            this.itemDrop(_enemy.mtxWorld.translation.x);
            prima_endaufgabe_grether_benedikt.Highscore.setHighscore();
        }
        spawnNewEnemy() {
            let enemy;
            let positonHero = prima_endaufgabe_grether_benedikt.hero.mtxWorld.translation.x;
            if (this.getRandomInt(2) == 0) {
                if ((positonHero + 3.5) < 12.5) {
                    enemy = new Enemy("Zombie", (positonHero + 3), this.getRandomSpeed());
                }
                else {
                    enemy = new Enemy("Zombie", (positonHero - 3), this.getRandomSpeed());
                }
            }
            else {
                if ((positonHero - 3.5) > -12.5) {
                    enemy = new Enemy("Zombie", (positonHero - 3), this.getRandomSpeed());
                }
                else {
                    enemy = new Enemy("Zombie", (positonHero + 3), this.getRandomSpeed());
                }
            }
            prima_endaufgabe_grether_benedikt.game.appendChild(enemy);
        }
        itemDrop(_location) {
            if (this.getRandomInt(5) == 1) {
                prima_endaufgabe_grether_benedikt.Sound.play("itemDropZombie");
                itemDrop = new prima_endaufgabe_grether_benedikt.Items(prima_endaufgabe_grether_benedikt.ITEM.SWORD, 20, -0.9);
                itemDrop.cmpTransform.local.translateX(_location + 0.25);
                itemDrop.cmpTransform.local.scaleX(.5);
                itemDrop.cmpTransform.local.scaleY(.5);
                prima_endaufgabe_grether_benedikt.level.appendChild(itemDrop);
            }
        }
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        getRandomSpeed() {
            let math = Math.random();
            if (math >= 0.3 && math <= 0.5) {
                return math;
            }
            else {
                return this.getRandomSpeed();
            }
        }
    }
    prima_endaufgabe_grether_benedikt.Enemy = Enemy;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Enemy.js.map