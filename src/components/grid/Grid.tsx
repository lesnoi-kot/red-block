import { createMutable } from "solid-js/store";
import { Block } from "../block/Block";
import css from "./grid.module.css";
import { For } from "solid-js";

type Block = {
  row: number;
  col: number;
  height: number;
  width: number;
};

function newBlock(row: number, col: number, height: number, width: number) {
  return { row, col, height, width };
}

export function Grid() {
  const state = createMutable({
    blocks: [newBlock(2, 3, 1, 5), newBlock(4, 6, 5, 1)] as Block[],
  });

  return (
    <div
      class={css.field}
      style={{
        "--field-width": 10,
        "--field-height": 10,
        "--cell-size": "min(5vw, 32px)",
      }}
    >
      <For each={state.blocks}>
        {(block) => (
          <Block
            row={block.row}
            col={block.col}
            height={block.height}
            width={block.width}
          />
        )}
      </For>
    </div>
  );
}
