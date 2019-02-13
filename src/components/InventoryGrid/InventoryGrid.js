import React from "react";
import styled from "styled-components";

const BOX_SIZE = 32;

const InventoryItem = styled(({ className, slotX, slotY, width, height }) => {
    return <div className={className}></div>
})`
    position: absolute;
    top: ${props => props.slotY * BOX_SIZE + props.slotY}px;
    left: ${props => props.slotX * BOX_SIZE + props.slotX}px;
    width: ${props => props.width * BOX_SIZE + (props.width - 1)}px;
    height: ${props => props.height * BOX_SIZE + (props.height - 1)}px;
    background: rgba(0, 0, 100, 0.4);
`;

const InventoryGrid = styled(({ className, width, height, items }) => {

    const rows = [];
    for (let y = 0; y < height; y++) {
        const columns = [];
        for (let x = 0; x < width; x++) {
            columns.push(<div className="box" key={y + x}>{x + ", " + y}</div>);
        }
        rows.push(columns);
    }

    return (
        <div className={className}>
            {items.map((item, index) =>
                <InventoryItem key={index} slotX={item.x} slotY={item.y} width={item.width} height={item.height} />
            )}
            {rows}
        </div>
    );
})`  
    height: ${props => BOX_SIZE * props.height + 2 + props.height - 1}px;
    width: ${props => BOX_SIZE * props.width + 2 + props.width - 1}px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(${props => props.width}, ${BOX_SIZE}px [col-start]);
    grid-template-rows: repeat(${props => props.height}, ${BOX_SIZE}px [row-start]);
    grid-column-gap: 1px;
    grid-row-gap: 1px;
    
    .box {
        display: flex;
        color: #ccc;
        font-size: 10px;
        justify-content: center;
        align-items: center;
        height: ${BOX_SIZE}px;
        width: ${BOX_SIZE}px;
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