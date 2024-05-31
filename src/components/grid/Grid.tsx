import { For, onCleanup, onMount, useContext } from "solid-js";

import { Block, BlockOverlay } from "../block/Block";
import * as models from "../../models";
import { GameContext } from "../game/context";
import { Walls } from "./Walls";
import { moveBlock, moveState } from "./moveBlock";
import css from "./grid.module.css";

export function Grid() {
  let fieldRef: HTMLDivElement;
  const ctx = useContext(GameContext)!;

  function onPointerMove(event: PointerEvent) {
    if (!moveState.draggedBlock) {
      return;
    }

    const fieldBox = fieldRef.getBoundingClientRect();
    const currCell = new DOMPoint(
      Math.floor((event.clientX - fieldBox.x) / ctx.level.cellSize),
      Math.floor((event.clientY - fieldBox.y) / ctx.level.cellSize)
    );
    console.log(moveState.dragCell);

    let [deltaRow, deltaCol] = [
      currCell.y - moveState.dragCell.y,
      currCell.x - moveState.dragCell.x,
    ];

    if (moveBlock(ctx.level, moveState.draggedBlock, deltaRow, deltaCol)) {
      moveState.draggedBlock = null;

      setTimeout(() => {
        document
          .getElementById("player")
          ?.animate(
            [{ opacity: 1 }, { opacity: 0, transform: "translateX(-100%)" }],
            {
              easing: "linear",
              duration: 1000,
              iterations: 1,
              fill: "forwards",
            }
          )
          .finished.finally(() => {
            ctx.nextLevel();
          });
      }, 0);
    }
    moveState.dragCell = currCell;
  }

  function onPointerUp(event: PointerEvent) {
    if (event.button === 0) {
      moveState.draggedBlock = null;
      document.body.classList.remove("cursor-grabbing");
    }
  }

  function onPointerDown(block: models.Block, event: PointerEvent) {
    if (event.button === 0) {
      const fieldBox = fieldRef.getBoundingClientRect();
      moveState.dragCell = new DOMPoint(
        Math.floor((event.clientX - fieldBox.x) / ctx.level.cellSize),
        Math.floor((event.clientY - fieldBox.y) / ctx.level.cellSize)
      );
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
      class={css.field}
      style={{
        "--field-width": ctx.level.width,
        "--field-height": ctx.level.height,
        // "--cell-size": "min(5vw, 32px)",
        "--cell-size": `${ctx.level.cellSize}px`,
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
