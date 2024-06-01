import type { Position } from "../../models";

export function animatePlayerFadeOut(direction: Position) {
  return document.getElementById("player")?.animate(
    [
      { opacity: 1 },
      {
        opacity: 0,
        transform: `translateX(${Math.sign(direction.col) * 100}%)`,
      },
    ],
    {
      easing: "linear",
      duration: 1000,
      iterations: 1,
      fill: "forwards",
    }
  ).finished;
}
