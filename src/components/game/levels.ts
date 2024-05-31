import { newBlock, type Block, type Level } from "../../models";

export const levels: Array<() => Level> = [
  // Level 1
  () => ({
    width: 3,
    height: 3,
    cellSize: 64,
    finishPosition: {
      row: 3,
      col: 1,
    },
    noWalls: [{ row: 3, col: 1, left: true }],
    blocks: [
      newBlock(1, 1, 1, 1),
      newBlock(1, 2, 1, 2, true),
      newBlock(2, 2, 1, 1),
      newBlock(2, 3, 1, 1),
      newBlock(3, 2, 1, 1),
      newBlock(3, 3, 1, 1),
    ] as Block[],
  }),

  // Level 2
  () => ({
    width: 4,
    height: 3,
    cellSize: 64,
    finishPosition: { row: 3, col: 1 },
    noWalls: [{ row: 3, col: 1, left: true }],
    blocks: [
      newBlock(1, 3, 1, 2, true),
      newBlock(2, 3, 1, 1),
      newBlock(2, 4, 1, 1),
      newBlock(3, 3, 1, 1),
      newBlock(3, 4, 1, 1),

      newBlock(1, 2, 2, 1),
      newBlock(3, 1, 1, 2),
    ] as Block[],
  }),

  // Level 3
  () => ({
    width: 4,
    height: 4,
    cellSize: 64,
    finishPosition: { row: 3, col: 1 },
    noWalls: [
      { row: 3, col: 1, left: true },
      { row: 4, col: 1, left: true },
    ],
    blocks: [
      newBlock(1, 1, 1, 1),
      newBlock(2, 1, 1, 1),
      newBlock(4, 1, 1, 1),

      newBlock(1, 2, 2, 1),
      newBlock(3, 2, 1, 1),

      newBlock(1, 3, 2, 2, true),
      newBlock(3, 3, 1, 2),
      newBlock(4, 3, 1, 1),
      newBlock(4, 4, 1, 1),
    ] as Block[],
  }),

  // The end
  () => ({
    width: 3,
    height: 3,
    cellSize: 64,
    finishPosition: { row: 1, col: 1 },
    noWalls: [],
    blocks: [newBlock(2, 2, 1, 1)] as Block[],
  }),
];
