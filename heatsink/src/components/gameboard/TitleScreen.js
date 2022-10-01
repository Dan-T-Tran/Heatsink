import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const TitleScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.titleBgm.play();

    props.titleBgm.addEventListener('ended', () => {
      props.titleBgm.currentTime = 0;
      props.titleBgm.play();
    }, false);
  }, [])

  const handleButton = (e) => {
    if (e.target.name === 'exit') {
      dispatch({type: 'exit'});
      return;
    } else {
      dispatch({type: 'screen', payload: e.target.name});
    }
  }

  return (
    <div className='title-screen'>
      <div className='title-details'>
        <div>
          <h1><u>Heatsink</u></h1>
          <p>Use <b>arrow keys</b> to move</p>
          <p>Press <b>Z</b> to shoot</p>
          <p>Press <b>X</b> to block shots and gain heat</p>
          <p>Press <b>C</b> to change weapons</p>
          <p>Press <b>Space</b> to heal and expel heat into a mega-shot</p>
          <p>Hold <b>Shift</b> to slow down and focus your shots</p>
          <p>As you gain heat, your attacks become stronger and you get more points, but you will also take more damage!</p>
          <p>Every 60 enemies destroyed drops a damage booster that increases your damage for this run.</p>
          <p>Difficulty increases every 15 seconds. Get as many points as you can before you get overwhelmed!</p>
        </div>
      </div>
      <div className='title-buttons'>
        <button className='title-button' name='game' onClick={handleButton}>Start</button>
        <button className='title-button' name='leaderboard' onClick={handleButton}>Leaderboard</button>
        <button className='title-button' name='credits' onClick={handleButton}>Credits</button>
        <button className='title-button' name='exit' onClick={handleButton}>Exit</button>
      </div>
    </div>
  )
};

export default TitleScreen;


/*
  import test from './test.mp3';
  const [audio] = useState(new Audio(test));

  import test from './test.png';
  <img src={test}></img>
*/