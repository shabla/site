import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { Menu } from "components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.4rem;
        font-family: 'Roboto', sans-serif;
    }

    html, body, #root {
        min-height: 100vh;
    }
`

const App = ({ className }) => {
    return (
        <>
            <GlobalStyle />

            <div className={className}>
                <Menu />
            </div>
        </>
    );
};

export default styled(App)`
    min-height: 100vh;
    background-color: #ddd;

    * {
        box-sizing: border-box;
    }
`