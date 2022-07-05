import React, { useState, useEffect } from 'react'
import './DisplayGrid.css';
import {generateNumbersArr} from "./generateNumbers.js";
import {EndGame} from "./EndGame.js"


let numArr = generateNumbersArr();
let actualNum = `${numArr[0]}${numArr[1]}${numArr[2]}` 
const generateNumbersObj = (array) => {
  // add number into numberObj
  let numberObj = {};
  for (let j = 0; j < array.length; j++) {
    let currNum = array[j];
    if (currNum in numberObj) {
      numberObj[currNum] += 1; 
    }
    else {
      numberObj[currNum] = 1;
    }
  }
  return numberObj;
}

let numObj = generateNumbersObj(numArr);

const limit = 1; // no. of integers allowed in each box

export const DisplayGrid = (props) => {
  const [actualNumbersArr, setActualNumbersArr] = useState(numArr);
  const [actualNumbersObj, setActualNumbersObj] = useState(numObj);

  const [attemptNum, setAttemptNum] = useState(0);

  // each state holds each column's inputs and guesses
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [guess1, setGuess1] = useState([]);
  const [guess2, setGuess2] = useState([]);
  const [guess3, setGuess3] = useState([]);

  const[guess1Colour, setGuess1Colour] = useState([]);
  const[guess2Colour, setGuess2Colour] = useState([]);
  const[guess3Colour, setGuess3Colour] = useState([]);

  const[keypadColour, setKeypadColour] = useState({
    1: "white",
    2: "white",
    3: "white",
    4: "white",
    5: "white",
    6: "white",
    7: "white",
    8: "white",
    9: "white",
    0: "white"
  });

  // check for empty inputs
  const[checkInput, setCheckInput] = useState(null);

  // numberOfCorrect = {1: true, 2: true, 3: true} to win
  const [numberOfCorrect, setNumberOfCorrect] = useState({
    1: false,
    2: false,
    3: false
  });
  
  // set state to show endgame message
  const [isWin, setIsWin] = useState(null);
  const [showEndGame, setShowEndGame] = useState(false);

  useEffect(() => {
    console.log(actualNumbersArr);
  }, []);

  // effect hook for changing colours
  // using setState in useEffect causes an infinite loop
  useEffect(() => {
    document.addEventListener("submit", validateGuess);
    return () => {
      document.removeEventListener("submit", validateGuess);
    }
  });

  useEffect(() => {
    if (numberOfCorrect[1] === false || numberOfCorrect[2] === false || numberOfCorrect[3] === false) {
      setNumberOfCorrect((prev) => ({
        ...prev,
        1: false,
        2: false,
        3: false
      }));
    }
  }, [numberOfCorrect[1], numberOfCorrect[2], numberOfCorrect[3]]);

  useEffect(() => {
    if (numberOfCorrect[1] === true && numberOfCorrect[2] === true && numberOfCorrect[3] === true) {
      setAttemptNum(8);
      setIsWin(true);
      // setShowEndGame(true);
      setTimeout(() => setShowEndGame(true), 1500);
    }

    if (attemptNum >= 7 && (numberOfCorrect[1] === false || numberOfCorrect[2] === false || numberOfCorrect[3] === false)) {
      setIsWin(false);
      setTimeout(() => setShowEndGame(true), 1500);
    }
  }
  ,[attemptNum,numberOfCorrect[1], numberOfCorrect[2], numberOfCorrect[3]])

  const validateGuess = () => {
    if (checkInput === false) {
      return;
    }
    // guess1
    const temp1 = guess1[attemptNum-1];
    if (temp1 === actualNumbersArr[0]) {
      setGuess1Colour((prev) => {
        return [...prev, "green"];
      });
      setNumberOfCorrect((prev) => ({
        ...prev,
        1: true
      }));
      setKeypadColour((prev) => ({
        ...prev,
        [temp1]: "green"
      }));
    }
    else if (actualNumbersObj[temp1]) {
      setGuess1Colour((prev) => {
        return [...prev, "rgb(170, 170, 10)"];
      })
      setKeypadColour((prev) => ({
        ...prev,
        [temp1]: "rgb(170, 170, 10)"
      }));
    }
    else {
      setGuess1Colour((prev) => {
        return [...prev, "rgb(75,75,75)"];
      })
      setKeypadColour((prev) => ({
        ...prev,
        [temp1]: "rgb(75,75,75)"
      }));
    }

    // guess2
    const temp2 = guess2[attemptNum-1];
    if (temp2 === actualNumbersArr[1]) {
      setGuess2Colour((prev) => {
        return [...prev, "green"];
      });
      setNumberOfCorrect((prev) => ({
        ...prev,
        2: true
      }));
      setKeypadColour((prev) => ({
        ...prev,
        [temp2]: "green"
      }));
    }
    else if (actualNumbersObj[temp2]) {
      setGuess2Colour((prev) => {
        return [...prev, "rgb(170, 170, 10)"];
      })
      setKeypadColour((prev) => ({
        ...prev,
        [temp2]: "rgb(170, 170, 10)"
      }));
    }
    else {
      setGuess2Colour((prev) => {
        return [...prev, "rgb(75,75,75)"];
      })
      setKeypadColour((prev) => ({
        ...prev,
        [temp2]: "rgb(75,75,75)"
      }));
    }

    // guess3
    const temp3 = guess3[attemptNum-1];
    if (temp3 === actualNumbersArr[2]) {
      setGuess3Colour((prev) => {
        return [...prev, "green"];
      });
      setNumberOfCorrect((prev) => ({
        ...prev,
        3: true
      }));
      setKeypadColour((prev) => ({
        ...prev,
        [temp3]: "green"
      }));
    }
    else if (actualNumbersObj[temp3]) {
      setGuess3Colour((prev) => {
        return [...prev, "rgb(170, 170, 10)"];
      })
      setKeypadColour((prev) => ({
        ...prev,
        [temp3]: "rgb(170, 170, 10)"
      }));
    }
    else {
      setGuess3Colour((prev) => {
        return [...prev, "rgb(75,75,75)"];
      })
      setKeypadColour((prev) => ({
        ...prev,
        [temp3]: "rgb(75,75,75)"
      }));
    }
  } // end of validateGuess

  const handleInput1 = (event) => {
    // allow player to input only 1 integer
    setInput1(Number(event.target.value.slice(0, limit)));
    // document.getElementById("number1").blur();
    document.getElementById("number2").focus();
  }

  const handleInput2 = (event) => {
    // allow player to input only 1 integer
    setInput2(Number(event.target.value.slice(0, limit)));
    document.getElementById("number3").focus();
  }

  const handleInput3 = (event) => {
    // allow player to input only 1 integer
    setInput3(Number(event.target.value.slice(0, limit)));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // check for empty boxes
    if (typeof(input1) === 'string' || typeof(input2) === 'string' || typeof(input3) === 'string') {
      console.log("checked");
      setCheckInput(false);
      return;
    }

    // update state for guess1 guess2 guess3
    setGuess1((prev) => {
      return [...prev, input1];
    })

    setGuess2((prev) => {
      return [...prev, input2];
    })

    setGuess3((prev) => {
      return [...prev, input3];
    })

    // increment attemptNum by 1, move on to next row
    setAttemptNum((prevAttemptNum) => prevAttemptNum + 1);
    document.getElementById("number2").focus();
    // reset input
    setInput1("");
    setInput2("");
    setInput3("");
    setCheckInput(true);
    
  } // end of handleSubmit


  const resetGame = () => {
    // numArr = generateNumbersArr();
    // numObj = generateNumbersObj(numArr);
    // setActualNumbersArr(numArr);
    // setActualNumbersObj(numObj);
    // setAttemptNum(0);

    // setGuess1([]);
    // setGuess2([]);
    // setGuess3([]);

    // setGuess1Colour([]);
    // setGuess2Colour([]);
    // setGuess3Colour([]);
    // setNumberOfCorrect({
    //   1: false,
    //   2: false,
    //   3: false
    // });
    // window.location.reload();
    // return false;
  }
  
  return (
    <>
    <div>
      {/* {actualNumbersArr} */}
      <form onSubmit={handleSubmit}> 
        <input type="number" id="number1" min="0" max="9" 
        style={{backgroundColor: guess1Colour[0]}}
        value={attemptNum===0 ? input1 : guess1[0]} 
        onChange={handleInput1} 
        disabled={attemptNum===0 ? false : true}
        autoFocus/>
        

        <input type="number" id="number2" min="0" max="9" 
        style={{backgroundColor: guess2Colour[0]}}
        value={attemptNum===0 ? input2 : guess2[0]} 
        onChange={handleInput2}
        disabled={attemptNum===0 ? false : true}
        focus/>

        <input type="number" id="number3" min="0" max="9" 
        style={{backgroundColor: guess3Colour[0]}}
        value={attemptNum===0 ? input3 : guess3[0]} 
        onChange={handleInput3}
        disabled={attemptNum===0 ? false : true}/>
        <div className='space'><input type="Submit" className="submit-button"></input></div>
        
      </form>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" id="number1" min="0" max="9" 
        style={{backgroundColor: guess1Colour[1]}}
        value={attemptNum===1 ? input1 : guess1[1]} 
        onChange={handleInput1} 
        disabled={attemptNum===1 ? false : true}/>

        <input type="number" id="number2" min="0" max="9" 
        style={{backgroundColor: guess2Colour[1]}}
        value={attemptNum===1 ? input2 : guess2[1]} 
        onChange={handleInput2}
        disabled={attemptNum===1 ? false : true}/>

        <input type="number" id="number3" min="0" max="9" 
        style={{backgroundColor: guess3Colour[1]}}
        value={attemptNum===1 ? input3 : guess3[1]} 
        onChange={handleInput3}
        disabled={attemptNum===1 ? false : true}/>

        <div className='space'><input type="Submit" className="submit-button"></input>
        </div>
        
      </form>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" id="number1" min="0" max="9" 
        style={{backgroundColor: guess1Colour[2]}}
        value={attemptNum===2 ? input1 : guess1[2]} 
        onChange={handleInput1} 
        disabled={attemptNum===2 ? false : true}/>

        <input type="number" id="number2" min="0" max="9" 
        style={{backgroundColor: guess2Colour[2]}}
        value={attemptNum===2 ? input2 : guess2[2]} 
        onChange={handleInput2}
        disabled={attemptNum===2 ? false : true}/>

        <input type="number" id="number3" min="0" max="9" 
        style={{backgroundColor: guess3Colour[2]}}
        value={attemptNum===2 ? input3 : guess3[2]} 
        onChange={handleInput3}
        disabled={attemptNum===2 ? false : true}/>

        <div className='space'><input type="Submit" className="submit-button"></input></div>
      </form>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" id="number1" min="0" max="9" 
        style={{backgroundColor: guess1Colour[3]}}
        value={attemptNum===3 ? input1 : guess1[3]} 
        onChange={handleInput1} 
        disabled={attemptNum===3 ? false : true}/>

        <input type="number" id="number2" min="0" max="9" 
        style={{backgroundColor: guess2Colour[3]}}
        value={attemptNum===3 ? input2 : guess2[3]} 
        onChange={handleInput2}
        disabled={attemptNum===3 ? false : true}/>

        <input type="number" id="number3" min="0" max="9" 
        style={{backgroundColor: guess3Colour[3]}}
        value={attemptNum===3 ? input3 : guess3[3]} 
        onChange={handleInput3}
        disabled={attemptNum===3 ? false : true}/>
        
        <div className='space'><input type="Submit" className="submit-button"></input></div>
      </form>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" id="number1" min="0" max="9" 
        style={{backgroundColor: guess1Colour[4]}}
        value={attemptNum===4 ? input1 : guess1[4]} 
        onChange={handleInput1} 
        disabled={attemptNum===4 ? false : true}/>

        <input type="number" id="number2" min="0" max="9" 
        style={{backgroundColor: guess2Colour[4]}}
        value={attemptNum===4 ? input2 : guess2[4]} 
        onChange={handleInput2}
        disabled={attemptNum===4 ? false : true}/>

        <input type="number" id="number3" min="0" max="9" 
        style={{backgroundColor: guess3Colour[4]}}
        value={attemptNum===4 ? input3 : guess3[4]} 
        onChange={handleInput3}
        disabled={attemptNum===4 ? false : true}/>
        
        <div className='space'><input type="Submit" className="submit-button"></input></div>
      </form>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" id="number1" min="0" max="9" 
        style={{backgroundColor: guess1Colour[5]}}
        value={attemptNum===5 ? input1 : guess1[5]} 
        onChange={handleInput1} 
        disabled={attemptNum===5 ? false : true}/>

        <input type="number" id="number2" min="0" max="9" 
        style={{backgroundColor: guess2Colour[5]}}
        value={attemptNum===5 ? input2 : guess2[5]} 
        onChange={handleInput2}
        disabled={attemptNum===5 ? false : true}/>

        <input type="number" id="number3" min="0" max="9" 
        style={{backgroundColor: guess3Colour[5]}}
        value={attemptNum===5 ? input3 : guess3[5]} 
        onChange={handleInput3}
        disabled={attemptNum===5 ? false : true}/>
        
        <div className='space'><input type="Submit" className="submit-button"></input></div>
      </form>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" id="number1" min="0" max="9" 
        style={{backgroundColor: guess1Colour[6]}}
        value={attemptNum===6 ? input1 : guess1[6]} 
        onChange={handleInput1} 
        disabled={attemptNum===6 ? false : true}/>

        <input type="number" id="number2" min="0" max="9" 
        style={{backgroundColor: guess2Colour[6]}}
        value={attemptNum===6 ? input2 : guess2[6]} 
        onChange={handleInput2}
        disabled={attemptNum===6 ? false : true}/>

        <input type="number" id="number3" min="0" max="9" 
        style={{backgroundColor: guess3Colour[6]}}
        value={attemptNum===6 ? input3 : guess3[6]} 
        onChange={handleInput3}
        disabled={attemptNum===6 ? false : true}/>
        
        <div className='space'><input type="Submit" className="submit-button"></input></div>
      </form>
    </div>
    {/* <div>
      <form onSubmit={handleSubmit}>
        <input type="number" id="number" min="0" max="9" 
        style={{backgroundColor: guess1Colour[7]}}
        value={attemptNum===7 ? input1 : guess1[7]} 
        onChange={handleInput1} 
        disabled={attemptNum===7 ? false : true}/>

        <input type="number" id="number" min="0" max="9" 
        style={{backgroundColor: guess2Colour[7]}}
        value={attemptNum===7 ? input2 : guess2[7]} 
        onChange={handleInput2}
        disabled={attemptNum===7 ? false : true}/>

        <input type="number" id="number" min="0" max="9" 
        style={{backgroundColor: guess3Colour[7]}}
        value={attemptNum===7 ? input3 : guess3[7]} 
        onChange={handleInput3}
        disabled={attemptNum===7 ? false : true}/>
        
        <div className='space'><input type="Submit" className="submit-button"></input></div>
      </form>
      </div> */}
      {showEndGame && <EndGame isWin={isWin} solution={actualNum}/>}
      <br />
      <div className = "keypad">
      <div style={{backgroundColor: keypadColour[1]}}>1</div>
      <div style={{backgroundColor: keypadColour[2]}}>2</div>
      <div style={{backgroundColor: keypadColour[3]}}>3</div>
      <div style={{backgroundColor: keypadColour[4]}}>4</div>
      <div style={{backgroundColor: keypadColour[5]}}>5</div>
      <div style={{backgroundColor: keypadColour[6]}}>6</div>
      <div style={{backgroundColor: keypadColour[7]}}>7</div>
      <div style={{backgroundColor: keypadColour[8]}}>8</div>
      <div style={{backgroundColor: keypadColour[9]}}>9</div>
      <div style={{backgroundColor: keypadColour[0]}}>0</div>
      </div>
    
   
    </>
  )
}