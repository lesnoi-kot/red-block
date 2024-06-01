import { createContext, useContext } from "solid-js";

import type { Level } from "../../models";

interface GameContextValue {
  levelIndex: number;
  level: Level;
  nextLevel(): void;
  isGameOver(): boolean;
  resetLevel(): void;
  resetBlocks(): void;
  onWin(): void;
}

export const GameContext = createContext<GameContextValue>();

export function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("GameContext is null");
  }

  return context;
}
