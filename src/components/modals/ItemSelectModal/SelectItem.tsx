import type { Item } from '@/lib/types';
import ItemDisplay from '@/components/item/ItemDisplay';

type SelectItemProps = {
	item: Item;
	onClick: (item: Item) => void;
};

export const SelectItem = ({ item, onClick }: SelectItemProps) => {
	return (
		<div
			key={item.name}
			className="flex flex-col justify-center items-center cursor-pointer text-center p-2 hover:bg-gray-300 rounded-md"
			onClick={() => onClick(item)}
		>
			<ItemDisplay item={item} disableTooltip imgClassName="w-16 h-16" />
			<p className="text-xs mt-1 text-gray-700">{item.name}</p>
		</div>
	);
};
