namespace prima_endaufgabe_grether_benedikt {

  import ƒ = FudgeCore;

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  export function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
    if (_event.code == ƒ.KEYBOARD_CODE.W && _event.type == "keydown") {
      hero.act(ACTION.JUMP);
      fight = false;
    }
  }

  export function processInput(): void {
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
        Items.healthBar = 100;
        let element: HTMLElement = document.getElementById("itemHealthBar");
        element.style.width = "0%";
        Sound.play("itemDrop");
        return;
      }
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
          else if (enemy.direction == -1 && fight == true) {
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
}
