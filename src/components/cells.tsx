import { For } from "solid-js";
import { game } from "../features/game";
import Cell from "./cell";

const Cells = () => {
  return (
    <div class="grid grid-cols-3 gap-4 lg:grid-cols-4">
      <For each={game.cells.signal.list}>
        {(cell) => <Cell {...cell.signal} />}
      </For>
    </div>
  );
};

export default Cells;
