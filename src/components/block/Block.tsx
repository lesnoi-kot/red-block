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

export function BlockOverlay(props: models.Position & models.Size) {
  return (
    <div
      class={css["nice-block"]}
      style={{
        translate: `${(props.col - 1) * 32}px ${(props.row - 1) * 32}px`,
        "grid-area": models.toGridArea({
          row: 1,
          col: 1,
          width: props.width,
          height: props.height,
        }),
      }}
    />
  );
}
