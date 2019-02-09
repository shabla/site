import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

const Button = ({ children }) => {

    return (
        <button className="ui-button">
            {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Button