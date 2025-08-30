import { EllipsisVertical } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAppStore, { useActiveGUI } from "@/stores/appStore";
import { getNewGUI } from "@/lib/utils/index";
import {
  exportItemToFile,
  importItemFromFile,
  validateImportedGUI,
} from "@/lib/utils/importExport";
import type { GUI } from "@/lib/types";
import { EditGUIModal } from "@/components/modals/EditGUIModal";

export const GUIDropdownMenu = () => {
  const activeGUI = useActiveGUI();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleNewClick = () => {
    useAppStore.setState((state) => {
      state.projects[state.activeProjectIndex].guis.push(
        getNewGUI(
          `New GUI ${state.projects[state.activeProjectIndex].guis.length + 1}`,
        ),
      );
      state.activeGUIIndex =
        state.projects[state.activeProjectIndex].guis.length - 1;
    });
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = (saved: boolean, gui?: GUI) => {
    setEditModalOpen(false);
    if (saved && gui) {
      useAppStore.setState((state) => {
        state.projects[state.activeProjectIndex].guis[state.activeGUIIndex] =
          gui;
      });
    }
  };

  const handleDeleteClick = () => {
    useAppStore.setState((state) => {
      if (state.projects[state.activeProjectIndex].guis.length > 1) {
        state.projects[state.activeProjectIndex].guis.splice(
          state.activeGUIIndex,
          1,
        );
        state.activeGUIIndex = Math.max(0, state.activeGUIIndex - 1);
      }
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (!target.files || target.files.length == 0) {
      return;
    }

    const onImportSuccess = (importedGUI: GUI) => {
      const safeGUI: GUI = {
        ...importedGUI,
        slots: Array.isArray(importedGUI.slots)
          ? importedGUI.slots
          : Array(importedGUI.cols * importedGUI.rows).fill(null),
      };

      useAppStore.setState((state) => {
        state.projects[state.activeProjectIndex].guis.push(safeGUI);
        state.activeGUIIndex =
          state.projects[state.activeProjectIndex].guis.length - 1;
      });
    };

    importItemFromFile<GUI>(
      target.files[0],
      validateImportedGUI,
      onImportSuccess,
    );

    target.value = "";
  };

  const handleExportClick = () => {
    exportItemToFile<GUI>(activeGUI, `gui-${activeGUI.name}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleNewClick}>New</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={handleImportClick}>
            Import
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportClick}>
            Export
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            disabled={
              useAppStore.getState().projects[
                useAppStore.getState().activeProjectIndex
              ].guis.length === 1
            }
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <EditGUIModal
        isOpen={editModalOpen}
        gui={activeGUI}
        onClose={handleEditModalClose}
      />
    </>
  );
};
