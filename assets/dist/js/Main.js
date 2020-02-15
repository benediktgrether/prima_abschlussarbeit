"use strict";
/// <reference path="./SpriteGenerator.ts"/>
var prima_endaufgabe_grether_benedikt;
/// <reference path="./SpriteGenerator.ts"/>
(function (prima_endaufgabe_grether_benedikt) {
    prima_endaufgabe_grether_benedikt.ƒ = FudgeCore;
    prima_endaufgabe_grether_benedikt.loadFilesWithResponse();
    prima_endaufgabe_grether_benedikt.soundMuted = false;
    window.addEventListener("load", initGame);
    function initGame() {
        let startGameBtn = document.getElementById("startGame");
        let mute = document.getElementById("mute");
        mute.addEventListener("click", prima_endaufgabe_grether_benedikt.Sound.mute);
        startGameBtn.addEventListener("click", startGame);
    }
    function startGame() {
        prima_endaufgabe_grether_benedikt.start();
        let canvas = document.querySelector("canvas");
        prima_endaufgabe_grether_benedikt.ƒ.RenderManager.initialize(true, false);
        let cmpCamera = prima_endaufgabe_grether_benedikt.setCamera();
        let viewport = new prima_endaufgabe_grether_benedikt.ƒ.Viewport();
        viewport.initialize("Viewport", prima_endaufgabe_grether_benedikt.game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", prima_endaufgabe_grether_benedikt.handleKeyboard);
        document.addEventListener("keyup", prima_endaufgabe_grether_benedikt.handleKeyboard);
        prima_endaufgabe_grether_benedikt.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        prima_endaufgabe_grether_benedikt.ƒ.Loop.start(prima_endaufgabe_grether_benedikt.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            if (prima_endaufgabe_grether_benedikt.life == false)
                prima_endaufgabe_grether_benedikt.end();
            prima_endaufgabe_grether_benedikt.processInput();
            viewport.draw();
            cmpCamera.pivot.translation = new prima_endaufgabe_grether_benedikt.ƒ.Vector3(prima_endaufgabe_grether_benedikt.hero.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
        }
    }
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Main.js.map