import { createSignal } from "solid-js";
import { memoryData } from "../placeholder";
import { Cell } from "./cell";
import { shuffleArray } from "../utils/shuffle-array";

type CellsSignal = {
  currentCell: Cell | null;
  nextCell: Cell | null;
  verify: boolean;
  list: Cell[];
  mistakeTimes: number;
};

export class Cells {
  private _signal = createSignal<CellsSignal>({
    currentCell: null,
    nextCell: null,
    verify: false,
    list: [],
    mistakeTimes: 0,
  });

  constructor() {
    this.reset();
  }

  reset() {
    this._signal[1]((prev) => ({ ...prev, list: [] }));
    this.resetMistakeTimes();
    let shuffledCells = shuffleArray(memoryData);
    for (let i = 0; i < shuffledCells.length; i++) {
      const { code, imgSrc } = shuffledCells[i];
      this.createCell(i, code, imgSrc);
    }
  }

  handleCellChoose(index: number) {
    const cell = this.findOneByIndex(index) as Cell;
    if (cell.signal.active) return;

    let currentCell: Cell | null;

    if (this.signal.currentCell === null) {
      currentCell = this.chooseCurrentCell(index);
      currentCell.activate();
      return;
    }
    if (this.signal.nextCell?.signal.active) return;
    let nextCell: Cell | null;

    if (this.signal.nextCell === null) {
      nextCell = this.chooseNextCell(index);
      nextCell.activate();
    }
    if (
      this.signal.currentCell?.signal.code !== this.signal.nextCell?.signal.code
    ) {
      currentCell = this.signal.currentCell;
      nextCell = this.signal.nextCell;
      setTimeout(() => this.wrongChoose(currentCell, nextCell), 500);
      return;
    }

    nextCell = this.signal.nextCell as Cell;
    nextCell.activate();
    this.resetCurrentActiveCells();
  }

  findOneByIndex(index: number): Cell | undefined {
    const cell = this.signal.list.find((c) => c.signal.index === index);
    return cell;
  }

  private createCell(index: number, code: string, imgSrc: string) {
    this._signal[1]((prev) => ({
      ...prev,
      list: [
        ...prev.list,
        new Cell({
          index,
          code,
          imgSrc,
        }),
      ],
    }));
  }

  private chooseCurrentCell(index: number): Cell {
    const currentCell = this.findOneByIndex(index) as Cell;
    this.updateCurrentCell(currentCell);
    return currentCell;
  }

  private chooseNextCell(index: number): Cell {
    const nextCell = this.findOneByIndex(index) as Cell;
    this.updateNextCell(nextCell);
    return nextCell;
  }

  private wrongChoose(currentCell: Cell | null, nextCell: Cell | null) {
    if (currentCell === null || nextCell === null) return;
    currentCell.disactivate();
    nextCell.disactivate();
    this.resetCurrentActiveCells();
    this.increaseMistakeTimes();
  }

  private updateCurrentCell(cell: Cell) {
    this._signal[1]((prev) => ({ ...prev, currentCell: cell, verify: true }));
  }

  private updateNextCell(cell: Cell) {
    this._signal[1]((prev) => ({ ...prev, nextCell: cell, verify: false }));
  }

  private increaseMistakeTimes() {
    this._signal[1]((prev) => ({
      ...prev,
      mistakeTimes: prev.mistakeTimes + 1,
    }));
  }

  private resetMistakeTimes() {
    this._signal[1]((prev) => ({ ...prev, mistakeTimes: 0 }));
  }

  private resetCurrentActiveCells() {
    this._signal[1]((prev) => ({
      ...prev,
      currentCell: null,
      nextCell: null,
      verify: false,
    }));
  }

  get signal(): CellsSignal {
    return this._signal[0]();
  }
}
