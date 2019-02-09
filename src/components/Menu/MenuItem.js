import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import * as styles from "../../styles";

const MenuItem = props => {

    const onClick = e => {
        if (!props.onClick) {
            return;
        }

        console.log(e)

        props.onClick("hello");
    };

    return (
        <div className={props.className} onClick={onClick}>
            {props.children}
        </div>
    );
};

MenuItem.propTypes = {
    onClick: PropTypes.func
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