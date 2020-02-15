/// <reference path="./SpriteGenerator.ts"/>

namespace prima_endaufgabe_grether_benedikt {
  export import ƒ = FudgeCore;
  loadFilesWithResponse();

  window.addEventListener("load", initGame);


  interface Object {
    platform: Object[];
    distance: number;
    item: boolean;
    level: Object[];
    distanceLevel: number;
    generateSprite: Object[];
    type: string;
    action: string;
    x: number;
    y: number;
    w: number;
    h: number;
    frame: number;
    resolution: number;
    pivot: ƒ.ORIGIN2D;
  }


  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  export let game: ƒ.Node;
  export let level: ƒ.Node;
  export let platform: ƒ.Node;
  export let hero: Hero;
  export let enemy: Enemy;
  export let fight: boolean = false;
  export let life: boolean = true;
  let data: Object[];

  export let soundMuted: boolean = false;


  async function loadFilesWithResponse(): Promise<void> {
    let response: Response = await fetch("./js/data/data.json");
    let offer: string = await response.text();
    data = JSON.parse(offer);
  }

  function initGame(): void {
    let startGameBtn: HTMLElement = document.getElementById("startGame");
    let mute: HTMLElement = document.getElementById("mute");
    mute.addEventListener("click", Sound.mute);
    startGameBtn.addEventListener("click", startGame);
  }


  function startGame(): void {
    let mainMenu: HTMLElement = document.getElementById("mainMenu");
    mainMenu.style.display = "none";

    let startGameBtn: HTMLElement = document.getElementById("btn-play");
    startGameBtn.style.display = "none";

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let img: HTMLImageElement = document.querySelector("img");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;
    // Hero.generateSprites(txtImage);
    // Enemy.generateSprites(txtImage);
    Floor.generateSprites(txtImage);
    // Items.generateSprites(txtImage);
    // Gravstone.generateSprites(txtImage);
    // Tree.generateSprites(txtImage);
    // Mountain.generateSprites(txtImage);
    SpriteGenerator.generateSprites(txtImage, data);

    ƒ.RenderManager.initialize(true, false);
    game = new ƒ.Node("Game");
    game.addComponent(new ƒ.ComponentTransform());

    // game.cmpTransform.local.translateY(-1.17);

    hero = new Hero("hero");
    enemy = new Enemy("Zombie", -3, 0.5);
    enemy.updateHealtpoints(enemy);
    level = new Level(data);
    platform = new Platform(data);
    game.appendChild(platform);

    


    game.appendChild(level);
    game.appendChild(hero);
    game.appendChild(enemy);
    enemy = new Enemy("Zombie", 3, 0.3);
    enemy.updateHealtpoints(enemy);
    game.appendChild(enemy);



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
      cmpCamera.pivot.translation = new ƒ.Vector3(hero.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
    if (_event.code == ƒ.KEYBOARD_CODE.W && _event.type == "keydown") {
      hero.act(ACTION.JUMP);
      fight = false;
    }
  }

  function processInput(): void {
    if (life == true) {
      if (keysPressed[ƒ.KEYBOARD_CODE.A]) {
        hero.act(ACTION.WALK, DIRECTION.LEFT);
        fight = false;
        return;
      }
      if (keysPressed[ƒ.KEYBOARD_CODE.D]) {
        hero.act(ACTION.WALK, DIRECTION.RIGHT);
        fight = false;
        return;
      }
      if (keysPressed[ƒ.KEYBOARD_CODE.E]) {
        hero.act(ACTION.IDLE);
        fight = false;
        hero.item.type = ITEM.NONE;
        // Items.itemUsabilityPoints = 25;
        // Items.itemCounter = 20;
        Items.healthBar = 100;
        let element: HTMLElement = document.getElementById("itemHealthBar");
        element.style.width = "0%";
        Sound.play("itemDrop");
        return;
      }
      // if (keysPressed[ƒ.KEYBOARD_CODE.W]) {
      //   hero.act(ACTION.JUMP);
      //   fight = false;
      //   // return;
      // }
      if (keysPressed[ƒ.KEYBOARD_CODE.SPACE]) {
        if (hero.item.type == "Sword") {
          hero.act(ACTION.SWORD);
          Sound.play("swordFight");
          fight = true;
          hero.speed.x = 0;
          return;
        } else {
          hero.act(ACTION.IDLE);
          hero.updateHealtpoints();
          if (enemy.direction == 1 && fight == true) {
            hero.cmpTransform.local.translateX(0.05);
            fight = false;
            return;
          }
          else  if (enemy.direction == -1 && fight == true) {
            hero.cmpTransform.local.translateX(-0.05);
            fight = false;
            return;
          }
        }
      }
      hero.act(ACTION.IDLE);
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