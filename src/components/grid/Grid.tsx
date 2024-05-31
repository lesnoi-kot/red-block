import { For, onCleanup, onMount, useContext } from "solid-js";

import { Block, BlockOverlay } from "../block/Block";
import * as models from "../../models";
import { GameContext } from "../game/context";
import { Walls } from "./Walls";
import { moveBlock, moveState } from "./moveBlock";
import css from "./grid.module.css";

export function Grid() {
  let fieldRef: HTMLDivElement;
  const level = useContext(GameContext)!;

  function onPointerMove(event: PointerEvent) {
    if (!moveState.draggedBlock) {
      return;
    }

    const fieldBox = fieldRef.getBoundingClientRect();
    const currCell = new DOMPoint(
      Math.floor((event.clientX - fieldBox.x) / level.cellSize),
      Math.floor((event.clientY - fieldBox.y) / level.cellSize)
    );
    let [deltaRow, deltaCol] = [
      currCell.y - moveState.dragCell.y,
      currCell.x - moveState.dragCell.x,
    ];

    moveBlock(level, moveState.draggedBlock, deltaRow, deltaCol);
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
        event.clientX - fieldBox.x,
        event.clientY - fieldBox.y
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
        "--field-width": level.width,
        "--field-height": level.height,
        // "--cell-size": "min(5vw, 32px)",
        "--cell-size": `${level.cellSize}px`,
      }}
    >
      <Walls level={level} />
      <For each={level.blocks}>
        {(block) => (
          <Block
            block={block}
            onPointerDown={(event) => onPointerDown(block, event)}
          />
        )}
      </For>
      <For each={level.blocks}>{(block) => <BlockOverlay block={block} />}</For>
    </div>
  );
}
