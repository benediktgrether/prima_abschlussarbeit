namespace prima_endaufgabe_grether_benedikt {
  
  interface Sounds {
    [id: string]: HTMLAudioElement;
  }
  export class Sound {
    private static sounds: Sounds = {};

    public static init(): void {
      let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
      for (let element of audioElements)
        Sound.sounds[element.id] = element;
    }

    public static play(_id: string): void {
      Sound.sounds[_id].play();
      console.log(Sound.sounds[_id]);
    }

    public static playMusic(): void {
      Sound.sounds["beat2"].loop = true;
      Sound.sounds["beat2"].play();
      Sound.sounds["beat2"].volume = 0.2;
    }
  }
}