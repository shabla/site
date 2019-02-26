import React from "react";
import styled from "styled-components";

const InventoryItem = styled(({ className, showToolTip, hideToolTip }) => {
    return <div className={className} onMouseEnter={showToolTip} onMouseLeave={hideToolTip}></div>
})`
    position: absolute;
    top: ${props => props.slotY * props.boxSize + props.slotY}px;
    left: ${props => props.slotX * props.boxSize + props.slotX}px;
    width: ${props => props.width * props.boxSize + (props.width - 1)}px;
    height: ${props => props.height * props.boxSize + (props.height - 1)}px;
    background: rgba(0, 0, 100, 0.4);
`;

export default InventoryItem;