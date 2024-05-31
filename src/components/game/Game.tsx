import { createMutable } from "solid-js/store";

import { Grid } from "../grid/Grid";
import { GameContext } from "./context";
import { levels } from "./levels";

export function Game() {
  const state = createMutable({
    levelIndex: 3,
    level: levels[3](),
    nextLevel() {
      state.level = levels[++this.levelIndex]?.() ?? null;
    },
    resetLevel() {
      state.level = levels[this.levelIndex]?.() ?? null;
    },
    isGameOver() {
      return state.levelIndex === levels.length - 1;
    },
  });

  return (
    <GameContext.Provider value={state}>
      <main class="flex flex-col gap-6 w-fit">
        {state.isGameOver() ? (
          <h2 class="text-5xl text-center font-mono">Game Over</h2>
        ) : (
          <h2 class="text-5xl text-center font-mono">
            Level {state.levelIndex + 1}
          </h2>
        )}
        <div class="flex gap-4">
          {!state.isGameOver() && (
            <button
              class="px-3 py-2 border-2 border-blue-700 rounded-xl"
              onClick={() => {
                state.resetLevel();
              }}
            >
              Reset
            </button>
          )}
          {state.isGameOver() && (
            <button
              class="px-3 py-2 border-2 border-blue-700 rounded-xl"
              onClick={() => {
                state.levelIndex = 0;
                state.resetLevel();
              }}
            >
              Play again
            </button>
          )}
        </div>
        <div class="flex items-center relative">
          <img
            src="/you.gif"
            alt="Sonic watchin u"
            class="absolute w-36 -left-40"
            title="Do the riddle, dude!"
          />
          <Grid />
        </div>
      </main>
    </GameContext.Provider>
  );
}
