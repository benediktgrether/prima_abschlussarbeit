/// <reference path="./SpriteGenerator.ts"/>

namespace prima_endaufgabe_grether_benedikt {
  export import ƒ = FudgeCore;
  
  window.addEventListener("load", initGame);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  export let game: ƒ.Node;
  export let level: ƒ.Node;
  export let platform: ƒ.Node;
  let bene: Bene;


  // async function loadFilesWithResponse(): Promise<void> {
  // let response: Response = await fetch("./data/data.json");
  // let offer: string = await response.text();
  // let data: any = JSON.parse(offer);
  // console.log(data);
  // }



  function initGame(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    // loadFilesWithResponse();
    // let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtbene: ƒ.TextureImage = new ƒ.TextureImage();
    txtbene.image = img;
    Bene.generateSprites(txtbene);
    Floor.generateSprites(txtbene);
    Items.generateSprites(txtbene);

    ƒ.RenderManager.initialize(true, false);
    game = new ƒ.Node("Game");
    game.addComponent(new ƒ.ComponentTransform());

    game.cmpTransform.local.translateY(-1.17);

    bene = new Bene("Bene");
    level = new Level();
    platform = new Platform();
    // items = Level.createItem();
    
    game.appendChild(bene);
    game.appendChild(level);
    game.appendChild(platform);
    game.appendChild(bene.createHitbox());
    // level.appendChild(bene.creatHitbox());
    // level.appendChild(item.creatHitbox());

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("#c2f0ff");

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

      // crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      // crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
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
}