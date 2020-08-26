import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import * as styles from "styles";

const ContentContainer = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

ContentContainer.propTypes = {};

export default styled(ContentContainer)`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    ${styles.layoutColumn}
`;