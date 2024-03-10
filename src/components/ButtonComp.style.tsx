import styled from "styled-components";
import ButtonComp from "./ButtonComp";

export const StyledButtonComp = styled(ButtonComp)<{$doubleHor?: boolean, $doubleVer?: boolean}>`
    width: ${props => props.$doubleHor ? '122px' : '60px'};
    height: ${props => props.$doubleVer ? '122px' : '60px'};
    background-color: ${
      props => props.$doubleVer ? '#ff5c33' 
      : props.$doubleHor ? '#185ea5' 
      : '#4d4d4d'
    };
    font: inherit;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 20px;
    margin-right: 2px;
    margin-bottom: 2px;
    transition: background-color 0.1s;

    &:hover {
      background-color: ${
        props => props.$doubleVer ? '#dd6648' 
        : props.$doubleHor ? '#608dbb'
        : '#737373'};
    }

    &:active {
      background-color: ${
        props => props.$doubleVer ? '#862a13' 
        : props.$doubleHor ? '#0f457b' 
        :'#333333'};
      color: #737373;
    }

`;