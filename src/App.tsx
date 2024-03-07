import { useState, useEffect } from 'react';
import { StyledButtonComp } from './components/ButtonComp.style';
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
    public isBottomZero(): boolean {
      return this.bottom === '0';
    }
    public isTopZero(): boolean {
      return this.top === '0';
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
  const [result, setResult] = useState<string>('');

  function handleACPress(): void {
    setDisplay(
      new displayData('0', '0')
    )
  }

  function handleDigitPress(digit: string): void {
    if (display.isBottomZero() === true) {
      setDisplay(new displayData(display.top, digit))
      setOperationSwitch(false)
    } else {
      setDisplay(new displayData(display.top, display.bottom + digit))
      setOperationSwitch(false)
    }
  }

  function calculateResult(): string {
    let r : number = 0;
    switch (expression.operation) {
      case '+':
        r = expression.operand1 + expression.operand2;
        break;
      case '-':
        r = expression.operand1 + expression.operand2;
        break;
      case 'x':
        r = expression.operand1 * expression.operand2;
        break;
      case '/':
        r = expression.operand1 / expression.operand2;
        break;
    }
    return r.toString(); 
  }

  useEffect(() => {
    if (display.isTopZero() === false) {
      setResult(calculateResult()); 
      console.log(expression)
      console.log('useEffect result')
    }   
  }, [expression]) 

  useEffect(() => {
    if (display.isTopZero() === false && result !== '') {
      setDisplay(
        new displayData(
          expression.operand1 + ' ' + expression.operation + ' ' + expression.operand2 + ' =', result
        )
      )
      setResult('')
      console.log('useEffect display')
    }   
  }, [result])

  function handleOperationPress(operation: string): void {
    if (display.isTopZero() === true || display.top.includes('=') === true) {
      setDisplay(new displayData(display.bottom + ' ' + operation, '0'))
      setOperationSwitch(true)
      console.log('case1')
    } else if (operationSwitch === true) {
      setDisplay(
        new displayData(
          display.top.split(' ')[0] + ' ' + operation, '0'
        )
      )
    } else { 
      setExpression(
        new expressionData(
          Number.parseFloat(display.top), Number.parseFloat(display.bottom), display.top.split(' ')[1]
        )
      )
      console.log("calculated")
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
      )
    } else {
      setExpression(
        new expressionData(
          Number.parseFloat(display.top),
          Number.parseFloat(display.bottom),
          display.top.split(' ')[1]
        )
      )
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
            <div>
              {display.bottom}
            </div>
          </div>
          <div id='buttonUI'>
            <div id="1st-row-wrap">
              <StyledButtonComp $doubleHor label={'AC'} onClickProp={handleACPress}/>
              <StyledButtonComp label={'/'} onClickProp={() => handleOperationPress('/')}/>
              <StyledButtonComp label={'x'} onClickProp={() => handleOperationPress('x')}/>
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
                  <StyledButtonComp $doubleHor label={'0'} onClickProp={() => handleDigitPress('0')}/>   
                  <StyledButtonComp label={'.'}/>                
                </div>         
              </div>
              <div>
                <div>
                  <StyledButtonComp label={'-'} onClickProp={() => handleOperationPress('-')}/>    
                </div>
                <div>
                  <StyledButtonComp label={'+'} onClickProp={() => handleOperationPress('+')}/>    
                </div>
                <div>
                  <StyledButtonComp $doubleVer label={'='} onClickProp={handleEqualsPress}/>    
                </div>                
              </div>  
            </div>     
          </div>
        </div>  
      </div>      
    </>
  )
}

export default App
