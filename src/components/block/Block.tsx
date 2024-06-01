import { splitProps, type ComponentProps } from "solid-js";

import * as models from "../../models";
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
  return (
    <div
      id={props.block.player ? "player" : undefined}
      class={css["nice-block"]}
      classList={{
        [css["player-block"]]: Boolean(props.block.player),
      }}
      style={{
        "--row": props.block.row - 1,
        "--col": props.block.col - 1,
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
