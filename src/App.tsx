import { Game } from "./components/game/Game";
import { Grid } from "./components/grid/Grid";

export function App() {
  return (
    <div>
      <h1>Puzzle</h1>
      <Game>
        <Grid />
      </Game>
    </div>
  );
}
