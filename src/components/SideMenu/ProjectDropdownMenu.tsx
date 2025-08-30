import { EllipsisVertical } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAppStore, { useActiveProject } from "@/stores/appStore";
import {
  exportItemToFile,
  importItemFromFile,
  validateImportedProject,
} from "@/lib/utils/importExport";
import { getNewGUI, getNewProject } from "@/lib/utils";
import type { Project } from "@/lib/types";
import { EditProjectModal } from "@/components/modals/EditProjectModal";

export const ProjectDropdownMenu = () => {
  const activeProject = useActiveProject();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewClick = () => {
    useAppStore.setState((state) => {
      state.projects.push(
        getNewProject(`New Project ${state.projects.length + 1}`),
      );
      state.activeProjectIndex = state.projects.length - 1;
      state.activeGUIIndex = 0;
    });
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = (saved: boolean, project?: Project) => {
    setEditModalOpen(false);
    if (saved && project) {
      useAppStore.setState((state) => {
        state.projects[state.activeProjectIndex] = project;
      });
    }
  };

  const handleDeleteClick = () => {
    useAppStore.setState((state) => {
      if (state.projects.length > 1) {
        state.projects.splice(state.activeProjectIndex, 1);
        state.activeProjectIndex = Math.max(0, state.activeProjectIndex - 1);
        state.activeGUIIndex = 0;
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

    const onImportSuccess = (importedProject: Project) => {
      const safeProject: Project = {
        ...importedProject,
        guis: Array.isArray(importedProject.guis)
          ? importedProject.guis
          : [getNewGUI()],
      };

      useAppStore.setState((state) => {
        state.projects.push(safeProject);
        state.activeProjectIndex = state.projects.length - 1;
        state.activeGUIIndex = 0;
      });
    };

    importItemFromFile<Project>(
      target.files[0],
      validateImportedProject,
      onImportSuccess,
    );

    target.value = "";
  };

  const handleExportClick = () => {
    exportItemToFile<Project>(activeProject, `project-${activeProject.name}`);
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
            disabled={useAppStore.getState().projects.length === 1}
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

      <EditProjectModal
        isOpen={editModalOpen}
        onClose={handleEditModalClose}
        project={activeProject}
      />
    </>
  );
};
