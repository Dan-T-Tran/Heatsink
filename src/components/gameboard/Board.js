import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderGame from './RenderGame.js';
import ScoreScreen from './ScoreScreen.js';

const Board = (props) => {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  useEffect(() => {
    props.titleBgm.currentTime = 0;
    props.titleBgm.pause();
    dispatch({type: 'initialize'});

    const game = RenderGame();
    return function cleanup() {
      game.destroy();
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