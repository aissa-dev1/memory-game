import { Show } from "solid-js";
import { game } from "../features/game";

export type MemoryCell = {
  index: number;
  code: string;
  imgSrc: string;
};

export type MinimizedMemoryCell = {
  code: string;
  imgSrc: string;
};

interface CellProps extends MemoryCell {}

const Cell = ({ index, code, imgSrc }: CellProps) => {
  return (
    <div
      class="flex items-center justify-center w-full h-full p-8 lg:h-40 lg:p-0 bg-page border border-slate-700 cursor-pointer"
      onClick={() => {
        game.cells.handleCellChoose(index);
      }}
    >
      <Show
        when={game.cells.findOneByIndex(index)?.signal.active}
        fallback={
          <img
            class="w-12 h-12 lg:w-16 lg:h-16"
            src="/languages/question-mark.svg"
            alt="cell"
          />
        }
      >
        <img class="w-12 h-12 lg:w-16 lg:h-16" src={imgSrc} alt={code} />
      </Show>
    </div>
  );
};

export default Cell;
