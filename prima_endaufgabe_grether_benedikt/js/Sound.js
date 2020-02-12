"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }
        static play(_id) {
            Sound.sounds[_id].play();
            Sound.sounds[_id].volume = 0.2;
        }
        static playMusic() {
            // Sound.sounds["beat" + this.counter].loop = true;
            Sound.sounds["beat" + this.counter].play();
            Sound.sounds["beat" + this.counter].volume = 0.2;
            console.log(Sound.sounds["beat" + this.counter].ended);
            if (this.counter == 1)
                this.counter = 2;
            else
                this.counter = 1;
        }
        static playItemDropZombie(_id) {
            Sound.play(_id);
            window.setTimeout(Sound.playItemDropZombie, 1000);
        }
    }
    Sound.sounds = {};
    Sound.counter = 1;
    Sound.atmoDelay = 0;
    prima_endaufgabe_grether_benedikt.Sound = Sound;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Sound.js.map