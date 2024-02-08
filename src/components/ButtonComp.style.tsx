import styled from "styled-components";
import ButtonComp from "./ButtonComp";

export const StyledButtonComp = styled(ButtonComp)<{$doubleHor?: boolean, $doubleVer?: boolean}>`
    width: ${props => props.$doubleHor ? '122px' : '60px'};
    height: ${props => props.$doubleVer ? '122px' : '60px'};
    background-color: #4d4d4d;
    font: inherit;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 20px;
    margin-right: 2px;
    margin-bottom: 2px;
    
    &:active {
      background-color: #595959;
    }

    &:hover {
      background-color: #737373;
    }
    
`;