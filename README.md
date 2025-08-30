# Minecraft GUI Prototyper (Weekend Project)

A simple tool to prototype vanilla Minecraft inventory GUIs.

Drag and drop items, support for items names/lore/count, link buttons between GUIs, and export/import your work.

Everything is saved locally.

## Features
- Multiple GUIs per project
- Drag-and-drop editor like in Minecraft
- Favorite items
- Import/Export a single GUI or a whole project (JSON)
- Presentation Mode to move between GUIs on item click
- Everything is local (browser localStorage)

## Tech stack
- React 19 + TypeScript + Vite
- Tailwind CSS
- dnd-kit, shadcn/ui, Zustand, react-virtuoso, [Minecraft theme](https://github.com/BryceRussell/astro-minecraft-theme)

## Quick start
- Prerequisites: Node.js 20+ and npm
- Install: `npm install`
- Start dev server: `npm run dev` (then open the shown URL)
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Useful scripts
- Lint: `npm run lint`
- Format: `npm run format`
- Type check: `npm run typecheck`
- Regenerate items list JSON: `npm run generate-items-json` (requires Python 3)

## Credits
- GUI Items icons: https://mc.nerothe.com/
- Minecraft theme: https://github.com/BryceRussell/astro-minecraft-theme

## Contributing
Issues and pull requests are welcome!

Please run lint, typecheck, and format before submitting.