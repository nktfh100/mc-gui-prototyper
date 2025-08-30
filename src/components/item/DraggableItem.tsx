import { useDraggable } from "@dnd-kit/core";
import type { Item } from "../../lib/types";
import ItemDisplay from "./ItemDisplay";

type DroppableItemProps = {
  item: Item;
  id: number;
  type: "gui" | "favorite";
  slotIndex?: number;
};

const DraggableItem = ({ item, id, type, slotIndex }: DroppableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { item, type, slotIndex: slotIndex || 0 },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      {...listeners}
      {...attributes}
      className="cursor-grab"
    >
      <ItemDisplay item={item} />
    </div>
  );
};

export default DraggableItem;
