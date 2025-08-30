import { useState } from "react";
import type { Item } from "../../lib/types";
import useAppStore from "../../stores/appStore";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import EditItemModal from "../modals/EditItemModal";
import { computeItemHash } from "../../lib/utils";

type ContextMenuProps = {
  children: React.ReactNode;
  item: Item;
  type: "gui" | "favorite";
  slotIndex: number;
};

export const ItemContextMenu = ({
  children,
  slotIndex,
  item,
  type,
}: ContextMenuProps) => {
  const setSlot = useAppStore((state) => state.setSlot);

  const removeFavoriteItem = useAppStore((state) => state.removeFavoriteItem);
  const addFavoriteItem = useAppStore((state) => state.addFavoriteItem);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleFavorite = () => {
    if (type === "favorite") {
      removeFavoriteItem(item);
    } else {
      addFavoriteItem(item);
    }
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setSlot(slotIndex, null);
  };

  const handleEditSave = (updatedItem: Item) => {
    if (type === "gui") {
      setSlot(slotIndex, updatedItem);
    } else {
      useAppStore.setState((state) => {
        const index = state.favoriteItems.findIndex(
          (fav) => computeItemHash(fav) === computeItemHash(item),
        );

        if (index === -1) {
          return;
        }

        state.favoriteItems[index] = updatedItem;
      });
    }
    setEditModalOpen(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={handleEdit}>Edit</ContextMenuItem>
          <ContextMenuItem onSelect={handleFavorite}>
            {type === "favorite" ? "Unfavorite" : "Favorite"}
          </ContextMenuItem>
          {type === "gui" && (
            <ContextMenuItem onSelect={handleDelete}>Delete</ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>

      <EditItemModal
        isOpen={editModalOpen}
        item={item}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditSave}
      />
    </>
  );
};
