import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  #body-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
  }

  #calc-wrap {
    background-color: #1a1a1a;
  }

  #display {
    text-align: right;
  }

  #buttonUI {
    margin-left: 2px;
  }

  #keys-wrap {
    display: flex;
  }
`