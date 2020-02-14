"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    class Sound {
        // private static counter: number = 1;
        // private static soundVolume: number = 0;
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }
        static play(_id) {
            if (prima_endaufgabe_grether_benedikt.soundVolume == false) {
                Sound.sounds[_id].volume = 0.2;
                Sound.sounds[_id].play();
            }
            else {
                Sound.sounds[_id].volume = 0.0;
                Sound.sounds[_id].play();
            }
        }
        static playMusic() {
            if (prima_endaufgabe_grether_benedikt.soundVolume == false) {
                Sound.sounds["backgroundmusic"].loop = true;
                Sound.sounds["backgroundmusic"].volume = 0.1;
                Sound.sounds["backgroundmusic"].play();
            }
        }
        static playItemDropZombie(_id) {
            Sound.play(_id);
            window.setTimeout(Sound.playItemDropZombie, 1000);
        }
        static mute() {
            prima_endaufgabe_grether_benedikt.soundVolume = true;
        }
    }
    Sound.sounds = {};
    prima_endaufgabe_grether_benedikt.Sound = Sound;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Sound.js.map