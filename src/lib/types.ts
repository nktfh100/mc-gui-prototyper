export type Item = {
	rawType: string;
	image: string;
	name: string;
	lore?: string[];
	count: number;
	actionGUI?: string; // UUID of the GUI to open when this item is clicked
};

export type Slot = Item | null;

export type Grid = Slot[];

export type GUI = {
	uuid: string;
	name: string;
	slots: Grid;
	cols: number;
	rows: number;
};

export type Project = {
	name: string;
	guis: GUI[];
};
