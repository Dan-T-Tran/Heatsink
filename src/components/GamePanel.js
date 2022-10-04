import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import Game from './gameboard/Game.js';
import thumbnail from '../assets/croppedThumbnail.png';

const GamePanel = () => {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const hiddenPlaceholder = useRef(null);

  const handleEnableGame = () => {
    dispatch({type: 'screen', payload: 'start'});
  }

  const handlePlaceholder = () => {
    hiddenPlaceholder.current.click();
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
      <div className='game-panel' onClick = {handlePlaceholder}>
        <h3 className='game-title'>UNDER CONSTRUCTION!</h3>
        <img style={{height: '200px', width: '400px'}}src={'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} className='game-thumbnail' alt='thumbnail'></img>
        <p className='game-description'>UNDER CONSTRUCTION!</p>
      </div>
      <div className='game-panel' onClick = {handlePlaceholder}>
        <h3 className='game-title'>UNDER CONSTRUCTION!</h3>
        <img style={{height: '200px', width: '400px'}}src={'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} className='game-thumbnail' alt='thumbnail'></img>
        <p className='game-description'>UNDER CONSTRUCTION!</p>
      </div>
      {!gameState && <a href='https://www.youtube.com/watch?v=YxjY_YTksKM' style={{display:'none'}} ref={hiddenPlaceholder}></a> }
    </>

  )
};

export default GamePanel;
