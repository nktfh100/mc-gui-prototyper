import type { Item } from '../lib/types';
import useAppStore from '../stores/appStore';
import DroppableSlot from './DroppableSlot';
import DraggableItem from './item/DraggableItem';
import { ItemContextMenu } from './item/ItemContextMenu';
import ItemDisplay from './item/ItemDisplay';

type GUISlotProps = {
	item: Item | null;
	slotIndex: number;
	presentationMode: boolean;
	handleOpenItemSelector: (index: number) => void;
};

export const GUISlot = ({
	item,
	slotIndex,
	presentationMode,
	handleOpenItemSelector,
}: GUISlotProps) => {
	const setSlot = useAppStore((state) => state.setSlot);

	const handleClick = () => {
		if (!item && !presentationMode) {
			handleOpenItemSelector(slotIndex);
			return;
		}

		if (item && presentationMode) {
			// In presentation mode, clicking an item with a click action set opens the linked GUI
			if (item.actionGUI) {
				useAppStore.setState((state) => {
					const guis = state.projects[state.activeProjectIndex].guis;
					const targetGuiIndex = guis.findIndex(
						(g) => g.uuid === item.actionGUI
					);
					if (targetGuiIndex !== -1) {
						state.activeGUIIndex = targetGuiIndex;
					}
				});
			}
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		// Middle click to clear slot
		if (e.button === 1 && item && !presentationMode) {
			e.preventDefault();
			setSlot(slotIndex, null);
		}
	};

	return (
		<DroppableSlot
			id={slotIndex}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
		>
			{item ? (
				presentationMode ? (
					<ItemDisplay item={item} />
				) : (
					<ItemContextMenu slotIndex={slotIndex} item={item} type="gui">
						<DraggableItem
							item={item}
							id={slotIndex}
							type="gui"
							slotIndex={slotIndex}
						/>
					</ItemContextMenu>
				)
			) : null}
		</DroppableSlot>
	);
};
