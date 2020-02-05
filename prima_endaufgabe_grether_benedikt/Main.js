"use strict";
/// <reference path="../L20_ScrollerFoundation/SpriteGenerator.ts"/>
var L22_ScrollerFloor;
/// <reference path="../L20_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L22_ScrollerFloor) {
    L22_ScrollerFloor.ƒ = FudgeCore;
    L22_ScrollerFloor.Sprite = L20_ScrollerFoundation.Sprite;
    L22_ScrollerFloor.NodeSprite = L20_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let game;
    let bene;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtbene = new L22_ScrollerFloor.ƒ.TextureImage();
        txtbene.image = img;
        L22_ScrollerFloor.Bene.generateSprites(txtbene);
        L22_ScrollerFloor.ƒ.RenderManager.initialize(true, false);
        game = new L22_ScrollerFloor.ƒ.Node("Game");
        bene = new L22_ScrollerFloor.Bene("Bene");
        game.appendChild(bene);
        let cmpCamera = new L22_ScrollerFloor.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(L22_ScrollerFloor.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = L22_ScrollerFloor.ƒ.Color.CSS("aliceblue");
        let viewport = new L22_ScrollerFloor.ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L22_ScrollerFloor.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L22_ScrollerFloor.ƒ.Loop.start(L22_ScrollerFloor.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[L22_ScrollerFloor.ƒ.KEYBOARD_CODE.A]) {
            bene.act(L22_ScrollerFloor.ACTION.WALK, L22_ScrollerFloor.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L22_ScrollerFloor.ƒ.KEYBOARD_CODE.D]) {
            bene.act(L22_ScrollerFloor.ACTION.WALK, L22_ScrollerFloor.DIRECTION.RIGHT);
            return;
        }
        bene.act(L22_ScrollerFloor.ACTION.IDLE);
    }
})(L22_ScrollerFloor || (L22_ScrollerFloor = {}));
//# sourceMappingURL=Main.js.map