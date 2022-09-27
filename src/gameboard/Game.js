import Board from './Board.js';
import Sideview from './Sideview.js';
import { useState, useEffect } from 'react';

const Game = () => {
  const [show, setShow] = useState(true);
  const [score, setScore] = useState(0);
  // const [health, setHealth] = useState(100);

  const handleScore = (number) => {
    setScore(score);
    // console.log('SCORE', number);
    // setShow(false);
  }

  // useEffect(() => {console.log(score)}, [score]);

  return (
    <div id='game'>
      <div id='board'>
        {show && <Board handleScore={handleScore}/>}
      </div>
      <Sideview />
    </div>
  );
};

export default Game;

//contains the actual game and the side view
//this component sohuld render a background slighty around the game as well