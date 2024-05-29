import css from "./block.module.css";

type BlockProps = {
  row: number;
  col: number;
  height: number;
  width: number;
};

export function Block(props: BlockProps) {
  return (
    <div
      class={css.block}
      style={{
        "grid-area": `${props.row} / ${props.col} / ${
          props.row + props.height
        } / ${props.col + props.width}`,
      }}
    ></div>
  );
}
