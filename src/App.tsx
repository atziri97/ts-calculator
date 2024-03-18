import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';
import { StyledButtonComp, StyledOperationButtonComp } from './components/ButtonComp.style';
import { GlobalStyles } from './GlobalStyles.style';
import './App.css';

function App() { 
  class displayData {
    top: string;
    bottom: string;
    public constructor(top: string, bottom: string) {
      this.top = top;
      this.bottom = bottom;
    }
    public getActiveOperation(): string {
      return this.top.split(' ')[1]
    }
    public isTopZero(): boolean {
      return this.top === '0';
    }    
    public isBottomZero(): boolean {
      return this.bottom === '0';
    }
    public isBottomNegative(): boolean {
      return this.bottom.includes('-')
    }
    public isBottomFloat(): boolean {
      return this.bottom.includes('.')
    }
    public isBottomSafe(): boolean {
      return this.bottom.length < 15
    }
  }

  class expressionData {
    operand1: number;
    operand2: number;
    operation: string;
    public constructor(operand1: number, operand2: number, operation: string) {
      this.operand1 = operand1;
      this.operand2 = operand2;
      this.operation = operation;
    }
  }

  const [display, setDisplay] = useState<displayData>(new displayData('0', '0'));
  const [expression, setExpression] = useState<expressionData>(new expressionData(0, 0, ''));
  const [operationSwitch, setOperationSwitch] = useState<boolean>(false);
  const [quickCalculationMode, setQuickCalculationMode] = useState<boolean>(false);
  const [quickCalculationOperation, setQuickCalculationOperation] = useState<string>('');
  const [calculationCallback, setCalculationCallback] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  function handleACPress(): void {
    setDisplay(
      new displayData('0', '0')
    )
    setQuickCalculationMode(false)
    setOperationSwitch(false)
  }

  function handleDigitPress(digit: string): void {
    if (display.isBottomSafe() === true) {
      if (display.isBottomZero() === true || calculationCallback === true) {
        setDisplay(new displayData(display.top, digit));
        setOperationSwitch(false);
        setQuickCalculationMode(false)
        setCalculationCallback(false)
      } else {
        setDisplay(new displayData(display.top, display.bottom + digit));
        setOperationSwitch(false);
        setQuickCalculationMode(false);
      }  
    }
    
  }

  function precisionCompensation(input: number): number {
    let output: number = input;
    if (Number.isSafeInteger(input) === false || input.toString().length > 15) {
      output = Number.parseFloat(input.toString().slice(0, 15));
      console.log('t1')
    }  
    return output 
  }

  function calculateResult(): string {
    let result: number = 0;
    let a = new BigNumber(expression.operand1);
    let b = new BigNumber(expression.operand2);
    switch (expression.operation) {
      case '+':
        result = a.plus(b).toNumber();
        break;
      case '-':
        result = a.minus(b).toNumber();
        break;
      case 'x':
        result = a.multipliedBy(b).toNumber();
        break;
      case '/':
        result = a.dividedBy(b).toNumber();
        break;
    }
    return precisionCompensation(result).toString(); 
  }

  useEffect(() => {
    if (display.isTopZero() === false) {
      setResult(calculateResult()); 
      console.log(expression);
      console.log('useEffect result');
    }   
  }, [expression]) 

  useEffect(() => {
    if (display.isTopZero() === false && result !== '') {
      if (quickCalculationMode === true) {
        setDisplay(
          new displayData(
            result + ' ' + quickCalculationOperation, '0'
          )
        )
        setResult('')
        console.log('quick calc')
        setOperationSwitch(true)
        setCalculationCallback(true) 
      } else {
        setDisplay(
          new displayData(
            expression.operand1 + ' ' + expression.operation + ' ' + expression.operand2 + ' =', result
          )
        )
        setResult('')
        setCalculationCallback(true)
        console.log('useEffect display')  
      }
      
    }   
  }, [result])

  function handleOperationPress(operation: string): void {
    if (display.isTopZero() === true || display.top.includes('=') === true) {
      setDisplay(new displayData(display.bottom + ' ' + operation, '0'));
      setOperationSwitch(true);
      setQuickCalculationMode(false);
      console.log('case1');
    } else if (operationSwitch === true) {
      if (operation !== display.getActiveOperation()) {
        setDisplay(
          new displayData(
            display.top.split(' ')[0] + ' ' + operation, '0'
          )
        );  
      }
      
    } else if (quickCalculationMode === true) {
      if (operation == quickCalculationOperation) {
        setExpression(
          new expressionData(
            Number.parseFloat(display.top), Number.parseFloat(display.bottom), operation
          )
        );
      }
    } else { 
      setExpression(
        new expressionData(
          Number.parseFloat(display.top), Number.parseFloat(display.bottom), display.top.split(' ')[1]
        )
      );
      setQuickCalculationMode(true);
      setQuickCalculationOperation(operation);
      console.log('case3');
    }
  }

  function handlePeriodPress(): void {
    if (display.isBottomFloat() === false) {
      setDisplay(
        new displayData(
          display.top, display.bottom + '.'
        )
      )
    }
  }

  function handleNegativePress(): void {
    if (display.isBottomNegative() === false && display.isBottomZero() === false) {
      setDisplay(
        new displayData(
          display.top, '-' + display.bottom
        )
      )
    } else {
      setDisplay(
        new displayData(
          display.top, display.bottom.replace('-', '')
        )
      )
    }
  }

  function handleEqualsPress(): void {
    if (display.top.includes('=') === true) {
      setExpression(
        new expressionData(
          Number.parseFloat(display.bottom),
          Number.parseFloat(display.top.split(' ')[2]),
          display.top.split(' ')[1]
        )
      );
    } else {
      setExpression(
        new expressionData(
          Number.parseFloat(display.top),
          Number.parseFloat(display.bottom),
          display.top.split(' ')[1]
        )
      );
      setQuickCalculationMode(false);
    }
  }

  return (
    <>
      <GlobalStyles />
      <div id='body-wrap'>
        <div id='calc-wrap'>
          <div id='display'>
            <div>
              {display.top}
            </div>
            <div id='display-bottom-text'>
              {display.bottom}
            </div>
          </div>
          <div id='separator'>
          </div>
          <div id='buttonUI'>
            <div id="1st-row-wrap">
              <StyledButtonComp $doubleHor label={'AC'} onClickProp={handleACPress}/>
              <StyledOperationButtonComp label={'/'} onClickProp={() => handleOperationPress('/')}/>
              <StyledOperationButtonComp label={'x'} onClickProp={() => handleOperationPress('x')}/>
            </div>
            <div id='keys-wrap'>
              <div id='digits-wrap'>
                <div>
                  <StyledButtonComp label={'1'} onClickProp={() => handleDigitPress('1')}/>
                  <StyledButtonComp label={'2'} onClickProp={() => handleDigitPress('2')}/>
                  <StyledButtonComp label={'3'} onClickProp={() => handleDigitPress('3')}/>
                </div>
                <div>
                  <StyledButtonComp label={'4'} onClickProp={() => handleDigitPress('4')}/>
                  <StyledButtonComp label={'5'} onClickProp={() => handleDigitPress('5')}/>
                  <StyledButtonComp label={'6'} onClickProp={() => handleDigitPress('6')}/>              
                </div>
                <div>
                  <StyledButtonComp label={'7'} onClickProp={() => handleDigitPress('7')}/>
                  <StyledButtonComp label={'8'} onClickProp={() => handleDigitPress('8')}/>
                  <StyledButtonComp label={'9'} onClickProp={() => handleDigitPress('9')}/>              
                </div>
                <div>
                  <StyledOperationButtonComp label={'+/-'} onClickProp={handleNegativePress}/> 
                  <StyledButtonComp label={'0'} onClickProp={() => handleDigitPress('0')}/>                      
                  <StyledOperationButtonComp label={'.'} onClickProp={handlePeriodPress}/>                
                </div>         
              </div>
              <div>
                <div>
                  <StyledOperationButtonComp label={'-'} onClickProp={() => handleOperationPress('-')}/>    
                </div>
                <div>
                  <StyledOperationButtonComp label={'+'} onClickProp={() => handleOperationPress('+')}/>    
                </div>
                <div>
                  <StyledButtonComp $doubleVer label={'='} onClickProp={handleEqualsPress}/>    
                </div>                
              </div>  
            </div>     
          </div>
        </div>
        <a href='https://github.com/atziri97/ts-calculator'>
          <img id='logo' src="./public/github-mark-white.svg" alt="github-logo" />
        </a>
      </div>         
    </>
  )
}

export default App
