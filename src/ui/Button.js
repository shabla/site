import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ className, children, onClick }) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func,
};

export default styled(Button)`
    box-sizing: border-box;
    border: 1px solid #333;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 25px;
    font-size: 14px;
    padding: 0 10px;
    transition: all 0.25s;
    margin-left: 5px;
    margin-right: 5px;

    &:hover {
        background: rgba(0, 0, 0, 0.55);
        cursor: pointer;
    }

    &:active {
        background: rgba(0, 0, 0, 0.65);
    }

    &:focus {
        outline: 0;
        border-color: #333;
    }
`;