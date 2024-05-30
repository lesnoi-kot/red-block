import { For, onCleanup, onMount, useContext } from "solid-js";

import { Block, BlockOverlay } from "../block/Block";
import * as models from "../../models";
import { GameContext } from "../game/context";
import css from "./grid.module.css";

export function Grid() {
  let fieldRef: HTMLDivElement;
  let dragCell: DOMPoint = new DOMPoint();
  let draggedBlock: models.Block | null = null;
  const state = useContext(GameContext)!;

  function moveBlock(block: models.Block, row: number, col: number) {
    if (row > 0 && row + block.height <= state.height + 1) {
      const other = state.blocks.find((other) => {
        if (other === block) {
          return false;
        }
        return rectHitTest(
          new DOMRect(other.col, other.row, other.width, other.height),
          new DOMRect(block.col, row, block.width, block.height)
        );
      });

      if (!other) {
        block.row = row;
      }
    }

    if (col > 0 && col + block.width <= state.width + 1) {
      const other = state.blocks.find((other) => {
        if (other === block) {
          return false;
        }
        return rectHitTest(
          new DOMRect(other.col, other.row, other.width, other.height),
          new DOMRect(col, block.row, block.width, block.height)
        );
      });

      if (!other) {
        block.col = col;
      }
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!draggedBlock) {
      return;
    }

    const fieldBox = fieldRef.getBoundingClientRect();
    const currPos = new DOMPoint(
      event.clientX - fieldBox.x,
      event.clientY - fieldBox.y
    );
    const currCell = new DOMPoint(
      Math.floor(currPos.x / 32),
      Math.floor(currPos.y / 32)
    );
    const distCell = new DOMPoint(
      currCell.x - dragCell.x,
      currCell.y - dragCell.y
    );

    if (distCell.x !== 0) {
      distCell.y = 0;
    } else if (distCell.y !== 0) {
      distCell.x = 0;
    }

    if (distCell.x || distCell.y) {
      dragCell = currCell;
      moveBlock(
        draggedBlock,
        draggedBlock.row + distCell.y,
        draggedBlock.col + distCell.x
      );
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (event.button === 0) {
      draggedBlock = null;
      document.body.classList.remove("cursor-grabbing");
    }
  }

  function onPointerDown(block: models.Block, event: PointerEvent) {
    if (event.button === 0) {
      const fieldBox = fieldRef.getBoundingClientRect();
      dragCell = new DOMPoint(
        event.clientX - fieldBox.x,
        event.clientY - fieldBox.y
      );
      draggedBlock = block;
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
      // @ts-expect-error
      ref={fieldRef}
      id="field"
      class={css.field}
      style={{
        "--field-width": state.width,
        "--field-height": state.height,
        // "--cell-size": "min(5vw, 32px)",
        "--cell-size": `${state.cellSize}px`,
      }}
    >
      <For each={state.blocks}>
        {(block) => (
          <Block
            block={block}
            onPointerDown={(event) => onPointerDown(block, event)}
          />
        )}
      </For>

      <For each={state.blocks}>
        {(block) => (
          <BlockOverlay
            row={block.row}
            col={block.col}
            height={block.height}
            width={block.width}
          />
        )}
      </For>
    </div>
  );
}

function rectHitTest(b1: DOMRect, b2: DOMRect): boolean {
  if (b1.right <= b2.left || b2.right <= b1.left) {
    return false;
  }
  if (b1.bottom <= b2.top || b2.bottom <= b1.top) {
    return false;
  }
  return true;
}
