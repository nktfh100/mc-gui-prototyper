import React from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableSlotProps = {
  id: number;
  children: React.ReactNode;
  onClick: () => void;
  onMouseDown?: (event: React.MouseEvent) => void;
};

const DroppableSlot: React.FC<DroppableSlotProps> = ({
  id,
  children,
  onClick,
  onMouseDown,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id, data: { slotIndex: id } });
  const highlightClass = isOver ? "raised-slot" : "";
  return (
    <div
      ref={setNodeRef}
      className={`w-14 h-14 flex justify-center items-center cursor-pointer slot ${highlightClass}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default DroppableSlot;
