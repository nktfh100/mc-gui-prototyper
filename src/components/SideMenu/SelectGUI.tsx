import type { GUI } from "@/lib/types";
import useAppStore, { useActiveProject } from "@/stores/appStore";
import { GUIDropdownMenu } from "./GUIDropdownMenu";

type SelectGUIProps = {
  selectedGUI: GUI | null;
  onSelect: (gui: GUI) => void;
};

export const SelectGUI = ({ selectedGUI, onSelect }: SelectGUIProps) => {
  const project = useActiveProject();
  const guis = useAppStore(
    (state) => state.projects[state.activeProjectIndex].guis,
  );

  const activeGUIIndex = guis.findIndex((g) => g.uuid === selectedGUI?.uuid);

  const handleSelect = (index: number) => {
    if (index >= 0 && index < guis.length) {
      onSelect(guis[index]);
    }
  };

  if (!project) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor="gui-select" className="text-white font-bold">
        GUI
      </label>
      <div className="flex gap-2">
        <select
          id="gui-select"
          value={activeGUIIndex}
          onChange={(e) => handleSelect(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {project.guis.map((gui, index) => (
            <option key={index} value={index}>
              {gui.name.length > 15 ? gui.name.slice(0, 15) + "..." : gui.name}
            </option>
          ))}
        </select>
        <GUIDropdownMenu />
      </div>
    </div>
  );
};
