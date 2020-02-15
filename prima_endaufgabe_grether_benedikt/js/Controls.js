"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    let keysPressed = {};
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE && _event.type == "keydown") {
            prima_endaufgabe_grether_benedikt.hero.act(prima_endaufgabe_grether_benedikt.ACTION.JUMP);
            prima_endaufgabe_grether_benedikt.fight = false;
        }
    }
    prima_endaufgabe_grether_benedikt.handleKeyboard = handleKeyboard;
    function processInput() {
        if (prima_endaufgabe_grether_benedikt.life == true) {
            if (keysPressed[ƒ.KEYBOARD_CODE.A]) {
                prima_endaufgabe_grether_benedikt.hero.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.LEFT);
                prima_endaufgabe_grether_benedikt.fight = false;
                return;
            }
            if (keysPressed[ƒ.KEYBOARD_CODE.D]) {
                prima_endaufgabe_grether_benedikt.hero.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.RIGHT);
                prima_endaufgabe_grether_benedikt.fight = false;
                return;
            }
            if (keysPressed[ƒ.KEYBOARD_CODE.E]) {
                prima_endaufgabe_grether_benedikt.hero.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
                prima_endaufgabe_grether_benedikt.fight = false;
                prima_endaufgabe_grether_benedikt.hero.item.type = prima_endaufgabe_grether_benedikt.ITEM.NONE;
                prima_endaufgabe_grether_benedikt.Items.healthBar = 100;
                let element = document.getElementById("itemHealthBar");
                element.style.width = "0%";
                prima_endaufgabe_grether_benedikt.Sound.play("itemDrop");
                return;
            }
            if (keysPressed[ƒ.KEYBOARD_CODE.ENTER]) {
                if (prima_endaufgabe_grether_benedikt.hero.item.type == "Sword") {
                    prima_endaufgabe_grether_benedikt.hero.act(prima_endaufgabe_grether_benedikt.ACTION.SWORD);
                    prima_endaufgabe_grether_benedikt.Sound.play("swordFight");
                    prima_endaufgabe_grether_benedikt.fight = true;
                    prima_endaufgabe_grether_benedikt.hero.speed.x = 0;
                    return;
                }
                else {
                    prima_endaufgabe_grether_benedikt.hero.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
                    prima_endaufgabe_grether_benedikt.hero.updateHealtpoints();
                    if (prima_endaufgabe_grether_benedikt.enemy.direction == 1 && prima_endaufgabe_grether_benedikt.fight == true) {
                        prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translateX(0.05);
                        prima_endaufgabe_grether_benedikt.fight = false;
                        return;
                    }
                    else if (prima_endaufgabe_grether_benedikt.enemy.direction == -1 && prima_endaufgabe_grether_benedikt.fight == true) {
                        prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translateX(-0.05);
                        prima_endaufgabe_grether_benedikt.fight = false;
                        return;
                    }
                }
            }
            prima_endaufgabe_grether_benedikt.hero.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
            prima_endaufgabe_grether_benedikt.fight = false;
            return;
        }
    }
    prima_endaufgabe_grether_benedikt.processInput = processInput;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Controls.js.map