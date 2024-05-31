import { useContext } from "solid-js";
import clsx from "clsx";

import { toGridArea, type Position } from "../../models";
import { GameContext } from "../game/context";

import css from "./block.module.css";

export type WallProps = Position & {
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
};

export function Wall(props: WallProps) {
  const ctx = useContext(GameContext)!;
  const thickness = ctx.level.cellSize / 2;
  const vertical = Boolean(props.left || props.right);
  const horizontal = Boolean(props.top || props.bottom);

  return (
    <div
      class={clsx(css["nice-block"], css["grey-block"])}
      style={{
        "grid-area": toGridArea({
          row: props.row,
          col: props.col,
          width: 1,
          height: 1,
        }),
        height: horizontal ? `${thickness}px` : "100%",
        width: vertical ? `${thickness}px` : "100%",
        translate: `${
          props.left === true
            ? -thickness
            : props.right === true
            ? ctx.level.cellSize
            : 0
        }px ${
          props.bottom === true
            ? ctx.level.cellSize
            : props.top === true
            ? -thickness
            : 0
        }px`,
      }}
    />
  );
}
