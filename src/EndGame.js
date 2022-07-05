import React from 'react'

const resetGame = () => {
  window.location.reload();
  return false;
}

export const EndGame = (props) => {
  return (
    <div className='endGame'>
      {props.isWin && (
        <div>
          <h2>You win! 😊</h2>
          <h3>The number was {props.solution}</h3>
          <button onClick={resetGame}>Let's Play Again</button>
        </div>
      )}

      {!props.isWin && (
        <div>
          <h2>Better luck next time! 😭</h2>
          <h3>The number was {props.solution}</h3>
          <button onClick={resetGame}>Let's Play Again</button>
        </div>
      )}
    </div>
  )
}