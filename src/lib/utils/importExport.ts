import type { GUI, Project } from '../types';

export const validateImportedGUI = (data: GUI) => {
	return (
		data &&
		typeof data.name === 'string' &&
		typeof data.cols === 'number' &&
		typeof data.rows === 'number' &&
		Array.isArray(data.slots)
	);
};

export const validateImportedProject = (data: Project) => {
	return (
		data &&
		typeof data.name === 'string' &&
		Array.isArray(data.guis) &&
		data.guis.every(validateImportedGUI)
	);
};

export const fileSafeName = (name: string) =>
	name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

export const importItemFromFile = <T>(
	file: File,
	validate: (data: T) => boolean,
	onSuccess: (data: T) => void
) => {
	const reader = new FileReader();
	reader.onload = (event) => {
		try {
			const text = event.target?.result;
			if (typeof text !== 'string') throw new Error('Failed to read file.');

			const importedData = JSON.parse(text);
			if (!validate(importedData)) throw new Error('Invalid file format.');

			onSuccess(importedData);
		} catch (error) {
			alert(
				'Import failed: ' +
					(error instanceof Error ? error.message : 'Unknown error')
			);
		}
	};
	reader.readAsText(file);
};

export const exportItemToFile = <T>(item: T, filename: string) => {
	const dataStr =
		'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item));
	const downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', fileSafeName(filename) + '.json');
	document.body.appendChild(downloadAnchorNode);
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
};
