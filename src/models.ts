export type Position = {
  row: number;
  col: number;
};

export type Size = {
  height: number;
  width: number;
};

export type Block = Position &
  Size & {
    player?: boolean;
  };

export type Level = {
  readonly width: number;
  readonly height: number;
  readonly cellSize: number;
  readonly finishPosition: Position;

  blocks: Block[];
};

export function newBlock(
  row: number,
  col: number,
  height: number,
  width: number,
  player?: boolean
) {
  return { row, col, height, width, player };
}

export function toGridArea(obj: Position & Size): string {
  return `${obj.row} / ${obj.col} / ${obj.row + obj.height} / ${
    obj.col + obj.width
  }`;
}

export function blockToRect(block: Block): DOMRectReadOnly {
  return new DOMRect(block.col, block.row, block.width, block.height);
}
