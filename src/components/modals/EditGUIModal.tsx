import type { GUI } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";

type EditGUIModalProps = {
  isOpen: boolean;
  gui: GUI;
  onClose: (saved: boolean, gui?: GUI) => void;
};

export const EditGUIModal = ({ isOpen, onClose, gui }: EditGUIModalProps) => {
  const [guiName, setGUIName] = useState(gui.name);
  const [guiRows, setGUIRows] = useState(gui.rows);

  useEffect(() => {
    if (isOpen) {
      setGUIName(gui.name);
      setGUIRows(gui.rows);
    }
  }, [gui.name, gui.rows, isOpen]);

  const handleSave = () => {
    if (guiRows < 1 || guiRows > 9) {
      alert("Rows must be between 1 and 9"); //TODO: toast
      return;
    }

    const updatedGUI = structuredClone({
      ...gui,
      name: guiName,
      rows: guiRows,
    });

    const newSlots = updatedGUI.slots;
    const newSlotsCount = guiRows * 9;
    if (guiRows < gui.rows) {
      newSlots.length = newSlotsCount;
    } else if (guiRows > gui.rows) {
      for (let i = newSlots.length; i < newSlotsCount; i++) {
        newSlots.push(null);
      }
    }

    onClose(true, updatedGUI);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(false);
      }}
    >
      <DialogContent className="panel">
        <DialogHeader>
          <DialogTitle>Edit GUI</DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <Label className="mb-2">Name</Label>
          <input
            type="text"
            maxLength={25}
            className="border p-2 rounded w-full text-white mb-4 anvil-textbox"
            value={guiName}
            onChange={(e) => setGUIName(e.target.value)}
          />
          <Label className="mb-2">Rows</Label>
          <input
            type="number"
            min={1}
            max={9}
            className="border p-2 rounded text-white w-full mb-4 anvil-textbox"
            value={guiRows}
            onChange={(e) => setGUIRows(Number(e.target.value))}
          />
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
