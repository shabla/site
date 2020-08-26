import React from "react";
import styled from "styled-components";

import imgSword1x3 from "assets/sword-1x3.png";
import imgBoots2x2 from "assets/boots-2x2.png";
import imgRing1x1 from "assets/ring-1x1.png";
import img2hAxe2x4 from "assets/2h-axe-2x4.png";

const IMAGES = {
    "sword-1x3.png": imgSword1x3,
    "boots-2x2.png": imgBoots2x2,
    "ring-1x1.png": imgRing1x1,
    "2h-axe-2x4.png": img2hAxe2x4
};

const InventoryItem = styled(({ className, showToolTip, hideToolTip }) => {
    return <div className={className} onMouseEnter={showToolTip} onMouseLeave={hideToolTip}></div>
})`
    position: absolute;
    background-color: rgba(0, 0, 100, 0.4);
    background-image: url(${props => IMAGES[props.image]});
    background-repeat: no-repeat;
    background-position: center center;
    top: ${props => props.slotY * props.boxSize + props.slotY}px;
    left: ${props => props.slotX * props.boxSize + props.slotX}px;
    width: ${props => props.width * props.boxSize + (props.width - 1)}px;
    height: ${props => props.height * props.boxSize + (props.height - 1)}px;

    :hover {
        background-color: rgba(0, 100, 0, 0.4);
    }
`;

export default InventoryItem;