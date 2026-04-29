import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        font-family: 'Poppins', sans-serif;
    }

    * {
        
    }
`

export default GlobalStyle;