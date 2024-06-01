import clsx from "clsx";
import { splitProps, type ComponentProps } from "solid-js";

export function Button(allProps: ComponentProps<"button">) {
  const [local, props] = splitProps(allProps, ["class"]);

  return (
    <button
      class={clsx(
        "px-3 py-2 border-2 text-base border-blue-700 hover:bg-blue-700 transition-all rounded-xl",
        local.class
      )}
      {...props}
    />
  );
}
