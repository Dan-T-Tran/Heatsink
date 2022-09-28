import Board from './Board.js';
import Sideview from './Sideview.js';
// import { useState, useEffect } from 'react';

const Game = () => {

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