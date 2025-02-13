import { Match, Switch } from "solid-js";
import { createMutable } from "solid-js/store";

import { Grid } from "../grid/Grid";
import { GameContext, useGameContext } from "./context";
import { levels } from "./levels";
import { startAudio, resetAudio, winAudio, playAudio } from "./sfx";
import { Button } from "../Button";

const MENU_INDEX = 0;
const INITIAL_INDEX = MENU_INDEX + 0;

export function Game() {
  const state = createMutable({
    levelIndex: INITIAL_INDEX,
    level: levels[INITIAL_INDEX](),
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
      <main class="w-fit min-h-96 max-w-md m-auto">
        <Switch fallback={<Menu />}>
          <Match when={state.isGameOver()}>
            <GameOver />
          </Match>
          <Match when={state.levelIndex !== MENU_INDEX}>
            <LevelContainer />
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
      <h1 class="font-[Danfo] text-[min(12vw,_4rem)] leading-none text-yellow-50">
        Red&nbsp;Block
        <br />
        Redemption
      </h1>
      <div class="font-serif max-w-md w-fit text-xl text-slate-100">
        <p>
          Move <span class="text-red-500">the red block</span> out of the frame.
        </p>
        <p>
          Click and drag <span class="text-[#ff9900]">a tile</span> to move it
          to an adjacent&nbsp;
          <span class="text-white font-bold bg-[url('/FLATSTONES.png')] bg-[length:128px] 128px;">
            empty&nbsp;space
          </span>{" "}
          in horizontal or vertical direction.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <GameContext.Provider value={state}>
          <Grid />
        </GameContext.Provider>
        <div class="uppercase font-bold text-xl text-pink-400 text-right">
          <code>^^^ start</code>
        </div>
      </div>
    </div>
  );
}

function GameOver() {
  const state = useGameContext();

  return (
    <div class="flex flex-col gap-6">
      <h2 class="text-4xl sm:text-5xl mb-4 text-center">Game Over</h2>
      <div>
        <img
          class="crisp float-left"
          src="/knuckles.gif"
          alt="Knuckles like it"
          width="200px"
          title="Take W!"
        />
        <p class="text-red-500">
          Well, well, look who’s got the brains to match their brawn!
        </p>
        <br />
        <p>
          You nailed that puzzle faster than a{" "}
          <span class=" text-emerald-700">Chaos Emerald</span> hunt!
        </p>
        <br class=" clear-both" />
        <p>
          Don’t let it get to your head, though — there’s always a bigger
          challenge ahead!
        </p>

        <br />
        <p>Stay sharp, champ!&nbsp;&nbsp;❤️</p>
      </div>
      <Button
        onClick={() => {
          state.levelIndex = 0;
          state.resetLevel();
        }}
      >
        Play again
      </Button>
    </div>
  );
}

function LevelContainer() {
  const state = useGameContext();

  return (
    <div class="flex flex-col gap-6">
      <div class="flex gap-4 items-center">
        <h2 class="text-4xl sm:text-5xl text-center">
          Level&nbsp;{state.levelIndex}
        </h2>
        <Button
          class="ml-auto"
          onClick={() => {
            state.resetBlocks();
          }}
        >
          Reset
        </Button>
      </div>
      <div class="flex items-center justify-center relative">
        <img
          src="/you.gif"
          alt="Sonic watchin u"
          class="crisp absolute w-36 -left-40 hidden sm:block"
          title="Do the riddle, dude!"
        />
        <Grid />
      </div>
    </div>
  );
}
