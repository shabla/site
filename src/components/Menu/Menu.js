import React from "react";
import styled from "styled-components";

import MenuItem from "./MenuItem"
import * as styles from "styles";

const Menu = ({ className }) => {
    return (
        <div className={className}>
            <MenuItem onClick={v => console.log(v)}>Test 1</MenuItem>
            <MenuItem>Test 2</MenuItem>
            <MenuItem>Test 3</MenuItem>
        </div>
    );
};

export default styled(Menu)`
    position: fixed;
    bottom: 2vh;
    background-color: #eee;
    width: 100%;
    ${styles.layoutRow}
    ${styles.layoutCenterCenter}
`;