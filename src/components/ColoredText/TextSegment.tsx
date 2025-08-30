import { cn } from "../../lib/utils";
import type { Segment } from "./types";

type TextSegmentProps = {
  segment: Segment;
};

export const TextSegment = ({ segment }: TextSegmentProps) => {
  const { text, style } = segment;

  return (
    <span
      className={cn(style.color, {
        "font-bold": style.bold,
        italic: style.italic,
        underline: style.underline,
        "line-through": style.strikethrough,
        "minecraft-obfuscated": style.obfuscated,
      })}
    >
      {text}
    </span>
  );
};
