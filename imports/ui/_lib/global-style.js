import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

injectGlobal`
  ${reset}
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    color: #3a3a3a;
  }
`
