import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import store from '../../store';
import axios from 'axios';
import audio from '../../assets/gameOver.mp3'
import moment from 'moment';

const ScoreScreen = () => {
  const [name, setName] = useState('');
  const score = useSelector((state) => state.score);
  const difficulty = useSelector((state) => state.difficulty);
  const dispatch = useDispatch();
  const [pointer, setPointer] = useState([0, 0]);
  const [gameOver] = useState(new Audio(audio));

  useEffect(() => {
    gameOver.play();
    gameOver.addEventListener('ended', () => {
      gameOver.currentTime = 0;
      gameOver.play();
    }, false);

    return function cleanUp() {
      gameOver.currentTime = 0;
      gameOver.pause();
    }
  }, [])

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.name === 'back') {
      dispatch({type: 'screen', payload: 'title'});
      return;
    }

    const data = {
      name: name,
      score: score,
      date: moment().format('MM DD YYYY'),
      difficulty: difficulty
    }

    await axios.post('/heatsink', data)
    .then((response) => dispatch({ type: 'screen', payload: 'leaderboard' }))
    .catch((err) => console.log(err));
  };

  // Maybe try to set up a keyboard score submit eventually?
  const renderKeyboard = () => {
    const keyboard = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'enter'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
  }

  return (
    <>
    <div className='score-overlay'></div>
    <div className='score-screen'>
      <div className='score-submit-details'>
        <h1>GAME OVER</h1>
        <h2>Your score: {score}</h2>
        <input type='text' className='score-screen-input' onChange={handleChange} maxLength={15} placeholder='Enter name'></input>
      </div>
      <div className='score-submit-buttons'>
        <button type='submit' className='score-submit-button' name='forward' onClick={handleSubmit}>Submit</button>
        <button type='submit' className='score-submit-button' name='back' onClick={handleSubmit}>Back to Title</button>
      </div>
    </div>
    </>
  )
};

export default ScoreScreen;
