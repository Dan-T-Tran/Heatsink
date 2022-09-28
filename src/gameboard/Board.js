import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import store from '../store';
import RenderGame from './RenderGame.js';

const Board = ({ handleScore }) => {
  useEffect(() => {
    //set starting scores, etc

    const game = RenderGame();
    return function cleanup() { //remove canvas when React component unmounts
      game.destroy();
      const canvas = document.getElementsByTagName('canvas')[0];
      canvas.remove();
    }
  }, [])

  return (
    <>
      <div id='game-board'>
      </div>
    </>
  );
};

export default Board;