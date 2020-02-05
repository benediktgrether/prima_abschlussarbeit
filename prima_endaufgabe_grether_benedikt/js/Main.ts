/// <reference path="./SpriteGenerator.ts"/>
namespace prima_endaufgabe_grether_benedikt {
  export import ƒ = FudgeCore;
  
  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  export let game: ƒ.Node;
  export let level: ƒ.Node;
  let bene: Bene;


  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtbene: ƒ.TextureImage = new ƒ.TextureImage();
    txtbene.image = img;
    Bene.generateSprites(txtbene);
    Floor.generateSprites(txtbene);

    ƒ.RenderManager.initialize(true, false);
    game = new ƒ.Node("Game");
    bene = new Bene("Bene");
    level = createLevel();
    game.appendChild(level);
    game.appendChild(bene);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);

    function update(_event: ƒ.Eventƒ): void {
      processInput();

      viewport.draw();
      // cmpCamera.pivot.lookAt(bene.cmpTransform.local.translation);
      cmpCamera.pivot.translation = new ƒ.Vector3(bene.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
    if (_event.code == ƒ.KEYBOARD_CODE.W && _event.type == "keydown")
      bene.act(ACTION.JUMP);
  }

  function processInput(): void {
    if (keysPressed[ƒ.KEYBOARD_CODE.A]) {
      bene.act(ACTION.WALK, DIRECTION.LEFT);
      return;
    }
    if (keysPressed[ƒ.KEYBOARD_CODE.D]) {
      bene.act(ACTION.WALK, DIRECTION.RIGHT);
      return;
    }

    bene.act(ACTION.IDLE);
  }

  function createLevel(): ƒ.Node {
    let level: ƒ.Node = new ƒ.Node("Level");
    let floor: Floor = new Floor();
    floor.cmpTransform.local.scaleY(0.5);
    floor.cmpTransform.local.scaleX(0.5);
    level.appendChild(floor);
    ƒ.Debug.log("test");
    ƒ.Debug.log(floor);

    floor = new Floor();
    // floor.cmpTransform.local.scaleY(1);
    // floor.cmpTransform.local.scaleX(2.2);
    floor.cmpTransform.local.translateY(0.2);
    floor.cmpTransform.local.translateX(1.5);
    level.appendChild(floor);

    return level;
  }

}