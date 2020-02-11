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
        static playAtmo(_delay = Sound.atmoDelay) {
            Sound.play("beat" + Sound.atmoBeat);
            // Sound.atmoBeat = (Sound.atmoBeat == 1) ? 2 : 1;
            // Sound.atmoDelay = _delay;
            // window.setTimeout(Sound.playAtmo);
            // if (Sound.atmoDelay > 0)
            //   window.setTimeout(Sound.playAtmo, Sound.atmoDelay * 1000);
        }
        static playMusic() {
            Sound.sounds["beat1"].loop = true;
            Sound.sounds["beat1"].play();
            Sound.sounds["beat1"].volume = 0.2;
        }
    }
    Sound.atmoDelay = 0;
    Sound.sounds = {};
    Sound.atmoBeat = 1;
    prima_endaufgabe_grether_benedikt.Sound = Sound;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Sound.js.map