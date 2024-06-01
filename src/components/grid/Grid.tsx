import { For, onCleanup, onMount } from "solid-js";
import { clamp } from "lodash";
import clsx from "clsx";

import { Block, BlockOverlay } from "../block/Block";
import * as models from "../../models";
import { useGameContext } from "../game/context";
import { Walls } from "./Walls";
import { moveBlock, moveState } from "./moveBlock";
import { animatePlayerFadeOut } from "./animations";
import css from "./grid.module.css";

export function Grid() {
  let fieldRef: HTMLDivElement;
  const ctx = useGameContext();

  function onWin() {
    ctx.onWin();
    moveState.draggedBlock = null;
    animatePlayerFadeOut({
      row: 0,
      col: ctx.level.finishPosition.col === 1 ? -1 : 1,
    })?.finally(() => {
      ctx.nextLevel();
    });
  }

  function onPointerMove(event: PointerEvent) {
    if (!moveState.draggedBlock) {
      return;
    }

    const { width, height } = ctx.level;
    const fieldBox = fieldRef.getBoundingClientRect();
    const padding = parseInt(
      getComputedStyle(fieldRef).getPropertyValue("padding"),
      10
    );
    const cellSize = padding * 2;

    const currCell = {
      row: clamp(
        Math.floor((event.clientY - (fieldBox.y + padding)) / cellSize),
        0,
        height - 1
      ),
      col: clamp(
        Math.floor((event.clientX - (fieldBox.x + padding)) / cellSize),
        0,
        width - 1
      ),
    };
    const [deltaRow, deltaCol] = [
      currCell.row - moveState.draggedBlock.row + 1,
      currCell.col - moveState.draggedBlock.col + 1,
    ];

    const { won, moved } = moveBlock(
      ctx.level,
      moveState.draggedBlock,
      deltaRow,
      deltaCol
    );

    console.assert(!(moved.col && moved.row), "Only 1 cell move allowed");

    if (won) {
      onWin();
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (event.button === 0) {
      moveState.draggedBlock = null;
      document.body.classList.remove("cursor-grabbing");
    }
  }

  function onPointerDown(block: models.Block, event: PointerEvent) {
    if (event.button === 0) {
      moveState.draggedBlock = block;
      document.body.classList.add("cursor-grabbing");
    }
  }

  onMount(() => {
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointermove", onPointerMove);

    onCleanup(() => {
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onPointerMove);
    });
  });

  return (
    <div
      ref={fieldRef!}
      id="field"
      class={clsx(css.field, "crisp")}
      style={{
        "--field-width": ctx.level.width,
        "--field-height": ctx.level.height,
      }}
    >
      <Walls level={ctx.level} />
      <For each={ctx.level.blocks}>
        {(block) => (
          <Block
            block={block}
            onPointerDown={(event) => onPointerDown(block, event)}
          />
        )}
      </For>
      <For each={ctx.level.blocks}>
        {(block) => <BlockOverlay block={block} />}
      </For>
    </div>
  );
}
