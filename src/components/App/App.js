import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button } from "ui";
import { Menu, Tooltip, Window } from "components";
import * as inventoryModule from "../../modules/inventory";

const StyledApp = styled(({ className, children }) => {
    return <div className={className}>{children}</div>
})`
    min-height: 100vh;
    background-color: #ddd;

    * {
        box-sizing: border-box;
    }

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
`;

const App = ({
    // Items
    // items,
    // addItem,

    // // Inventory
    // boxSize,
    // inventoryWidth,
    // inventoryHeight,
}) => {

    // const [tooltipContent, setTooltipContent] = useState(null);
    return (
        <StyledApp>
            {/* <Tooltip>{tooltipContent}</Tooltip> */}

            <Window title="Inventory">
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                    <Button onClick={addItem}>Add item</Button>
                </div>

                <inventoryModule.InventoryGrid
                    boxSize={boxSize}
                    width={inventoryWidth}
                    height={inventoryHeight}
                    items={items}
                    showTooltip={setTooltipContent}
                    hideTooltip={() => setTooltipContent()}
                />
            </Window>

            <Menu />
        </StyledApp>
    );
}

const stateToProp = state => ({
    // items: state.items,

    // Inventory

    // boxSize: state.inventory.boxSize,
    // inventoryWidth: state.inventory.width,
    // inventoryHeight: state.inventory.height,
});

const dispatchToProp = ({
    // addItem: inventoryModule.addItem,
});

export default connect(stateToProp, dispatchToProp)(App);