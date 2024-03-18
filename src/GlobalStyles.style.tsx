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
    border: solid 1px #535252;
    border-radius: 4px;
    box-shadow: 5px 7px 20px 8px #1c1c1c7a;
  }

  #display {
    text-align: right;
    padding: 10px 7px;
    width: 236px;
    overflow-wrap: break-word;
    background-image: linear-gradient(180deg, #1a1a1a, #2d2d2d);
    border-radius: 4px 4px;
  }

  #logo {
    position: absolute;
    bottom: 40px;
    left: 40px
  }

  #display-bottom-text {
    font-size: 35px;
  }

  #separator {
    margin: 0px auto 2px;
    width: 98.5%;
    border-bottom: 1px solid #535252
  }

  #buttonUI {
    margin-left: 2px;
  }

  #keys-wrap {
    display: flex;
  }
`