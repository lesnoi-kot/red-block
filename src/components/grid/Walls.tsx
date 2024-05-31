import { For } from "solid-js";
import { range } from "lodash";

import { Wall } from "../block/Block";
import type { Level } from "../../models";

export function Walls(props: { level: Level }) {
  return (
    <>
      <For each={range(1, props.level.width + 1)}>
        {(col) => (
          <>
            <Wall row={1} col={col} width={1} height={1} top />
            <Wall
              row={props.level.height}
              col={col}
              width={1}
              height={1}
              bottom
            />
          </>
        )}
      </For>
      <For each={range(1, props.level.height + 1)}>
        {(row) => (
          <>
            <Wall row={row} col={1} width={1} height={1} left />
            <Wall
              row={row}
              col={props.level.width}
              width={1}
              height={1}
              right
            />
          </>
        )}
      </For>

      <Wall row={1} col={1} width={1} height={1} top left />
    </>
  );
}
