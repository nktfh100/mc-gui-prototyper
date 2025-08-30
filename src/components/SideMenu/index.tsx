import { ColorsGuideModalButton } from "./ColorGuideModalButton";
import { SelectActiveGUI } from "./SelectActiveGUI";
import { SelectProject } from "./SelectProject";

type SideMenuProps = {
  presentationMode: boolean;
  setPresentationMode: (mode: boolean) => void;
};

export const SideMenu = ({
  presentationMode,
  setPresentationMode,
}: SideMenuProps) => {
  return (
    <div className="space-y-4 -ml-[17rem] w-[13rem]">
      <SelectProject />
      <SelectActiveGUI />

      <button
        className="py-2 w-[13rem] button"
        onClick={() => setPresentationMode(!presentationMode)}
      >
        Presentation Mode: {presentationMode ? "On" : "Off"}
      </button>

      <ColorsGuideModalButton />
    </div>
  );
};
