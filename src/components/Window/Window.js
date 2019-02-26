import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { WindowTitleBar } from "components";

const Window = styled(({ className, children, title }) => {
    const [x, setX] = useState(10);
    const [y, setY] = useState(10);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(500);

    return (
        <div className={className} style={{
            // left: x + "px",
            // top: y + "px",
            // width: width + "px",
            // height: height + "px"
        }}>
            <WindowTitleBar title={title} />

            <div style={{
                background: "#888",
                padding: "10px",
                "flex": "1 1 auto",
                "borderBottomLeftRadius": "3px",
                "borderBottomRightRadius": "3px"
            }}>
                {children}
            </div>
        </div>
    );
})`
    // position: absolute;
    position: relative;
    // top: ${props => props.y + "px"};
    // left: ${props => props.x + "px"};
    color: white;
    display: inline-flex;
    flex-direction: column;
    // width: ${props => props.width + "px"};
    // height: ${props => props.height + "px"};
`;

export default Window;