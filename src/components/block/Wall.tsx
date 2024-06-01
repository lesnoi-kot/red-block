import clsx from "clsx";

import { toGridArea, type Position } from "../../models";
import css from "./block.module.css";

export type WallProps = Position & {
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
};

export function Wall(props: WallProps) {
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
        height: horizontal ? `var(--wall-size)` : "100%",
        width: vertical ? `var(--wall-size)` : "100%",
        translate: `${
          props.left === true
            ? "calc(0px - var(--wall-size))"
            : props.right === true
            ? "var(--cell-size)"
            : "0px"
        } ${
          props.bottom === true
            ? "var(--cell-size)"
            : props.top === true
            ? "calc(0px - var(--wall-size))"
            : "0px"
        }`,
      }}
    />
  );
}
