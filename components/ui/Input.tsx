import {
  InputHTMLAttributes,
} from "react";

type Props =
  InputHTMLAttributes<HTMLInputElement>;

export default function Input(
  props: Props
) {
  return (
    <input
      {...props}
      className="
        w-full
        rounded-xl
        border
        border-border
        bg-card
        px-3
        py-3
        outline-none
      "
    />
  );
}