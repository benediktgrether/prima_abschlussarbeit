namespace prima_endaufgabe_grether_benedikt {
  
  interface Sounds {
    [id: string]: HTMLAudioElement;
  }
  export class Sound {
    private static sounds: Sounds = {};
    private static counter: number = 1;
    // private static soundVolume: number = 0;

    public static init(): void {
      let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
      for (let element of audioElements)
        Sound.sounds[element.id] = element;
    }

    public static play(_id: string): void {
      if (soundVolume == false) {
        Sound.sounds[_id].volume = 0.2;
        Sound.sounds[_id].play();
      } else {
        Sound.sounds[_id].volume = 0.0;
        Sound.sounds[_id].play();
      }
    }

    public static playMusic(): void {
      if (soundVolume == false) {
      Sound.sounds["beat" + this.counter].loop = true;
      Sound.sounds["beat" + this.counter].play();
      }
    }

    public static playItemDropZombie(_id: string): void {
      Sound.play(_id);
      window.setTimeout(Sound.playItemDropZombie, 1000);
    }

    public static mute(): void {
      soundVolume = true;
    }
  }
}