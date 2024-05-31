import { For } from "solid-js";
import { matches, range } from "lodash";

import { type Level } from "../../models";
import { Wall, type WallProps } from "../block/Wall";

export function Walls(props: { level: Level }) {
  function walls(): WallProps[] {
    const { width, height, noWalls } = props.level;

    return [
      // Top
      ...range(1, width + 1).map((col) => ({ row: 1, col, top: true })),
      // Bottom
      ...range(1, width + 1).map((col) => ({ row: height, col, bottom: true })),
      // Left
      ...range(1, height + 1).map((row) => ({ row, col: 1, left: true })),
      // Right
      ...range(1, height + 1).map((row) => ({ row, col: width, right: true })),
    ]
      .filter((wall: WallProps) => noWalls.findIndex(matches(wall)) === -1)
      .concat([
        // Corners
        { row: 1, col: 1, top: true, left: true },
        { row: 1, col: width, top: true, right: true },
        { row: height, col: 1, bottom: true, left: true },
        { row: height, col: width, bottom: true, right: true },
      ]);
  }

  return <For each={walls()}>{(wallProps) => <Wall {...wallProps} />}</For>;
}
