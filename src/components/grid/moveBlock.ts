import {
  blockToRect,
  type Block,
  type Level,
  type Position,
} from "../../models";

export const moveState = {
  dragCell: { row: 0, col: 0 } as Position,
  draggedBlock: null as Block | null,
};

export function moveBlock(
  level: Level,
  block: Block,
  deltaRow: number,
  deltaCol: number
): { moved: Position; won: boolean } {
  const moved = { row: 0, col: 0 };

  if (deltaRow === 0 && deltaCol === 0) {
    return { moved, won: false };
  }

  // Disallow "jumps"
  deltaRow = Math.sign(deltaRow);
  deltaCol = Math.sign(deltaCol);

  const otherRects = level.blocks
    .filter((that) => that !== block)
    .map(blockToRect);

  if (
    deltaRow !== 0 &&
    block.row + deltaRow > 0 &&
    block.row + deltaRow + block.height <= level.height + 1 &&
    !blocksHitTest({ ...block, row: block.row + deltaRow }, otherRects)
  ) {
    block.row += deltaRow;
    moved.row = deltaRow;
  } else if (
    deltaCol !== 0 &&
    block.col + deltaCol > 0 &&
    block.col + deltaCol + block.width <= level.width + 1 &&
    !blocksHitTest({ ...block, col: block.col + deltaCol }, otherRects)
  ) {
    block.col += deltaCol;
    moved.col = deltaCol;
  }

  if (
    block.player &&
    block.col === level.finishPosition.col &&
    block.row === level.finishPosition.row
  ) {
    return { moved, won: true };
  }

  return { moved, won: false };
}

function blocksHitTest(block: Block, other: DOMRectReadOnly[]): boolean {
  const theRect = blockToRect(block);
  return other.some((that) => rectHitTest(that, theRect));
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
