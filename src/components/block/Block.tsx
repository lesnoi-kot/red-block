import { splitProps, useContext, type ComponentProps } from "solid-js";

import * as models from "../../models";

import css from "./block.module.css";
import { GameContext } from "../game/context";
import clsx from "clsx";

type BlockProps = ComponentProps<"div"> & { block: models.Block };

export function Block(props: BlockProps) {
  const [ownProps, divProps] = splitProps(props, ["block"]);

  return (
    <div
      class={css.block}
      style={{
        "grid-area": models.toGridArea(ownProps.block),
      }}
      draggable="false"
      {...divProps}
    />
  );
}

export function BlockOverlay(props: BlockProps) {
  const { cellSize } = useContext(GameContext)!;

  return (
    <div
      class={css["nice-block"]}
      classList={{
        [css["player-block"]]: Boolean(props.block.player),
      }}
      style={{
        "z-index": props.block.row,
        translate: `${(props.block.col - 1) * cellSize}px ${
          (props.block.row - 1) * cellSize
        }px`,
        "grid-area": models.toGridArea({
          row: 1,
          col: 1,
          width: props.block.width,
          height: props.block.height,
        }),
      }}
    />
  );
}

export function Wall(
  props: models.Position &
    models.Size & {
      top?: boolean;
      left?: boolean;
      bottom?: boolean;
      right?: boolean;
    }
) {
  const ctx = useContext(GameContext)!;
  const thickness = ctx.cellSize / 2;
  const vertical = Boolean(props.top || props.bottom);

  return (
    <div
      class={clsx(css["nice-block"], css["grey-block"])}
      style={{
        "grid-area": models.toGridArea({
          row: props.row,
          col: props.col,
          width: props.width,
          height: props.height,
        }),
        height: vertical ? `${thickness}px` : "100%",
        width: !vertical ? `${thickness}px` : "100%",
        translate: `${
          props.left === true
            ? -thickness
            : props.right === true
            ? ctx.cellSize
            : 0
        }px ${
          props.bottom === true
            ? ctx.cellSize
            : props.top === true
            ? -thickness
            : 0
        }px`,
      }}
    />
  );
}
