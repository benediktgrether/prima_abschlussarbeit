"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    var ƒ = FudgeCore;
    prima_endaufgabe_grether_benedikt.fight = false;
    prima_endaufgabe_grether_benedikt.life = true;
    async function loadFilesWithResponse() {
        let response = await fetch("./js/data/data.json");
        let offer = await response.text();
        prima_endaufgabe_grether_benedikt.data = JSON.parse(offer);
    }
    prima_endaufgabe_grether_benedikt.loadFilesWithResponse = loadFilesWithResponse;
    function start() {
        let mainMenu = document.getElementById("mainMenu");
        mainMenu.style.display = "none";
        let startGameBtn = document.getElementById("btn-play");
        startGameBtn.style.display = "none";
        prima_endaufgabe_grether_benedikt.game = new ƒ.Node("Game");
        prima_endaufgabe_grether_benedikt.game.addComponent(new ƒ.ComponentTransform());
        setSprites();
        setEnvironment();
        setSound();
    }
    prima_endaufgabe_grether_benedikt.start = start;
    function setSprites() {
        let img = document.querySelector("img");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        prima_endaufgabe_grether_benedikt.SpriteGenerator.generateSprites(txtImage, prima_endaufgabe_grether_benedikt.data);
        prima_endaufgabe_grether_benedikt.Floor.generateSprites(txtImage);
    }
    prima_endaufgabe_grether_benedikt.setSprites = setSprites;
    function setEnvironment() {
        prima_endaufgabe_grether_benedikt.hero = new prima_endaufgabe_grether_benedikt.Hero("hero");
        prima_endaufgabe_grether_benedikt.enemy = new prima_endaufgabe_grether_benedikt.Enemy("Zombie", -3, 0.5);
        prima_endaufgabe_grether_benedikt.enemy.updateHealtpoints(prima_endaufgabe_grether_benedikt.enemy);
        prima_endaufgabe_grether_benedikt.level = new prima_endaufgabe_grether_benedikt.Level(prima_endaufgabe_grether_benedikt.data);
        prima_endaufgabe_grether_benedikt.platform = new prima_endaufgabe_grether_benedikt.Platform(prima_endaufgabe_grether_benedikt.data);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.platform);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.level);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.hero);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.enemy);
        prima_endaufgabe_grether_benedikt.enemy = new prima_endaufgabe_grether_benedikt.Enemy("Zombie", 3, 0.3);
        prima_endaufgabe_grether_benedikt.enemy.updateHealtpoints(prima_endaufgabe_grether_benedikt.enemy);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.enemy);
    }
    prima_endaufgabe_grether_benedikt.setEnvironment = setEnvironment;
    function setSound() {
        prima_endaufgabe_grether_benedikt.Sound.init();
        prima_endaufgabe_grether_benedikt.Sound.playMusic();
    }
    prima_endaufgabe_grether_benedikt.setSound = setSound;
    function setCamera() {
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("#c2f0ff");
        return cmpCamera;
    }
    prima_endaufgabe_grether_benedikt.setCamera = setCamera;
    function end() {
        let startRestartBtn = document.getElementById("btn-restart");
        startRestartBtn.style.display = "block";
        let mainMenu = document.getElementById("mainMenu");
        mainMenu.style.display = "flex";
        let counterShow = document.getElementById("counter-show");
        counterShow.style.display = "block";
        startRestartBtn.addEventListener("click", restartGame);
    }
    prima_endaufgabe_grether_benedikt.end = end;
    function restartGame() {
        location.reload();
    }
    prima_endaufgabe_grether_benedikt.restartGame = restartGame;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=GameVariable.js.map