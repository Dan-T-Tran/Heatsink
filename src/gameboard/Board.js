import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import RenderGame from './RenderGame.js';

const Board = ({ handleScore }) => {


  useEffect(() => {

    RenderGame();

    return function cleanup() { //remove canvas when React component unmounts
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