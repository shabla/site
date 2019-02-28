import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button } from "ui";
import { Menu, Tooltip, InventoryGrid, Window } from "components";
import GlobalStyle from "styles/GlobalStyle";
import actions from "actions"
import selectors from "../../selectors";

import { generateRandomItem } from "../../factories/item.factory";

const App = styled(({
    className,

    // Items
    items,
    addItem,

    // Inventory
    boxSize,
    inventoryWidth,
    inventoryHeight,
    itemsByInventorySlot,
}) => {

    const [tooltipContent, setTooltipContent] = useState(null);

    const findAvailableSlot = (itemsBySlot, width, height) => {
        // try each slot as if it's the top left corner of the item
        outer:
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

    const onAddItem = () => {
        const item = generateRandomItem();
        const availableSlot = findAvailableSlot(itemsByInventorySlot, item.inventory.width, item.inventory.height);

        if (!availableSlot) {
            console.warn("no slot available for", item)
            return;
        }

        item.inventory.x = availableSlot.x;
        item.inventory.y = availableSlot.y;

        addItem({ item });
    };

    return (
        <div className={className}>
            <GlobalStyle />

            <Tooltip>{tooltipContent}</Tooltip>

            <Window title="Inventory">
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                    <Button onClick={onAddItem}>Add item</Button>
                </div>

                <InventoryGrid
                    boxSize={boxSize}
                    width={inventoryWidth}
                    height={inventoryHeight}
                    items={items}
                    showTooltip={setTooltipContent}
                    hideTooltip={() => setTooltipContent()}
                />
            </Window>

            <Menu />
        </div>
    );
})`
    min-height: 100vh;
    background-color: #ddd;
    padding: 100px;

    * {
        box-sizing: border-box;
    }
`;

const stateToProp = state => ({
    items: state.items,

    // Inventory
    itemsByInventorySlot: selectors.inventory.getInventoryItemsBySlot(state),
    boxSize: state.inventory.boxSize,
    inventoryWidth: state.inventory.width,
    inventoryHeight: state.inventory.height,
});

const dispatchToProp = ({
    addItem: actions.items.add,
});

export default connect(stateToProp, dispatchToProp)(App);