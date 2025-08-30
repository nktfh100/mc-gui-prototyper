import useAppStore, { useActiveGUI } from '@/stores/appStore';
import { SelectGUI } from './SelectGUI';
import type { GUI } from '@/lib/types';

export const SelectActiveGUI = () => {
	const gui = useActiveGUI();

	const handleSelect = (gui: GUI) => {
		useAppStore.setState((state) => {
			const index = state.projects[state.activeProjectIndex].guis.findIndex(
				(g) => g.uuid === gui.uuid
			);
			if (index !== -1) {
				state.activeGUIIndex = index;
			}
		});
	};

	return <SelectGUI selectedGUI={gui} onSelect={handleSelect} />;
};
