/// <reference path="./SpriteGenerator.ts"/>

namespace prima_endaufgabe_grether_benedikt {
  export import ƒ = FudgeCore;
  loadFilesWithResponse();

  window.addEventListener("load", initGame);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  export let game: ƒ.Node;
  export let level: ƒ.Node;
  export let platform: ƒ.Node;
  export let bene: Character;
  export let enemy: Enemy;
  export let fight: boolean = false;
  export let life: boolean = true;

  export let soundVolume: boolean = false;

  async function loadFilesWithResponse(): Promise<void> {
    let response: Response = await fetch("./js/data/data.json");
    let offer: string = await response.text();
    let data: any = JSON.parse(offer);
    console.log(data);
  }

  function initGame(): void {
    let startGameBtn: HTMLElement = document.getElementById("startGame");
    let mute: HTMLElement = document.getElementById("mute")
    mute.addEventListener("click", Sound.mute);
    startGameBtn.addEventListener("click", startGame);
  }


  function startGame(): void {
    let mainMenu: HTMLElement = document.getElementById("mainMenu");
    mainMenu.style.display = "none";
    let startGameBtn: HTMLElement = document.getElementById("btn-play");
    startGameBtn.style.display = "none";
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    // let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;
    Character.generateSprites(txtImage);
    Enemy.generateSprites(txtImage);
    Floor.generateSprites(txtImage);
    Items.generateSprites(txtImage);
    Gravstone.generateSprites(txtImage);
    Tree.generateSprites(txtImage);
    Mountain.generateSprites(txtImage);

    ƒ.RenderManager.initialize(true, false);
    game = new ƒ.Node("Game");
    game.addComponent(new ƒ.ComponentTransform());

    game.cmpTransform.local.translateY(-1.17);

    bene = new Character("Bene");
    enemy = new Enemy("Zombie", -1, 0.5);
    level = new Level();
    platform = new Platform();
    // items = Level.createItem();

    game.appendChild(bene);
    game.appendChild(enemy);
    enemy = new Enemy("Zombie", 1.5, 0.3);

    game.appendChild(enemy);
    game.appendChild(level);
    game.appendChild(platform);



    Sound.init();
    Sound.playMusic();

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
      
      if (life == false)
        end();
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
    if (_event.code == ƒ.KEYBOARD_CODE.W && _event.type == "keydown") {
      bene.act(ACTION.JUMP);
      fight = false;
    }
  }

  function processInput(): void {
    if (life == true) {
      if (keysPressed[ƒ.KEYBOARD_CODE.A]) {
        bene.act(ACTION.WALK, DIRECTION.LEFT);
        fight = false;
        return;
      }
      if (keysPressed[ƒ.KEYBOARD_CODE.D]) {
        bene.act(ACTION.WALK, DIRECTION.RIGHT);
        fight = false;
        return;
      }
      if (keysPressed[ƒ.KEYBOARD_CODE.E]) {
        bene.act(ACTION.IDLE);
        fight = false;
        bene.item = ITEM.NONE;
        Items.itemUsabilityPoints = 25;
        Items.itemCounter = 20;
        Items.healthBar = 100;
        let element: HTMLElement = document.getElementById("itemHealthBar");
        element.style.width = "0%";
        Sound.play("itemDrop");
        return;
      }
      // if (keysPressed[ƒ.KEYBOARD_CODE.W]) {
      //   bene.act(ACTION.JUMP);
      //   fight = false;
      //   // return;
      // }
      if (keysPressed[ƒ.KEYBOARD_CODE.SPACE]) {
        if (bene.item == "Sword") {
          bene.act(ACTION.SWORD);
          Sound.play("swordFight");
          fight = true;
          bene.speed.x = 0;
          return;
        } else {
          bene.act(ACTION.IDLE);
          bene.updateHealtpoints();
          if (enemy.direction == 1 && fight == true) {
            bene.cmpTransform.local.translateX(0.05);
            fight = false;
            return;
          }
          else  if (enemy.direction == -1 && fight == true) {
            bene.cmpTransform.local.translateX(-0.05);
            fight = false;
            return;
          }
        }
      }
      bene.act(ACTION.IDLE);
      fight = false;
      return;
    }
  }
  function end(): void {
    let startRestartBtn: HTMLElement = document.getElementById("btn-restart");
    startRestartBtn.style.display = "block";

    let mainMenu: HTMLElement = document.getElementById("mainMenu");
    mainMenu.style.display = "flex";
    let counterShow: HTMLElement = document.getElementById("counter-show");
    counterShow.style.display = "block";
    startRestartBtn.addEventListener("click", restartGame);

  }

  function restartGame(): void {
    location.reload();
  }
}