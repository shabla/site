import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button } from "ui";
import { Menu, InventoryGrid, Window } from "components";
import GlobalStyle from "../../styles/GlobalStyle";
import actions from "../../actions"
import * as utils from "../../utils";

const App = styled(({ className, doTest, testVal }) => {

    let [items, setItems] = useState([
        { x: 2, y: 5, width: 2, height: 3 },
    ]);
    let inventoryWidth = 10, inventoryHeight = 10;

    const getAvailableSlot = (items, item) => {
        // index each slot in the grid to the item that occupies it (if any)
        const bySlot = {};
        items.forEach(item => {
            for (let y = item.y; y < item.y + item.height; y++) {
                for (let x = item.x; x < item.x + item.width; x++) {
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
                for (let y = topLeftY; y < topLeftY + item.height; y++) {
                    for (let x = topLeftX; x < topLeftX + item.width; x++) {
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
    }

    const addItem = () => {
        let item = {
            width: utils.getRandomInt(1, 2),
            height: utils.getRandomInt(1, 3)
        };

        const availableSlot = getAvailableSlot(items, item);

        if (!availableSlot) {
            console.warn("no slot available for", item)
            return;
        }

        item.x = availableSlot.x;
        item.y = availableSlot.y;

        console.log("[addItem]", item);

        setItems([...items, item]);
    }

    console.log(testVal)

    return (
        <>
            <GlobalStyle />

            <Button onClick={doTest}>Add item</Button>


            <div className={className}>
                <Window>
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                        <Button onClick={addItem}>Add item</Button>
                    </div>

                    <InventoryGrid
                        width={inventoryWidth}
                        height={inventoryHeight}
                        items={items}
                    />
                </Window>

                <Menu />
            </div>
        </>
    );
})`
    min-height: 100vh;
    background-color: #ddd;

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