import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  type DragMoveEvent,
} from "@dnd-kit/core";

import type { Item } from "./lib/types";

import useAppStore, { isSlotEmpty, useActiveGUI } from "./stores/appStore";
import { Header } from "./components/Header";
import { ItemSelectModal } from "./components/modals/ItemSelectModal";
import ItemDisplay from "./components/item/ItemDisplay";
import { GUITitle } from "./components/GUITitle";
import { FavoriteItems } from "./components/FavoriteItems";
import { GUISlot } from "./components/GUISlot";
import { SideMenu } from "./components/SideMenu";

const App = () => {
  const activeGui = useActiveGUI();
  const setSlot = useAppStore((state) => state.setSlot);

  const [isSelectItemModalOpen, setIsSelectItemModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [draggedItem, setDraggedItem] = useState<Item | null>(null);

  const [isPainting, setIsPainting] = useState(false);

  const [presentationMode, setPresentationMode] = useState(false);

  // Refs to get the latest state inside global event listeners
  const activeItemRef = useRef<Item | null>(null);
  activeItemRef.current = draggedItem;
  const hoveredSlotIdRef = useRef<number | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (presentationMode) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      // Check if right mouse is clicked DURING a drag
      if (event.button === 2 && activeItemRef.current) {
        event.preventDefault();

        const targetIndex = hoveredSlotIdRef.current;
        // This handles the single-click case instantly.
        if (targetIndex !== null && isSlotEmpty(targetIndex)) {
          setSlot(targetIndex, structuredClone(activeItemRef.current));
        }

        // Then, set isPainting to true to enable continuous painting on drag move.
        setIsPainting(true);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      // Deactivate painting mode when the right mouse button is released
      if (event.button === 2) {
        setIsPainting(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [setSlot, presentationMode]);

  const handleOpenItemSelector = (index: number) => {
    setSelectedSlot(index);
    setIsSelectItemModalOpen(true);
  };

  const handleItemSelect = (item: Item) => {
    if (selectedSlot !== null) {
      setSlot(selectedSlot, structuredClone(item));
    }
    setIsSelectItemModalOpen(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (presentationMode) {
      return;
    }

    // Set the dragged item for the DragOverlay
    const item = event.active.data.current?.item as Item;
    if (item) {
      setDraggedItem(item);
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    if (presentationMode) {
      return;
    }

    const hoveredIndex = event.over ? (event.over.id as number) : null;
    hoveredSlotIdRef.current = hoveredIndex; // Keep ref updated

    if (
      isPainting &&
      hoveredIndex !== null &&
      activeItemRef.current &&
      isSlotEmpty(hoveredIndex)
    ) {
      const itemToClone = activeItemRef.current;
      setSlot(hoveredIndex, structuredClone(itemToClone));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (presentationMode) {
      setDraggedItem(null);
      return;
    }

    const { active, over } = event;
    if (over && active.id !== over.id && !isPainting) {
      const activeIndex = active.data.current?.slotIndex as number;
      const overIndex = over.data.current?.slotIndex as number;
      const item = active.data.current?.item as Item;

      const isFavoriteDrag = active.data.current?.type === "favorite";
      if (isFavoriteDrag) {
        setSlot(overIndex, structuredClone(item));
        return;
      }

      const activeItem = activeGui.slots[activeIndex];
      const overItem = activeGui.slots[overIndex];

      setSlot(activeIndex, overItem ? structuredClone(overItem) : null);
      setSlot(overIndex, activeItem ? structuredClone(activeItem) : null);
    }
    setDraggedItem(null);
    setIsPainting(false);
    hoveredSlotIdRef.current = null;
  };

  // TODO: extract gui to a separate component

  return (
    <>
      <Header />
      <main className="flex-1 bg-block-stone">
        <div className="flex flex-col items-center h-full bg-dark-75 pt-4">
          <h2 className="text-xl text-white">
            Everything is saved locally in your browser.
          </h2>
          <div className="space-x-2 mt-4">
            <a
              href="https://www.spigotmc.org/resources/gui-prototyping-tool.128481/"
              target="_blank"
              className="button p-2"
            >
              Spigot
            </a>
            <a
              href="https://github.com/nktfh100/mc-gui-prototyper"
              target="_blank"
              className="button p-2"
            >
              GitHub
            </a>
          </div>

          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-row justify-center items-start gap-4 pb-4 pt-[3rem]">
              <SideMenu
                presentationMode={presentationMode}
                setPresentationMode={setPresentationMode}
              />

              <div
                className="flex flex-col p-2 rounded panel"
                onContextMenu={(e) => e.preventDefault()}
              >
                <GUITitle />
                <div
                  className="grid grid-rows-6 gap-[2px]"
                  style={{
                    gridTemplateColumns: `repeat(${activeGui.cols}, minmax(0, 3.5rem))`,
                    gridTemplateRows: `repeat(${activeGui.rows}, minmax(0, 3.5rem))`,
                  }}
                >
                  {activeGui.slots.map((item, index) => (
                    <GUISlot
                      key={index}
                      item={item}
                      slotIndex={index}
                      presentationMode={presentationMode}
                      handleOpenItemSelector={handleOpenItemSelector}
                    />
                  ))}
                </div>

                <DragOverlay>
                  {draggedItem && (
                    <ItemDisplay
                      item={draggedItem}
                      disableTooltip
                      forceTooltip
                    />
                  )}
                </DragOverlay>
              </div>

              {!presentationMode && <FavoriteItems />}
            </div>
          </DndContext>

          <ItemSelectModal
            isOpen={isSelectItemModalOpen}
            onClose={() => setIsSelectItemModalOpen(false)}
            onItemSelect={handleItemSelect}
          />
        </div>
      </main>
    </>
  );
};

export default App;
