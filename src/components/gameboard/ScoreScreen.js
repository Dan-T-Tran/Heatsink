import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import store from '../../store';
import axios from 'axios';

const ScoreScreen = () => {
  const [name, setName] = useState('');
  const score = useSelector((state) => state.score);
  const dispatch = useDispatch();
  const [pointer, setPointer] = useState([0, 0]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      score: score
    }

    await axios.post('/heatsink', data)
    .then((response) => {
      console.log(response);
      dispatch({type: 'screen', payload: 'title'});
    }) //either show leaderboard in the then, or go to main screen
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
      <h2>Your score: {score}</h2>
      <input type='text' className='score-name-input' onChange={handleChange} placeholder='Enter name'></input>
      <button type='submit' className='score-submit-button' onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
};

export default ScoreScreen;
