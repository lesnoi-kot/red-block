import { splitProps, type ComponentProps } from "solid-js";

import * as models from "../../models";
import { useGameContext } from "../game/context";

import css from "./block.module.css";

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
  const context = useGameContext();
  const pos = () => ({
    row: (props.block.row - 1) * context.level.cellSize,
    col: (props.block.col - 1) * context.level.cellSize,
  });

  return (
    <div
      id={props.block.player ? "player" : undefined}
      class={css["nice-block"]}
      classList={{
        [css["player-block"]]: Boolean(props.block.player),
      }}
      style={{
        translate: formatTranslate(pos().col, pos().row),
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

function formatTranslate(x: number, y: number) {
  return `${x}px ${y}px`;
}
