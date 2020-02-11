namespace prima_endaufgabe_grether_benedikt {
  
  interface Sounds {
    [id: string]: HTMLAudioElement;
  }
  export class Sound {
    public static atmoDelay: number = 0;
    private static sounds: Sounds = {};
    private static atmoBeat: number = 1;

    public static init(): void {
      let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
      for (let element of audioElements)
        Sound.sounds[element.id] = element;
    }

    public static play(_id: string): void {
      Sound.sounds[_id].play();
      console.log(Sound.sounds[_id]);
    }

    public static playAtmo(_delay: number = Sound.atmoDelay): void {
      Sound.play("beat" + Sound.atmoBeat);
      // Sound.atmoBeat = (Sound.atmoBeat == 1) ? 2 : 1;
      // Sound.atmoDelay = _delay;
      // window.setTimeout(Sound.playAtmo);
      // if (Sound.atmoDelay > 0)
      //   window.setTimeout(Sound.playAtmo, Sound.atmoDelay * 1000);
    }
    public static playMusic(): void {
      Sound.sounds["beat1"].loop = true;
      Sound.sounds["beat1"].play();
      Sound.sounds["beat1"].volume = 0.2;
    }
  }
}