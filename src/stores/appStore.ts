import { create } from "zustand";
import type { GUI, Item, Project } from "../lib/types";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { computeItemHash, getNewProject } from "../lib/utils";

type AppStore = {
  projects: Project[];
  activeProjectIndex: number;
  activeGUIIndex: number;
  favoriteItems: Item[];
  setActiveProjectIndex: (index: number) => void;
  setActiveGUIIndex: (index: number) => void;
  setSlot: (index: number, item: Item | null) => void;
  updateSlotItem: (index: number, partialItem: Partial<Item>) => void;
  updateActiveGUI: (updater: (gui: GUI) => void) => void;
  addFavoriteItem: (item: Item) => void;
  removeFavoriteItem: (item: Item) => void;
  getActiveProject: () => Project;
  getActiveGUI: () => GUI;
};

const useAppStore = create<AppStore>()(
  persist(
    immer((set, get) => ({
      activeProjectIndex: 0,
      activeGUIIndex: 0,
      projects: [getNewProject()],
      favoriteItems: [],
      addFavoriteItem: (toAdd) =>
        set((state) => {
          if (
            !state.favoriteItems.find(
              (item) => computeItemHash(item) === computeItemHash(toAdd),
            )
          ) {
            state.favoriteItems.push(toAdd);
          }
        }),
      removeFavoriteItem: (toRemove) =>
        set((state) => {
          state.favoriteItems = state.favoriteItems.filter(
            (item) => computeItemHash(item) !== computeItemHash(toRemove),
          );
        }),
      setActiveProjectIndex: (index) =>
        set((state) => {
          if (index >= 0 && index < state.projects.length) {
            state.activeProjectIndex = index;
            state.activeGUIIndex = 0;
          }
        }),
      setActiveGUIIndex: (index) =>
        set((state) => {
          const guis = state.projects[state.activeProjectIndex].guis;
          if (index >= 0 && index < guis.length) {
            state.activeGUIIndex = index;
          }
        }),
      setSlot: (index, item) =>
        set((state) => {
          state.projects[state.activeProjectIndex].guis[
            state.activeGUIIndex
          ].slots[index] = item;
        }),
      updateSlotItem: (index, partialItem) =>
        set((state) => {
          const slot =
            state.projects[state.activeProjectIndex].guis[state.activeGUIIndex]
              .slots[index];
          if (slot) {
            state.projects[state.activeProjectIndex].guis[
              state.activeGUIIndex
            ].slots[index] = { ...slot, ...partialItem };
          }
        }),
      updateActiveGUI: (updater) =>
        set((state) => {
          updater(
            state.projects[state.activeProjectIndex].guis[state.activeGUIIndex],
          );
        }),
      getActiveProject: () => {
        const state = get();
        return state.projects[state.activeProjectIndex];
      },
      getActiveGUI: () => {
        const state = get();
        return state.projects[state.activeProjectIndex].guis[
          state.activeGUIIndex
        ];
      },
    })),
    {
      name: "gui",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useProjects = () => useAppStore((state) => state.projects);
export const useActiveProjectIndex = () =>
  useAppStore((state) => state.activeProjectIndex);
export const useActiveGUIIndex = () =>
  useAppStore((state) => state.activeGUIIndex);

export const useActiveProject = () =>
  useAppStore((state) => state.projects[state.activeProjectIndex]);

export const useActiveGUI = () => {
  return useAppStore(
    (state) =>
      state.projects[state.activeProjectIndex].guis[state.activeGUIIndex],
  );
};

export const isSlotEmpty = (index: number) => {
  const state = useAppStore.getState();
  return (
    state.projects[state.activeProjectIndex].guis[state.activeGUIIndex].slots[
      index
    ] === null
  );
};

export default useAppStore;
