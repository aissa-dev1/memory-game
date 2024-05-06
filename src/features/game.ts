import { createSignal } from "solid-js";
import { Cells } from "./cells";

type GameSignal = {
  winTimes: number;
};

class Game {
  private _signal = createSignal<GameSignal>({
    winTimes: 0,
  });
  private _cells = new Cells();

  constructor() {
    this.checkForOver();
  }

  private checkForOver() {
    setInterval(() => {
      const end = this._cells.signal.list.every((cell) => cell.signal.active);
      if (!end) return;

      this._cells.reset();
      this.increaseWinTimes();
    }, 1000);
  }

  private increaseWinTimes() {
    this._signal[1]((prev) => ({ ...prev, winTimes: prev.winTimes + 1 }));
  }

  get signal(): GameSignal {
    return this._signal[0]();
  }

  get cells(): Cells {
    return this._cells;
  }
}

export const game = new Game();
