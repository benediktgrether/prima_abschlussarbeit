/// <reference path="./SpriteGenerator.ts"/>

namespace prima_endaufgabe_grether_benedikt {
  export import ƒ = FudgeCore;
  loadFilesWithResponse();

  window.addEventListener("load", initGame);


  function initGame(): void {
    let startGameBtn: HTMLElement = document.getElementById("startGame");
    let mute: HTMLElement = document.getElementById("mute");
    mute.addEventListener("click", Sound.mute);
    startGameBtn.addEventListener("click", startGame);
  }


  function startGame(): void {

    start();
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.RenderManager.initialize(true, false);
    let cmpCamera: ƒ.ComponentCamera = setCamera();


    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);

    function update(_event: ƒ.Eventƒ): void {
      
      if (life == false)
        end();
      
      processInput();

      viewport.draw();
      cmpCamera.pivot.translation = new ƒ.Vector3(hero.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
    }
  }

}