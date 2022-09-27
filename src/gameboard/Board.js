import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import RenderGame from './RenderGame.js';

const Board = (props) => {
  const [score, setScore] = useState(0);

  useEffect(() => {

    RenderGame();
    return function cleanup() { //remove canvas when React component unmounts
      const canvas = document.getElementsByTagName('canvas')[0];
      canvas.remove();
    }
  }, [])

  const handleScore = () => {
    setScore((prevScore) => prevScore + 1);
  }

  return (
    <>
    </>
  );
};

export default Board;