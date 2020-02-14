"use strict";
/// <reference path="./SpriteGenerator.ts"/>
var prima_endaufgabe_grether_benedikt;
/// <reference path="./SpriteGenerator.ts"/>
(function (prima_endaufgabe_grether_benedikt) {
    prima_endaufgabe_grether_benedikt.ƒ = FudgeCore;
    loadFilesWithResponse();
    window.addEventListener("load", initGame);
    let keysPressed = {};
    prima_endaufgabe_grether_benedikt.fight = false;
    prima_endaufgabe_grether_benedikt.life = true;
    let data;
    prima_endaufgabe_grether_benedikt.soundVolume = false;
    async function loadFilesWithResponse() {
        let response = await fetch("./js/data/data.json");
        let offer = await response.text();
        data = JSON.parse(offer);
    }
    function initGame() {
        let startGameBtn = document.getElementById("startGame");
        let mute = document.getElementById("mute");
        mute.addEventListener("click", prima_endaufgabe_grether_benedikt.Sound.mute);
        startGameBtn.addEventListener("click", startGame);
    }
    function startGame() {
        let mainMenu = document.getElementById("mainMenu");
        mainMenu.style.display = "none";
        let startGameBtn = document.getElementById("btn-play");
        startGameBtn.style.display = "none";
        let canvas = document.querySelector("canvas");
        let img = document.querySelector("img");
        let txtImage = new prima_endaufgabe_grether_benedikt.ƒ.TextureImage();
        txtImage.image = img;
        prima_endaufgabe_grether_benedikt.Character.generateSprites(txtImage);
        prima_endaufgabe_grether_benedikt.Enemy.generateSprites(txtImage);
        prima_endaufgabe_grether_benedikt.Floor.generateSprites(txtImage);
        prima_endaufgabe_grether_benedikt.Items.generateSprites(txtImage);
        prima_endaufgabe_grether_benedikt.Gravstone.generateSprites(txtImage);
        prima_endaufgabe_grether_benedikt.Tree.generateSprites(txtImage);
        prima_endaufgabe_grether_benedikt.Mountain.generateSprites(txtImage);
        prima_endaufgabe_grether_benedikt.ƒ.RenderManager.initialize(true, false);
        prima_endaufgabe_grether_benedikt.game = new prima_endaufgabe_grether_benedikt.ƒ.Node("Game");
        prima_endaufgabe_grether_benedikt.game.addComponent(new prima_endaufgabe_grether_benedikt.ƒ.ComponentTransform());
        prima_endaufgabe_grether_benedikt.game.cmpTransform.local.translateY(-1.17);
        prima_endaufgabe_grether_benedikt.bene = new prima_endaufgabe_grether_benedikt.Character("Bene");
        prima_endaufgabe_grether_benedikt.enemy = new prima_endaufgabe_grether_benedikt.Enemy("Zombie", -3, 0.5);
        prima_endaufgabe_grether_benedikt.level = new prima_endaufgabe_grether_benedikt.Level(data);
        prima_endaufgabe_grether_benedikt.platform = new prima_endaufgabe_grether_benedikt.Platform(data);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.platform);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.bene);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.enemy);
        prima_endaufgabe_grether_benedikt.enemy = new prima_endaufgabe_grether_benedikt.Enemy("Zombie", 3, 0.3);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.enemy);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.level);
        prima_endaufgabe_grether_benedikt.Sound.init();
        prima_endaufgabe_grether_benedikt.Sound.playMusic();
        let cmpCamera = new prima_endaufgabe_grether_benedikt.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(prima_endaufgabe_grether_benedikt.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = prima_endaufgabe_grether_benedikt.ƒ.Color.CSS("#c2f0ff");
        let viewport = new prima_endaufgabe_grether_benedikt.ƒ.Viewport();
        viewport.initialize("Viewport", prima_endaufgabe_grether_benedikt.game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        prima_endaufgabe_grether_benedikt.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        prima_endaufgabe_grether_benedikt.ƒ.Loop.start(prima_endaufgabe_grether_benedikt.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            if (prima_endaufgabe_grether_benedikt.life == false)
                end();
            processInput();
            viewport.draw();
            cmpCamera.pivot.translation = new prima_endaufgabe_grether_benedikt.ƒ.Vector3(prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.W && _event.type == "keydown") {
            prima_endaufgabe_grether_benedikt.bene.act(prima_endaufgabe_grether_benedikt.ACTION.JUMP);
            prima_endaufgabe_grether_benedikt.fight = false;
        }
    }
    function processInput() {
        if (prima_endaufgabe_grether_benedikt.life == true) {
            if (keysPressed[prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.A]) {
                prima_endaufgabe_grether_benedikt.bene.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.LEFT);
                prima_endaufgabe_grether_benedikt.fight = false;
                return;
            }
            if (keysPressed[prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.D]) {
                prima_endaufgabe_grether_benedikt.bene.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.RIGHT);
                prima_endaufgabe_grether_benedikt.fight = false;
                return;
            }
            if (keysPressed[prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.E]) {
                prima_endaufgabe_grether_benedikt.bene.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
                prima_endaufgabe_grether_benedikt.fight = false;
                prima_endaufgabe_grether_benedikt.bene.item.type = prima_endaufgabe_grether_benedikt.ITEM.NONE;
                // Items.itemUsabilityPoints = 25;
                prima_endaufgabe_grether_benedikt.Items.itemCounter = 20;
                prima_endaufgabe_grether_benedikt.Items.healthBar = 100;
                let element = document.getElementById("itemHealthBar");
                element.style.width = "0%";
                prima_endaufgabe_grether_benedikt.Sound.play("itemDrop");
                return;
            }
            // if (keysPressed[ƒ.KEYBOARD_CODE.W]) {
            //   bene.act(ACTION.JUMP);
            //   fight = false;
            //   // return;
            // }
            if (keysPressed[prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.SPACE]) {
                if (prima_endaufgabe_grether_benedikt.bene.item.type == "Sword") {
                    prima_endaufgabe_grether_benedikt.bene.act(prima_endaufgabe_grether_benedikt.ACTION.SWORD);
                    prima_endaufgabe_grether_benedikt.Sound.play("swordFight");
                    prima_endaufgabe_grether_benedikt.fight = true;
                    prima_endaufgabe_grether_benedikt.bene.speed.x = 0;
                    return;
                }
                else {
                    prima_endaufgabe_grether_benedikt.bene.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
                    prima_endaufgabe_grether_benedikt.bene.updateHealtpoints();
                    if (prima_endaufgabe_grether_benedikt.enemy.direction == 1 && prima_endaufgabe_grether_benedikt.fight == true) {
                        prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translateX(0.05);
                        prima_endaufgabe_grether_benedikt.fight = false;
                        return;
                    }
                    else if (prima_endaufgabe_grether_benedikt.enemy.direction == -1 && prima_endaufgabe_grether_benedikt.fight == true) {
                        prima_endaufgabe_grether_benedikt.bene.cmpTransform.local.translateX(-0.05);
                        prima_endaufgabe_grether_benedikt.fight = false;
                        return;
                    }
                }
            }
            prima_endaufgabe_grether_benedikt.bene.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
            prima_endaufgabe_grether_benedikt.fight = false;
            return;
        }
    }
    function end() {
        let startRestartBtn = document.getElementById("btn-restart");
        startRestartBtn.style.display = "block";
        let mainMenu = document.getElementById("mainMenu");
        mainMenu.style.display = "flex";
        let counterShow = document.getElementById("counter-show");
        counterShow.style.display = "block";
        startRestartBtn.addEventListener("click", restartGame);
    }
    function restartGame() {
        location.reload();
    }
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Main.js.map