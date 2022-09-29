import Board from './Board.js';
import Sideview from './Sideview.js';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Game = () => {
  const gameState = useSelector((state) => state.gameState)
  // RENDER GAMEOVER/ SCORESUBMIT SCREEN ON THIS COMPONENT
  // GET STATE OF WHETHER TO SHOW IT FROM REDUX
  // RENDER A TITLE SCREEN IF THERE'S TIME

  // const [leaderBoard, setLeaderBoard] = useState();

  useEffect(() => {

  }, []);

  const renderScreen = () => {
    switch(gameState) {
      case 'title':
        // return (<TitleScreen />);
        break;
      case 'credits':
        // return (<Credits />);
        break;
      case 'leaderboard':
        // return (<Leaderboard />);
        break;
      default:
        return (
          <>
            <div id='board'>
              <Board />
            </div>
            <Sideview />
          </>
        );
        break;
    }
  }

  return (
    <>
      <div className='overlay'></div>
      <div id='game'>
        {renderScreen()}
      </div>
    </>
  );
};

export default Game;

//contains the actual game and the side view
//this component sohuld render a background slighty around the game as well