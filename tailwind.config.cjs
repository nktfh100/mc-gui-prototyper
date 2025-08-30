/** @type {import('tailwindcss').Config} */

// Source: https://github.com/BryceRussell/astro-minecraft-theme/blob/master/tailwind.config.cjs

const defaultTheme = require('tailwindcss/defaultTheme');
const fs = require('fs');
const path = require('path');

const ASSET_DIRS = {
	block: 'imgs/blocks',
	item: 'imgs/items',
	painting: 'imgs/paintings',
};

const BLOCK_SPACING_MAX = 99;
const PUBLIC_DIR = './public';

//Create backgrounds like 'bg-stone' 'bg-i-diamond' 'bg-painting-skull'
const generateBackgrounds = (dir, prefix) => {
	const backgroundObj = {};
	const fullPath = path.join(PUBLIC_DIR, dir);

	try {
		fs.readdirSync(fullPath).forEach((file) => {
			const name = `${prefix}-${path.parse(file).name}`;
			backgroundObj[name] = `url('/${dir.replace(/\\/g, '/')}/${file}')`;
		});
	} catch (error) {
		console.error(`Error reading directory ${fullPath}:`, error);
	}

	return backgroundObj;
};

// Create spacings like '1-block' '2-block' up to '99-block'
const generateBlockSpacings = (max) => {
	const spacingObj = {};
	for (let i = 1; i <= max; i++) {
		spacingObj[`${i}-block`] = `calc(var(--block-size) * ${i})`;
	}
	return spacingObj;
};

module.exports = {
	darkMode: ['class'],
	content: [
		'./index.html',
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)',
		},
		screens: {
			xs: '480px',
			...defaultTheme.screens,
		},
		fontFamily: {
			sans: ['Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
			minecraft: ['Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
			minecrafter: [
				'Minecrafter',
				'Minecraft',
				'Arial',
				...defaultTheme.fontFamily.sans,
			],
			'minecrafter-alt': [
				'Minecrafter Alt',
				'Minecraft',
				'Arial',
				...defaultTheme.fontFamily.sans,
			],
			'minecraft-evenings': [
				'Minecraft Evenings',
				'Minecraft',
				'Arial',
				...defaultTheme.fontFamily.sans,
			],
			mono: ['Monocraft', ...defaultTheme.fontFamily.mono],
			monocraft: ['Monocraft', 'Minecraft', ...defaultTheme.fontFamily.mono],
		},
		extend: {
			colors: {
				// shadcn
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
				// Shadcn end
				// Misc
				link: '#aaaaff',
				panel: '#C6C6C6',
				'panel-dark': '#373737',
				// Text colors
				gold: '#FFAA00',
				gray: '#AAAAAA',
				blue: '#5555FF',
				green: '#55FF55',
				aqua: '#55FFFF',
				red: '#FF5555',
				'light-purple': '#FF55FF',
				yellow: '#FFFF55',
				dark: {
					blue: '#0000AA',
					green: '#00AA00',
					aqua: '#00AAAA',
					red: '#AA0000',
					purple: '#AA00AA',
					gray: '#555555',
				},
				// Wool colors
				wool: {
					orange: '#D87F33',
					magenta: '#B24CD8',
					'light-blue': '#6699D8',
					yellow: '#E5E533',
					lime: '#7FCC19',
					pink: '#F27FA5',
					gray: '#4C4C4C',
					'light-gray': '#999999',
					cyan: '#4C7F99',
					purple: '#7F3FB2',
					blue: '#334CB2',
					brown: '#664C33',
					green: '#667F33',
					red: '#993333',
					black: '#191919',
				},
				// Biome-specific colors
				grass: {
					DEFAULT: '#79C05A',
					jungle: '#59C93C',
					'dark-forest': '#507A32',
					'swamp-green': '#4C763C',
					plains: '#91BD59',
					forest: '#79C05A',
					'birch-forest': '#88BB67',
					ocean: '#8EB971',
					meadow: '#83BB6D',
					tiaga: '#86B783',
					snowy: '#80B497',
					swamp: '#6A7039',
					badlands: '#90814D',
					desert: '#BFB755',
				},
				foilage: {
					DEFAULT: '#59AE30',
					jungle: '#30BB0B',
					'dark-forest': '#507A32',
					'swamp-green': '#4C763C',
					plains: '#77AB2F',
					forest: '#59AE30',
					'birch-forest': '#6BA941',
					ocean: '#71A74D',
					meadow: '#63A948',
					tiaga: '#68A464',
					snowy: '#60A17B',
					swamp: '#6A7039',
					badlands: '#9E814D',
					desert: '#AEA42A',
				},
				water: {
					DEFAULT: '#44AFF5',
					ocean: {
						DEFAULT: '#1787D4',
						warm: '#02B0E5',
						lukewarm: '#0D96DB',
						cold: '#2080C9',
						frozen: '#2570B5',
					},
					forest: {
						DEFAULT: '#1E97F2',
						birch: '#0677CE',
						'birch-hills': '#0A74C4',
						dark: '#3B6CD1',
						flower: '#20A3CC',
					},
					meadow: '#0E4ECF',
					river: '#0084FF',
					'mountain-gravel': '#0E63AB',
					mountain: '#007BF7',
					beach: '#157CAB',
					'beach-snowy': '#1463A5',
					'stone-shore': '#0D67BB',
					jungle: '#14A2C5',
					'jungle-hills': '#1B9ED8',
					tiaga: '#287082',
					'tiaga-hills': '#236583',
					'tiaga-snowy': '#205E83',
					savanna: '#2C8B9C',
					'savanna-plateau': '#2590A8',
					desert: '#32A598',
					'desert-hills': '#1A7AA1',
					badlands: '#4E7F81',
					'badlands-plateau': '#55809E',
					swamp: '#4C6559',
					'swamp-hills': '#4C6156',
					mushroom: '#8A8997',
					'mushroom-shore': '#818193',
					end: '#62529E',
					nether: '#905957',
				},
			},
			backgroundImage: {
				sign: "url('/imgs/ui/sign.png')",
				...generateBackgrounds(ASSET_DIRS.block, 'block'),
				...generateBackgrounds(ASSET_DIRS.item, 'item'),
				...generateBackgrounds(ASSET_DIRS.painting, 'painting'),
			},
			spacing: {
				'1/16-block': 'calc(var(--block-size) / 16)',
				'1/8-block': 'calc(var(--block-size) / 8)',
				'1/4-block': 'calc(var(--block-size) / 4)',
				'1/2-block': 'calc(var(--block-size) / 2)',
				...generateBlockSpacings(BLOCK_SPACING_MAX),
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
