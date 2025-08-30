import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import type { Item } from "../../lib/types";
import { ColoredText } from "../ColoredText";

type TooltipProps = {
  item: Item | null;
  show: boolean;
};

export const ItemTooltip = ({ item, show }: TooltipProps) => {
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const handleMouseMove = (e: MouseEvent) => {
      const offsetX = 30;
      const offsetY = -30;
      setPos({
        top: e.clientY + window.scrollY + offsetY,
        left: e.clientX + window.scrollX + offsetX,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [show]);

  if (!show || !item || (pos.left == 0 && pos.top == 0)) return null;

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className="absolute pointer-events-none p-1 rounded border-2 bg-[#1b0c1b]/95 border-[#2c0863] shadow-lg z-[100] whitespace-nowrap"
      style={{ top: pos.top, left: pos.left, position: "absolute" }}
    >
      <ColoredText>{item.name}</ColoredText>
      {item.lore?.map((line, idx) => (
        <ColoredText key={idx} defaultColor={"9"}>
          {line}
        </ColoredText>
      ))}
    </div>
  );

  return ReactDOM.createPortal(tooltipContent, document.body);
};
