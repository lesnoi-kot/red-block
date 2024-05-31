import { createContext } from "solid-js";

import type { Level } from "../../models";

interface GameContextValue {
  level: Level;
  nextLevel(): void;
}

export const GameContext = createContext<GameContextValue>();
