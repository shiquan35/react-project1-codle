/* 

1. Get a random number ranging from 0 (inclusive) to 10 (exclusive).
2. Append each number into an array and object

*/


 // store a 3-digit number

/*
Function to generate numbers from 0 - 9
Returns an integer
*/
const createRandomNumber = () => {
  const integer = Math.floor(Math.random() * 10);
  return integer;
}


export const generateNumbersArr = () => {
  const numberArr = [];
  for (let i = 0; i<3; i++) {
    let number = createRandomNumber();
    numberArr.push(number);
  }
  return numberArr;
}