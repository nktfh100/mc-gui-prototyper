import { useState } from "react";
import { ItemTooltip } from "./ItemTooltip";
import { cn } from "../../lib/utils";
import type { Item } from "../../lib/types";

type ItemDisplayProps = {
  item: Item;
  imgClassName?: string;
  forceTooltip?: boolean;
  disableTooltip?: boolean;
};

const ItemDisplay = ({
  item,
  imgClassName,
  forceTooltip = false,
  disableTooltip = false,
}: ItemDisplayProps) => {
  const [showTooltip, setShowTooltip] = useState(forceTooltip);

  return (
    <div className="relative">
      <img
        src={item.image}
        alt={item.name}
        className={cn("w-12 h-12", imgClassName)}
        onMouseEnter={() => setShowTooltip(!disableTooltip || forceTooltip)}
        onMouseLeave={() => setShowTooltip(forceTooltip)}
      />
      {item.count > 1 && (
        <span
          className="absolute -bottom-[30%] -right-[10%] text-white text-[1.9rem] pointer-events-none user-select-none"
          style={{ textShadow: "1px 1px 2px #000" }}
        >
          {item.count}
        </span>
      )}
      <ItemTooltip item={item} show={showTooltip} />
    </div>
  );
};

export default ItemDisplay;
