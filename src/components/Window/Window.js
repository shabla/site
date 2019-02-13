import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { WindowTitleBar } from "components";

const Window = styled(({ className, children }) => {
    const [x, setX] = useState(10);
    const [y, setY] = useState(10);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(500);
    const [dragging, setDragging] = useState(false);

    const onMouseDown = e => {
        if (!dragging && e.button === 0) {
            console.log("onMouseDown", !dragging && e.button === 0)
            setDragging(true);
            console.log(dragging)
        }
    }

    const onMouseUp = e => {
        // console.log("mouse up", dragging, e.button, dragging && e.button === 0)
        if (dragging && e.button === 0) {
            setDragging(false);
        }
    }

    const onMouseLeaveBody = () => {
        if (dragging) {
            setDragging(false);
        }
    }

    const onMouseMove = e => {
        if (dragging) {
            const rect = e.target.getBoundingClientRect();
            console.log("onMouseMove target:", rect.x, rect.y, "mouse", e.clientX, e.clientY)
            setX(e.clientX)
            setY(e.clientY)
        }
    }

    useEffect(() => {
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseleave", onMouseLeaveBody);
        document.body.addEventListener("mouseup", onMouseUp);
        return () => {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseleave", onMouseLeaveBody);
            document.body.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    const style = {
        left: x + "px",
        top: y + "px",
        width: width + "px",
        height: height + "px"
    };

    return (
        <div className={className} style={style}>
            <WindowTitleBar
                title="Character"
                onMouseDown={onMouseDown}
            />

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
    position: absolute;
    color: white;
    display: flex;
    flex-direction: column;
    width: ${props => props.width + "px"};
    height: ${props => props.height + "px"};
    top: ${props => props.y + "px"};
    left: ${props => props.x + "px"};
`;

Window.propTypes = {};

export default Window;