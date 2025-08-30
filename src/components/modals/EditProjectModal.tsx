import type { Project } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";

type EditProjectModalProps = {
  isOpen: boolean;
  project: Project;
  onClose: (saved: boolean, project?: Project) => void;
};

export const EditProjectModal = ({
  isOpen,
  onClose,
  project,
}: EditProjectModalProps) => {
  const [projectName, setProjectName] = useState(project.name);

  useEffect(() => {
    if (isOpen) {
      setProjectName(project.name);
    }
  }, [project.name, isOpen]);

  const handleSave = () => {
    const updatedProject = { ...project, name: projectName };
    onClose(true, updatedProject);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose(false);
        }
      }}
    >
      <DialogContent className="panel">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <Label className="mb-2">Name</Label>
          <input
            type="text"
            className="border p-2 rounded w-full mb-4 text-white anvil-textbox"
            value={projectName}
            maxLength={15}
            onChange={(e) => setProjectName(e.target.value)}
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
