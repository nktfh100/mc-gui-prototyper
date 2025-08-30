import { forwardRef, useState } from "react";
import type { Item } from "@/lib/types";
import { SelectItem } from "./SelectItem";
import { loadFormattedItems } from "@/lib/utils";
import { VirtuosoGrid, type VirtuosoGridProps } from "react-virtuoso";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ItemSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onItemSelect: (item: Item) => void;
};

const items = loadFormattedItems();

const gridComponents: VirtuosoGridProps<undefined, undefined>["components"] = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: "0.2rem",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  ),
};

export const ItemSelectModal = ({
  isOpen,
  onClose,
  onItemSelect,
}: ItemSelectModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const handleItemSelect = (item: Item) => {
    onItemSelect(item);
    handleClose();
  };

  if (!isOpen) return null;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="panel max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Select an item</DialogTitle>
        </DialogHeader>
        <div>
          <input
            type="text"
            placeholder="Search items..."
            className="border p-2 rounded w-full text-white placeholder:text-white mb-4 anvil-textbox"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            autoFocus
          />
          <VirtuosoGrid
            style={{ height: 500 }}
            totalCount={filteredItems.length}
            components={gridComponents}
            itemContent={(index) => (
              <SelectItem
                key={index}
                item={filteredItems[index]}
                onClick={handleItemSelect}
              />
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
