import useAppStore from "@/stores/appStore";
import { ProjectDropdownMenu } from "./ProjectDropdownMenu";

export const SelectProject = () => {
  const projects = useAppStore((state) => state.projects);
  const activeProjectIndex = useAppStore((state) => state.activeProjectIndex);
  const setActiveProjectIndex = useAppStore(
    (state) => state.setActiveProjectIndex,
  );

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="project-select" className="text-white font-bold">
        Project
      </label>
      <div className="flex gap-2">
        <select
          id="project-select"
          value={activeProjectIndex}
          onChange={(e) => setActiveProjectIndex(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {projects.map((project, index) => (
            <option key={index} value={index}>
              {project.name}
            </option>
          ))}
        </select>
        <ProjectDropdownMenu />
      </div>
    </div>
  );
};
