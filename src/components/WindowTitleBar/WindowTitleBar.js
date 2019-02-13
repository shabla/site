import React from "react";
import styled from "styled-components";

const WindowTitleBar = styled(({ className, title, onMouseDown }) => (
    <div className={className} onMouseDown={onMouseDown}>
        {title}
    </div>
))`
    height: 40px;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 1px;
    color: white;
    background: #777;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
`;

export default WindowTitleBar;