import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderGame from './RenderGame.js';
import ScoreScreen from './ScoreScreen.js';

const Board = ({ handleScore }) => {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'initialize'});

    const game = RenderGame();
    return function cleanup() { //remove canvas when React component unmounts
      game.destroy();
      const canvas = document.getElementsByTagName('canvas')[0];
      canvas.remove();
    }
  }, [])

  return (
    <>
      {gameState === 'scoreScreen' && <ScoreScreen />}
      <div id='game-board' />
    </>
  );
};

export default Board;