namespace prima_endaufgabe_grether_benedikt {


  export class Highscore {
    public static counter: number = 0;
    public static setHighscore(): void {
      let element: HTMLElement = document.getElementById("counter");
      this.counter += 50;
      element.innerHTML = this.counter.toString();
      let counterShow: HTMLElement = document.getElementById("counter-show");
      counterShow.innerHTML = this.counter.toString();

    }
  }
}