import { createReducer, createAction, createSelector } from "redux-starter-kit";

export { default as InventoryGrid } from "./components/InventoryGrid/InventoryGrid";

const findAvailableSlot = (itemsBySlot, width, height) => {
    // try each slot as if it's the top left corner of the item
    for (let topLeftX = 0; topLeftX < inventoryWidth; topLeftX++) {
        for (let topLeftY = 0; topLeftY < inventoryHeight; topLeftY++) {
            let isFree = true;

            // check each slot required for the item to fit
            slotcheck:
            for (let y = topLeftY; y < topLeftY + height; y++) {
                for (let x = topLeftX; x < topLeftX + width; x++) {
                    if (itemsBySlot[x] && itemsBySlot[x][y] || y >= inventoryWidth || x >= inventoryHeight) {
                        isFree = false;
                        break slotcheck;
                    }
                }
            }

            if (isFree) {
                return { x: topLeftX, y: topLeftY }
            }
        }
    }
};

// selectors

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

// actions
export const add = createAction("items/add");
export const remove = createAction("items/remove");

export const setBoxSize = createAction("inventory/setBoxSize");
export const addRow = createAction("inventory/addRow");
export const removeRow = createAction("inventory/removeRow");
export const addColumn = createAction("inventory/addColumn");
export const removeColumn = createAction("inventory/removeColumn");

export const addItem = () => (dispatch, getState) => {
    const state = getState();
    const itemsByInventorySlot = getInventoryItemsBySlot(state);
    const item = generateRandomItem();
    const availableSlot = findAvailableSlot(itemsByInventorySlot, item.inventory.width, item.inventory.height);

    if (!availableSlot) {
        console.warn("no slot available for", item)
        return;
    }

    item.inventory.x = availableSlot.x;
    item.inventory.y = availableSlot.y;

    dispatch(add({ item }));
}

// reducer
export default createReducer([], {
    [add]: (state, action) => {
        state.push(action.payload.item);
    },
    [remove]: (state, action) => {
        const item = action.payload;
        const index = state.indexOf(item);
        if (index === -1) {
            console.warn("couldn't find item to remove", item);
            return state;
        }
        state.splice(index, 1);
    },
});
