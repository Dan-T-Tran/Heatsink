import Board from './Board.js';
import Sideview from './Sideview.js';
// import { useState, useEffect } from 'react';

const Game = () => {
  // RENDER GAMEOVER/ SCORESUBMIT SCREEN ON THIS COMPONENT
  // GET STATE OF WHETHER TO SHOW IT FROM REDUX
  // RENDER A TITLE SCREEN IF THERE'S TIME

  return (
    <div id='game'>
      <div id='board'>
        <Board />
      </div>
      <Sideview />
    </div>
  );
};

export default Game;

//contains the actual game and the side view
//this component sohuld render a background slighty around the game as well