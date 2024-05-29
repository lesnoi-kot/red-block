import { createSignal } from "solid-js";
import { Grid } from "./components/grid/Grid";

export function Game() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h1>Puzzle</h1>

      <Grid />
    </div>
  );
}
