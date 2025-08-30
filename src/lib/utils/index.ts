import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import itemsData from '@/data/items.json';
import type { GUI, Item, Project } from './../types';
import hash from 'fnv1a';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const loadFormattedItems = () =>
	itemsData
		.map((fileName: string) => {
			const name = fileName
				.replace(/\.png$/, '')
				.replace(/_/g, ' ')
				.replace('minecraft ', '')
				.replace(/\b\w/g, (char) => char.toUpperCase());

			const item: Item = {
				rawType: fileName.replace(/\.png$/, ''),
				name,
				image: `/items/${fileName}`,
				count: 1,
				lore: [],
			};

			return item;
		})
		.sort((a, b) => a.name.localeCompare(b.name));

export const computeItemHash = (item: Item | null) => {
	if (!item) return '';

	return hash(`${item.rawType}|${item.name}|${item.lore?.join('\n')}`);
};

export const getNewProject = (name?: string): Project => ({
	name: name || 'New Project',
	guis: [getNewGUI()],
});

export const getNewGUI = (name?: string): GUI => ({
	uuid: crypto.randomUUID(),
	name: name || 'Large Chest',
	cols: 9,
	rows: 6,
	slots: Array(54).fill(null),
});
