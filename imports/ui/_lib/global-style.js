import { createGlobalStyle } from "styled-components"
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    color: #3a3a3a;
  }
`

export default GlobalStyle;
