import React from "react";
import styled from "styled-components";

import InventoryItem from "./InventoryItem";
import { ItemTooltip } from "components";

const InventoryGrid = styled(({ className, width, height, items, boxSize, showTooltip, hideTooltip }) => {
    const rows = [];
    for (let y = 0; y < height; y++) {
        const columns = [];
        for (let x = 0; x < width; x++) {
            columns.push(<div className="box" key={y + x}>{x + ", " + y}</div>);
        }
        rows.push(columns);
    }

    const showItemToolTip = item => {
        showTooltip(<ItemTooltip item={item} />);
    }

    return (
        <div className={className}>
            {items.map((item, index) =>
                <InventoryItem
                    key={index}
                    showToolTip={() => showItemToolTip(item)}
                    hideToolTip={hideTooltip}
                    boxSize={boxSize}
                    slotX={item.inventory.x}
                    slotY={item.inventory.y}
                    width={item.inventory.width}
                    height={item.inventory.height}
                />
            )}

            {rows}
        </div>
    );
})`  
    height: ${props => props.boxSize * props.height + 2 + props.height - 1}px;
    width: ${props => props.boxSize * props.width + 2 + props.width - 1}px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(${props => props.width}, ${props => props.boxSize}px [col-start]);
    grid-template-rows: repeat(${props => props.height}, ${props => props.boxSize}px [row-start]);
    grid-column-gap: 1px;
    grid-row-gap: 1px;
    
    .box {
        display: flex;
        color: #ccc;
        font-size: 10px;
        justify-content: center;
        align-items: center;
        height: ${props => props.boxSize}px;
        width: ${props => props.boxSize}px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        margin-bottom: 1px;
        margin-right: 1px;
        background-color: rgba(0, 0, 0, 0.1);

        &:nth-of-type(${props => props.width}n) {
            margin-right: 0;
        }

        &:nth-last-child(-n + ${props => props.width}) {
            margin-bottom: 0;
        }
    }
`;

export default InventoryGrid;