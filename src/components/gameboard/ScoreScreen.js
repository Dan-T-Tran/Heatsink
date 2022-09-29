import { useState } from 'react';
import { useSelector } from 'react-redux';
// import store from '../../store';
import axios from 'axios';

const ScoreScreen = () => {
  const [name, setName] = useState('');
  const score = useSelector((state) => state.score);
  const [pointer, setPointer] = useState([0, 0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      score: score
    }

    axios.post('/heatsink')
    .then((response) => console.log(response)) //either show leaderboard in the then, or go to main screen
    .catch((err) => console.log(err));
  };

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
      <h1>GAME OVER</h1>
      <input type='text' className='score-name-input' placeholder='Enter name'></input>
      <button type='submit' className='score-submit-button' onSubmit={handleSubmit}>Submit</button>
    </div>
    </>
  )
};

export default ScoreScreen;
