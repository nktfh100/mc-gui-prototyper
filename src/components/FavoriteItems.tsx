import useAppStore from "../stores/appStore";
import DraggableItem from "./item/DraggableItem";
import { ItemContextMenu } from "./item/ItemContextMenu";

const defaultRowsCount = 6;
const defaultSlotsCount = 6 * 3;

export const FavoriteItems = () => {
  const favoriteItems = useAppStore((state) => state.favoriteItems);

  const baseLength = Math.max(favoriteItems.length, defaultSlotsCount);
  const arrayLength = Math.ceil(baseLength / 3) * 3;

  return (
    <div
      className="-mr-[14.2rem] panel"
      onContextMenu={(e) => e.preventDefault()}
    >
      <p className="pl-3 pt-2 pb-[0.6rem] text-dark-gray text-lg">
        Favorite Items
      </p>
      <div
        className="grid grid-rows-6 gap-[2px] px-4 py-2 max-h-[23.8rem] overflow-y-auto overflow-x-hidden"
        style={{
          gridTemplateColumns: `repeat(${3}, minmax(0, 3.5rem))`,
          gridTemplateRows: `repeat(${
            defaultRowsCount / 3
          }, minmax(0, 3.5rem))`,
        }}
      >
        {Array.from({ length: arrayLength }, (_, i) => i).map((_, index) => (
          <div
            key={index}
            className="w-14 h-14 flex justify-center items-center cursor-pointer slot"
          >
            {favoriteItems[index] && (
              <ItemContextMenu
                slotIndex={index}
                item={favoriteItems[index]}
                type="favorite"
              >
                <DraggableItem
                  key={index}
                  item={favoriteItems[index]}
                  id={1000 + index}
                  slotIndex={0}
                  type={"favorite"}
                />
              </ItemContextMenu>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
