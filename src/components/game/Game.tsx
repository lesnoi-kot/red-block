import { Match, Switch } from "solid-js";
import { createMutable } from "solid-js/store";

import { Grid } from "../grid/Grid";
import { GameContext, useGameContext } from "./context";
import { NULL_LEVEL, levels } from "./levels";
import { startAudio, resetAudio, winAudio, playAudio } from "./sfx";

const MENU_INDEX = 0;
const INITIAL_INDEX = MENU_INDEX + 0;

export function Game() {
  const state = createMutable({
    levelIndex: INITIAL_INDEX,
    level: NULL_LEVEL,
    nextLevel() {
      state.level = levels[++this.levelIndex]?.() ?? null;
    },
    resetBlocks() {
      const rebuiltLevel = levels[this.levelIndex]();
      playAudio(resetAudio);
      state.level.blocks.forEach((block, i) => {
        Object.assign(block, rebuiltLevel.blocks[i]);
      });
    },
    resetLevel() {
      if (this.levelIndex >= MENU_INDEX) {
        state.level = levels[this.levelIndex]?.() ?? null;
      }
    },
    onWin() {
      if (this.levelIndex === MENU_INDEX) {
        playAudio(startAudio);
      } else {
        playAudio(winAudio);
      }
    },
    isGameOver(): boolean {
      return state.levelIndex === levels.length - 1;
    },
  });

  state.resetLevel();

  return (
    <GameContext.Provider value={state}>
      <main class="w-fit min-h-96">
        <Switch fallback={<Menu />}>
          <Match when={state.isGameOver()}>
            <GameOver />
          </Match>
          <Match when={state.levelIndex !== MENU_INDEX}>
            <GridContainer />
          </Match>
        </Switch>
      </main>
    </GameContext.Provider>
  );
}

function Menu() {
  const state = useGameContext();

  return (
    <div class="flex flex-col gap-6">
      <h1 class="font-[Danfo] text-4xl sm:text-6xl text-pretty">
        Red&nbsp;Block
        <br />
        Redemption
      </h1>
      <div class="text-lg max-w-[30rem]">
        <p>
          Move <span class="text-red-500">the red block</span> out of the frame.
        </p>
        <p>
          Click and drag <span class="text-[#ff9900]">a tile</span> to move it
          to an adjacent&nbsp;
          <span class=" text-white font-bold  bg-slate-200 bg-[url('/FLATSTONES.png')]">
            empty&nbsp;space
          </span>{" "}
          in horizontal or vertical direction.
        </p>
      </div>
      <div class="flex items-center gap-4">
        <GameContext.Provider value={state}>
          <Grid />
        </GameContext.Provider>
        <span class="uppercase font-bold text-3xl text-pink-400">start</span>
      </div>
    </div>
  );
}

function GameOver() {
  const state = useGameContext();

  return (
    <div class="flex flex-col gap-6">
      <h2 class="text-5xl text-center font-mono">Game Over</h2>
      <div>
        <p>Good job man!</p>
        <p>Now go back to your things.</p>
      </div>
      <img
        src="/knuckles.gif"
        alt="Knuckles like it"
        width="200px"
        title="Take W!"
      />
      <button
        class="px-3 py-2 border-2 border-blue-700 rounded-xl"
        onClick={() => {
          state.levelIndex = 0;
          state.resetLevel();
        }}
      >
        Play again
      </button>
    </div>
  );
}

function GridContainer() {
  const state = useGameContext();

  return (
    <div class="flex flex-col gap-6">
      <div class="flex gap-4 items-center">
        <h2 class="text-5xl text-center font-mono">Level {state.levelIndex}</h2>
        <button
          class="px-3 py-2 border-2 text-base border-blue-700 rounded-xl"
          onClick={() => {
            state.resetBlocks();
          }}
        >
          Reset
        </button>
      </div>
      <div class="flex items-center justify-center relative">
        <img
          src="/you.gif"
          alt="Sonic watchin u"
          class="absolute w-36 -left-40"
          title="Do the riddle, dude!"
        />
        <Grid />
      </div>
    </div>
  );
}
