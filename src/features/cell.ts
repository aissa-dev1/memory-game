import { createSignal } from "solid-js";
import { MemoryCell } from "../components/cell";

type CellSignal = {
  index: number;
  code: string;
  imgSrc: string;
  active: boolean;
};

export class Cell {
  private _signal = createSignal<CellSignal>({
    index: 0,
    code: "",
    imgSrc: "",
    active: false,
  });

  constructor(props: MemoryCell) {
    this.initiate(props);
  }

  activate() {
    this._signal[1]((prev) => ({ ...prev, active: true }));
  }

  disactivate() {
    this._signal[1]((prev) => ({ ...prev, active: false }));
  }

  private initiate(props: MemoryCell) {
    this._signal[1](() => ({
      index: props.index,
      code: props.code,
      imgSrc: props.imgSrc,
      active: false,
    }));
  }

  get signal(): CellSignal {
    return this._signal[0]();
  }
}
