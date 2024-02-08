import { useState } from 'react';
import { StyledButtonComp } from './components/ButtonComp.style';
import { GlobalStyles } from './GlobalStyles.style';
import './App.css';

function App() {
  const [expData, setExpData] = useState({
    displayTop: '0',
    displayBottom: '0'
  });

  function handleDigitPress(digit: string) {
    setExpData({...expData, displayBottom: expData.displayBottom + digit})
  }

  return (
    <>
      <GlobalStyles />
      <div id='body-wrap'>
        <div id='calc-wrap'>
          <div id='display'>
            <div>
              {expData.displayTop}
            </div>
            <div>
              {expData.displayBottom}
            </div>
          </div>
          <div id='buttonUI'>
            <div id="1st-row-wrap">
              <StyledButtonComp $doubleHor label={'AC'}/>
              <StyledButtonComp label={'/'}/>
              <StyledButtonComp label={'x'}/>
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
                  <StyledButtonComp label={'-'}/>    
                </div>
                <div>
                  <StyledButtonComp label={'+'}/>    
                </div>
                <div>
                  <StyledButtonComp $doubleVer label={'='}/>    
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
