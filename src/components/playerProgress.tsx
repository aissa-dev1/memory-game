import { game } from "../features/game";

const PlayerProgress = () => {
  return (
    <div class="flex items-center justify-between gap-2 lg:flex-col lg:items-start lg:justify-start">
      <p class="font-semibold">
        Mistake times: {game.cells.signal.mistakeTimes}
      </p>
      <p class="font-semibold">Win times: {game.signal.winTimes}</p>
    </div>
  );
};

export default PlayerProgress;
