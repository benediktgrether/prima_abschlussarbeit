namespace prima_endaufgabe_grether_benedikt {
  
  interface Sounds {
    [id: string]: HTMLAudioElement;
  }
  export class Sound {
    private static sounds: Sounds = {};
    private static counter: number = 1;

    public static init(): void {
      let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
      for (let element of audioElements)
        Sound.sounds[element.id] = element;
    }

    public static play(_id: string): void {
      Sound.sounds[_id].play();
      Sound.sounds[_id].volume = 0.2;
    }

    public static playMusic(): void {
      // Sound.sounds["beat" + this.counter].loop = true;
      Sound.sounds["beat" + this.counter].play();
      Sound.sounds["beat" + this.counter].volume = 0.2;
      console.log(Sound.sounds["beat" + this.counter].ended);
      if (this.counter == 1) 
        this.counter = 2;
      else
        this.counter = 1;
    }
  }
}