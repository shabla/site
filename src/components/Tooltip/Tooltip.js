import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Tooltip = styled(({ className, children }) => {

    const [posX, setPosX] = useState(0)
    const [posY, setPosY] = useState(0)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(250)
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (children) {
            setIsVisible(true);
            window.addEventListener("mousemove", moveToolTip);

            return () => {
                setIsVisible(false);
                window.removeEventListener("mousemove", moveToolTip);
            }
        }
    }, [children])

    const moveToolTip = e => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        let x = mouseX - (width / 2);
        x = x < 0 ? 0 : x;

        let y = mouseY - height;
        y = y < 0 ? 0 : y;

        setPosX(x);
        setPosY(y);
    }

    const style = {
        display: isVisible ? "block" : "none",
        transform: `translate(${posX}px, ${posY}px)`,
        width: `${width}px`,
        height: `${height}px`,
    };

    return <div className={className} style={style}>{children}</div>
})`
	background: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
    color: white;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.3),
        -1px -1px rgba(0, 0, 0, 0.3),
        -1px 1px rgba(0, 0, 0, 0.3),
        1px -1px rgba(0, 0, 0, 0.3);
`;

export default Tooltip;