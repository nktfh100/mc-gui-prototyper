import { useEffect, useState } from "react";
import type { Item } from "@/lib/types";
import ItemDisplay from "@/components/item/ItemDisplay";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import useAppStore, { useActiveGUIIndex } from "@/stores/appStore";

type EditItemModalProps = {
  isOpen: boolean;
  item: Item;
  onClose: () => void;
  onSave: (updatedItem: Item) => void;
};

const EditItemModal = ({
  isOpen,
  item,
  onClose,
  onSave,
}: EditItemModalProps) => {
  const [name, setName] = useState(item.name);
  const [lore, setLore] = useState(item.lore?.join("\n") || "");
  const [count, setCount] = useState(item.count);
  const [clickAction, setClickAction] = useState(item.actionGUI);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setLore(item.lore?.join("\n") || "");
      setCount(item.count);
      setClickAction(item.actionGUI);
    }
  }, [item]);

  const projectGUIs = useAppStore(
    (state) => state.projects[state.activeProjectIndex].guis,
  );

  const selectedGUIIndex = useActiveGUIIndex();

  if (!isOpen || !item) return null;

  const handleSave = () => {
    const updatedItem: Item = {
      ...item,
      name,
      lore: lore.split("\n").filter((line) => line.trim() !== ""),
      count,
      actionGUI: clickAction,
    };
    onSave(updatedItem);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="panel">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-4">
            Edit Item
            <ItemDisplay item={item} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full text-white anvil-textbox"
            />
          </div>
          <div>
            <Label>Lore</Label>
            <textarea
              value={lore}
              onChange={(e) => setLore(e.target.value)}
              rows={4}
              className="border p-2 rounded w-full text-white anvil-textbox"
            />
          </div>
          <div>
            <Label>Count</Label>
            <input
              min={1}
              max={64}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="border p-2 rounded w-full text-white anvil-textbox"
            />
          </div>
          <div>
            <Label>Click Action GUI</Label>
            <select
              value={clickAction || ""}
              onChange={(e) => setClickAction(e.target.value)}
              className="border p-2 rounded w-full text-white anvil-textbox"
            >
              <option value="">None</option>
              {projectGUIs
                .filter((_, index) => index !== selectedGUIIndex)
                .map((gui) => (
                  <option key={gui.uuid} value={gui.uuid}>
                    {gui.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <DialogFooter>
          <button onClick={handleSave} className="py-2 w-20 button">
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemModal;
