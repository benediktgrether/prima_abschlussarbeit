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
      if (soundMuted == false) {
        Sound.sounds[_id].volume = 0.2;
        Sound.sounds[_id].play();
      }
    }

    public static playMusic(): void {
      if (soundMuted == false) {
      Sound.sounds["backgroundmusic"].loop = true;
      Sound.sounds["backgroundmusic"].volume = 0.1;
      Sound.sounds["backgroundmusic"].play();
      }
    }

    public static playItemDropZombie(_id: string): void {
      Sound.play(_id);
      window.setTimeout(Sound.playItemDropZombie, 1000);
    }

    public static mute(): void {
      soundMuted = true;
      let mute: HTMLElement = document.getElementById("mute");
      mute.classList.add("muted-active");
    }
  }
}