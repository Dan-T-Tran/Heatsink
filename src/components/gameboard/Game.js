import Board from './Board.js';
import StartScreen from './StartScreen.js';
import TitleScreen from './TitleScreen.js';
import Leaderboard from './Leaderboard.js';
import Credits from './Credits.js';
import Sideview from './Sideview.js';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import audio from '../../assets/titleScreen.mp3';

const Game = () => {
  const gameState = useSelector((state) => state.gameState)
  const dispatch = useDispatch();
  const [titleBgm] = useState(new Audio(audio));

  useEffect(() => {
    return function cleanUp() {
      titleBgm.currentTime = 0;
      titleBgm.pause();
    }
  }, [])

  const renderScreen = () => {
    switch(gameState) {
      case 'start':
        return (<StartScreen />)
        break;
      case 'title':
        return (<TitleScreen titleBgm={titleBgm}/>);
        break;
      case 'credits':
        return (<Credits />);
        break;
      case 'scoreScreen':
      case 'game':
        return (
          <>
            <div id='board'>
              <Board titleBgm={titleBgm}/>
            </div>
            <Sideview />
          </>
        );
        break;
      case 'leaderboard':
        return (<Leaderboard titleBgm={titleBgm}/>);
        break;
      default:
        break;
    }
  }

  const handleExit = () => {
    dispatch({ type: 'exit' })
  }

  return (
    <>
      <div className='overlay'></div>
      <div className='overlay-exit' onClick={handleExit}><h4>X</h4></div>
      <div id='game'>
        {renderScreen()}
      </div>
    </>
  );
};

export default Game;
