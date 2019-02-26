import React from "react";
import styled from "styled-components";

import * as styles from "styles";

const MenuItem = ({ onClick, className, children }) => {
    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
};

export default styled(MenuItem)`
    background-color: #aaa;
    height: 50px;
    margin: 0 5px;
    padding: 5px 10px;
    ${styles.layoutColumn}
    ${styles.layoutCenterCenter}
    user-select: none;

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        background-color: #bbb;
        cursor: pointer;
    }

    &:active {
        background-color: #888;
    }
`;