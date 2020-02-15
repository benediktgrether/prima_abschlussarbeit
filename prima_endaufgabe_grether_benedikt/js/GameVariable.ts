namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;


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


  export let game: ƒ.Node;
  export let level: ƒ.Node;
  export let platform: ƒ.Node;
  export let hero: Hero;
  export let enemy: Enemy;
  export let fight: boolean = false;
  export let life: boolean = true;
  export let data: Object[];

  export async function loadFilesWithResponse(): Promise<void> {
    let response: Response = await fetch("./js/data/data.json");
    let offer: string = await response.text();
    data = JSON.parse(offer);
  }

  export function start(): void {
    let mainMenu: HTMLElement = document.getElementById("mainMenu");
    mainMenu.style.display = "none";

    let startGameBtn: HTMLElement = document.getElementById("btn-play");
    startGameBtn.style.display = "none";
    
    game = new ƒ.Node("Game");
    game.addComponent(new ƒ.ComponentTransform());
    
    setSprites();
    setEnvironment();
    setSound();
  }

  export function setSprites(): void {
    let img: HTMLImageElement = document.querySelector("img");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;
    SpriteGenerator.generateSprites(txtImage, data);
    Floor.generateSprites(txtImage);
  }

  export function setEnvironment(): void {
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
  }

  export function setSound(): void {
    Sound.init();
    Sound.playMusic();
  }

  export function setCamera(): ƒ.ComponentCamera {
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("#c2f0ff");
    return cmpCamera;
  }

  export function end(): void {
    let startRestartBtn: HTMLElement = document.getElementById("btn-restart");
    startRestartBtn.style.display = "block";

    let mainMenu: HTMLElement = document.getElementById("mainMenu");
    mainMenu.style.display = "flex";
    let counterShow: HTMLElement = document.getElementById("counter-show");
    counterShow.style.display = "block";
    startRestartBtn.addEventListener("click", restartGame);

  }

  export function restartGame(): void {
    location.reload();
  }
}