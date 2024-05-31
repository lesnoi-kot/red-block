import { createMutable } from "solid-js/store";

import { Grid } from "../grid/Grid";
import * as models from "../../models";
import { GameContext } from "./context";

export function Game() {
  const state = createMutable<models.Level>({
    width: 3,
    height: 3,
    cellSize: 64,
    finishPosition: {
      row: 3,
      col: 1,
    },
    blocks: [
      models.newBlock(1, 1, 1, 1),
      models.newBlock(1, 2, 1, 2, true),
      models.newBlock(2, 2, 1, 1),
      models.newBlock(2, 3, 1, 1),
      models.newBlock(3, 2, 1, 1),
      models.newBlock(3, 3, 1, 1),
    ] as models.Block[],
  });

  return (
    <GameContext.Provider value={state}>
      <main class="flex flex-col gap-10 w-fit">
        <h2 class="text-5xl text-center font-mono">Level 1</h2>
        <div class="flex items-center relative">
          <img
            src="/you.gif"
            alt="Sonic watchin u"
            class="absolute w-36 -left-36"
            title="Do the riddle, dude!"
          />
          <Grid />
        </div>
      </main>
    </GameContext.Provider>
  );
}
