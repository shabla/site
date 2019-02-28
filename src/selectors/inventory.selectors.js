import { createSelector } from "redux-starter-kit";

// index each slot in the grid to the item that occupies it (if any)
export const getInventoryItemsBySlot = createSelector(
    ["items"],
    items => {
        const bySlot = {};
        items.forEach(item => {
            for (let y = item.inventory.y; y < item.inventory.y + item.inventory.height; y++) {
                for (let x = item.inventory.x; x < item.inventory.x + item.inventory.width; x++) {
                    if (!bySlot[x]) {
                        bySlot[x] = {};
                    }
                    bySlot[x][y] = item;
                }
            }
        });
        return bySlot;
    }
)