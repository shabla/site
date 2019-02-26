import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button } from "ui";
import { Menu, Tooltip, InventoryGrid, Window } from "components";
import GlobalStyle from "styles/GlobalStyle";
import actions from "actions"
import { generateRandomItem } from "./itemGenerator";

const BOX_SIZE = 32;

const App = styled(({ className, doTest, testVal }) => {

    const [items, setItems] = useState([]);
    const [inventoryWidth, setInventoryWidth] = useState(10);
    const [inventoryHeight, setInventoryHeight] = useState(10);

    const getAvailableSlot = (items, width, height) => {
        // index each slot in the grid to the item that occupies it (if any)
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

        // try each slot as if it's the top left corner of the item
        outer:
        for (let topLeftX = 0; topLeftX < inventoryWidth; topLeftX++) {
            for (let topLeftY = 0; topLeftY < inventoryHeight; topLeftY++) {
                let isFree = true;

                // check each slot required for the item to fit
                slotcheck:
                for (let y = topLeftY; y < topLeftY + height; y++) {
                    for (let x = topLeftX; x < topLeftX + width; x++) {
                        if (bySlot[x] && bySlot[x][y] || y >= inventoryWidth || x >= inventoryHeight) {
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

    const addItem = () => {
        const item = generateRandomItem();
        const availableSlot = getAvailableSlot(items, item.inventory.width, item.inventory.height);

        if (!availableSlot) {
            console.warn("no slot available for", item)
            return;
        }

        item.inventory.x = availableSlot.x;
        item.inventory.y = availableSlot.y;

        console.log("[addItem]", item);

        setItems([...items, item]);
    };

    const addColumn = () => {
        setInventoryWidth(inventoryWidth + 1);
    };

    const removeColumn = () => {
        if (inventoryWidth > 0) {
            setInventoryWidth(inventoryWidth - 1);
        }
    };

    const addRow = () => {
        setInventoryHeight(inventoryHeight + 1);
    };

    const removeRow = () => {
        if (inventoryHeight > 0) {
            setInventoryHeight(inventoryHeight - 1);
        }
    };


    ///
    // TOOLTIP
    ///
    const [tooltipX, setTooltipX] = useState(0);
    const [tooltipY, setTooltipY] = useState(0);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
    const [tooltipContent, setTooltipContent] = useState();
    const [tooltipWidth, setTooltipWidth] = useState(200);
    const [tooltipHeight, setTooltipHeight] = useState(250);

    useEffect(() => {
        if (isTooltipVisible) {
            window.addEventListener("mousemove", moveToolTip);
            return () => window.removeEventListener("mousemove", moveToolTip);
        }
    }, [isTooltipVisible])

    const moveToolTip = e => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        let x = mouseX - (tooltipWidth / 2);
        x = x < 0 ? 0 : x;

        let y = mouseY - tooltipHeight;
        y = y < 0 ? 0 : y;

        setTooltipX(x);
        setTooltipY(y);
    }

    const showTooltip = content => {
        setTooltipContent(content);
        setIsTooltipVisible(true);
    }

    const hideTooltip = () => {
        setTooltipContent();
        setIsTooltipVisible(false);
    };

    return (
        <div className={className}>
            <GlobalStyle />

            {isTooltipVisible && (
                <Tooltip x={tooltipX} y={tooltipY} width={tooltipWidth} height={tooltipHeight}>
                    {tooltipContent}
                </Tooltip>
            )}

            <Button onClick={() => doTest(testVal + 1)}>Test Redux {testVal} </Button>

            <Window title="Inventory">
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                    <Button onClick={addItem}>Add item</Button>
                    <Button onClick={addColumn}>Add Column</Button>
                    <Button onClick={removeColumn}>Remove Column</Button>
                    <Button onClick={addRow}>Add Row</Button>
                    <Button onClick={removeRow}>Remove Row</Button>
                </div>

                <InventoryGrid
                    boxSize={BOX_SIZE}
                    width={inventoryWidth}
                    height={inventoryHeight}
                    items={items}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                />
            </Window>

            <Menu />
        </div>
    );
})`
    min-height: 100vh;
    background-color: #ddd;
    padding-top: 50px;

    * {
        box-sizing: border-box;
    }
`;

const stateToProp = state => ({
    testVal: state.test.val
});

const dispatchToProp = ({
    doTest: actions.test.testAction
});

export default connect(stateToProp, dispatchToProp)(App);