import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { Button } from "ui";
import { Menu, InventoryGrid, Window } from "components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.4rem;
        font-family: 'Roboto', sans-serif;
    }

    html, body, #root {
        min-height: 100vh;
    }

    * {
        user-select: none;
    }
`;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = styled(({ className }) => {

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
            width: getRandomInt(1, 2),
            height: getRandomInt(1, 3)
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

    return (
        <>
            <GlobalStyle />

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

export default App;