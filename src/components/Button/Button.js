import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ className, children }) => {
    return (
        <button className={className}>
            {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default styled(Button)`
    border: 1px solid #aaa;
`