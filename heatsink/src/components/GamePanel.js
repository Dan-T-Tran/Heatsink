import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Game from './gameboard/Game.js';
import thumbnail from '../assets/croppedThumbnail.png';

const GamePanel = () => {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const handleEnableGame = () => {
    dispatch({type: 'screen', payload: 'title'});
  }


  // game thumbnail and short description in this component
  return (
    <>
      <div className='game-panel' onClick = {handleEnableGame}>
        <h3 className='game-title'>Heatsink</h3>
        <img src={thumbnail} className='game-thumbnail' alt='thumbnail'></img>
        <p className='game-description'>A shoot-em-up game that rewards careful risk-management.</p>
      </div>
      {gameState && <Game />}
    </>

  )
};

export default GamePanel;
