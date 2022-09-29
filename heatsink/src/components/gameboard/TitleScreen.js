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
          <p>Move with the arrow keys</p>
          <p>Press <u>Z</u> to shoot</p>
          <p>Press <u>X</u> to block shots and gain heat</p>
          <p>Press <u>space</u> to heal and expel heat into a mega-shot</p>
          <p>Hold <u>shift</u> to slow down and focus your shots</p>
          <p>As you gain heat, your attacks become stronger, but you will also take more damage!</p>
        </div>
      </div>
      <div className='title-buttons'>
        <button className='title-button' name='game' onClick={handleButton}>Start</button>
        <button className='title-button' name='leaderboard' onClick={handleButton}>Leaderboard</button>
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