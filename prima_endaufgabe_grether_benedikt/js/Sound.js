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
            Sound.sounds["beat1"].loop = true;
            Sound.sounds["beat1"].play();
            Sound.sounds["beat1"].volume = 0.2;
        }
    }
    Sound.sounds = {};
    prima_endaufgabe_grether_benedikt.Sound = Sound;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Sound.js.map