import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
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

    * {
        user-select: none;
    }
`;