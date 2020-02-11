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
            console.log(Sound.sounds[_id]);
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
    }
    Sound.sounds = {};
    Sound.counter = 1;
    prima_endaufgabe_grether_benedikt.Sound = Sound;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Sound.js.map