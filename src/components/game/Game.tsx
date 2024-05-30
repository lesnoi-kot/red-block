import type { ParentProps } from "solid-js";
import { createMutable } from "solid-js/store";

import * as models from "../../models";
import { GameContext } from "./context";

export function Game(props: ParentProps) {
  const state = createMutable<models.Level>({
    width: 3,
    height: 3,
    cellSize: 32,
    finishPosition: {
      row: 3,
      col: 1,
    },
    blocks: [
      models.newBlock(1, 1, 1, 1),
      models.newBlock(1, 2, 1, 2),
      models.newBlock(2, 2, 1, 1),
      models.newBlock(2, 3, 1, 1),
      models.newBlock(3, 2, 1, 1),
      models.newBlock(3, 3, 1, 1),
    ] as models.Block[],
  });

  return (
    <GameContext.Provider value={state}>{props.children}</GameContext.Provider>
  );
}
