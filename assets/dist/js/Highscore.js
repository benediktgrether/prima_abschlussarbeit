"use strict";
var prima_endaufgabe_grether_benedikt;
(function (prima_endaufgabe_grether_benedikt) {
    class Highscore {
        static setHighscore() {
            let element = document.getElementById("counter");
            this.counter += 50;
            element.innerHTML = this.counter.toString();
            let counterShow = document.getElementById("counter-show");
            counterShow.innerHTML = this.counter.toString();
        }
    }
    Highscore.counter = 0;
    prima_endaufgabe_grether_benedikt.Highscore = Highscore;
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Highscore.js.map